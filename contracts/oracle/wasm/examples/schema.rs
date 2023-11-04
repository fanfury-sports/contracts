use cosmwasm_schema::write_api;
use fury_oracle_wasm::WasmPriceSourceUnchecked;
use fury_types::oracle::{
    ExecuteMsg, InstantiateMsg, QueryMsg, WasmOracleCustomExecuteMsg, WasmOracleCustomInitParams,
};

fn main() {
    write_api! {
        instantiate: InstantiateMsg<WasmOracleCustomInitParams>,
        execute: ExecuteMsg<WasmPriceSourceUnchecked, WasmOracleCustomExecuteMsg>,
        query: QueryMsg,
    }
}
