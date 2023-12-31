// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { UseQueryOptions, useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { StdFee } from '@cosmjs/amino'
import {
  Uint128,
  Decimal,
  InstantiateMsg,
  NeutronIbcConfig,
  Coin,
  ExecuteMsg,
  OwnerUpdate,
  Action,
  ActionAmount,
  LiquidateRequestForVaultBaseForString,
  VaultPositionType,
  UpdateConfig,
  ActionCoin,
  VaultBaseForString,
  QueryMsg,
  ConfigResponse,
} from './FuryRewardsCollectorBase.types'
import {
  FuryRewardsCollectorBaseQueryClient,
  FuryRewardsCollectorBaseClient,
} from './FuryRewardsCollectorBase.client'
export const furyRewardsCollectorBaseQueryKeys = {
  contract: [
    {
      contract: 'furyRewardsCollectorBase',
    },
  ] as const,
  address: (contractAddress: string | undefined) =>
    [{ ...furyRewardsCollectorBaseQueryKeys.contract[0], address: contractAddress }] as const,
  config: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyRewardsCollectorBaseQueryKeys.address(contractAddress)[0], method: 'config', args },
    ] as const,
}
export interface FuryRewardsCollectorBaseReactQuery<TResponse, TData = TResponse> {
  client: FuryRewardsCollectorBaseQueryClient | undefined
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    "'queryKey' | 'queryFn' | 'initialData'"
  > & {
    initialData?: undefined
  }
}
export interface FuryRewardsCollectorBaseConfigQuery<TData>
  extends FuryRewardsCollectorBaseReactQuery<ConfigResponse, TData> {}
export function useFuryRewardsCollectorBaseConfigQuery<TData = ConfigResponse>({
  client,
  options,
}: FuryRewardsCollectorBaseConfigQuery<TData>) {
  return useQuery<ConfigResponse, Error, TData>(
    furyRewardsCollectorBaseQueryKeys.config(client?.contractAddress),
    () => (client ? client.config() : Promise.reject(new Error('Invalid client'))),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryRewardsCollectorBaseClaimIncentiveRewardsMutation {
  client: FuryRewardsCollectorBaseClient
  msg: {
    limit?: number
    startAfterCollateralDenom?: string
    startAfterIncentiveDenom?: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRewardsCollectorBaseClaimIncentiveRewardsMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRewardsCollectorBaseClaimIncentiveRewardsMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRewardsCollectorBaseClaimIncentiveRewardsMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.claimIncentiveRewards(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRewardsCollectorBaseSwapAssetMutation {
  client: FuryRewardsCollectorBaseClient
  msg: {
    amount?: Uint128
    denom: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRewardsCollectorBaseSwapAssetMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRewardsCollectorBaseSwapAssetMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRewardsCollectorBaseSwapAssetMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.swapAsset(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRewardsCollectorBaseDistributeRewardsMutation {
  client: FuryRewardsCollectorBaseClient
  msg: {
    amount?: Uint128
    denom: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRewardsCollectorBaseDistributeRewardsMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRewardsCollectorBaseDistributeRewardsMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRewardsCollectorBaseDistributeRewardsMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.distributeRewards(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRewardsCollectorBaseWithdrawFromCreditManagerMutation {
  client: FuryRewardsCollectorBaseClient
  msg: {
    accountId: string
    actions: Action[]
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRewardsCollectorBaseWithdrawFromCreditManagerMutation(
  options?: Omit<
    UseMutationOptions<
      ExecuteResult,
      Error,
      FuryRewardsCollectorBaseWithdrawFromCreditManagerMutation
    >,
    'mutationFn'
  >,
) {
  return useMutation<
    ExecuteResult,
    Error,
    FuryRewardsCollectorBaseWithdrawFromCreditManagerMutation
  >(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.withdrawFromCreditManager(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRewardsCollectorBaseWithdrawFromRedBankMutation {
  client: FuryRewardsCollectorBaseClient
  msg: {
    amount?: Uint128
    denom: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRewardsCollectorBaseWithdrawFromRedBankMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRewardsCollectorBaseWithdrawFromRedBankMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRewardsCollectorBaseWithdrawFromRedBankMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.withdrawFromRedBank(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRewardsCollectorBaseUpdateConfigMutation {
  client: FuryRewardsCollectorBaseClient
  msg: {
    newCfg: UpdateConfig
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRewardsCollectorBaseUpdateConfigMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRewardsCollectorBaseUpdateConfigMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRewardsCollectorBaseUpdateConfigMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.updateConfig(msg, fee, memo, funds),
    options,
  )
}
export interface FuryRewardsCollectorBaseUpdateOwnerMutation {
  client: FuryRewardsCollectorBaseClient
  msg: OwnerUpdate
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryRewardsCollectorBaseUpdateOwnerMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryRewardsCollectorBaseUpdateOwnerMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryRewardsCollectorBaseUpdateOwnerMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.updateOwner(msg, fee, memo, funds),
    options,
  )
}
