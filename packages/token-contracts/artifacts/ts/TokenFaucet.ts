/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
} from "@alephium/web3";
import { default as TokenFaucetContractJson } from "../TokenFaucet.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace TokenFaucetTypes {
  export type Fields = {
    symbol: HexString;
    name: HexString;
    decimals: bigint;
    supply: bigint;
    balance: bigint;
  };

  export type State = ContractState<Fields>;

  export type WithdrawEvent = ContractEvent<{ to: Address; amount: bigint }>;

  export interface CallMethodTable {
    getSymbol: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getDecimals: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTotalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    balance: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
}

class Factory extends ContractFactory<
  TokenFaucetInstance,
  TokenFaucetTypes.Fields
> {
  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as TokenFaucetTypes.Fields;
  }

  eventIndex = { Withdraw: 0 };
  consts = { ErrorCodes: { InvalidWithdrawAmount: BigInt(0) } };

  at(address: string): TokenFaucetInstance {
    return new TokenFaucetInstance(address);
  }

  tests = {
    getSymbol: async (
      params: Omit<
        TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getSymbol", params);
    },
    getName: async (
      params: Omit<
        TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getName", params);
    },
    getDecimals: async (
      params: Omit<
        TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getDecimals", params);
    },
    getTotalSupply: async (
      params: Omit<
        TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getTotalSupply", params);
    },
    balance: async (
      params: Omit<
        TestContractParamsWithoutMaps<TokenFaucetTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "balance", params);
    },
    withdraw: async (
      params: TestContractParamsWithoutMaps<
        TokenFaucetTypes.Fields,
        { amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "withdraw", params);
    },
  };
}

// Use this object to test and deploy the contract
export const TokenFaucet = new Factory(
  Contract.fromJson(
    TokenFaucetContractJson,
    "=20-2+69=101+3a0007e02=1+75468652063757272656e742062616c616e63652069732000=50",
    "af0081ddaef82da142ff617b51eb3f6e938ac67630e465b24ea1f4dec61fe5a6"
  )
);

// Use this class to interact with the blockchain
export class TokenFaucetInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<TokenFaucetTypes.State> {
    return fetchContractState(TokenFaucet, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeWithdrawEvent(
    options: EventSubscribeOptions<TokenFaucetTypes.WithdrawEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      TokenFaucet.contract,
      this,
      options,
      "Withdraw",
      fromCount
    );
  }

  methods = {
    getSymbol: async (
      params?: TokenFaucetTypes.CallMethodParams<"getSymbol">
    ): Promise<TokenFaucetTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        TokenFaucet,
        this,
        "getSymbol",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getName: async (
      params?: TokenFaucetTypes.CallMethodParams<"getName">
    ): Promise<TokenFaucetTypes.CallMethodResult<"getName">> => {
      return callMethod(
        TokenFaucet,
        this,
        "getName",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getDecimals: async (
      params?: TokenFaucetTypes.CallMethodParams<"getDecimals">
    ): Promise<TokenFaucetTypes.CallMethodResult<"getDecimals">> => {
      return callMethod(
        TokenFaucet,
        this,
        "getDecimals",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTotalSupply: async (
      params?: TokenFaucetTypes.CallMethodParams<"getTotalSupply">
    ): Promise<TokenFaucetTypes.CallMethodResult<"getTotalSupply">> => {
      return callMethod(
        TokenFaucet,
        this,
        "getTotalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    balance: async (
      params?: TokenFaucetTypes.CallMethodParams<"balance">
    ): Promise<TokenFaucetTypes.CallMethodResult<"balance">> => {
      return callMethod(
        TokenFaucet,
        this,
        "balance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends TokenFaucetTypes.MultiCallParams>(
    calls: Calls
  ): Promise<TokenFaucetTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      TokenFaucet,
      this,
      calls,
      getContractByCodeHash
    )) as TokenFaucetTypes.MultiCallResults<Calls>;
  }
}
