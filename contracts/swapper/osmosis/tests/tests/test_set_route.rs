use cosmwasm_std::{coin, StdError};
use cw_it::osmosis_test_tube::{Gamm, Module, OsmosisTestApp, Wasm};
use fury_owner::OwnerError;
use fury_swapper_base::ContractError;
use fury_swapper_osmosis::route::{OsmosisRoute, SwapAmountInRoute};
use fury_types::swapper::{ExecuteMsg, QueryMsg, RouteResponse};

use super::helpers::{assert_err, instantiate_contract};

#[test]
fn only_owner_can_set_routes() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let accs = app.init_accounts(&[coin(1_000_000_000_000, "uosmo")], 2).unwrap();
    let owner = &accs[0];
    let bad_guy = &accs[1];

    let contract_addr = instantiate_contract(&wasm, owner);

    let res_err = wasm
        .execute(
            &contract_addr,
            &ExecuteMsg::SetRoute {
                denom_in: "fury".to_string(),
                denom_out: "weth".to_string(),
                route: OsmosisRoute(vec![
                    SwapAmountInRoute {
                        pool_id: 1,
                        token_out_denom: "osmo".to_string(),
                    },
                    SwapAmountInRoute {
                        pool_id: 2,
                        token_out_denom: "weth".to_string(),
                    },
                ]),
            },
            &[],
            bad_guy,
        )
        .unwrap_err();

    assert_err(res_err, OwnerError::NotOwner {});
}

#[test]
fn must_pass_at_least_one_step() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let signer = app.init_account(&[coin(1_000_000_000_000, "uosmo")]).unwrap();

    let contract_addr = instantiate_contract(&wasm, &signer);

    let res_err = wasm
        .execute(
            &contract_addr,
            &ExecuteMsg::SetRoute {
                denom_in: "fury".to_string(),
                denom_out: "weth".to_string(),
                route: OsmosisRoute(vec![]),
            },
            &[],
            &signer,
        )
        .unwrap_err();

    assert_err(
        res_err,
        ContractError::InvalidRoute {
            reason: "the route must contain at least one step".to_string(),
        },
    );
}

#[test]
fn must_be_available_in_osmosis() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let signer = app.init_account(&[coin(1_000_000_000_000, "uosmo")]).unwrap();

    let contract_addr = instantiate_contract(&wasm, &signer);

    let res_err = wasm
        .execute(
            &contract_addr,
            &ExecuteMsg::SetRoute {
                denom_in: "fury".to_string(),
                denom_out: "weth".to_string(),
                route: OsmosisRoute(vec![SwapAmountInRoute {
                    pool_id: 1,
                    token_out_denom: "osmo".to_string(),
                }]),
            },
            &[],
            &signer,
        )
        .unwrap_err();

    assert_err(res_err, StdError::generic_err("Querier contract error"));
}

#[test]
fn step_does_not_contain_input_denom() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let signer = app
        .init_account(&[coin(1_000_000_000_000, "uatom"), coin(1_000_000_000_000, "uosmo")])
        .unwrap();

    let contract_addr = instantiate_contract(&wasm, &signer);

    let gamm = Gamm::new(&app);
    let pool_atom_osmo = gamm
        .create_basic_pool(&[coin(6_000_000, "uatom"), coin(1_500_000, "uosmo")], &signer)
        .unwrap()
        .data
        .pool_id;

    let res_err = wasm
        .execute(
            &contract_addr,
            &ExecuteMsg::SetRoute {
                denom_in: "ufury".to_string(),
                denom_out: "uweth".to_string(),
                route: OsmosisRoute(vec![SwapAmountInRoute {
                    pool_id: pool_atom_osmo,
                    token_out_denom: "uosmo".to_string(),
                }]),
            },
            &[],
            &signer,
        )
        .unwrap_err();

    assert_err(
        res_err,
        ContractError::InvalidRoute {
            reason: format!("step 1: pool {pool_atom_osmo} does not contain input denom ufury",),
        },
    );
}

#[test]
fn step_does_not_contain_output_denom() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let signer = app
        .init_account(&[coin(1_000_000_000_000, "ufury"), coin(1_000_000_000_000, "uosmo")])
        .unwrap();

    let contract_addr = instantiate_contract(&wasm, &signer);

    let gamm = Gamm::new(&app);
    let pool_fury_osmo = gamm
        .create_basic_pool(&[coin(6_000_000, "ufury"), coin(1_500_000, "uosmo")], &signer)
        .unwrap()
        .data
        .pool_id;

    let res_err = wasm
        .execute(
            &contract_addr,
            &ExecuteMsg::SetRoute {
                denom_in: "ufury".to_string(),
                denom_out: "uweth".to_string(),
                route: OsmosisRoute(vec![SwapAmountInRoute {
                    pool_id: pool_fury_osmo,
                    token_out_denom: "uweth".to_string(),
                }]),
            },
            &[],
            &signer,
        )
        .unwrap_err();

    assert_err(
        res_err,
        ContractError::InvalidRoute {
            reason: format!("step 1: pool {pool_fury_osmo} does not contain output denom uweth"),
        },
    );
}

#[test]
fn steps_do_not_loop() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let signer = app
        .init_account(&[
            coin(1_000_000_000_000, "uatom"),
            coin(1_000_000_000_000, "uosmo"),
            coin(1_000_000_000_000, "ufury"),
            coin(1_000_000_000_000, "uusdc"),
        ])
        .unwrap();

    let contract_addr = instantiate_contract(&wasm, &signer);

    let gamm = Gamm::new(&app);
    let pool_atom_osmo = gamm
        .create_basic_pool(&[coin(6_000_000, "uatom"), coin(1_500_000, "uosmo")], &signer)
        .unwrap()
        .data
        .pool_id;
    let pool_osmo_usdc = gamm
        .create_basic_pool(&[coin(6_000_000, "uosmo"), coin(1_500_000, "uusdc")], &signer)
        .unwrap()
        .data
        .pool_id;
    let pool_osmo_fury = gamm
        .create_basic_pool(&[coin(6_000_000, "uosmo"), coin(1_500_000, "ufury")], &signer)
        .unwrap()
        .data
        .pool_id;

    let res_err = wasm
        .execute(
            &contract_addr,
            &ExecuteMsg::SetRoute {
                denom_in: "uatom".to_string(),
                denom_out: "ufury".to_string(),
                route: OsmosisRoute(vec![
                    SwapAmountInRoute {
                        pool_id: pool_atom_osmo,
                        token_out_denom: "uosmo".to_string(),
                    },
                    SwapAmountInRoute {
                        pool_id: pool_osmo_usdc,
                        token_out_denom: "uusdc".to_string(),
                    },
                    SwapAmountInRoute {
                        pool_id: pool_osmo_usdc,
                        token_out_denom: "uosmo".to_string(),
                    },
                    SwapAmountInRoute {
                        pool_id: pool_osmo_fury,
                        token_out_denom: "ufury".to_string(),
                    },
                ]),
            },
            &[],
            &signer,
        )
        .unwrap_err();

    // invalid - route contains a loop
    // this example: ATOM -> OSMO -> USDC -> OSMO -> FURY
    assert_err(
        res_err,
        ContractError::InvalidRoute {
            reason: "route contains a loop: denom uosmo seen twice".to_string(),
        },
    );
}

#[test]
fn step_output_does_not_match() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let signer = app
        .init_account(&[coin(1_000_000_000_000, "uatom"), coin(1_000_000_000_000, "uosmo")])
        .unwrap();

    let contract_addr = instantiate_contract(&wasm, &signer);

    let gamm = Gamm::new(&app);
    let pool_atom_osmo = gamm
        .create_basic_pool(&[coin(6_000_000, "uatom"), coin(1_500_000, "uosmo")], &signer)
        .unwrap()
        .data
        .pool_id;

    let res_err = wasm
        .execute(
            &contract_addr,
            &ExecuteMsg::SetRoute {
                denom_in: "uatom".to_string(),
                denom_out: "ufury".to_string(),
                route: OsmosisRoute(vec![SwapAmountInRoute {
                    pool_id: pool_atom_osmo,
                    token_out_denom: "uosmo".to_string(),
                }]),
            },
            &[],
            &signer,
        )
        .unwrap_err();

    assert_err(
        res_err,
        ContractError::InvalidRoute {
            reason: "the route's output denom uosmo does not match the desired output ufury"
                .to_string(),
        },
    );
}

#[test]
fn set_route_success() {
    let app = OsmosisTestApp::new();
    let wasm = Wasm::new(&app);

    let signer = app
        .init_account(&[
            coin(1_000_000_000_000, "uosmo"),
            coin(1_000_000_000_000, "ufury"),
            coin(1_000_000_000_000, "uweth"),
        ])
        .unwrap();

    let contract_addr = instantiate_contract(&wasm, &signer);

    let gamm = Gamm::new(&app);
    let pool_fury_osmo = gamm
        .create_basic_pool(&[coin(6_000_000, "ufury"), coin(1_500_000, "uosmo")], &signer)
        .unwrap()
        .data
        .pool_id;
    let pool_weth_osmo = gamm
        .create_basic_pool(&[coin(100_000, "uweth"), coin(1_000_000, "uosmo")], &signer)
        .unwrap()
        .data
        .pool_id;

    wasm.execute(
        &contract_addr,
        &ExecuteMsg::SetRoute {
            denom_in: "ufury".to_string(),
            denom_out: "uweth".to_string(),
            route: OsmosisRoute(vec![
                SwapAmountInRoute {
                    pool_id: pool_fury_osmo,
                    token_out_denom: "uosmo".to_string(),
                },
                SwapAmountInRoute {
                    pool_id: pool_weth_osmo,
                    token_out_denom: "uweth".to_string(),
                },
            ]),
        },
        &[],
        &signer,
    )
    .unwrap();

    let res: RouteResponse<OsmosisRoute> = wasm
        .query(
            &contract_addr,
            &QueryMsg::Route {
                denom_in: "ufury".to_string(),
                denom_out: "uweth".to_string(),
            },
        )
        .unwrap();

    assert_eq!(res.denom_in, "ufury".to_string());
    assert_eq!(res.denom_out, "uweth".to_string());
    assert_eq!(res.route.to_string(), format!("{pool_fury_osmo}:uosmo|{pool_weth_osmo}:uweth"));
}
