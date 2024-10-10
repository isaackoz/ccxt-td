namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class oxfun
{
    /// <summary>
    /// retrieves data on all markets for bitmex
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-markets"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> an array of objects representing market data.</returns>
    public async Task<List<MarketInterface>> FetchMarkets(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchMarkets(parameters);
        return ((IList<object>)res).Select(item => new MarketInterface(item)).ToList<MarketInterface>();
    }
    /// <summary>
    /// fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-tickers"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}.</returns>
    public async Task<Tickers> FetchTickers(List<String> symbols = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchTickers(symbols, parameters);
        return new Tickers(res);
    }
    /// <summary>
    /// fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-tickers"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}.</returns>
    public async Task<Ticker> FetchTicker(string symbol, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchTicker(symbol, parameters);
        return new Ticker(res);
    }
    /// <summary>
    /// fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-candles"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest candle to fetch (default 24 hours ago)
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of candles to fetch (default 200, max 500)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : timestamp in ms of the latest candle to fetch (default now)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>int[][]</term> A list of candles ordered as timestamp, open, high, low, close, volume.</returns>
    public async Task<List<OHLCV>> FetchOHLCV(string symbol, string timeframe = "1m", Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOHLCV(symbol, timeframe, since, limit, parameters);
        return ((IList<object>)res).Select(item => new OHLCV(item)).ToList<OHLCV>();
    }
    /// <summary>
    /// fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-depth"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of order book entries to return (default 5, max 100)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols.</returns>
    public async Task<OrderBook> FetchOrderBook(string symbol, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOrderBook(symbol, limit, parameters);
        return new OrderBook(res);
    }
    /// <summary>
    /// fetch the current funding rates for multiple markets
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-funding-estimates"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Order[]</term> an array of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}.</returns>
    public async Task<FundingRates> FetchFundingRates(List<String> symbols = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchFundingRates(symbols, parameters);
        return new FundingRates(res);
    }
    /// <summary>
    /// Fetches the history of funding rates
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-funding-rates"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest trade to fetch (default 24 hours ago)
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of trades to fetch (default 200, max 500)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : timestamp in ms of the latest trade to fetch (default now)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Trade[]</term> a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}.</returns>
    public async Task<List<FundingRateHistory>> FetchFundingRateHistory(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchFundingRateHistory(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new FundingRateHistory(item)).ToList<FundingRateHistory>();
    }
    /// <summary>
    /// fetches the history of funding payments
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-funding"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest trade to fetch (default 24 hours ago)
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of trades to fetch (default 200, max 500)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : timestamp in ms of the latest trade to fetch (default now)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Trade[]</term> a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}.</returns>
    public async Task<List<FundingHistory>> FetchFundingHistory(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchFundingHistory(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new FundingHistory(item)).ToList<FundingHistory>();
    }
    /// <summary>
    /// retrieve information on the maximum leverage, and maintenance margin for trades of varying trade sizes, if a market has a leverage tier of 0, then the leverage tiers cannot be obtained for this market
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-leverage-tiers"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a dictionary of [leverage tiers structures]{@link https://docs.ccxt.com/#/?id=leverage-tiers-structure}, indexed by market symbols.</returns>
    public async Task<LeverageTiers> FetchLeverageTiers(List<String> symbols = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchLeverageTiers(symbols, parameters);
        return new LeverageTiers(res);
    }
    /// <summary>
    /// get the list of most recent trades for a particular symbol
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-exchange-trades"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest trade to fetch (default 24 hours ago)
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of trades to fetch (default 200, max 500)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : timestamp in ms of the latest trade to fetch (default now)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Trade[]</term> a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}.</returns>
    public async Task<List<Trade>> FetchTrades(string symbol, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchTrades(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Trade(item)).ToList<Trade>();
    }
    /// <summary>
    /// fetch all trades made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-trades"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch trades for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of trades to fetch (default 200, max 500)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : timestamp in ms of the latest trade to fetch (default now)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Trade[]</term> a list of [trade structures]{@link https://github.com/ccxt/ccxt/wiki/Manual#trade-structure}.</returns>
    public async Task<List<Trade>> FetchMyTrades(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchMyTrades(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Trade(item)).ToList<Trade>();
    }
    /// <summary>
    /// query for balance and get the amount of funds available for trading or funds locked in orders
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-balances"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.asset</term>
    /// <description>
    /// string : currency id, if empty the exchange returns info about all currencies
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.subAcc</term>
    /// <description>
    /// string : Name of sub account. If no subAcc is given, then the response contains only the account linked to the API-Key.
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}.</returns>
    public async Task<Balances> FetchBalance(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchBalance(parameters);
        return new Balances(res);
    }
    /// <summary>
    /// fetch subaccounts associated with a profile
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-account-names"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a dictionary of [account structures]{@link https://docs.ccxt.com/#/?id=account-structure} indexed by the account type.</returns>
    public async Task<List<Account>> FetchAccounts(Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchAccounts(parameters);
        return ((IList<object>)res).Select(item => new Account(item)).ToList<Account>();
    }
    /// <summary>
    /// transfer currency internally between wallets on the same account
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#post-v3-transfer"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}.</returns>
    public async Task<TransferEntry> Transfer(string code, double amount, string fromAccount, string toAccount, Dictionary<string, object> parameters = null)
    {
        var res = await this.transfer(code, amount, fromAccount, toAccount, parameters);
        return new TransferEntry(res);
    }
    /// <summary>
    /// fetch a history of internal transfers made on an account
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-transfer"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch transfers for (default 24 hours ago)
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of transfer structures to retrieve (default 50, max 200)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : the latest time in ms to fetch transfers for (default time now)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [transfer structures]{@link https://docs.ccxt.com/#/?id=transfer-structure}.</returns>
    public async Task<List<TransferEntry>> FetchTransfers(string code = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchTransfers(code, since, limit, parameters);
        return ((IList<object>)res).Select(item => new TransferEntry(item)).ToList<TransferEntry>();
    }
    /// <summary>
    /// fetch the deposit address for a currency associated with this account
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-deposit-addresses"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.network</term>
    /// <description>
    /// string : network for fetch deposit address
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}.</returns>
    public async Task<DepositAddress> FetchDepositAddress(string code, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchDepositAddress(code, parameters);
        return new DepositAddress(res);
    }
    /// <summary>
    /// fetch all deposits made to an account
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-deposit"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch transfers for (default 24 hours ago)
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of transfer structures to retrieve (default 50, max 200)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : the latest time in ms to fetch transfers for (default time now)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [transfer structures]{@link https://docs.ccxt.com/#/?id=transfer-structure}.</returns>
    public async Task<List<Transaction>> FetchDeposits(string code = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchDeposits(code, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Transaction(item)).ToList<Transaction>();
    }
    /// <summary>
    /// fetch all withdrawals made from an account
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-withdrawal"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch transfers for (default 24 hours ago)
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of transfer structures to retrieve (default 50, max 200)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.until</term>
    /// <description>
    /// int : the latest time in ms to fetch transfers for (default time now)
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}.</returns>
    public async Task<List<Transaction>> FetchWithdrawals(string code = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchWithdrawals(code, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Transaction(item)).ToList<Transaction>();
    }
    /// <summary>
    /// make a withdrawal
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#post-v3-withdrawal"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params.network</term>
    /// <description>
    /// string : network for withdraw
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.externalFee</term>
    /// <description>
    /// bool : if false, then the fee is taken from the quantity, also with the burn fee for asset SOLO
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.tfaType</term>
    /// <description>
    /// string : GOOGLE, or AUTHY_SECRET, or YUBIKEY, for 2FA
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.code</term>
    /// <description>
    /// string : 2FA code
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}.</returns>
    public async Task<Transaction> Withdraw(string code, double amount, string address, object tag = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.withdraw(code, amount, address, tag, parameters);
        return new Transaction(res);
    }
    /// <summary>
    /// fetch all open positions
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-positions"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.subAcc</term>
    /// <description>
    /// boolean :          * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}.</returns>
    public async Task<List<Position>> FetchPositions(List<String> symbols = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchPositions(symbols, parameters);
        return ((IList<object>)res).Select(item => new Position(item)).ToList<Position>();
    }
    /// <summary>
    /// create a trade order
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#post-v3-orders-place"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>price</term>
    /// <description>
    /// float : the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.clientOrderId</term>
    /// <description>
    /// int : a unique id for the order
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.timestamp</term>
    /// <description>
    /// int : in milliseconds. If an order reaches the matching engine and the current timestamp exceeds timestamp + recvWindow, then the order will be rejected.
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.recvWindow</term>
    /// <description>
    /// int : in milliseconds. If an order reaches the matching engine and the current timestamp exceeds timestamp + recvWindow, then the order will be rejected. If timestamp is provided without recvWindow, then a default recvWindow of 1000ms is used.
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.responseType</term>
    /// <description>
    /// string : FULL or ACK
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.cost</term>
    /// <description>
    /// float : the quote quantity that can be used as an alternative for the amount for market buy orders
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.triggerPrice</term>
    /// <description>
    /// float : The price at which a trigger order is triggered at
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.limitPrice</term>
    /// <description>
    /// float : Limit price for the STOP_LIMIT order
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.postOnly</term>
    /// <description>
    /// bool : if true, the order will only be posted if it will be a maker order
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.timeInForce</term>
    /// <description>
    /// string : GTC (default), IOC, FOK, PO, MAKER_ONLY or MAKER_ONLY_REPRICE (reprices order to the best maker only price if the specified price were to lead to a taker trade)
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.selfTradePreventionMode</term>
    /// <description>
    /// string : NONE, EXPIRE_MAKER, EXPIRE_TAKER or EXPIRE_BOTH for more info check here {@link https://docs.ox.fun/?json#self-trade-prevention-modes}
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.displayQuantity</term>
    /// <description>
    /// string : for an iceberg order, pass both quantity and displayQuantity fields in the order request
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> CreateOrder(string symbol, string type, string side, double amount, double? price2 = 0, Dictionary<string, object> parameters = null)
    {
        var price = price2 == 0 ? null : (object)price2;
        var res = await this.createOrder(symbol, type, side, amount, price, parameters);
        return new Order(res);
    }
    /// <summary>
    /// create a list of trade orders
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#post-v3-orders-place"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.timestamp</term>
    /// <description>
    /// int : *for all orders* in milliseconds. If orders reach the matching engine and the current timestamp exceeds timestamp + recvWindow, then all orders will be rejected.
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.recvWindow</term>
    /// <description>
    /// int : *for all orders* in milliseconds. If orders reach the matching engine and the current timestamp exceeds timestamp + recvWindow, then all orders will be rejected. If timestamp is provided without recvWindow, then a default recvWindow of 1000ms is used.
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.responseType</term>
    /// <description>
    /// string : *for all orders* FULL or ACK
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Order>> CreateOrders(List<OrderRequest> orders, Dictionary<string, object> parameters = null)
    {
        var res = await this.createOrders(orders, parameters);
        return ((IList<object>)res).Select(item => new Order(item)).ToList<Order>();
    }
    public Dictionary<string, object> CreateOrderRequest(string symbol, string type, string side, object amount, object price = null, Dictionary<string, object> parameters = null)
    {
        var res = this.createOrderRequest(symbol, type, side, amount, price, parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// create a market buy order by providing the symbol and cost
    /// </summary>
    /// <remarks>
    /// See <see href="https://open.big.one/docs/spot_orders.html#create-order"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> CreateMarketBuyOrderWithCost(string symbol, double cost, Dictionary<string, object> parameters = null)
    {
        var res = await this.createMarketBuyOrderWithCost(symbol, cost, parameters);
        return new Order(res);
    }
    /// <summary>
    /// fetches information on an order made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-orders-status"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>symbol</term>
    /// <description>
    /// string : not used by oxfun fetchOrder
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.clientOrderId</term>
    /// <description>
    /// int : the client order id of the order
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> FetchOrder(string id, string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.fetchOrder(id, symbol, parameters);
        return new Order(res);
    }
    /// <summary>
    /// fetch all unfilled currently open orders
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#get-v3-orders-working"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch open orders for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of  open orders structures to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.orderId</term>
    /// <description>
    /// int : a unique id for the order
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.clientOrderId</term>
    /// <description>
    /// int : the client order id of the order
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>Order[]</term> a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Order>> FetchOpenOrders(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.fetchOpenOrders(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Order(item)).ToList<Order>();
    }
    /// <summary>
    /// cancels an open order
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#delete-v3-orders-cancel"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.clientOrderId</term>
    /// <description>
    /// int : a unique id for the order
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.timestamp</term>
    /// <description>
    /// int : in milliseconds
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.recvWindow</term>
    /// <description>
    /// int : in milliseconds
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.responseType</term>
    /// <description>
    /// string : 'FULL' or 'ACK'
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<Order> CancelOrder(string id, string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.cancelOrder(id, symbol, parameters);
        return new Order(res);
    }
    /// <summary>
    /// cancel all open orders
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#delete-v3-orders-cancel-all"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> response from exchange.</returns>
    public async Task<Dictionary<string, object>> CancelAllOrders(string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.cancelAllOrders(symbol, parameters);
        return ((Dictionary<string, object>)res);
    }
    /// <summary>
    /// cancel multiple orders
    /// </summary>
    /// <remarks>
    /// See <see href="https://docs.ox.fun/?json#delete-v3-orders-cancel"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>symbol</term>
    /// <description>
    /// string : unified market symbol
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.timestamp</term>
    /// <description>
    /// int : in milliseconds
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.recvWindow</term>
    /// <description>
    /// int : in milliseconds
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.responseType</term>
    /// <description>
    /// string : 'FULL' or 'ACK'
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Order>> CancelOrders(List<string> ids, string symbol = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.cancelOrders(ids, symbol, parameters);
        return ((IList<object>)res).Select(item => new Order(item)).ToList<Order>();
    }
}
