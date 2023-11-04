// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { UseQueryOptions, useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { StdFee, Coin } from '@cosmjs/amino'
import {
  InstantiateMsg,
  CreateOrUpdateConfig,
  ExecuteMsg,
  OwnerUpdate,
  Decimal,
  Uint128,
  MigrateV1ToV2,
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
} from './FuryRedBank.types'
import { FuryRedBankQueryClient, FuryRedBankClient } from './FuryRedBank.client'
export const furyRedBankQueryKeys = {
  contract: [
    {
      contract: 'furyRedBank',
    },
  ] as const,
  address: (contractAddress: string | undefined) =>
    [{ ...furyRedBankQueryKeys.contract[0], address: contractAddress }] as const,
  config: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'config', args }] as const,
  market: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'market', args }] as const,
  markets: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'markets', args }] as const,
  uncollateralizedLoanLimit: (
    contractAddress: string | undefined,
    args?: Record<string, unknown>,
  ) =>
    [
      {
        ...furyRedBankQueryKeys.address(contractAddress)[0],
        method: 'uncollateralized_loan_limit',
        args,
      },
    ] as const,
  uncollateralizedLoanLimits: (
    contractAddress: string | undefined,
    args?: Record<string, unknown>,
  ) =>
    [
      {
        ...furyRedBankQueryKeys.address(contractAddress)[0],
        method: 'uncollateralized_loan_limits',
        args,
      },
    ] as const,
  userDebt: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'user_debt', args }] as const,
  userDebts: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'user_debts', args }] as const,
  userCollateral: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'user_collateral', args },
    ] as const,
  userCollaterals: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'user_collaterals', args },
    ] as const,
  userCollateralsV2: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'user_collaterals_v2', args },
    ] as const,
  userPosition: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'user_position', args },
    ] as const,
  userPositionLiquidationPricing: (
    contractAddress: string | undefined,
    args?: Record<string, unknown>,
  ) =>
    [
      {
        ...furyRedBankQueryKeys.address(contractAddress)[0],
        method: 'user_position_liquidation_pricing',
        args,
      },
    ] as const,
  scaledLiquidityAmount: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      {
        ...furyRedBankQueryKeys.address(contractAddress)[0],
        method: 'scaled_liquidity_amount',
        args,
      },
    ] as const,
  scaledDebtAmount: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyRedBankQueryKeys.address(contractAddress)[0], method: 'scaled_debt_amount', args },
    ] as const,
  underlyingLiquidityAmount: (
    contractAddress: string | undefined,
    args?: Record<string, unknown>,
  ) =>
    [
      {
        ...furyRedBankQueryKeys.address(contractAddress)[0],
        method: 'underlying_liquidity_amount',
        args,
      },
    ] as const,
  underlyingDebtAmount: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      {
        ...furyRedBankQueryKeys.address(contractAddress)[0],
        method: 'underlying_debt_amount',
        args,
      },
    ] as const,
}
export interface FuryRedBankReactQuery<TResponse, TData = TResponse> {
  client: FuryRedBankQueryClient | undefined
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    "'queryKey' | 'queryFn' | 'initialData'"
  > & {
    initialData?: undefined
  }
}
export interface FuryRedBankUnderlyingDebtAmountQuery<TData>
  extends FuryRedBankReactQuery<Uint128, TData> {
  args: {
    amountScaled: Uint128
    denom: string
  }
}
export function useFuryRedBankUnderlyingDebtAmountQuery<TData = Uint128>({
  client,
  args,
  options,
}: FuryRedBankUnderlyingDebtAmountQuery<TData>) {
  return useQuery<Uint128, Error, TData>(
    furyRedBankQueryKeys.underlyingDebtAmount(client?.contractAddress, args),
    () =>
      client
        ? client.underlyingDebtAmount({
            amountScaled: args.amountScaled,
            denom: args.denom,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUnderlyingLiquidityAmountQuery<TData>
  extends FuryRedBankReactQuery<Uint128, TData> {
  args: {
    amountScaled: Uint128
    denom: string
  }
}
export function useFuryRedBankUnderlyingLiquidityAmountQuery<TData = Uint128>({
  client,
  args,
  options,
}: FuryRedBankUnderlyingLiquidityAmountQuery<TData>) {
  return useQuery<Uint128, Error, TData>(
    furyRedBankQueryKeys.underlyingLiquidityAmount(client?.contractAddress, args),
    () =>
      client
        ? client.underlyingLiquidityAmount({
            amountScaled: args.amountScaled,
            denom: args.denom,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankScaledDebtAmountQuery<TData>
  extends FuryRedBankReactQuery<Uint128, TData> {
  args: {
    amount: Uint128
    denom: string
  }
}
export function useFuryRedBankScaledDebtAmountQuery<TData = Uint128>({
  client,
  args,
  options,
}: FuryRedBankScaledDebtAmountQuery<TData>) {
  return useQuery<Uint128, Error, TData>(
    furyRedBankQueryKeys.scaledDebtAmount(client?.contractAddress, args),
    () =>
      client
        ? client.scaledDebtAmount({
            amount: args.amount,
            denom: args.denom,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankScaledLiquidityAmountQuery<TData>
  extends FuryRedBankReactQuery<Uint128, TData> {
  args: {
    amount: Uint128
    denom: string
  }
}
export function useFuryRedBankScaledLiquidityAmountQuery<TData = Uint128>({
  client,
  args,
  options,
}: FuryRedBankScaledLiquidityAmountQuery<TData>) {
  return useQuery<Uint128, Error, TData>(
    furyRedBankQueryKeys.scaledLiquidityAmount(client?.contractAddress, args),
    () =>
      client
        ? client.scaledLiquidityAmount({
            amount: args.amount,
            denom: args.denom,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUserPositionLiquidationPricingQuery<TData>
  extends FuryRedBankReactQuery<UserPositionResponse, TData> {
  args: {
    accountId?: string
    user: string
  }
}
export function useFuryRedBankUserPositionLiquidationPricingQuery<TData = UserPositionResponse>({
  client,
  args,
  options,
}: FuryRedBankUserPositionLiquidationPricingQuery<TData>) {
  return useQuery<UserPositionResponse, Error, TData>(
    furyRedBankQueryKeys.userPositionLiquidationPricing(client?.contractAddress, args),
    () =>
      client
        ? client.userPositionLiquidationPricing({
            accountId: args.accountId,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUserPositionQuery<TData>
  extends FuryRedBankReactQuery<UserPositionResponse, TData> {
  args: {
    accountId?: string
    user: string
  }
}
export function useFuryRedBankUserPositionQuery<TData = UserPositionResponse>({
  client,
  args,
  options,
}: FuryRedBankUserPositionQuery<TData>) {
  return useQuery<UserPositionResponse, Error, TData>(
    furyRedBankQueryKeys.userPosition(client?.contractAddress, args),
    () =>
      client
        ? client.userPosition({
            accountId: args.accountId,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUserCollateralsV2Query<TData>
  extends FuryRedBankReactQuery<PaginationResponseForUserCollateralResponse, TData> {
  args: {
    accountId?: string
    limit?: number
    startAfter?: string
    user: string
  }
}
export function useFuryRedBankUserCollateralsV2Query<
  TData = PaginationResponseForUserCollateralResponse,
>({ client, args, options }: FuryRedBankUserCollateralsV2Query<TData>) {
  return useQuery<PaginationResponseForUserCollateralResponse, Error, TData>(
    furyRedBankQueryKeys.userCollateralsV2(client?.contractAddress, args),
    () =>
      client
        ? client.userCollateralsV2({
            accountId: args.accountId,
            limit: args.limit,
            startAfter: args.startAfter,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUserCollateralsQuery<TData>
  extends FuryRedBankReactQuery<ArrayOfUserCollateralResponse, TData> {
  args: {
    accountId?: string
    limit?: number
    startAfter?: string
    user: string
  }
}
export function useFuryRedBankUserCollateralsQuery<TData = ArrayOfUserCollateralResponse>({
  client,
  args,
  options,
}: FuryRedBankUserCollateralsQuery<TData>) {
  return useQuery<ArrayOfUserCollateralResponse, Error, TData>(
    furyRedBankQueryKeys.userCollaterals(client?.contractAddress, args),
    () =>
      client
        ? client.userCollaterals({
            accountId: args.accountId,
            limit: args.limit,
            startAfter: args.startAfter,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUserCollateralQuery<TData>
  extends FuryRedBankReactQuery<UserCollateralResponse, TData> {
  args: {
    accountId?: string
    denom: string
    user: string
  }
}
export function useFuryRedBankUserCollateralQuery<TData = UserCollateralResponse>({
  client,
  args,
  options,
}: FuryRedBankUserCollateralQuery<TData>) {
  return useQuery<UserCollateralResponse, Error, TData>(
    furyRedBankQueryKeys.userCollateral(client?.contractAddress, args),
    () =>
      client
        ? client.userCollateral({
            accountId: args.accountId,
            denom: args.denom,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUserDebtsQuery<TData>
  extends FuryRedBankReactQuery<ArrayOfUserDebtResponse, TData> {
  args: {
    limit?: number
    startAfter?: string
    user: string
  }
}
export function useFuryRedBankUserDebtsQuery<TData = ArrayOfUserDebtResponse>({
  client,
  args,
  options,
}: FuryRedBankUserDebtsQuery<TData>) {
  return useQuery<ArrayOfUserDebtResponse, Error, TData>(
    furyRedBankQueryKeys.userDebts(client?.contractAddress, args),
    () =>
      client
        ? client.userDebts({
            limit: args.limit,
            startAfter: args.startAfter,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUserDebtQuery<TData>
  extends FuryRedBankReactQuery<UserDebtResponse, TData> {
  args: {
    denom: string
    user: string
  }
}
export function useFuryRedBankUserDebtQuery<TData = UserDebtResponse>({
  client,
  args,
  options,
}: FuryRedBankUserDebtQuery<TData>) {
  return useQuery<UserDebtResponse, Error, TData>(
    furyRedBankQueryKeys.userDebt(client?.contractAddress, args),
    () =>
      client
        ? client.userDebt({
            denom: args.denom,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUncollateralizedLoanLimitsQuery<TData>
  extends FuryRedBankReactQuery<ArrayOfUncollateralizedLoanLimitResponse, TData> {
  args: {
    limit?: number
    startAfter?: string
    user: string
  }
}
export function useFuryRedBankUncollateralizedLoanLimitsQuery<
  TData = ArrayOfUncollateralizedLoanLimitResponse,
>({ client, args, options }: FuryRedBankUncollateralizedLoanLimitsQuery<TData>) {
  return useQuery<ArrayOfUncollateralizedLoanLimitResponse, Error, TData>(
    furyRedBankQueryKeys.uncollateralizedLoanLimits(client?.contractAddress, args),
    () =>
      client
        ? client.uncollateralizedLoanLimits({
            limit: args.limit,
            startAfter: args.startAfter,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankUncollateralizedLoanLimitQuery<TData>
  extends FuryRedBankReactQuery<UncollateralizedLoanLimitResponse, TData> {
  args: {
    denom: string
    user: string
  }
}
export function useFuryRedBankUncollateralizedLoanLimitQuery<
  TData = UncollateralizedLoanLimitResponse,
>({ client, args, options }: FuryRedBankUncollateralizedLoanLimitQuery<TData>) {
  return useQuery<UncollateralizedLoanLimitResponse, Error, TData>(
    furyRedBankQueryKeys.uncollateralizedLoanLimit(client?.contractAddress, args),
    () =>
      client
        ? client.uncollateralizedLoanLimit({
            denom: args.denom,
            user: args.user,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankMarketsQuery<TData>
  extends FuryRedBankReactQuery<ArrayOfMarket, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export function useFuryRedBankMarketsQuery<TData = ArrayOfMarket>({
  client,
  args,
  options,
}: FuryRedBankMarketsQuery<TData>) {
  return useQuery<ArrayOfMarket, Error, TData>(
    furyRedBankQueryKeys.markets(client?.contractAddress, args),
    () =>
      client
        ? client.markets({
            limit: args.limit,
            startAfter: args.startAfter,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankMarketQuery<TData> extends FuryRedBankReactQuery<Market, TData> {
  args: {
    denom: string
  }
}
export function useFuryRedBankMarketQuery<TData = Market>({
  client,
  args,
  options,
}: FuryRedBankMarketQuery<TData>) {
  return useQuery<Market, Error, TData>(
    furyRedBankQueryKeys.market(client?.contractAddress, args),
    () =>
      client
        ? client.market({
            denom: args.denom,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankConfigQuery<TData>
  extends FuryRedBankReactQuery<ConfigResponse, TData> {}
export function useFuryRedBankConfigQuery<TData = ConfigResponse>({
  client,
  options,
}: FuryRedBankConfigQuery<TData>) {
  return useQuery<ConfigResponse, Error, TData>(
    furyRedBankQueryKeys.config(client?.contractAddress),
    () => (client ? client.config() : Promise.reject(new Error('Invalid client'))),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRedBankMigrateMutation {
  client: FuryRedBankClient
  msg: MigrateV1ToV2
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankMigrateMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankMigrateMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankMigrateMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.migrate(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankUpdateAssetCollateralStatusMutation {
  client: FuryRedBankClient
  msg: {
    denom: string
    enable: boolean
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankUpdateAssetCollateralStatusMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankUpdateAssetCollateralStatusMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankUpdateAssetCollateralStatusMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.updateAssetCollateralStatus(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankLiquidateMutation {
  client: FuryRedBankClient
  msg: {
    collateralDenom: string
    recipient?: string
    user: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankLiquidateMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankLiquidateMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankLiquidateMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.liquidate(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankRepayMutation {
  client: FuryRedBankClient
  msg: {
    onBehalfOf?: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankRepayMutation(
  options?: Omit<UseMutationOptions<ExecuteResult, Error, FuryRedBankRepayMutation>, 'mutationFn'>,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankRepayMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.repay(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankBorrowMutation {
  client: FuryRedBankClient
  msg: {
    amount: Uint128
    denom: string
    recipient?: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankBorrowMutation(
  options?: Omit<UseMutationOptions<ExecuteResult, Error, FuryRedBankBorrowMutation>, 'mutationFn'>,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankBorrowMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.borrow(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankWithdrawMutation {
  client: FuryRedBankClient
  msg: {
    accountId?: string
    amount?: Uint128
    denom: string
    liquidationRelated?: boolean
    recipient?: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankWithdrawMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankWithdrawMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankWithdrawMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.withdraw(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankDepositMutation {
  client: FuryRedBankClient
  msg: {
    accountId?: string
    onBehalfOf?: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankDepositMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankDepositMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankDepositMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.deposit(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankUpdateUncollateralizedLoanLimitMutation {
  client: FuryRedBankClient
  msg: {
    denom: string
    newLimit: Uint128
    user: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankUpdateUncollateralizedLoanLimitMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankUpdateUncollateralizedLoanLimitMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankUpdateUncollateralizedLoanLimitMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.updateUncollateralizedLoanLimit(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankUpdateAssetMutation {
  client: FuryRedBankClient
  msg: {
    denom: string
    params: InitOrUpdateAssetParams
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankUpdateAssetMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankUpdateAssetMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankUpdateAssetMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.updateAsset(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankInitAssetMutation {
  client: FuryRedBankClient
  msg: {
    denom: string
    params: InitOrUpdateAssetParams
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankInitAssetMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankInitAssetMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankInitAssetMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.initAsset(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankUpdateConfigMutation {
  client: FuryRedBankClient
  msg: {
    config: CreateOrUpdateConfig
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankUpdateConfigMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankUpdateConfigMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankUpdateConfigMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.updateConfig(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRedBankUpdateOwnerMutation {
  client: FuryRedBankClient
  msg: OwnerUpdate
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRedBankUpdateOwnerMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRedBankUpdateOwnerMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRedBankUpdateOwnerMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.updateOwner(msg, fee, memo, funds),
    options,
  )
}