import Exchange from './abstract/gate.js';
import type { Int, OrderSide, OrderType, OHLCV, Trade, FundingRateHistory, OpenInterest, Order, Balances, OrderRequest, FundingHistory, Str, Transaction, Ticker, OrderBook, Tickers, Greeks, Strings, Market, Currency, MarketInterface, TransferEntry, Leverage, Leverages, Num, OptionChain, Option, MarginModification, TradingFeeInterface, Currencies, TradingFees, Position, Dict, LeverageTier, LeverageTiers, int, CancellationRequest, LedgerEntry, FundingRate, FundingRates, DepositAddress, BorrowInterest } from './base/types.js';
/**
 * @class gate
 * @augments Exchange
 */
export default class gate extends Exchange {
    describe(): any;
    setSandboxMode(enable: boolean): void;
    loadUnifiedStatus(params?: {}): Promise<void>;
    upgradeUnifiedTradeAccount(params?: {}): Promise<any>;
    createExpiredOptionMarket(symbol: string): MarketInterface;
    safeMarket(marketId?: Str, market?: Market, delimiter?: Str, marketType?: Str): MarketInterface;
    fetchMarkets(params?: {}): Promise<Market[]>;
    fetchSpotMarkets(params?: {}): Promise<any[]>;
    fetchContractMarkets(params?: {}): Promise<any[]>;
    parseContractMarket(market: any, settleId: any): {
        id: string;
        symbol: string;
        base: string;
        quote: string;
        settle: string;
        baseId: string;
        quoteId: string;
        settleId: any;
        type: string;
        spot: boolean;
        margin: boolean;
        swap: boolean;
        future: boolean;
        option: boolean;
        active: boolean;
        contract: boolean;
        linear: boolean;
        inverse: boolean;
        taker: number;
        maker: number;
        contractSize: number;
        expiry: number;
        expiryDatetime: string;
        strike: any;
        optionType: any;
        precision: {
            amount: number;
            price: number;
        };
        limits: {
            leverage: {
                min: number;
                max: number;
            };
            amount: {
                min: number;
                max: number;
            };
            price: {
                min: number;
                max: number;
            };
            cost: {
                min: any;
                max: any;
            };
        };
        created: any;
        info: any;
    };
    fetchOptionMarkets(params?: {}): Promise<any[]>;
    fetchOptionUnderlyings(): Promise<any[]>;
    prepareRequest(market?: any, type?: any, params?: {}): Dict[];
    spotOrderPrepareRequest(market?: any, stop?: boolean, params?: {}): any[];
    multiOrderSpotPrepareRequest(market?: any, trigger?: boolean, params?: {}): any[];
    getMarginMode(stop: any, params: any): any[];
    getSettlementCurrencies(type: any, method: any): any;
    fetchCurrencies(params?: {}): Promise<Currencies>;
    fetchFundingRate(symbol: string, params?: {}): Promise<FundingRate>;
    fetchFundingRates(symbols?: Strings, params?: {}): Promise<FundingRates>;
    parseFundingRate(contract: any, market?: Market): FundingRate;
    parseFundingInterval(interval: any): string;
    fetchNetworkDepositAddress(code: string, params?: {}): Promise<Dict>;
    fetchDepositAddress(code: string, params?: {}): Promise<DepositAddress>;
    fetchTradingFee(symbol: string, params?: {}): Promise<TradingFeeInterface>;
    fetchTradingFees(params?: {}): Promise<TradingFees>;
    parseTradingFees(response: any): Dict;
    parseTradingFee(info: any, market?: Market): {
        info: any;
        symbol: string;
        maker: number;
        taker: number;
        percentage: any;
        tierBased: any;
    };
    fetchTransactionFees(codes?: Strings, params?: {}): Promise<Dict>;
    fetchDepositWithdrawFees(codes?: Strings, params?: {}): Promise<any>;
    parseDepositWithdrawFee(fee: any, currency?: Currency): Dict;
    fetchFundingHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<FundingHistory[]>;
    parseFundingHistories(response: any, symbol: any, since: any, limit: any): FundingHistory[];
    parseFundingHistory(info: any, market?: Market): {
        info: any;
        symbol: string;
        code: string;
        timestamp: number;
        datetime: string;
        id: any;
        amount: number;
    };
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    fetchTicker(symbol: string, params?: {}): Promise<Ticker>;
    parseTicker(ticker: Dict, market?: Market): Ticker;
    fetchTickers(symbols?: Strings, params?: {}): Promise<Tickers>;
    parseBalanceHelper(entry: any): import("./base/types.js").BalanceAccount;
    fetchBalance(params?: {}): Promise<Balances>;
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;
    fetchOptionOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;
    fetchFundingRateHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<FundingRateHistory[]>;
    parseOHLCV(ohlcv: any, market?: Market): OHLCV;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchOrderTrades(id: string, symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchMyTrades(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    parseTrade(trade: Dict, market?: Market): Trade;
    fetchDeposits(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    fetchWithdrawals(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    withdraw(code: string, amount: number, address: string, tag?: any, params?: {}): Promise<Transaction>;
    parseTransactionStatus(status: Str): string;
    parseTransactionType(type: any): string;
    parseTransaction(transaction: Dict, currency?: Currency): Transaction;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): Promise<Order>;
    createOrdersRequest(orders: OrderRequest[], params?: {}): any[];
    createOrders(orders: OrderRequest[], params?: {}): Promise<Order[]>;
    createOrderRequest(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): any;
    createMarketBuyOrderWithCost(symbol: string, cost: number, params?: {}): Promise<Order>;
    editOrderRequest(id: string, symbol: string, type: OrderType, side: OrderSide, amount?: Num, price?: Num, params?: {}): any;
    editOrder(id: string, symbol: string, type: OrderType, side: OrderSide, amount?: Num, price?: Num, params?: {}): Promise<Order>;
    parseOrderStatus(status: Str): string;
    parseOrder(order: Dict, market?: Market): Order;
    fetchOrderRequest(id: string, symbol?: Str, params?: {}): any[];
    fetchOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    fetchOpenOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchClosedOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    prepareOrdersByStatusRequest(status: any, symbol?: Str, since?: Int, limit?: Int, params?: {}): object[];
    fetchOrdersByStatus(status: any, symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    cancelOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    cancelOrders(ids: string[], symbol?: Str, params?: {}): Promise<Order[]>;
    cancelOrdersForSymbols(orders: CancellationRequest[], params?: {}): Promise<Order[]>;
    cancelAllOrders(symbol?: Str, params?: {}): Promise<Order[]>;
    transfer(code: string, amount: number, fromAccount: string, toAccount: string, params?: {}): Promise<TransferEntry>;
    parseTransfer(transfer: Dict, currency?: Currency): TransferEntry;
    setLeverage(leverage: Int, symbol?: Str, params?: {}): Promise<any>;
    parsePosition(position: Dict, market?: Market): Position;
    fetchPosition(symbol: string, params?: {}): Promise<Position>;
    fetchPositions(symbols?: Strings, params?: {}): Promise<Position[]>;
    fetchLeverageTiers(symbols?: Strings, params?: {}): Promise<LeverageTiers>;
    fetchMarketLeverageTiers(symbol: string, params?: {}): Promise<LeverageTier[]>;
    parseEmulatedLeverageTiers(info: any, market?: any): any[];
    parseMarketLeverageTiers(info: any, market?: Market): LeverageTier[];
    repayIsolatedMargin(symbol: string, code: string, amount: any, params?: {}): Promise<{
        id: number;
        currency: string;
        amount: number;
        symbol: string;
        timestamp: number;
        datetime: string;
        info: any;
    }>;
    repayCrossMargin(code: string, amount: any, params?: {}): Promise<{
        id: number;
        currency: string;
        amount: number;
        symbol: string;
        timestamp: number;
        datetime: string;
        info: any;
    }>;
    borrowIsolatedMargin(symbol: string, code: string, amount: number, params?: {}): Promise<{
        id: number;
        currency: string;
        amount: number;
        symbol: string;
        timestamp: number;
        datetime: string;
        info: any;
    }>;
    borrowCrossMargin(code: string, amount: number, params?: {}): Promise<{
        id: number;
        currency: string;
        amount: number;
        symbol: string;
        timestamp: number;
        datetime: string;
        info: any;
    }>;
    parseMarginLoan(info: any, currency?: Currency): {
        id: number;
        currency: string;
        amount: number;
        symbol: string;
        timestamp: number;
        datetime: string;
        info: any;
    };
    fetchBorrowInterest(code?: Str, symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<BorrowInterest[]>;
    parseBorrowInterest(info: Dict, market?: Market): BorrowInterest;
    sign(path: any, api?: any[], method?: string, params?: {}, headers?: any, body?: any): {
        url: any;
        method: string;
        body: any;
        headers: any;
    };
    modifyMarginHelper(symbol: string, amount: any, params?: {}): Promise<MarginModification>;
    parseMarginModification(data: Dict, market?: Market): MarginModification;
    reduceMargin(symbol: string, amount: number, params?: {}): Promise<MarginModification>;
    addMargin(symbol: string, amount: number, params?: {}): Promise<MarginModification>;
    fetchOpenInterestHistory(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OpenInterest[]>;
    parseOpenInterest(interest: any, market?: Market): {
        symbol: string;
        openInterestAmount: number;
        openInterestValue: number;
        timestamp: number;
        datetime: string;
        info: any;
    };
    fetchSettlementHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    fetchMySettlementHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<any>;
    parseSettlement(settlement: any, market: any): {
        info: any;
        symbol: string;
        price: number;
        timestamp: number;
        datetime: string;
    };
    parseSettlements(settlements: any, market: any): any[];
    fetchLedger(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<LedgerEntry[]>;
    parseLedgerEntry(item: Dict, currency?: Currency): LedgerEntry;
    parseLedgerEntryType(type: any): string;
    setPositionMode(hedged: boolean, symbol?: Str, params?: {}): Promise<any>;
    fetchUnderlyingAssets(params?: {}): Promise<any[]>;
    fetchLiquidations(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Liquidation[]>;
    fetchMyLiquidations(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Liquidation[]>;
    parseLiquidation(liquidation: any, market?: Market): import("./base/types.js").Liquidation;
    fetchGreeks(symbol: string, params?: {}): Promise<Greeks>;
    parseGreeks(greeks: Dict, market?: Market): Greeks;
    closePosition(symbol: string, side?: OrderSide, params?: {}): Promise<Order>;
    fetchLeverage(symbol: string, params?: {}): Promise<Leverage>;
    fetchLeverages(symbols?: Strings, params?: {}): Promise<Leverages>;
    parseLeverage(leverage: Dict, market?: Market): Leverage;
    fetchOption(symbol: string, params?: {}): Promise<Option>;
    fetchOptionChain(code: string, params?: {}): Promise<OptionChain>;
    parseOption(chain: Dict, currency?: Currency, market?: Market): Option;
    fetchPositionsHistory(symbols?: Strings, since?: Int, limit?: Int, params?: {}): Promise<Position[]>;
    handleErrors(code: int, reason: string, url: string, method: string, headers: Dict, body: string, response: any, requestHeaders: any, requestBody: any): any;
}
