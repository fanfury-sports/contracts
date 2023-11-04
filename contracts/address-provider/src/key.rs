use std::{convert::TryFrom, str::FromStr};

use cosmwasm_std::{StdError, StdResult};
use cw_storage_plus::{Key, KeyDeserialize, Prefixer, PrimaryKey};
use fury_types::address_provider::FuryAddressType;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct FuryAddressTypeKey(pub Vec<u8>);

impl From<FuryAddressType> for FuryAddressTypeKey {
    fn from(address_type: FuryAddressType) -> Self {
        Self(address_type.to_string().into_bytes())
    }
}

impl TryFrom<FuryAddressTypeKey> for FuryAddressType {
    type Error = StdError;

    fn try_from(key: FuryAddressTypeKey) -> Result<Self, Self::Error> {
        let s = String::from_utf8(key.0)?;
        FuryAddressType::from_str(&s)
    }
}

impl<'a> PrimaryKey<'a> for FuryAddressTypeKey {
    type Prefix = ();
    type SubPrefix = ();
    type Suffix = Self;
    type SuperSuffix = Self;

    fn key(&self) -> Vec<Key> {
        vec![Key::Ref(&self.0)]
    }
}

impl<'a> Prefixer<'a> for FuryAddressTypeKey {
    fn prefix(&self) -> Vec<Key> {
        vec![Key::Ref(&self.0)]
    }
}

impl KeyDeserialize for FuryAddressTypeKey {
    type Output = Self;

    #[inline(always)]
    fn from_vec(value: Vec<u8>) -> StdResult<Self::Output> {
        Ok(Self(value))
    }
}
