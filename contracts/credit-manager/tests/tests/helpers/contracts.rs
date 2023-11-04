use cosmwasm_std::Empty;
use cw_multi_test::{Contract, ContractWrapper};

pub fn mock_rover_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_credit_manager::contract::execute,
        fury_credit_manager::contract::instantiate,
        fury_credit_manager::contract::query,
    )
    .with_reply(fury_credit_manager::contract::reply);
    Box::new(contract)
}

pub fn mock_account_nft_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_account_nft::contract::execute,
        fury_account_nft::contract::instantiate,
        fury_account_nft::contract::query,
    );
    Box::new(contract)
}

pub fn mock_address_provider_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_address_provider::contract::execute,
        fury_address_provider::contract::instantiate,
        fury_address_provider::contract::query,
    );
    Box::new(contract)
}

pub fn mock_red_bank_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_mock_red_bank::contract::execute,
        fury_mock_red_bank::contract::instantiate,
        fury_mock_red_bank::contract::query,
    );
    Box::new(contract)
}

pub fn mock_incentives_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_mock_incentives::contract::execute,
        fury_mock_incentives::contract::instantiate,
        fury_mock_incentives::contract::query,
    );
    Box::new(contract)
}

pub fn mock_oracle_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_mock_oracle::contract::execute,
        fury_mock_oracle::contract::instantiate,
        fury_mock_oracle::contract::query,
    );
    Box::new(contract)
}

pub fn mock_vault_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_mock_vault::contract::execute,
        fury_mock_vault::contract::instantiate,
        fury_mock_vault::contract::query,
    );
    Box::new(contract)
}

pub fn mock_swapper_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_swapper_mock::contract::execute,
        fury_swapper_mock::contract::instantiate,
        fury_swapper_mock::contract::query,
    );
    Box::new(contract)
}

pub fn mock_v2_zapper_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_zapper_mock::contract::execute,
        fury_zapper_mock::contract::instantiate,
        fury_zapper_mock::contract::query,
    );
    Box::new(contract)
}

pub fn mock_health_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_rover_health::contract::execute,
        fury_rover_health::contract::instantiate,
        fury_rover_health::contract::query,
    );
    Box::new(contract)
}

pub fn mock_params_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_params::contract::execute,
        fury_params::contract::instantiate,
        fury_params::contract::query,
    );
    Box::new(contract)
}
