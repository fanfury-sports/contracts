use cosmwasm_schema::write_api;
use fury_swapper_osmosis::route::OsmosisRoute;
use fury_types::swapper::{ExecuteMsg, InstantiateMsg, QueryMsg};

fn main() {
    write_api! {
        instantiate: InstantiateMsg,
        execute: ExecuteMsg<OsmosisRoute>,
        query: QueryMsg,
    }
}
