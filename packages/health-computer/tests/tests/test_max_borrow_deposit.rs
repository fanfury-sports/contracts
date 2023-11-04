use std::collections::HashMap;

use cosmwasm_std::{coin, Uint128};
use fury_rover_health_computer::{DenomsData, HealthComputer, VaultsData};
use fury_types::{
    credit_manager::Positions,
    health::{AccountKind, BorrowTarget},
};

use super::helpers::{udai_info, ufury_info};

#[test]
fn max_borrow_deposit_offset_good() {
    let udai = udai_info();

    let denoms_data = DenomsData {
        prices: HashMap::from([(udai.denom.clone(), udai.price)]),
        params: HashMap::from([(udai.denom.clone(), udai.params.clone())]),
    };

    let vaults_data = VaultsData {
        vault_values: Default::default(),
        vault_configs: Default::default(),
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

    let max_borrow_amount =
        h.max_borrow_amount_estimate(&udai.denom, &BorrowTarget::Deposit).unwrap();
    assert_eq!(Uint128::new(6763), max_borrow_amount);
}

#[test]
fn max_borrow_deposit_offset_margin_of_error() {
    let ufury = ufury_info();

    let denoms_data = DenomsData {
        prices: HashMap::from([(ufury.denom.clone(), ufury.price)]),
        params: HashMap::from([(ufury.denom.clone(), ufury.params.clone())]),
    };

    let vaults_data = VaultsData {
        vault_values: Default::default(),
        vault_configs: Default::default(),
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

    let max_borrow_amount =
        h.max_borrow_amount_estimate(&ufury.denom, &BorrowTarget::Deposit).unwrap();

    // Normally could be 4800, but conservative offset rounding has a margin of error
    assert_eq!(Uint128::new(4795), max_borrow_amount);
}
