use cosmwasm_std::Empty;
use cw_multi_test::{App, Contract, ContractWrapper};

pub fn mock_app() -> App {
    App::default()
}

pub fn mock_address_provider_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_address_provider::contract::execute,
        fury_address_provider::contract::instantiate,
        fury_address_provider::contract::query,
    );
    Box::new(contract)
}

pub fn mock_incentives_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_incentives::contract::execute,
        fury_incentives::contract::instantiate,
        fury_incentives::contract::query,
    );
    Box::new(contract)
}

pub fn mock_oracle_osmosis_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_oracle_osmosis::contract::entry::execute,
        fury_oracle_osmosis::contract::entry::instantiate,
        fury_oracle_osmosis::contract::entry::query,
    );
    Box::new(contract)
}

pub fn mock_red_bank_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_red_bank::contract::execute,
        fury_red_bank::contract::instantiate,
        fury_red_bank::contract::query,
    );
    Box::new(contract)
}

pub fn mock_rewards_collector_osmosis_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_rewards_collector_osmosis::entry::execute,
        fury_rewards_collector_osmosis::entry::instantiate,
        fury_rewards_collector_osmosis::entry::query,
    );
    Box::new(contract)
}

pub fn mock_params_osmosis_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_params::contract::execute,
        fury_params::contract::instantiate,
        fury_params::contract::query,
    );
    Box::new(contract)
}

pub fn mock_pyth_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_mock_pyth::contract::execute,
        fury_mock_pyth::contract::instantiate,
        fury_mock_pyth::contract::query,
    );
    Box::new(contract)
}
