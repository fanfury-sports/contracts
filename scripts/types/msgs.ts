import { InstantiateMsg as ParamsInstantiateMsg } from './generated/fury-params/FuryParams.types'
import { InstantiateMsg as RedBankInstantiateMsg } from './generated/mars-red-bank/FuryRedBank.types'
import { InstantiateMsg as AddressProviderInstantiateMsg } from './generated/fury-address-provider/FuryAddressProvider.types'
import { InstantiateMsg as IncentivesInstantiateMsg } from './generated/fury-incentives/FuryIncentives.types'
import { InstantiateMsg as RewardsInstantiateMsg } from './generated/fury-rewards-collector-base/FuryRewardsCollectorBase.types'
import { InstantiateMsg as OsmosisOracleInstantiateMsg } from './generated/fury-oracle-osmosis/FuryOracleOsmosis.types'
import { InstantiateMsg as WasmOracleInstantiateMsg } from './generated/fury-oracle-wasm/FuryOracleWasm.types'
import { InstantiateMsg as OsmosisSwapperInstantiateMsg } from './generated/fury-swapper-osmosis/FurySwapperOsmosis.types'
import { InstantiateMsg as AstroportSwapperInstantiateMsg } from './generated/fury-swapper-astroport/FurySwapperAstroport.types'
import { InstantiateMsg as NftInstantiateMsg } from './generated/fury-account-nft/FuryAccountNft.types'
import { InstantiateMsg as VaultInstantiateMsg } from './generated/fury-mock-vault/FuryMockVault.types'
import { InstantiateMsg as RoverInstantiateMsg } from './generated/fury-credit-manager/FuryCreditManager.types'
import { InstantiateMsg as ZapperInstantiateMsg } from './generated/fury-zapper-base/FuryZapperBase.types'
import { InstantiateMsg as HealthInstantiateMsg } from './generated/fury-rover-health/FuryRoverHealth.types'

export type InstantiateMsgs =
  | ParamsInstantiateMsg
  | RedBankInstantiateMsg
  | AddressProviderInstantiateMsg
  | IncentivesInstantiateMsg
  | RewardsInstantiateMsg
  | OsmosisOracleInstantiateMsg
  | WasmOracleInstantiateMsg
  | OsmosisSwapperInstantiateMsg
  | AstroportSwapperInstantiateMsg
  | NftInstantiateMsg
  | VaultInstantiateMsg
  | RoverInstantiateMsg
  | ZapperInstantiateMsg
  | HealthInstantiateMsg

export interface UpdateOwner {
  owner: string
}
