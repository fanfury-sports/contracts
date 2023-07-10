// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { UseQueryOptions, useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { StdFee, Coin } from '@cosmjs/amino'
import {
  InstantiateMsg,
  ExecuteMsg,
  OwnerUpdate,
  QueryMsg,
  AccountKind,
  ConfigResponse,
  OwnerResponse,
  HealthState,
  Decimal,
  Uint128,
  HealthValuesResponse,
} from './MarsRoverHealth.types'
import { MarsRoverHealthQueryClient, MarsRoverHealthClient } from './MarsRoverHealth.client'
export const marsRoverHealthQueryKeys = {
  contract: [
    {
      contract: 'marsRoverHealth',
    },
  ] as const,
  address: (contractAddress: string | undefined) =>
    [{ ...marsRoverHealthQueryKeys.contract[0], address: contractAddress }] as const,
  healthValues: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...marsRoverHealthQueryKeys.address(contractAddress)[0], method: 'health_values', args },
    ] as const,
  healthState: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...marsRoverHealthQueryKeys.address(contractAddress)[0], method: 'health_state', args },
    ] as const,
  config: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...marsRoverHealthQueryKeys.address(contractAddress)[0], method: 'config', args }] as const,
}
export interface MarsRoverHealthReactQuery<TResponse, TData = TResponse> {
  client: MarsRoverHealthQueryClient | undefined
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    "'queryKey' | 'queryFn' | 'initialData'"
  > & {
    initialData?: undefined
  }
}
export interface MarsRoverHealthConfigQuery<TData>
  extends MarsRoverHealthReactQuery<ConfigResponse, TData> {}
export function useMarsRoverHealthConfigQuery<TData = ConfigResponse>({
  client,
  options,
}: MarsRoverHealthConfigQuery<TData>) {
  return useQuery<ConfigResponse, Error, TData>(
    marsRoverHealthQueryKeys.config(client?.contractAddress),
    () => (client ? client.config() : Promise.reject(new Error('Invalid client'))),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsRoverHealthHealthStateQuery<TData>
  extends MarsRoverHealthReactQuery<HealthState, TData> {
  args: {
    accountId: string
    kind: AccountKind
  }
}
export function useMarsRoverHealthHealthStateQuery<TData = HealthState>({
  client,
  args,
  options,
}: MarsRoverHealthHealthStateQuery<TData>) {
  return useQuery<HealthState, Error, TData>(
    marsRoverHealthQueryKeys.healthState(client?.contractAddress, args),
    () =>
      client
        ? client.healthState({
            accountId: args.accountId,
            kind: args.kind,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsRoverHealthHealthValuesQuery<TData>
  extends MarsRoverHealthReactQuery<HealthValuesResponse, TData> {
  args: {
    accountId: string
    kind: AccountKind
  }
}
export function useMarsRoverHealthHealthValuesQuery<TData = HealthValuesResponse>({
  client,
  args,
  options,
}: MarsRoverHealthHealthValuesQuery<TData>) {
  return useQuery<HealthValuesResponse, Error, TData>(
    marsRoverHealthQueryKeys.healthValues(client?.contractAddress, args),
    () =>
      client
        ? client.healthValues({
            accountId: args.accountId,
            kind: args.kind,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsRoverHealthUpdateConfigMutation {
  client: MarsRoverHealthClient
  msg: {
    creditManager: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsRoverHealthUpdateConfigMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsRoverHealthUpdateConfigMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsRoverHealthUpdateConfigMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.updateConfig(msg, fee, memo, funds),
    options,
  )
}
export interface MarsRoverHealthUpdateOwnerMutation {
  client: MarsRoverHealthClient
  msg: OwnerUpdate
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsRoverHealthUpdateOwnerMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsRoverHealthUpdateOwnerMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsRoverHealthUpdateOwnerMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.updateOwner(msg, fee, memo, funds),
    options,
  )
}
