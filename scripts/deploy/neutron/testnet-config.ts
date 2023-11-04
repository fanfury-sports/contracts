import { DeploymentConfig, AssetConfig, OracleConfig } from '../../types/config'
import { NeutronIbcConfig } from '../../types/generated/fury-rewards-collector-base/FuryRewardsCollectorBase.types'

const axlUsdcDenom = 'ibc/F91EA2C0A23697A1048E08C2F787E3A58AC6F706A1CD2257A504925158CFC0F3'
const atomDenom = 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9'
const furyDenom = 'ibc/584A4A23736884E0C198FD1EE932455A9357A492A7B94324E4A02B5628687831'

const protocolAdminAddr = 'neutron1ke0vqqzyymlp5esr8gjwuzh94ysnpvj8er5hm7'

const furyNeutronChannelId = 'channel-97'
const chainId = 'pion-1'
const rpcEndpoint = 'https://testnet-neutron-rpc.furyprotocol.io:443'

// Astroport configuration
const astroportFactory = 'neutron1jj0scx400pswhpjes589aujlqagxgcztw04srynmhf0f6zplzn2qqmhwj7'
const astroportRouter = 'neutron12jm24l9lr9cupufqjuxpdjnnweana4h66tsx5cl800mke26td26sq7m05p'
const astroportNtrnAtomPair = 'neutron1sm23jnz4lqd88etklvwlm66a0x6mhflaqlv65wwr7nwwxa6258ks6nshpq'

// note the following three addresses are all 'fury' bech32 prefix
const safetyFundAddr = 'furya1s4hgh56can3e33e0zqpnjxh0t5wdf7u3n2mm7a'
const feeCollectorAddr = 'furya17xpfvakm2amg962yls6f84z3kell8c5llvck70'

// Pyth configuration
const pythAddr = 'neutron1f86ct5az9qpz2hqfd5uxru02px2a3tz5zkw7hugd7acqq496dcms22ehpy'
const pythAtomID = 'b00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819'
const pythUsdcID = 'eaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a'

// IBC config for rewards-collector. See https://rest-palvus.pion-1.ntrn.tech/neutron-org/neutron/feerefunder/params
export const neutronIbcConfig: NeutronIbcConfig = {
  source_port: 'transfer',
  acc_fee: [
    {
      denom: 'untrn',
      amount: '1000',
    },
  ],
  timeout_fee: [
    {
      denom: 'untrn',
      amount: '1000',
    },
  ],
}

// Oracle configurations
export const ntrnOracle: OracleConfig = {
  denom: 'untrn',
  price_source: {
    astroport_twap: {
      window_size: 1800, // 30 minutes
      tolerance: 120, // 2 minutes
      pair_address: astroportNtrnAtomPair,
    },
  },
}

export const atomOracle: OracleConfig = {
  denom: atomDenom,
  price_source: {
    pyth: {
      contract_addr: pythAddr,
      price_feed_id: pythAtomID,
      denom_decimals: 6,
      max_staleness: 300, // 5 minutes
      max_confidence: '0.1',
      max_deviation: '0.1',
    },
  },
}

export const axlUSDCOracle: OracleConfig = {
  denom: axlUsdcDenom,
  price_source: {
    pyth: {
      contract_addr: pythAddr,
      price_feed_id: pythUsdcID,
      denom_decimals: 6,
      max_staleness: 300, // 5 minutes
      max_confidence: '0.1',
      max_deviation: '0.1',
    },
  },
}

export const usdOracle: OracleConfig = {
  denom: 'usd',
  price_source: {
    fixed: {
      price: '1000000',
    },
  },
}

// Router configurations
export const atomUsdcRoute = {
  denom_in: atomDenom,
  denom_out: axlUsdcDenom,
  route: {
    factory: astroportFactory,
    operations: [
      {
        astro_swap: {
          ask_asset_info: {
            native_token: {
              denom: axlUsdcDenom,
            },
          },
          offer_asset_info: {
            native_token: {
              denom: atomDenom,
            },
          },
        },
      },
    ],
    oracle: '', // Will be filled in by deploy script
    router: astroportRouter,
  },
}

export const ntrnUsdcRoute = {
  denom_in: 'untrn',
  denom_out: axlUsdcDenom,
  route: {
    factory: astroportFactory,
    operations: [
      {
        astro_swap: {
          ask_asset_info: {
            native_token: {
              denom: axlUsdcDenom,
            },
          },
          offer_asset_info: {
            native_token: {
              denom: 'untrn',
            },
          },
        },
      },
    ],
    oracle: '', // Will be filled in by deploy script
    router: astroportRouter,
  },
}

export const atomFuryRoute = {
  denom_in: atomDenom,
  denom_out: furyDenom,
  route: {
    factory: astroportFactory,
    operations: [
      {
        astro_swap: {
          ask_asset_info: {
            native_token: {
              denom: furyDenom,
            },
          },
          offer_asset_info: {
            native_token: {
              denom: atomDenom,
            },
          },
        },
      },
    ],
    oracle: '', // Will be filled in by deploy script
    router: astroportRouter,
  },
}

export const ntrnFuryRoute = {
  denom_in: 'untrn',
  denom_out: furyDenom,
  route: {
    factory: astroportFactory,
    operations: [
      {
        astro_swap: {
          ask_asset_info: {
            native_token: {
              denom: furyDenom,
            },
          },
          offer_asset_info: {
            native_token: {
              denom: 'untrn',
            },
          },
        },
      },
    ],
    oracle: '', // Will be filled in by deploy script
    router: astroportRouter,
  },
}

export const usdcFuryRoute = {
  denom_in: axlUsdcDenom,
  denom_out: furyDenom,
  route: {
    factory: astroportFactory,
    operations: [
      {
        astro_swap: {
          ask_asset_info: {
            native_token: {
              denom: furyDenom,
            },
          },
          offer_asset_info: {
            native_token: {
              denom: axlUsdcDenom,
            },
          },
        },
      },
    ],
    oracle: '', // Will be filled in by deploy script
    router: astroportRouter,
  },
}

// Asset configurations
export const ntrnAsset: AssetConfig = {
  denom: 'untrn',
  max_loan_to_value: '0.35',
  liquidation_threshold: '0.40',
  liquidation_bonus: {
    max_lb: '0.05',
    min_lb: '0',
    slope: '2',
    starting_lb: '0',
  },
  protocol_liquidation_fee: '0.5',
  // liquidation_bonus: '0.15',
  symbol: 'NTRN',
  credit_manager: {
    whitelisted: false,
  },
  red_bank: {
    borrow_enabled: true,
    deposit_enabled: true,
  },
  deposit_cap: '5000000000000',
  reserve_factor: '0.1',
  interest_rate_model: {
    optimal_utilization_rate: '0.6',
    base: '0',
    slope_1: '0.15',
    slope_2: '3',
  },
}

export const atomAsset: AssetConfig = {
  denom: atomDenom,
  max_loan_to_value: '0.68',
  liquidation_threshold: '0.7',
  liquidation_bonus: {
    max_lb: '0.05',
    min_lb: '0',
    slope: '2',
    starting_lb: '0',
  },
  protocol_liquidation_fee: '0.5',
  // liquidation_bonus: '0.1',
  symbol: 'ATOM',
  credit_manager: {
    whitelisted: false,
  },
  red_bank: {
    borrow_enabled: true,
    deposit_enabled: true,
  },
  deposit_cap: '150000000000',
  reserve_factor: '0.1',
  interest_rate_model: {
    optimal_utilization_rate: '0.7',
    base: '0',
    slope_1: '0.2',
    slope_2: '3',
  },
}

export const axlUSDCAsset: AssetConfig = {
  denom: axlUsdcDenom,
  max_loan_to_value: '0.74',
  liquidation_threshold: '0.75',
  liquidation_bonus: {
    max_lb: '0.05',
    min_lb: '0',
    slope: '2',
    starting_lb: '0',
  },
  protocol_liquidation_fee: '0.5',
  // liquidation_bonus: '0.1',
  symbol: 'axlUSDC',
  credit_manager: {
    whitelisted: false,
  },
  red_bank: {
    borrow_enabled: true,
    deposit_enabled: true,
  },
  deposit_cap: '500000000000',
  reserve_factor: '0.1',
  interest_rate_model: {
    optimal_utilization_rate: '0.8',
    base: '0',
    slope_1: '0.125',
    slope_2: '2',
  },
}

export const neutronTestnetConfig: DeploymentConfig = {
  mainnet: false,
  deployerMnemonic: 'TO BE INSERTED AT TIME OF DEPLOYMENT',
  furyDenom: furyDenom,
  atomDenom: atomDenom,
  safetyFundAddr: safetyFundAddr,
  protocolAdminAddr: protocolAdminAddr,
  feeCollectorAddr: feeCollectorAddr,
  chain: {
    baseDenom: 'untrn',
    defaultGasPrice: 0.01,
    id: chainId,
    prefix: 'neutron',
    rpcEndpoint: rpcEndpoint,
  },
  oracle: {
    name: 'wasm',
    baseDenom: 'uusd',
    customInitParams: {
      astroport_factory: astroportFactory,
    },
  },
  rewardsCollector: {
    name: 'neutron',
    timeoutSeconds: 600,
    channelId: furyNeutronChannelId,
    safetyFundFeeShare: '0.5',
    feeCollectorDenom: furyDenom,
    safetyFundDenom: axlUsdcDenom,
    slippageTolerance: '0.01',
    neutronIbcConfig: neutronIbcConfig,
  },
  incentives: {
    epochDuration: 604800, // 1 week
    maxWhitelistedIncentiveDenoms: 10,
  },
  swapper: {
    name: 'astroport',
    routes: [atomUsdcRoute, atomFuryRoute, ntrnUsdcRoute, ntrnFuryRoute, usdcFuryRoute],
  },
  targetHealthFactor: '1.05',
  creditLineCoins: [],
  maxValueForBurn: '10000',
  maxUnlockingPositions: '1',
  maxSlippage: '0.2',
  zapperContractName: 'fury_zapper_osmosis',
  runTests: false,
  assets: [ntrnAsset, atomAsset, axlUSDCAsset],
  vaults: [],
  oracleConfigs: [usdOracle, axlUSDCOracle, atomOracle, ntrnOracle],
}
