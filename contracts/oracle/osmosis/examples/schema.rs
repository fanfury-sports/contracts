use cosmwasm_schema::write_api;
use fury_oracle_osmosis::OsmosisPriceSourceUnchecked;
use fury_types::oracle::{ExecuteMsg, InstantiateMsg, QueryMsg};

fn main() {
    write_api! {
        instantiate: InstantiateMsg,
        execute: ExecuteMsg<OsmosisPriceSourceUnchecked>,
        query: QueryMsg,
    }
}
