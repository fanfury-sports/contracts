use cosmwasm_std::{DecimalRangeExceeded, StdError};
use fury_owner::OwnerError;
use fury_types::error::FuryError;
use fury_utils::error::ValidationError;
use thiserror::Error;

pub type ContractResult<T> = Result<T, ContractError>;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    DecimalRangeExceeded(#[from] DecimalRangeExceeded),

    #[error("{0}")]
    Owner(#[from] OwnerError),

    #[error("{0}")]
    Validation(#[from] ValidationError),

    #[error("{0}")]
    Fury(#[from] FuryError),
}
