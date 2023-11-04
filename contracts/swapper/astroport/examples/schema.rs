use cosmwasm_schema::write_api;
use fury_swapper_astroport::route::AstroportRoute;
use fury_types::swapper::{ExecuteMsg, InstantiateMsg, QueryMsg};

fn main() {
    write_api! {
        instantiate: InstantiateMsg,
        execute: ExecuteMsg<AstroportRoute>,
        query: QueryMsg,
    }
}
