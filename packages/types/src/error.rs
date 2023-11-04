use cosmwasm_std::{
    CheckedFromRatioError, CheckedMultiplyFractionError, DivideByZeroError, OverflowError, StdError,
};
use fury_utils::error::ValidationError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum FuryError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("All params should be available during instantiation")]
    InstantiateParamsUnavailable {},

    #[error("Incorrect number of addresses, expected {expected:?}, got {actual:?}")]
    AddressesQueryWrongNumber {
        expected: u32,
        actual: u32,
    },

    #[error("Failed to deserialize RPC query response for: {target_type}")]
    Deserialize {
        target_type: String,
    },

    #[error("{0}")]
    Overflow(#[from] OverflowError),

    #[error("{0}")]
    DivideByZero(#[from] DivideByZeroError),

    #[error("{0}")]
    CheckedFromRatio(#[from] CheckedFromRatioError),

    #[error("{0}")]
    CheckedMultiplyFraction(#[from] CheckedMultiplyFractionError),

    #[error("{0}")]
    Validation(#[from] ValidationError),
}

impl From<FuryError> for StdError {
    fn from(source: FuryError) -> Self {
        match source {
            FuryError::Std(e) => e,
            e => StdError::generic_err(e.to_string()),
        }
    }
}

// TESTS

#[cfg(test)]
mod tests {
    use super::*;
    use crate::error::FuryError;

    #[test]
    fn fury_error_to_std_error() {
        {
            let fury_error = FuryError::Unauthorized {};

            let std_error: StdError = fury_error.into();

            assert_eq!(std_error, StdError::generic_err("Unauthorized"))
        }

        {
            let fury_error = FuryError::Std(StdError::generic_err("Some error"));

            let std_error: StdError = fury_error.into();

            assert_eq!(std_error, StdError::generic_err("Some error"))
        }

        {
            let fury_error = FuryError::Std(StdError::invalid_data_size(1, 2));

            let std_error: StdError = fury_error.into();

            assert_eq!(std_error, StdError::invalid_data_size(1, 2))
        }
    }
}
