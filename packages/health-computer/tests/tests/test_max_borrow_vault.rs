use std::collections::HashMap;

use cosmwasm_std::{coin, Uint128};
use fury_rover_health_computer::{DenomsData, HealthComputer, VaultsData};
use fury_types::{
    credit_manager::Positions,
    health::{AccountKind, BorrowTarget},
};

use super::helpers::{osmo_atom_1_config, udai_info, ufury_info};

#[test]
fn max_borrow_vault_offset_good() {
    let udai = udai_info();
    let osmo_atom_1_config = osmo_atom_1_config();

    let denoms_data = DenomsData {
        prices: HashMap::from([(udai.denom.clone(), udai.price)]),
        params: HashMap::from([(udai.denom.clone(), udai.params.clone())]),
    };

    let vaults_data = VaultsData {
        vault_values: Default::default(),
        vault_configs: HashMap::from([(
            osmo_atom_1_config.addr.clone(),
            osmo_atom_1_config.clone(),
        )]),
    };

    let h = HealthComputer {
        kind: AccountKind::Default,
        positions: Positions {
            account_id: "123".to_string(),
            deposits: vec![coin(1200, &udai.denom)],
            debts: vec![],
            lends: vec![],
            vaults: vec![],
        },
        denoms_data,
        vaults_data,
    };

    let max_borrow_amount = h
        .max_borrow_amount_estimate(
            &udai.denom,
            &BorrowTarget::Vault {
                address: osmo_atom_1_config.addr,
            },
        )
        .unwrap();

    assert_eq!(Uint128::new(3381), max_borrow_amount);
}

#[test]
fn max_borrow_vault_offset_margin_of_error() {
    let ufury = ufury_info();
    let osmo_atom_1_config = osmo_atom_1_config();

    let denoms_data = DenomsData {
        prices: HashMap::from([(ufury.denom.clone(), ufury.price)]),
        params: HashMap::from([(ufury.denom.clone(), ufury.params.clone())]),
    };

    let vaults_data = VaultsData {
        vault_values: Default::default(),
        vault_configs: HashMap::from([(
            osmo_atom_1_config.addr.clone(),
            osmo_atom_1_config.clone(),
        )]),
    };

    let h = HealthComputer {
        kind: AccountKind::Default,
        positions: Positions {
            account_id: "123".to_string(),
            deposits: vec![coin(1200, &ufury.denom)],
            debts: vec![],
            lends: vec![],
            vaults: vec![],
        },
        denoms_data,
        vaults_data,
    };

    let max_borrow_amount = h
        .max_borrow_amount_estimate(
            &ufury.denom,
            &BorrowTarget::Vault {
                address: osmo_atom_1_config.addr,
            },
        )
        .unwrap();

    // Normally could be 3200, but conservative offset rounding has a margin of error
    assert_eq!(Uint128::new(3196), max_borrow_amount);
}
