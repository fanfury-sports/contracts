// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { Coin, StdFee } from '@cosmjs/amino'
import {
  InstantiateMsg,
  ExecuteMsg,
  OwnerUpdate,
  Decimal,
  Uint128,
  MigrateV1ToV2,
  CreateOrUpdateConfig,
  InitOrUpdateAssetParams,
  InterestRateModel,
  QueryMsg,
  ConfigResponse,
  Market,
  ArrayOfMarket,
  UncollateralizedLoanLimitResponse,
  ArrayOfUncollateralizedLoanLimitResponse,
  UserCollateralResponse,
  ArrayOfUserCollateralResponse,
  PaginationResponseForUserCollateralResponse,
  Metadata,
  UserDebtResponse,
  ArrayOfUserDebtResponse,
  UserHealthStatus,
  UserPositionResponse,
} from './MarsMockRedBank.types'
export interface MarsMockRedBankReadOnlyInterface {
  contractAddress: string
  config: () => Promise<ConfigResponse>
  market: ({ denom }: { denom: string }) => Promise<Market>
  markets: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<ArrayOfMarket>
  uncollateralizedLoanLimit: ({
    denom,
    user,
  }: {
    denom: string
    user: string
  }) => Promise<UncollateralizedLoanLimitResponse>
  uncollateralizedLoanLimits: ({
    limit,
    startAfter,
    user,
  }: {
    limit?: number
    startAfter?: string
    user: string
  }) => Promise<ArrayOfUncollateralizedLoanLimitResponse>
  userDebt: ({ denom, user }: { denom: string; user: string }) => Promise<UserDebtResponse>
  userDebts: ({
    limit,
    startAfter,
    user,
  }: {
    limit?: number
    startAfter?: string
    user: string
  }) => Promise<ArrayOfUserDebtResponse>
  userCollateral: ({
    accountId,
    denom,
    user,
  }: {
    accountId?: string
    denom: string
    user: string
  }) => Promise<UserCollateralResponse>
  userCollaterals: ({
    accountId,
    limit,
    startAfter,
    user,
  }: {
    accountId?: string
    limit?: number
    startAfter?: string
    user: string
  }) => Promise<ArrayOfUserCollateralResponse>
  userCollateralsV2: ({
    accountId,
    limit,
    startAfter,
    user,
  }: {
    accountId?: string
    limit?: number
    startAfter?: string
    user: string
  }) => Promise<PaginationResponseForUserCollateralResponse>
  userPosition: ({
    accountId,
    user,
  }: {
    accountId?: string
    user: string
  }) => Promise<UserPositionResponse>
  userPositionLiquidationPricing: ({
    accountId,
    user,
  }: {
    accountId?: string
    user: string
  }) => Promise<UserPositionResponse>
  scaledLiquidityAmount: ({ amount, denom }: { amount: Uint128; denom: string }) => Promise<Uint128>
  scaledDebtAmount: ({ amount, denom }: { amount: Uint128; denom: string }) => Promise<Uint128>
  underlyingLiquidityAmount: ({
    amountScaled,
    denom,
  }: {
    amountScaled: Uint128
    denom: string
  }) => Promise<Uint128>
  underlyingDebtAmount: ({
    amountScaled,
    denom,
  }: {
    amountScaled: Uint128
    denom: string
  }) => Promise<Uint128>
}
export class MarsMockRedBankQueryClient implements MarsMockRedBankReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.config = this.config.bind(this)
    this.market = this.market.bind(this)
    this.markets = this.markets.bind(this)
    this.uncollateralizedLoanLimit = this.uncollateralizedLoanLimit.bind(this)
    this.uncollateralizedLoanLimits = this.uncollateralizedLoanLimits.bind(this)
    this.userDebt = this.userDebt.bind(this)
    this.userDebts = this.userDebts.bind(this)
    this.userCollateral = this.userCollateral.bind(this)
    this.userCollaterals = this.userCollaterals.bind(this)
    this.userCollateralsV2 = this.userCollateralsV2.bind(this)
    this.userPosition = this.userPosition.bind(this)
    this.userPositionLiquidationPricing = this.userPositionLiquidationPricing.bind(this)
    this.scaledLiquidityAmount = this.scaledLiquidityAmount.bind(this)
    this.scaledDebtAmount = this.scaledDebtAmount.bind(this)
    this.underlyingLiquidityAmount = this.underlyingLiquidityAmount.bind(this)
    this.underlyingDebtAmount = this.underlyingDebtAmount.bind(this)
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    })
  }
  market = async ({ denom }: { denom: string }): Promise<Market> => {
    return this.client.queryContractSmart(this.contractAddress, {
      market: {
        denom,
      },
    })
  }
  markets = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<ArrayOfMarket> => {
    return this.client.queryContractSmart(this.contractAddress, {
      markets: {
        limit,
        start_after: startAfter,
      },
    })
  }
  uncollateralizedLoanLimit = async ({
    denom,
    user,
  }: {
    denom: string
    user: string
  }): Promise<UncollateralizedLoanLimitResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      uncollateralized_loan_limit: {
        denom,
        user,
      },
    })
  }
  uncollateralizedLoanLimits = async ({
    limit,
    startAfter,
    user,
  }: {
    limit?: number
    startAfter?: string
    user: string
  }): Promise<ArrayOfUncollateralizedLoanLimitResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      uncollateralized_loan_limits: {
        limit,
        start_after: startAfter,
        user,
      },
    })
  }
  userDebt = async ({
    denom,
    user,
  }: {
    denom: string
    user: string
  }): Promise<UserDebtResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_debt: {
        denom,
        user,
      },
    })
  }
  userDebts = async ({
    limit,
    startAfter,
    user,
  }: {
    limit?: number
    startAfter?: string
    user: string
  }): Promise<ArrayOfUserDebtResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_debts: {
        limit,
        start_after: startAfter,
        user,
      },
    })
  }
  userCollateral = async ({
    accountId,
    denom,
    user,
  }: {
    accountId?: string
    denom: string
    user: string
  }): Promise<UserCollateralResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_collateral: {
        account_id: accountId,
        denom,
        user,
      },
    })
  }
  userCollaterals = async ({
    accountId,
    limit,
    startAfter,
    user,
  }: {
    accountId?: string
    limit?: number
    startAfter?: string
    user: string
  }): Promise<ArrayOfUserCollateralResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_collaterals: {
        account_id: accountId,
        limit,
        start_after: startAfter,
        user,
      },
    })
  }
  userCollateralsV2 = async ({
    accountId,
    limit,
    startAfter,
    user,
  }: {
    accountId?: string
    limit?: number
    startAfter?: string
    user: string
  }): Promise<PaginationResponseForUserCollateralResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_collaterals_v2: {
        account_id: accountId,
        limit,
        start_after: startAfter,
        user,
      },
    })
  }
  userPosition = async ({
    accountId,
    user,
  }: {
    accountId?: string
    user: string
  }): Promise<UserPositionResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_position: {
        account_id: accountId,
        user,
      },
    })
  }
  userPositionLiquidationPricing = async ({
    accountId,
    user,
  }: {
    accountId?: string
    user: string
  }): Promise<UserPositionResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_position_liquidation_pricing: {
        account_id: accountId,
        user,
      },
    })
  }
  scaledLiquidityAmount = async ({
    amount,
    denom,
  }: {
    amount: Uint128
    denom: string
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      scaled_liquidity_amount: {
        amount,
        denom,
      },
    })
  }
  scaledDebtAmount = async ({
    amount,
    denom,
  }: {
    amount: Uint128
    denom: string
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      scaled_debt_amount: {
        amount,
        denom,
      },
    })
  }
  underlyingLiquidityAmount = async ({
    amountScaled,
    denom,
  }: {
    amountScaled: Uint128
    denom: string
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      underlying_liquidity_amount: {
        amount_scaled: amountScaled,
        denom,
      },
    })
  }
  underlyingDebtAmount = async ({
    amountScaled,
    denom,
  }: {
    amountScaled: Uint128
    denom: string
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      underlying_debt_amount: {
        amount_scaled: amountScaled,
        denom,
      },
    })
  }
}
export interface MarsMockRedBankInterface extends MarsMockRedBankReadOnlyInterface {
  contractAddress: string
  sender: string
  updateOwner: (
    ownerUpdate: OwnerUpdate,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      config,
    }: {
      config: CreateOrUpdateConfig
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  initAsset: (
    {
      denom,
      params,
    }: {
      denom: string
      params: InitOrUpdateAssetParams
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  updateAsset: (
    {
      denom,
      params,
    }: {
      denom: string
      params: InitOrUpdateAssetParams
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  updateUncollateralizedLoanLimit: (
    {
      denom,
      newLimit,
      user,
    }: {
      denom: string
      newLimit: Uint128
      user: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  deposit: (
    {
      accountId,
      onBehalfOf,
    }: {
      accountId?: string
      onBehalfOf?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  withdraw: (
    {
      accountId,
      amount,
      denom,
      liquidationRelated,
      recipient,
    }: {
      accountId?: string
      amount?: Uint128
      denom: string
      liquidationRelated?: boolean
      recipient?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  borrow: (
    {
      amount,
      denom,
      recipient,
    }: {
      amount: Uint128
      denom: string
      recipient?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  repay: (
    {
      onBehalfOf,
    }: {
      onBehalfOf?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  liquidate: (
    {
      collateralDenom,
      recipient,
      user,
    }: {
      collateralDenom: string
      recipient?: string
      user: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  updateAssetCollateralStatus: (
    {
      denom,
      enable,
    }: {
      denom: string
      enable: boolean
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
  migrate: (
    migrateV1ToV2: MigrateV1ToV2,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[],
  ) => Promise<ExecuteResult>
}
export class MarsMockRedBankClient
  extends MarsMockRedBankQueryClient
  implements MarsMockRedBankInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.updateOwner = this.updateOwner.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.initAsset = this.initAsset.bind(this)
    this.updateAsset = this.updateAsset.bind(this)
    this.updateUncollateralizedLoanLimit = this.updateUncollateralizedLoanLimit.bind(this)
    this.deposit = this.deposit.bind(this)
    this.withdraw = this.withdraw.bind(this)
    this.borrow = this.borrow.bind(this)
    this.repay = this.repay.bind(this)
    this.liquidate = this.liquidate.bind(this)
    this.updateAssetCollateralStatus = this.updateAssetCollateralStatus.bind(this)
    this.migrate = this.migrate.bind(this)
  }

  updateOwner = async (
    ownerUpdate: OwnerUpdate,
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_owner: ownerUpdate,
      },
      fee,
      memo,
      _funds,
    )
  }
  updateConfig = async (
    {
      config,
    }: {
      config: CreateOrUpdateConfig
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          config,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  initAsset = async (
    {
      denom,
      params,
    }: {
      denom: string
      params: InitOrUpdateAssetParams
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        init_asset: {
          denom,
          params,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  updateAsset = async (
    {
      denom,
      params,
    }: {
      denom: string
      params: InitOrUpdateAssetParams
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_asset: {
          denom,
          params,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  updateUncollateralizedLoanLimit = async (
    {
      denom,
      newLimit,
      user,
    }: {
      denom: string
      newLimit: Uint128
      user: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_uncollateralized_loan_limit: {
          denom,
          new_limit: newLimit,
          user,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  deposit = async (
    {
      accountId,
      onBehalfOf,
    }: {
      accountId?: string
      onBehalfOf?: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        deposit: {
          account_id: accountId,
          on_behalf_of: onBehalfOf,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  withdraw = async (
    {
      accountId,
      amount,
      denom,
      liquidationRelated,
      recipient,
    }: {
      accountId?: string
      amount?: Uint128
      denom: string
      liquidationRelated?: boolean
      recipient?: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        withdraw: {
          account_id: accountId,
          amount,
          denom,
          liquidation_related: liquidationRelated,
          recipient,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  borrow = async (
    {
      amount,
      denom,
      recipient,
    }: {
      amount: Uint128
      denom: string
      recipient?: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        borrow: {
          amount,
          denom,
          recipient,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  repay = async (
    {
      onBehalfOf,
    }: {
      onBehalfOf?: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        repay: {
          on_behalf_of: onBehalfOf,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  liquidate = async (
    {
      collateralDenom,
      recipient,
      user,
    }: {
      collateralDenom: string
      recipient?: string
      user: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        liquidate: {
          collateral_denom: collateralDenom,
          recipient,
          user,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  updateAssetCollateralStatus = async (
    {
      denom,
      enable,
    }: {
      denom: string
      enable: boolean
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_asset_collateral_status: {
          denom,
          enable,
        },
      },
      fee,
      memo,
      _funds,
    )
  }
  migrate = async (
    migrateV1ToV2: MigrateV1ToV2,
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        migrate: migrateV1ToV2,
      },
      fee,
      memo,
      _funds,
    )
  }
}
