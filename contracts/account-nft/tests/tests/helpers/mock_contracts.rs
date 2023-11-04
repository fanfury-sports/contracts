use cosmwasm_std::Empty;
use cw_multi_test::{Contract, ContractWrapper};

pub fn mock_nft_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_account_nft::contract::execute,
        fury_account_nft::contract::instantiate,
        fury_account_nft::contract::query,
    );
    Box::new(contract)
}

pub fn mock_health_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_mock_rover_health::contract::execute,
        fury_mock_rover_health::contract::instantiate,
        fury_mock_rover_health::contract::query,
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
