use cosmwasm_std::{coin, Decimal};
use fury_swapper_osmosis::route::{OsmosisRoute, SwapAmountInRoute};
use fury_types::{
    address_provider::{
        ExecuteMsg as ExecuteMsgAddr, InstantiateMsg as InstantiateAddr, FuryAddressType,
    },
    rewards_collector::{ExecuteMsg, InstantiateMsg as InstantiateRewards, UpdateConfig},
};
use osmosis_test_tube::{Account, Gamm, Module, OsmosisTestApp, Wasm};

use crate::{
    cosmos_bank::Bank,
    helpers::{
        osmosis::{assert_err, instantiate_contract},
        swap_to_create_twap_records,
    },
};

mod cosmos_bank;
mod helpers;

const OSMOSIS_ADDR_PROVIDER_CONTRACT_NAME: &str = "fury-address-provider";
const OSMOSIS_REWARDS_CONTRACT_NAME: &str = "fury-rewards-collector-osmosis";
const OSMOSIS_SWAPPER_CONTRACT_NAME: &str = "fury-swapper-osmosis";

#[test]
fn swapping_rewards() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let accs = app
        .init_accounts(
            &[
                coin(1_000_000_000_000, "uatom"),
                coin(1_000_000_000_000, "ufury"),
                coin(1_000_000_000_000, "uusdc"),
                coin(1_000_000_000_000, "uosmo"),
            ],
            2,
        )
        .unwrap();
    let signer = &accs[0];
    let user = &accs[1];

    let addr_provider_addr = instantiate_contract(
        &wasm,
        signer,
        OSMOSIS_ADDR_PROVIDER_CONTRACT_NAME,
        &InstantiateAddr {
            owner: signer.address(),
            prefix: "osmo".to_string(),
        },
    );

    let safety_fund_denom = "uusdc";
    let fee_collector_denom = "ufury";
    let rewards_addr = instantiate_contract(
        &wasm,
        signer,
        OSMOSIS_REWARDS_CONTRACT_NAME,
        &InstantiateRewards {
            owner: signer.address(),
            address_provider: addr_provider_addr.clone(),
            safety_tax_rate: Decimal::percent(25),
            safety_fund_denom: safety_fund_denom.to_string(),
            fee_collector_denom: fee_collector_denom.to_string(),
            channel_id: "channel-1".to_string(),
            timeout_seconds: 60,
            slippage_tolerance: Decimal::percent(1),
            neutron_ibc_config: None,
        },
    );

    // Instantiate swapper addr
    let swapper_addr = instantiate_contract(
        &wasm,
        signer,
        OSMOSIS_SWAPPER_CONTRACT_NAME,
        &fury_types::swapper::InstantiateMsg {
            owner: signer.address(),
        },
    );

    // Set swapper addr in address provider
    wasm.execute(
        &addr_provider_addr,
        &fury_types::address_provider::ExecuteMsg::SetAddress {
            address_type: FuryAddressType::Swapper,
            address: swapper_addr.clone(),
        },
        &[],
        signer,
    )
    .unwrap();

    let gamm = Gamm::new(&app);
    let pool_fury_osmo = gamm
        .create_basic_pool(&[coin(2_000_000, "ufury"), coin(6_000_000, "uosmo")], signer)
        .unwrap()
        .data
        .pool_id;
    let pool_usdc_osmo = gamm
        .create_basic_pool(&[coin(500_000, "uusdc"), coin(1_000_000, "uosmo")], signer)
        .unwrap()
        .data
        .pool_id;
    let pool_atom_osmo = gamm
        .create_basic_pool(&[coin(200_000, "uatom"), coin(1_000_000, "uosmo")], signer)
        .unwrap()
        .data
        .pool_id;

    println!("pre swap");
    // swap to create historic index for TWAP
    swap_to_create_twap_records(
        &app,
        signer,
        pool_fury_osmo,
        coin(5u128, "ufury"),
        "uosmo",
        600u64,
    );
    swap_to_create_twap_records(
        &app,
        signer,
        pool_usdc_osmo,
        coin(5u128, "uusdc"),
        "uosmo",
        600u64,
    );
    swap_to_create_twap_records(
        &app,
        signer,
        pool_atom_osmo,
        coin(5u128, "uatom"),
        "uosmo",
        600u64,
    );

    println!("postSwap");

    // set routes
    wasm.execute(
        &swapper_addr,
        &fury_types::swapper::ExecuteMsg::SetRoute {
            denom_in: "uosmo".to_string(),
            denom_out: safety_fund_denom.to_string(),
            route: OsmosisRoute(vec![SwapAmountInRoute {
                pool_id: pool_usdc_osmo,
                token_out_denom: safety_fund_denom.to_string(),
            }]),
        },
        &[],
        signer,
    )
    .unwrap();
    wasm.execute(
        &swapper_addr,
        &fury_types::swapper::ExecuteMsg::SetRoute {
            denom_in: "uosmo".to_string(),
            denom_out: fee_collector_denom.to_string(),
            route: OsmosisRoute(vec![SwapAmountInRoute {
                pool_id: pool_fury_osmo,
                token_out_denom: fee_collector_denom.to_string(),
            }]),
        },
        &[],
        signer,
    )
    .unwrap();
    wasm.execute(
        &swapper_addr,
        &fury_types::swapper::ExecuteMsg::SetRoute {
            denom_in: "uatom".to_string(),
            denom_out: safety_fund_denom.to_string(),
            route: OsmosisRoute(vec![
                SwapAmountInRoute {
                    pool_id: pool_atom_osmo,
                    token_out_denom: "uosmo".to_string(),
                },
                SwapAmountInRoute {
                    pool_id: pool_usdc_osmo,
                    token_out_denom: safety_fund_denom.to_string(),
                },
            ]),
        },
        &[],
        signer,
    )
    .unwrap();
    wasm.execute(
        &swapper_addr,
        &fury_types::swapper::ExecuteMsg::SetRoute {
            denom_in: "uatom".to_string(),
            denom_out: fee_collector_denom.to_string(),
            route: OsmosisRoute(vec![
                SwapAmountInRoute {
                    pool_id: pool_atom_osmo,
                    token_out_denom: "uosmo".to_string(),
                },
                SwapAmountInRoute {
                    pool_id: pool_fury_osmo,
                    token_out_denom: fee_collector_denom.to_string(),
                },
            ]),
        },
        &[],
        signer,
    )
    .unwrap();

    println!("post setroute");

    // fund contract
    let bank = Bank::new(&app);
    bank.send(user, &rewards_addr, &[coin(125u128, "uosmo")]).unwrap();
    bank.send(user, &rewards_addr, &[coin(55u128, "uatom")]).unwrap();
    let osmo_balance = bank.query_balance(&rewards_addr, "uosmo");
    assert_eq!(osmo_balance, 125u128);
    let atom_balance = bank.query_balance(&rewards_addr, "uatom");
    assert_eq!(atom_balance, 55u128);
    let safety_fund_denom_balance = bank.query_balance(&rewards_addr, safety_fund_denom);
    assert_eq!(safety_fund_denom_balance, 0u128);
    let fee_collector_denom_balance = bank.query_balance(&rewards_addr, fee_collector_denom);
    assert_eq!(fee_collector_denom_balance, 0u128);

    // swap osmo
    println!("swap osmo");
    wasm.execute(
        &rewards_addr,
        &ExecuteMsg::SwapAsset {
            denom: "uosmo".to_string(),
            amount: None,
        },
        &[],
        signer,
    )
    .unwrap();

    // swap atom
    println!("second swap");
    wasm.execute(
        &rewards_addr,
        &ExecuteMsg::SwapAsset {
            denom: "uatom".to_string(),
            amount: None,
        },
        &[],
        signer,
    )
    .unwrap();

    // osmo and atom should be swapped to safety_fund_denom and fee_collector_denom
    let osmo_balance = bank.query_balance(&rewards_addr, "uosmo");
    assert_eq!(osmo_balance, 0u128);
    let atom_balance = bank.query_balance(&rewards_addr, "uatom");
    assert_eq!(atom_balance, 0u128);
    let safety_fund_denom_balance = bank.query_balance(&rewards_addr, safety_fund_denom);
    assert!(safety_fund_denom_balance > 0u128);
    let fee_collector_denom_balance = bank.query_balance(&rewards_addr, fee_collector_denom);
    assert!(fee_collector_denom_balance > 0u128);
}

#[test]
fn distribute_rewards_if_ibc_channel_invalid() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let accs = app
        .init_accounts(
            &[
                coin(1_000_000_000_000, "uusdc"),
                coin(1_000_000_000_000, "ufury"),
                coin(1_000_000_000_000, "uosmo"), // for gas
            ],
            2,
        )
        .unwrap();
    let signer = &accs[0];
    let user = &accs[1];

    // setup address-provider contract
    let addr_provider_addr = instantiate_contract(
        &wasm,
        signer,
        OSMOSIS_ADDR_PROVIDER_CONTRACT_NAME,
        &InstantiateAddr {
            owner: signer.address(),
            prefix: "osmo".to_string(),
        },
    );
    wasm.execute(
        &addr_provider_addr,
        &ExecuteMsgAddr::SetAddress {
            address_type: FuryAddressType::FeeCollector,
            address: "furya17xpfvakm2amg962yls6f84z3kell8c5llvck70".to_string(),
        },
        &[],
        signer,
    )
    .unwrap();
    wasm.execute(
        &addr_provider_addr,
        &ExecuteMsgAddr::SetAddress {
            address_type: FuryAddressType::SafetyFund,
            address: "furya1s4hgh56can3e33e0zqpnjxh0t5wdf7u3n2mm7a".to_string(),
        },
        &[],
        signer,
    )
    .unwrap();

    // setup rewards-collector contract
    let safety_fund_denom = "uusdc";
    let fee_collector_denom = "ufury";
    let rewards_addr = instantiate_contract(
        &wasm,
        signer,
        OSMOSIS_REWARDS_CONTRACT_NAME,
        &InstantiateRewards {
            owner: signer.address(),
            address_provider: addr_provider_addr,
            safety_tax_rate: Decimal::percent(50),
            safety_fund_denom: safety_fund_denom.to_string(),
            fee_collector_denom: fee_collector_denom.to_string(),
            channel_id: "".to_string(),
            timeout_seconds: 60,
            slippage_tolerance: Decimal::percent(1),
            neutron_ibc_config: None,
        },
    );

    // fund rewards-collector contract
    let bank = Bank::new(&app);
    let usdc_funded = 800_000_000u128;
    let fury_funded = 50_000_000u128;
    bank.send(user, &rewards_addr, &[coin(usdc_funded, "uusdc")]).unwrap();
    bank.send(user, &rewards_addr, &[coin(fury_funded, "ufury")]).unwrap();
    let usdc_balance = bank.query_balance(&rewards_addr, "uusdc");
    assert_eq!(usdc_balance, usdc_funded);
    let fury_balance = bank.query_balance(&rewards_addr, "ufury");
    assert_eq!(fury_balance, fury_balance);

    // distribute usdc
    let res = wasm
        .execute(
            &rewards_addr,
            &ExecuteMsg::DistributeRewards {
                denom: "uusdc".to_string(),
                amount: None,
            },
            &[],
            signer,
        )
        .unwrap_err();
    assert_err(res, "invalid source channel ID: identifier cannot be blank: invalid identifier");

    // update ibc channel
    wasm.execute(
        &rewards_addr,
        &ExecuteMsg::UpdateConfig {
            new_cfg: UpdateConfig {
                address_provider: None,
                safety_tax_rate: None,
                safety_fund_denom: None,
                fee_collector_denom: None,
                channel_id: Some("channel-1".to_string()),
                timeout_seconds: None,
                slippage_tolerance: None,
                neutron_ibc_config: None,
            },
        },
        &[],
        signer,
    )
    .unwrap();

    // distribute fury
    let res = wasm
        .execute(
            &rewards_addr,
            &ExecuteMsg::DistributeRewards {
                denom: "ufury".to_string(),
                amount: None,
            },
            &[],
            signer,
        )
        .unwrap_err();
    assert_err(res, "port ID (transfer) channel ID (channel-1): channel not found");
}
