namespace ccxt.pro;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class bitstamp { public bitstamp(object args = null) : base(args) { } }
public partial class bitstamp : ccxt.bitstamp
{
    public override object describe()
    {
        return this.deepExtend(base.describe(), new Dictionary<string, object>() {
            { "has", new Dictionary<string, object>() {
                { "ws", true },
                { "watchOrderBook", true },
                { "watchOrders", true },
                { "watchTrades", true },
                { "watchTradesForSymbols", false },
                { "watchOHLCV", false },
                { "watchTicker", false },
                { "watchTickers", false },
            } },
            { "urls", new Dictionary<string, object>() {
                { "api", new Dictionary<string, object>() {
                    { "ws", "wss://ws.bitstamp.net" },
                } },
            } },
            { "options", new Dictionary<string, object>() {
                { "expiresIn", "" },
                { "userId", "" },
                { "wsSessionToken", "" },
                { "watchOrderBook", new Dictionary<string, object>() {
                    { "snapshotDelay", 6 },
                    { "snapshotMaxRetries", 3 },
                } },
                { "tradesLimit", 1000 },
                { "OHLCVLimit", 1000 },
            } },
            { "exceptions", new Dictionary<string, object>() {
                { "exact", new Dictionary<string, object>() {
                    { "4009", typeof(AuthenticationError) },
                } },
            } },
        });
    }

    /**
     * @method
     * @name bitstamp#watchOrderBook
     * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    public async override Task<object> watchOrderBook(object symbol, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        symbol = getValue(market, "symbol");
        object messageHash = add("orderbook:", symbol);
        object channel = add("diff_order_book_", getValue(market, "id"));
        object url = getValue(getValue(this.urls, "api"), "ws");
        object request = new Dictionary<string, object>() {
            { "event", "bts:subscribe" },
            { "data", new Dictionary<string, object>() {
                { "channel", channel },
            } },
        };
        object message = this.extend(request, parameters);
        object orderbook = await this.watch(url, messageHash, message, messageHash);
        return (orderbook as IOrderBook).limit();
    }

    public virtual void handleOrderBook(WebSocketClient client, object message)
    {
        //
        // initial snapshot is fetched with ccxt's fetchOrderBook
        // the feed does not include a snapshot, just the deltas
        //
        //     {
        //         "data": {
        //             "timestamp": "1583656800",
        //             "microtimestamp": "1583656800237527",
        //             "bids": [
        //                 ["8732.02", "0.00002478", "1207590500704256"],
        //                 ["8729.62", "0.01600000", "1207590502350849"],
        //                 ["8727.22", "0.01800000", "1207590504296448"],
        //             ],
        //             "asks": [
        //                 ["8735.67", "2.00000000", "1207590693249024"],
        //                 ["8735.67", "0.01700000", "1207590693634048"],
        //                 ["8735.68", "1.53294500", "1207590692048896"],
        //             ],
        //         },
        //         "event": "data",
        //         "channel": "diff_order_book_btcusd"
        //     }
        //
        object channel = this.safeString(message, "channel");
        object parts = ((string)channel).Split(new [] {((string)"_")}, StringSplitOptions.None).ToList<object>();
        object marketId = this.safeString(parts, 3);
        object symbol = this.safeSymbol(marketId);
        object storedOrderBook = this.safeValue(this.orderbooks, symbol);
        object nonce = this.safeValue(storedOrderBook, "nonce");
        object delta = this.safeValue(message, "data");
        object deltaNonce = this.safeInteger(delta, "microtimestamp");
        object messageHash = add("orderbook:", symbol);
        if (isTrue(isEqual(nonce, null)))
        {
            object cacheLength = getArrayLength((storedOrderBook as ccxt.pro.OrderBook).cache);
            // the rest API is very delayed
            // usually it takes at least 4-5 deltas to resolve
            object snapshotDelay = this.handleOption("watchOrderBook", "snapshotDelay", 6);
            if (isTrue(isEqual(cacheLength, snapshotDelay)))
            {
                this.spawn(this.loadOrderBook, new object[] { client, messageHash, symbol, null, new Dictionary<string, object>() {}});
            }
            ((IList<object>)(storedOrderBook as ccxt.pro.OrderBook).cache).Add(delta);
            return;
        } else if (isTrue(isGreaterThanOrEqual(nonce, deltaNonce)))
        {
            return;
        }
        this.handleDelta(storedOrderBook, delta);
        callDynamically(client as WebSocketClient, "resolve", new object[] {storedOrderBook, messageHash});
    }

    public override void handleDelta(object orderbook, object delta)
    {
        object timestamp = this.safeTimestamp(delta, "timestamp");
        ((IDictionary<string,object>)orderbook)["timestamp"] = timestamp;
        ((IDictionary<string,object>)orderbook)["datetime"] = this.iso8601(timestamp);
        ((IDictionary<string,object>)orderbook)["nonce"] = this.safeInteger(delta, "microtimestamp");
        object bids = this.safeValue(delta, "bids", new List<object>() {});
        object asks = this.safeValue(delta, "asks", new List<object>() {});
        object storedBids = getValue(orderbook, "bids");
        object storedAsks = getValue(orderbook, "asks");
        this.handleBidAsks(storedBids, bids);
        this.handleBidAsks(storedAsks, asks);
    }

    public virtual void handleBidAsks(object bookSide, object bidAsks)
    {
        for (object i = 0; isLessThan(i, getArrayLength(bidAsks)); postFixIncrement(ref i))
        {
            object bidAsk = this.parseBidAsk(getValue(bidAsks, i));
            (bookSide as IOrderBookSide).storeArray(bidAsk);
        }
    }

    public override object getCacheIndex(object orderbook, object deltas)
    {
        // we will consider it a fail
        object firstElement = getValue(deltas, 0);
        object firstElementNonce = this.safeInteger(firstElement, "microtimestamp");
        object nonce = this.safeInteger(orderbook, "nonce");
        if (isTrue(isLessThan(nonce, firstElementNonce)))
        {
            return -1;
        }
        for (object i = 0; isLessThan(i, getArrayLength(deltas)); postFixIncrement(ref i))
        {
            object delta = getValue(deltas, i);
            object deltaNonce = this.safeInteger(delta, "microtimestamp");
            if (isTrue(isEqual(deltaNonce, nonce)))
            {
                return add(i, 1);
            }
        }
        return getArrayLength(deltas);
    }

    /**
     * @method
     * @name bitstamp#watchTrades
     * @description get the list of most recent trades for a particular symbol
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
     */
    public async override Task<object> watchTrades(object symbol, object since = null, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        symbol = getValue(market, "symbol");
        object messageHash = add("trades:", symbol);
        object url = getValue(getValue(this.urls, "api"), "ws");
        object channel = add("live_trades_", getValue(market, "id"));
        object request = new Dictionary<string, object>() {
            { "event", "bts:subscribe" },
            { "data", new Dictionary<string, object>() {
                { "channel", channel },
            } },
        };
        object message = this.extend(request, parameters);
        object trades = await this.watch(url, messageHash, message, messageHash);
        if (isTrue(this.newUpdates))
        {
            limit = callDynamically(trades, "getLimit", new object[] {symbol, limit});
        }
        return this.filterBySinceLimit(trades, since, limit, "timestamp", true);
    }

    public override object parseWsTrade(object trade, object market = null)
    {
        //
        //     {
        //         "buy_order_id": 1211625836466176,
        //         "amount_str": "1.08000000",
        //         "timestamp": "1584642064",
        //         "microtimestamp": "1584642064685000",
        //         "id": 108637852,
        //         "amount": 1.08,
        //         "sell_order_id": 1211625840754689,
        //         "price_str": "6294.77",
        //         "type": 1,
        //         "price": 6294.77
        //     }
        //
        object microtimestamp = this.safeInteger(trade, "microtimestamp");
        object id = this.safeString(trade, "id");
        object timestamp = this.parseToInt(divide(microtimestamp, 1000));
        object price = this.safeString(trade, "price");
        object amount = this.safeString(trade, "amount");
        object symbol = getValue(market, "symbol");
        object sideRaw = this.safeInteger(trade, "type");
        object side = ((bool) isTrue((isEqual(sideRaw, 0)))) ? "buy" : "sell";
        return this.safeTrade(new Dictionary<string, object>() {
            { "info", trade },
            { "timestamp", timestamp },
            { "datetime", this.iso8601(timestamp) },
            { "symbol", symbol },
            { "id", id },
            { "order", null },
            { "type", null },
            { "takerOrMaker", null },
            { "side", side },
            { "price", price },
            { "amount", amount },
            { "cost", null },
            { "fee", null },
        }, market);
    }

    public virtual void handleTrade(WebSocketClient client, object message)
    {
        //
        //     {
        //         "data": {
        //             "buy_order_id": 1207733769326592,
        //             "amount_str": "0.14406384",
        //             "timestamp": "1583691851",
        //             "microtimestamp": "1583691851934000",
        //             "id": 106833903,
        //             "amount": 0.14406384,
        //             "sell_order_id": 1207733765476352,
        //             "price_str": "8302.92",
        //             "type": 0,
        //             "price": 8302.92
        //         },
        //         "event": "trade",
        //         "channel": "live_trades_btcusd"
        //     }
        //
        // the trade streams push raw trade information in real-time
        // each trade has a unique buyer and seller
        object channel = this.safeString(message, "channel");
        object parts = ((string)channel).Split(new [] {((string)"_")}, StringSplitOptions.None).ToList<object>();
        object marketId = this.safeString(parts, 2);
        object market = this.safeMarket(marketId);
        object symbol = getValue(market, "symbol");
        object messageHash = add("trades:", symbol);
        object data = this.safeValue(message, "data");
        object trade = this.parseWsTrade(data, market);
        object tradesArray = this.safeValue(this.trades, symbol);
        if (isTrue(isEqual(tradesArray, null)))
        {
            object limit = this.safeInteger(this.options, "tradesLimit", 1000);
            tradesArray = new ArrayCache(limit);
            ((IDictionary<string,object>)this.trades)[(string)symbol] = tradesArray;
        }
        callDynamically(tradesArray, "append", new object[] {trade});
        callDynamically(client as WebSocketClient, "resolve", new object[] {tradesArray, messageHash});
    }

    /**
     * @method
     * @name bitstamp#watchOrders
     * @description watches information on multiple orders made by the user
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of order structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    public async override Task<object> watchOrders(object symbol = null, object since = null, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        if (isTrue(isEqual(symbol, null)))
        {
            throw new ArgumentsRequired ((string)add(this.id, " watchOrders() requires a symbol argument")) ;
        }
        await this.loadMarkets();
        object market = this.market(symbol);
        symbol = getValue(market, "symbol");
        object channel = "private-my_orders";
        object messageHash = add(add(channel, "_"), getValue(market, "id"));
        object subscription = new Dictionary<string, object>() {
            { "symbol", symbol },
            { "limit", limit },
            { "type", channel },
            { "params", parameters },
        };
        object orders = await this.subscribePrivate(subscription, messageHash, parameters);
        if (isTrue(this.newUpdates))
        {
            limit = callDynamically(orders, "getLimit", new object[] {symbol, limit});
        }
        return this.filterBySinceLimit(orders, since, limit, "timestamp", true);
    }

    public virtual void handleOrders(WebSocketClient client, object message)
    {
        //
        // {
        //     "data":{
        //        "id":"1463471322288128",
        //        "id_str":"1463471322288128",
        //        "order_type":1,
        //        "datetime":"1646127778",
        //        "microtimestamp":"1646127777950000",
        //        "amount":0.05,
        //        "amount_str":"0.05000000",
        //        "price":1000,
        //        "price_str":"1000.00"
        //     },
        //     "channel":"private-my_orders_ltcusd-4848701",
        // }
        //
        object channel = this.safeString(message, "channel");
        object order = this.safeValue(message, "data", new Dictionary<string, object>() {});
        object limit = this.safeInteger(this.options, "ordersLimit", 1000);
        if (isTrue(isEqual(this.orders, null)))
        {
            this.orders = new ArrayCacheBySymbolById(limit);
        }
        object stored = this.orders;
        object subscription = this.safeValue(((WebSocketClient)client).subscriptions, channel);
        object symbol = this.safeString(subscription, "symbol");
        object market = this.market(symbol);
        object parsed = this.parseWsOrder(order, market);
        callDynamically(stored, "append", new object[] {parsed});
        callDynamically(client as WebSocketClient, "resolve", new object[] {this.orders, channel});
    }

    public override object parseWsOrder(object order, object market = null)
    {
        //
        //   {
        //        "id":"1463471322288128",
        //        "id_str":"1463471322288128",
        //        "order_type":1,
        //        "datetime":"1646127778",
        //        "microtimestamp":"1646127777950000",
        //        "amount":0.05,
        //        "amount_str":"0.05000000",
        //        "price":1000,
        //        "price_str":"1000.00"
        //    }
        //
        object id = this.safeString(order, "id_str");
        object orderType = this.safeStringLower(order, "order_type");
        object price = this.safeString(order, "price_str");
        object amount = this.safeString(order, "amount_str");
        object side = ((bool) isTrue((isEqual(orderType, "1")))) ? "sell" : "buy";
        object timestamp = this.safeTimestamp(order, "datetime");
        market = this.safeMarket(null, market);
        object symbol = getValue(market, "symbol");
        return this.safeOrder(new Dictionary<string, object>() {
            { "info", order },
            { "symbol", symbol },
            { "id", id },
            { "clientOrderId", null },
            { "timestamp", timestamp },
            { "datetime", this.iso8601(timestamp) },
            { "lastTradeTimestamp", null },
            { "type", null },
            { "timeInForce", null },
            { "postOnly", null },
            { "side", side },
            { "price", price },
            { "stopPrice", null },
            { "triggerPrice", null },
            { "amount", amount },
            { "cost", null },
            { "average", null },
            { "filled", null },
            { "remaining", null },
            { "status", null },
            { "fee", null },
            { "trades", null },
        }, market);
    }

    public virtual void handleOrderBookSubscription(WebSocketClient client, object message)
    {
        object channel = this.safeString(message, "channel");
        object parts = ((string)channel).Split(new [] {((string)"_")}, StringSplitOptions.None).ToList<object>();
        object marketId = this.safeString(parts, 3);
        object symbol = this.safeSymbol(marketId);
        ((IDictionary<string,object>)this.orderbooks)[(string)symbol] = this.orderBook();
    }

    public virtual void handleSubscriptionStatus(WebSocketClient client, object message)
    {
        //
        //     {
        //         "event": "bts:subscription_succeeded",
        //         "channel": "detail_order_book_btcusd",
        //         "data": {},
        //     }
        //     {
        //         "event": "bts:subscription_succeeded",
        //         "channel": "private-my_orders_ltcusd-4848701",
        //         "data": {}
        //     }
        //
        object channel = this.safeString(message, "channel");
        if (isTrue(isGreaterThan(getIndexOf(channel, "order_book"), -1)))
        {
            this.handleOrderBookSubscription(client as WebSocketClient, message);
        }
    }

    public virtual void handleSubject(WebSocketClient client, object message)
    {
        //
        //     {
        //         "data": {
        //             "timestamp": "1583656800",
        //             "microtimestamp": "1583656800237527",
        //             "bids": [
        //                 ["8732.02", "0.00002478", "1207590500704256"],
        //                 ["8729.62", "0.01600000", "1207590502350849"],
        //                 ["8727.22", "0.01800000", "1207590504296448"],
        //             ],
        //             "asks": [
        //                 ["8735.67", "2.00000000", "1207590693249024"],
        //                 ["8735.67", "0.01700000", "1207590693634048"],
        //                 ["8735.68", "1.53294500", "1207590692048896"],
        //             ],
        //         },
        //         "event": "data",
        //         "channel": "detail_order_book_btcusd"
        //     }
        //
        // private order
        //     {
        //         "data":{
        //         "id":"1463471322288128",
        //         "id_str":"1463471322288128",
        //         "order_type":1,
        //         "datetime":"1646127778",
        //         "microtimestamp":"1646127777950000",
        //         "amount":0.05,
        //         "amount_str":"0.05000000",
        //         "price":1000,
        //         "price_str":"1000.00"
        //         },
        //         "channel":"private-my_orders_ltcusd-4848701",
        //     }
        //
        object channel = this.safeString(message, "channel");
        object methods = new Dictionary<string, object>() {
            { "live_trades", this.handleTrade },
            { "diff_order_book", this.handleOrderBook },
            { "private-my_orders", this.handleOrders },
        };
        object keys = new List<object>(((IDictionary<string,object>)methods).Keys);
        for (object i = 0; isLessThan(i, getArrayLength(keys)); postFixIncrement(ref i))
        {
            object key = getValue(keys, i);
            if (isTrue(isGreaterThan(getIndexOf(channel, key), -1)))
            {
                object method = getValue(methods, key);
                DynamicInvoker.InvokeMethod(method, new object[] { client, message});
            }
        }
    }

    public virtual object handleErrorMessage(WebSocketClient client, object message)
    {
        // {
        //     "event": "bts:error",
        //     "channel": '',
        //     "data": { code: 4009, message: "Connection is unauthorized." }
        // }
        object eventVar = this.safeString(message, "event");
        if (isTrue(isEqual(eventVar, "bts:error")))
        {
            object feedback = add(add(this.id, " "), this.json(message));
            object data = this.safeValue(message, "data", new Dictionary<string, object>() {});
            object code = this.safeNumber(data, "code");
            this.throwExactlyMatchedException(getValue(this.exceptions, "exact"), code, feedback);
        }
        return message;
    }

    public override void handleMessage(WebSocketClient client, object message)
    {
        if (!isTrue(this.handleErrorMessage(client as WebSocketClient, message)))
        {
            return;
        }
        //
        //     {
        //         "event": "bts:subscription_succeeded",
        //         "channel": "detail_order_book_btcusd",
        //         "data": {},
        //     }
        //
        //     {
        //         "data": {
        //             "timestamp": "1583656800",
        //             "microtimestamp": "1583656800237527",
        //             "bids": [
        //                 ["8732.02", "0.00002478", "1207590500704256"],
        //                 ["8729.62", "0.01600000", "1207590502350849"],
        //                 ["8727.22", "0.01800000", "1207590504296448"],
        //             ],
        //             "asks": [
        //                 ["8735.67", "2.00000000", "1207590693249024"],
        //                 ["8735.67", "0.01700000", "1207590693634048"],
        //                 ["8735.68", "1.53294500", "1207590692048896"],
        //             ],
        //         },
        //         "event": "data",
        //         "channel": "detail_order_book_btcusd"
        //     }
        //
        //     {
        //         "event": "bts:subscription_succeeded",
        //         "channel": "private-my_orders_ltcusd-4848701",
        //         "data": {}
        //     }
        //
        object eventVar = this.safeString(message, "event");
        if (isTrue(isEqual(eventVar, "bts:subscription_succeeded")))
        {
            this.handleSubscriptionStatus(client as WebSocketClient, message);
        } else
        {
            this.handleSubject(client as WebSocketClient, message);
        }
    }

    public async virtual Task authenticate(object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        this.checkRequiredCredentials();
        object time = this.milliseconds();
        object expiresIn = this.safeInteger(this.options, "expiresIn");
        if (isTrue(isTrue((isEqual(expiresIn, null))) || isTrue((isGreaterThan(time, expiresIn)))))
        {
            object response = await this.privatePostWebsocketsToken(parameters);
            //
            // {
            //     "valid_sec":60,
            //     "token":"siPaT4m6VGQCdsDCVbLBemiphHQs552e",
            //     "user_id":4848701
            // }
            //
            object sessionToken = this.safeString(response, "token");
            if (isTrue(!isEqual(sessionToken, null)))
            {
                object userId = this.safeNumber(response, "user_id");
                object validity = this.safeIntegerProduct(response, "valid_sec", 1000);
                ((IDictionary<string,object>)this.options)["expiresIn"] = this.sum(time, validity);
                ((IDictionary<string,object>)this.options)["userId"] = userId;
                ((IDictionary<string,object>)this.options)["wsSessionToken"] = sessionToken;
            }
        }
    }

    public async virtual Task<object> subscribePrivate(object subscription, object messageHash, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        object url = getValue(getValue(this.urls, "api"), "ws");
        await this.authenticate();
        messageHash = add(messageHash, add("-", getValue(this.options, "userId")));
        object request = new Dictionary<string, object>() {
            { "event", "bts:subscribe" },
            { "data", new Dictionary<string, object>() {
                { "channel", messageHash },
                { "auth", getValue(this.options, "wsSessionToken") },
            } },
        };
        ((IDictionary<string,object>)subscription)["messageHash"] = messageHash;
        return await this.watch(url, messageHash, this.extend(request, parameters), messageHash, subscription);
    }
}
