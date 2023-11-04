use cosmwasm_schema::write_api;
use fury_mock_vault::msg::InstantiateMsg;
use fury_types::adapters::vault::{ExecuteMsg, QueryMsg};

fn main() {
    write_api! {
        instantiate: InstantiateMsg,
        query: QueryMsg,
        execute: ExecuteMsg,
    }
}
