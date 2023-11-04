use cosmwasm_std::Empty;
use cw_multi_test::{Contract, ContractWrapper};

pub fn mock_params_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        fury_params::contract::execute,
        fury_params::contract::instantiate,
        fury_params::contract::query,
    );
    Box::new(contract)
}
