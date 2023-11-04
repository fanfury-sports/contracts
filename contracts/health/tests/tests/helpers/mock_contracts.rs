use cosmwasm_std::Empty;
use cw_multi_test::{Contract, ContractWrapper};

pub fn mock_health_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_rover_health::contract::execute,
        fury_rover_health::contract::instantiate,
        fury_rover_health::contract::query,
    );
    Box::new(contract)
}

pub fn mock_credit_manager_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_mock_credit_manager::contract::execute,
        fury_mock_credit_manager::contract::instantiate,
        fury_mock_credit_manager::contract::query,
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

pub fn mock_oracle_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_mock_oracle::contract::execute,
        fury_mock_oracle::contract::instantiate,
        fury_mock_oracle::contract::query,
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
