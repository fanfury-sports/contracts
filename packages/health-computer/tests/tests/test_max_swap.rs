use std::collections::HashMap;

use cosmwasm_std::{coin, Uint128};
use fury_rover_health_computer::{DenomsData, HealthComputer, VaultsData};
use fury_types::{
    credit_manager::Positions,
    health::{AccountKind, SwapKind},
};

use super::helpers::{udai_info, ufury_info};

#[test]
fn max_swap_default() {
    let udai = udai_info();
    let ufury = ufury_info();

    let denoms_data = DenomsData {
        prices: HashMap::from([
            (udai.denom.clone(), udai.price),
            (ufury.denom.clone(), ufury.price),
        ]),
        params: HashMap::from([
            (udai.denom.clone(), udai.params.clone()),
            (ufury.denom.clone(), ufury.params.clone()),
        ]),
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
        h.max_swap_amount_estimate(&udai.denom, &ufury.denom, &SwapKind::Default).unwrap();
    assert_eq!(Uint128::new(1200), max_borrow_amount);
}

#[test]
fn max_swap_margin() {
    let udai = udai_info();
    let ufury = ufury_info();

    let denoms_data = DenomsData {
        prices: HashMap::from([
            (udai.denom.clone(), udai.price),
            (ufury.denom.clone(), ufury.price),
        ]),
        params: HashMap::from([
            (udai.denom.clone(), udai.params.clone()),
            (ufury.denom.clone(), ufury.params.clone()),
        ]),
    };

    let vaults_data = VaultsData {
        vault_values: Default::default(),
        vault_configs: Default::default(),
    };

    let h = HealthComputer {
        kind: AccountKind::Default,
        positions: Positions {
            account_id: "123".to_string(),
            deposits: vec![coin(5000, &udai.denom), coin(500, &ufury.denom)],
            debts: vec![],
            lends: vec![],
            vaults: vec![],
        },
        denoms_data,
        vaults_data,
    };

    let max_borrow_amount =
        h.max_swap_amount_estimate(&udai.denom, &ufury.denom, &SwapKind::Margin).unwrap();
    assert_eq!(Uint128::new(31351), max_borrow_amount);
}
