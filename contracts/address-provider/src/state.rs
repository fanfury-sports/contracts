use cw_storage_plus::{Item, Map};
use fury_owner::Owner;
use fury_types::address_provider::Config;

use crate::key::FuryAddressTypeKey;

pub const OWNER: Owner = Owner::new("owner");
pub const CONFIG: Item<Config> = Item::new("config");
pub const ADDRESSES: Map<FuryAddressTypeKey, String> = Map::new("addresses");
