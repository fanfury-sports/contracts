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
  Empty,
  ExecuteMsg,
  OsmosisPriceSourceForString,
  Decimal,
  Downtime,
  Identifier,
  TwapKind,
  OwnerUpdate,
  DowntimeDetector,
  RedemptionRateForString,
  Twap,
  QueryMsg,
  ActionKind,
  ConfigResponse,
  PriceResponse,
  PriceSourceResponseForString,
  ArrayOfPriceSourceResponseForString,
  ArrayOfPriceResponse,
} from './FuryOracleOsmosis.types'
import { FuryOracleOsmosisQueryClient, FuryOracleOsmosisClient } from './FuryOracleOsmosis.client'
export const furyOracleOsmosisQueryKeys = {
  contract: [
    {
      contract: 'furyOracleOsmosis',
    },
  ] as const,
  address: (contractAddress: string | undefined) =>
    [{ ...furyOracleOsmosisQueryKeys.contract[0], address: contractAddress }] as const,
  config: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyOracleOsmosisQueryKeys.address(contractAddress)[0], method: 'config', args },
    ] as const,
  priceSource: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyOracleOsmosisQueryKeys.address(contractAddress)[0], method: 'price_source', args },
    ] as const,
  priceSources: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyOracleOsmosisQueryKeys.address(contractAddress)[0], method: 'price_sources', args },
    ] as const,
  price: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...furyOracleOsmosisQueryKeys.address(contractAddress)[0], method: 'price', args }] as const,
  prices: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...furyOracleOsmosisQueryKeys.address(contractAddress)[0], method: 'prices', args },
    ] as const,
}
export interface FuryOracleOsmosisReactQuery<TResponse, TData = TResponse> {
  client: FuryOracleOsmosisQueryClient | undefined
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    "'queryKey' | 'queryFn' | 'initialData'"
  > & {
    initialData?: undefined
  }
}
export interface FuryOracleOsmosisPricesQuery<TData>
  extends FuryOracleOsmosisReactQuery<ArrayOfPriceResponse, TData> {
  args: {
    kind?: ActionKind
    limit?: number
    startAfter?: string
  }
}
export function useFuryOracleOsmosisPricesQuery<TData = ArrayOfPriceResponse>({
  client,
  args,
  options,
}: FuryOracleOsmosisPricesQuery<TData>) {
  return useQuery<ArrayOfPriceResponse, Error, TData>(
    furyOracleOsmosisQueryKeys.prices(client?.contractAddress, args),
    () =>
      client
        ? client.prices({
            kind: args.kind,
            limit: args.limit,
            startAfter: args.startAfter,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryOracleOsmosisPriceQuery<TData>
  extends FuryOracleOsmosisReactQuery<PriceResponse, TData> {
  args: {
    denom: string
    kind?: ActionKind
  }
}
export function useFuryOracleOsmosisPriceQuery<TData = PriceResponse>({
  client,
  args,
  options,
}: FuryOracleOsmosisPriceQuery<TData>) {
  return useQuery<PriceResponse, Error, TData>(
    furyOracleOsmosisQueryKeys.price(client?.contractAddress, args),
    () =>
      client
        ? client.price({
            denom: args.denom,
            kind: args.kind,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryOracleOsmosisPriceSourcesQuery<TData>
  extends FuryOracleOsmosisReactQuery<ArrayOfPriceSourceResponseForString, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export function useFuryOracleOsmosisPriceSourcesQuery<TData = ArrayOfPriceSourceResponseForString>({
  client,
  args,
  options,
}: FuryOracleOsmosisPriceSourcesQuery<TData>) {
  return useQuery<ArrayOfPriceSourceResponseForString, Error, TData>(
    furyOracleOsmosisQueryKeys.priceSources(client?.contractAddress, args),
    () =>
      client
        ? client.priceSources({
            limit: args.limit,
            startAfter: args.startAfter,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryOracleOsmosisPriceSourceQuery<TData>
  extends FuryOracleOsmosisReactQuery<PriceSourceResponseForString, TData> {
  args: {
    denom: string
  }
}
export function useFuryOracleOsmosisPriceSourceQuery<TData = PriceSourceResponseForString>({
  client,
  args,
  options,
}: FuryOracleOsmosisPriceSourceQuery<TData>) {
  return useQuery<PriceSourceResponseForString, Error, TData>(
    furyOracleOsmosisQueryKeys.priceSource(client?.contractAddress, args),
    () =>
      client
        ? client.priceSource({
            denom: args.denom,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryOracleOsmosisConfigQuery<TData>
  extends FuryOracleOsmosisReactQuery<ConfigResponse, TData> {}
export function useFuryOracleOsmosisConfigQuery<TData = ConfigResponse>({
  client,
  options,
}: FuryOracleOsmosisConfigQuery<TData>) {
  return useQuery<ConfigResponse, Error, TData>(
    furyOracleOsmosisQueryKeys.config(client?.contractAddress),
    () => (client ? client.config() : Promise.reject(new Error('Invalid client'))),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface FuryOracleOsmosisCustomMutation {
  client: FuryOracleOsmosisClient
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryOracleOsmosisCustomMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryOracleOsmosisCustomMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryOracleOsmosisCustomMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.custom(msg, fee, memo, funds),
    options,
  )
}
export interface FuryOracleOsmosisUpdateConfigMutation {
  client: FuryOracleOsmosisClient
  msg: {
    baseDenom?: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryOracleOsmosisUpdateConfigMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryOracleOsmosisUpdateConfigMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryOracleOsmosisUpdateConfigMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.updateConfig(msg, fee, memo, funds),
    options,
  )
}
export interface FuryOracleOsmosisUpdateOwnerMutation {
  client: FuryOracleOsmosisClient
  msg: OwnerUpdate
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryOracleOsmosisUpdateOwnerMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryOracleOsmosisUpdateOwnerMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryOracleOsmosisUpdateOwnerMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.updateOwner(msg, fee, memo, funds),
    options,
  )
}
export interface FuryOracleOsmosisRemovePriceSourceMutation {
  client: FuryOracleOsmosisClient
  msg: {
    denom: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryOracleOsmosisRemovePriceSourceMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryOracleOsmosisRemovePriceSourceMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryOracleOsmosisRemovePriceSourceMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.removePriceSource(msg, fee, memo, funds),
    options,
  )
}
export interface FuryOracleOsmosisSetPriceSourceMutation {
  client: FuryOracleOsmosisClient
  msg: {
    denom: string
    priceSource: OsmosisPriceSourceForString
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useFuryOracleOsmosisSetPriceSourceMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, FuryOracleOsmosisSetPriceSourceMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, FuryOracleOsmosisSetPriceSourceMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.setPriceSource(msg, fee, memo, funds),
    options,
  )
}
