use cosmwasm_schema::write_api;
use cosmwasm_std::Empty;
use fury_mock_credit_manager::msg::ExecuteMsg;
use fury_types::credit_manager::QueryMsg;

fn main() {
    write_api! {
        instantiate: Empty,
        query: QueryMsg,
        execute: ExecuteMsg,
    }
}
