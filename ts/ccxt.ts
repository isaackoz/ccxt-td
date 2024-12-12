/*

MIT License

Copyright (c) 2017 Igor Kroitor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

//-----------------------------------------------------------------------------


/* eslint-disable */

import { Exchange }  from './src/base/Exchange.js'
import { Precise }   from './src/base/Precise.js'
import * as functions from './src/base/functions.js'
import * as errors   from './src/base/errors.js'
import type { Int, int, Str, Strings, Num, Bool, IndexType, OrderSide, OrderType, MarketType, SubType, Dict, NullableDict, List, NullableList, Fee, OHLCV, OHLCVC, implicitReturnType, Market, Currency, Dictionary, MinMax, FeeInterface, TradingFeeInterface, MarketInterface, Trade, Order, OrderBook, Ticker, Transaction, Tickers, CurrencyInterface, Balance, BalanceAccount, Account, PartialBalances, Balances, DepositAddress, WithdrawalResponse, DepositAddressResponse, FundingRate, FundingRates, Position, BorrowInterest, LeverageTier, LedgerEntry, DepositWithdrawFeeNetwork, DepositWithdrawFee, TransferEntry, CrossBorrowRate, IsolatedBorrowRate, FundingRateHistory, OpenInterest, Liquidation, OrderRequest, CancellationRequest, FundingHistory, MarketMarginModes, MarginMode, Greeks, Conversion, Option, LastPrice, Leverage, MarginModification, Leverages, LastPrices, Currencies, TradingFees, MarginModes, OptionChain, IsolatedBorrowRates, CrossBorrowRates, LeverageTiers, LongShortRatio } from './src/base/types.js'
import {BaseError, ExchangeError, AuthenticationError, PermissionDenied, AccountNotEnabled, AccountSuspended, ArgumentsRequired, BadRequest, BadSymbol, OperationRejected, NoChange, MarginModeAlreadySet, MarketClosed, ManualInteractionNeeded, InsufficientFunds, InvalidAddress, AddressPending, InvalidOrder, OrderNotFound, OrderNotCached, OrderImmediatelyFillable, OrderNotFillable, DuplicateOrderId, ContractUnavailable, NotSupported, InvalidProxySettings, ExchangeClosedByUser, OperationFailed, NetworkError, DDoSProtection, RateLimitExceeded, ExchangeNotAvailable, OnMaintenance, InvalidNonce, ChecksumError, RequestTimeout, BadResponse, NullResponse, CancelPending, UnsubscribeError}  from './src/base/errors.js'


//-----------------------------------------------------------------------------
// this is updated by vss.js when building

const version = '4.4.39';

(Exchange as any).ccxtVersion = version

//-----------------------------------------------------------------------------

import bybit from  './src/bybit.js'
import coinbase from  './src/coinbase.js'
import kraken from  './src/kraken.js'


// pro exchanges
import bybitPro from  './src/pro/bybit.js'
import coinbasePro from  './src/pro/coinbase.js'
import krakenPro from  './src/pro/kraken.js'

const exchanges = {
    'bybit':                  bybit,
    'coinbase':               coinbase,
    'kraken':                 kraken,
}

const pro = {
    'bybit':                  bybitPro,
    'coinbase':               coinbasePro,
    'kraken':                 krakenPro,
}

for (const exchange in pro) {
    // const ccxtExchange = exchanges[exchange]
    // const baseExchange = Object.getPrototypeOf (ccxtExchange)
    // if (baseExchange.name === 'Exchange') {
    //     Object.setPrototypeOf (ccxtExchange, wsExchange)
    //     Object.setPrototypeOf (ccxtExchange.prototype, wsExchange.prototype)
    // }
}

(pro as any).exchanges = Object.keys (pro)
pro['Exchange'] = Exchange // now the same for rest and ts
//-----------------------------------------------------------------------------

const ccxt = Object.assign ({ version, Exchange, Precise, 'exchanges': Object.keys (exchanges), 'pro': pro}, exchanges, functions, errors)

export {
    version,
    Exchange,
    exchanges,
    pro,
    Precise,
    functions,
    errors,
    BaseError,
    ExchangeError,
    AuthenticationError,
    PermissionDenied,
    AccountNotEnabled,
    AccountSuspended,
    ArgumentsRequired,
    BadRequest,
    BadSymbol,
    OperationRejected,
    NoChange,
    MarginModeAlreadySet,
    MarketClosed,
    ManualInteractionNeeded,
    InsufficientFunds,
    InvalidAddress,
    AddressPending,
    InvalidOrder,
    OrderNotFound,
    OrderNotCached,
    OrderImmediatelyFillable,
    OrderNotFillable,
    DuplicateOrderId,
    ContractUnavailable,
    NotSupported,
    InvalidProxySettings,
    ExchangeClosedByUser,
    OperationFailed,
    NetworkError,
    DDoSProtection,
    RateLimitExceeded,
    ExchangeNotAvailable,
    OnMaintenance,
    InvalidNonce,
    ChecksumError,
    RequestTimeout,
    BadResponse,
    NullResponse,
    CancelPending,
    UnsubscribeError,
    Int,
    int,
    Str,
    Strings,
    Num,
    Bool,
    IndexType,
    OrderSide,
    OrderType,
    MarketType,
    SubType,
    Dict,
    NullableDict,
    List,
    NullableList,
    Fee,
    OHLCV,
    OHLCVC,
    implicitReturnType,
    Market,
    Currency,
    Dictionary,
    MinMax,
    FeeInterface,
    TradingFeeInterface,
    MarketMarginModes,
    MarketInterface,
    Trade,
    Order,
    OrderBook,
    Ticker,
    Transaction,
    Tickers,
    CurrencyInterface,
    Balance,
    BalanceAccount,
    Account,
    PartialBalances,
    Balances,
    DepositAddress,
    WithdrawalResponse,
    DepositAddressResponse,
    FundingRate,
    FundingRates,
    Position,
    BorrowInterest,
    LeverageTier,
    LedgerEntry,
    DepositWithdrawFeeNetwork,
    DepositWithdrawFee,
    TransferEntry,
    CrossBorrowRate,
    IsolatedBorrowRate,
    FundingRateHistory,
    OpenInterest,
    Liquidation,
    OrderRequest,
    CancellationRequest,
    FundingHistory,
    MarginMode,
    Greeks,
    Conversion,
    Option,
    LastPrice,
    Leverage,
    LongShortRatio,
    MarginModification,
    Leverages,
    LastPrices,
    Currencies,
    TradingFees,
    MarginModes,
    OptionChain,
    IsolatedBorrowRates,
    CrossBorrowRates,
    LeverageTiers,
    bybit,
    coinbase,
    kraken,    
}

export default ccxt;

//-----------------------------------------------------------------------------
