use cosmwasm_schema::cw_serde;
use fury_types::health::{AccountKind, HealthValuesResponse};

#[cw_serde]
pub enum ExecuteMsg {
    SetHealthResponse {
        account_id: String,
        kind: AccountKind,
        response: HealthValuesResponse,
    },
}
