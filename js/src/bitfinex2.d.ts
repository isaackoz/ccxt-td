import Exchange from './abstract/bitfinex2.js';
import type { TransferEntry, Int, OrderSide, OrderType, Trade, OHLCV, Order, FundingRateHistory, OrderBook, Str, Transaction, Ticker, Balances, Tickers, Strings, Currency, Market, OpenInterest, Liquidation, OrderRequest, Num, MarginModification, Currencies, TradingFees, Dict, LedgerEntry, FundingRate, FundingRates } from './base/types.js';
/**
 * @class bitfinex2
 * @augments Exchange
 */
export default class bitfinex2 extends Exchange {
    describe(): any;
    isFiat(code: any): boolean;
    getCurrencyId(code: any): string;
    getCurrencyName(code: any): any;
    amountToPrecision(symbol: any, amount: any): string;
    priceToPrecision(symbol: any, price: any): string;
    fetchStatus(params?: {}): Promise<{
        status: string;
        updated: any;
        eta: any;
        url: any;
        info: any;
    }>;
    fetchMarkets(params?: {}): Promise<Market[]>;
    fetchCurrencies(params?: {}): Promise<Currencies>;
    fetchBalance(params?: {}): Promise<Balances>;
    transfer(code: string, amount: number, fromAccount: string, toAccount: string, params?: {}): Promise<TransferEntry>;
    parseTransfer(transfer: Dict, currency?: Currency): TransferEntry;
    parseTransferStatus(status: Str): Str;
    convertDerivativesId(currency: any, type: any): any;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<OrderBook>;
    parseTicker(ticker: Dict, market?: Market): Ticker;
    fetchTickers(symbols?: Strings, params?: {}): Promise<Tickers>;
    fetchTicker(symbol: string, params?: {}): Promise<Ticker>;
    parseTrade(trade: Dict, market?: Market): Trade;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;
    parseOHLCV(ohlcv: any, market?: Market): OHLCV;
    parseOrderStatus(status: Str): string;
    parseOrderFlags(flags: any): any;
    parseTimeInForce(orderType: any): string;
    parseOrder(order: Dict, market?: Market): Order;
    createOrderRequest(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): any;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: {}): Promise<Order>;
    createOrders(orders: OrderRequest[], params?: {}): Promise<Order[]>;
    cancelAllOrders(symbol?: Str, params?: {}): Promise<Order[]>;
    cancelOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    cancelOrders(ids: any, symbol?: Str, params?: {}): Promise<Order[]>;
    fetchOpenOrder(id: string, symbol?: Str, params?: {}): Promise<any>;
    fetchClosedOrder(id: string, symbol?: Str, params?: {}): Promise<any>;
    fetchOpenOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchClosedOrders(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Order[]>;
    fetchOrderTrades(id: string, symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    fetchMyTrades(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<Trade[]>;
    createDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        address: string;
        tag: string;
        network: any;
        info: any;
    }>;
    fetchDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        address: string;
        tag: string;
        network: any;
        info: any;
    }>;
    parseTransactionStatus(status: Str): string;
    parseTransaction(transaction: Dict, currency?: Currency): Transaction;
    fetchTradingFees(params?: {}): Promise<TradingFees>;
    fetchDepositsWithdrawals(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<Transaction[]>;
    withdraw(code: string, amount: number, address: string, tag?: any, params?: {}): Promise<any>;
    fetchPositions(symbols?: Strings, params?: {}): Promise<import("./base/types.js").Position[]>;
    parsePosition(position: Dict, market?: Market): import("./base/types.js").Position;
    nonce(): number;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(statusCode: any, statusText: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): any;
    parseLedgerEntryType(type: Str): string;
    parseLedgerEntry(item: Dict, currency?: Currency): LedgerEntry;
    fetchLedger(code?: Str, since?: Int, limit?: Int, params?: {}): Promise<LedgerEntry[]>;
    fetchFundingRates(symbols?: Strings, params?: {}): Promise<FundingRates>;
    fetchFundingRateHistory(symbol?: Str, since?: Int, limit?: Int, params?: {}): Promise<FundingRateHistory[]>;
    parseFundingRate(contract: any, market?: Market): FundingRate;
    parseFundingRateHistory(contract: any, market?: Market): {
        info: any;
        symbol: string;
        markPrice: number;
        indexPrice: number;
        interestRate: any;
        estimatedSettlePrice: any;
        timestamp: number;
        datetime: string;
        fundingRate: number;
        fundingTimestamp: any;
        fundingDatetime: any;
        nextFundingRate: number;
        nextFundingTimestamp: number;
        nextFundingDatetime: string;
        previousFundingRate: any;
        previousFundingTimestamp: any;
        previousFundingDatetime: any;
    };
    fetchOpenInterest(symbol: string, params?: {}): Promise<OpenInterest>;
    fetchOpenInterestHistory(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OpenInterest[]>;
    parseOpenInterest(interest: any, market?: Market): OpenInterest;
    fetchLiquidations(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<Liquidation[]>;
    parseLiquidation(liquidation: any, market?: Market): Liquidation;
    setMargin(symbol: string, amount: number, params?: {}): Promise<MarginModification>;
    parseMarginModification(data: any, market?: any): MarginModification;
    fetchOrder(id: string, symbol?: Str, params?: {}): Promise<Order>;
    editOrder(id: string, symbol: string, type: OrderType, side: OrderSide, amount?: Num, price?: Num, params?: {}): Promise<Order>;
}
