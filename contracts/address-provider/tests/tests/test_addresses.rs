use cosmwasm_std::testing::{mock_env, mock_info};
use fury_address_provider::{contract::execute, error::ContractError, state::ADDRESSES};
use fury_owner::OwnerError;
use fury_types::address_provider::{AddressResponseItem, ExecuteMsg, FuryAddressType, QueryMsg};

use super::helpers::{th_query, th_setup};

#[test]
fn setting_address_if_unauthorized() {
    let mut deps = th_setup();

    let msg = ExecuteMsg::SetAddress {
        address_type: FuryAddressType::RedBank,
        address: "osmo_red_bank".to_string(),
    };

    let err =
        execute(deps.as_mut(), mock_env(), mock_info("osmo_jake", &[]), msg.clone()).unwrap_err();
    assert_eq!(err, ContractError::Owner(OwnerError::NotOwner {}));

    // owner can set address
    execute(deps.as_mut(), mock_env(), mock_info("osmo_owner", &[]), msg).unwrap();

    let address = ADDRESSES.load(deps.as_ref().storage, FuryAddressType::RedBank.into()).unwrap();
    assert_eq!(address, "osmo_red_bank".to_string());
}

#[test]
fn setting_address_if_invalid_remote_address() {
    let mut deps = th_setup();

    let invalid_address = "furya1s4hgh56can3e33e0zqpnjxh0t5wdf7u3ze575".to_string();
    let msg = ExecuteMsg::SetAddress {
        address_type: FuryAddressType::SafetyFund,
        address: invalid_address.clone(),
    };

    let err = execute(deps.as_mut(), mock_env(), mock_info("osmo_owner", &[]), msg).unwrap_err();
    assert_eq!(err, ContractError::InvalidAddress(invalid_address));
}

#[test]
fn setting_address() {
    let mut deps = th_setup();

    let invalid_address = "furya1s4hgh56can3e33e0zqpnjxh0t5wdf7u3pze575".to_string();
    let msg = ExecuteMsg::SetAddress {
        address_type: FuryAddressType::SafetyFund,
        address: invalid_address,
    };

    execute(deps.as_mut(), mock_env(), mock_info("osmo_owner", &[]), msg).unwrap();

    let address =
        ADDRESSES.load(deps.as_ref().storage, FuryAddressType::SafetyFund.into()).unwrap();
    assert_eq!(address, "furya1s4hgh56can3e33e0zqpnjxh0t5wdf7u3pze575".to_string());
}

#[test]
fn querying_addresses() {
    let mut deps = th_setup();

    ADDRESSES
        .save(deps.as_mut().storage, FuryAddressType::Incentives.into(), &"incentives".to_string())
        .unwrap();
    ADDRESSES
        .save(deps.as_mut().storage, FuryAddressType::Oracle.into(), &"oracle".to_string())
        .unwrap();
    ADDRESSES
        .save(deps.as_mut().storage, FuryAddressType::RedBank.into(), &"red_bank".to_string())
        .unwrap();

    let res: AddressResponseItem =
        th_query(deps.as_ref(), QueryMsg::Address(FuryAddressType::Incentives));
    assert_eq!(
        res,
        AddressResponseItem {
            address_type: FuryAddressType::Incentives,
            address: "incentives".to_string()
        }
    );

    let res: Vec<AddressResponseItem> = th_query(
        deps.as_ref(),
        QueryMsg::Addresses(vec![FuryAddressType::Incentives, FuryAddressType::RedBank]),
    );
    assert_eq!(
        res,
        vec![
            AddressResponseItem {
                address_type: FuryAddressType::Incentives,
                address: "incentives".to_string()
            },
            AddressResponseItem {
                address_type: FuryAddressType::RedBank,
                address: "red_bank".to_string()
            }
        ]
    );

    let res: Vec<AddressResponseItem> = th_query(
        deps.as_ref(),
        QueryMsg::AllAddresses {
            start_after: None,
            limit: Some(2),
        },
    );
    assert_eq!(
        res,
        vec![
            AddressResponseItem {
                address_type: FuryAddressType::Incentives,
                address: "incentives".to_string()
            },
            AddressResponseItem {
                address_type: FuryAddressType::Oracle,
                address: "oracle".to_string()
            }
        ]
    );

    let res: Vec<AddressResponseItem> = th_query(
        deps.as_ref(),
        QueryMsg::AllAddresses {
            start_after: Some(FuryAddressType::Oracle),
            limit: None,
        },
    );
    assert_eq!(
        res,
        vec![AddressResponseItem {
            address_type: FuryAddressType::RedBank,
            address: "red_bank".to_string()
        }]
    );
}
