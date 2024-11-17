namespace ccxt.pro;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class coinbaseinternational { public coinbaseinternational(object args = null) : base(args) { } }
public partial class coinbaseinternational : ccxt.coinbaseinternational
{
    public override object describe()
    {
        return this.deepExtend(base.describe(), new Dictionary<string, object>() {
            { "has", new Dictionary<string, object>() {
                { "ws", true },
                { "watchTrades", true },
                { "watchTradesForSymbols", true },
                { "watchOrderBook", true },
                { "watchOrderBookForSymbols", true },
                { "watchTicker", true },
                { "watchBalance", false },
                { "watchMyTrades", false },
                { "watchOHLCV", true },
                { "watchOHLCVForSymbols", false },
                { "watchOrders", false },
                { "watchOrdersForSymbols", false },
                { "watchPositions", false },
                { "watchTickers", true },
                { "createOrderWs", false },
                { "editOrderWs", false },
                { "cancelOrderWs", false },
                { "cancelOrdersWs", false },
                { "cancelAllOrdersWs", false },
                { "fetchOrderWs", false },
                { "fetchOrdersWs", false },
                { "fetchBalanceWs", false },
                { "fetchMyTradesWs", false },
            } },
            { "urls", new Dictionary<string, object>() {
                { "api", new Dictionary<string, object>() {
                    { "ws", "wss://ws-md.international.coinbase.com" },
                } },
                { "test", new Dictionary<string, object>() {
                    { "ws", "wss://ws-md.n5e2.coinbase.com" },
                } },
            } },
            { "options", new Dictionary<string, object>() {
                { "watchTicker", new Dictionary<string, object>() {
                    { "channel", "LEVEL1" },
                } },
                { "tradesLimit", 1000 },
                { "ordersLimit", 1000 },
                { "myTradesLimit", 1000 },
                { "timeframes", new Dictionary<string, object>() {
                    { "1m", "CANDLES_ONE_MINUTE" },
                    { "5m", "CANDLES_FIVE_MINUTES" },
                    { "30m", "CANDLES_THIRTY_MINUTES" },
                    { "1h", "CANDLES_ONE_HOUR" },
                    { "2h", "CANDLES_TWO_HOURS" },
                    { "1d", "CANDLES_ONE_DAY" },
                } },
            } },
            { "exceptions", new Dictionary<string, object>() {
                { "exact", new Dictionary<string, object>() {
                    { "Unable to authenticate", typeof(AuthenticationError) },
                } },
            } },
        });
    }

    /**
     * @ignore
     * @method
     * @description subscribes to a websocket channel
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-overview#subscribe
     * @param {string} name the name of the channel
     * @param {string[]} [symbols] unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} subscription to a websocket channel
     */
    public async virtual Task<object> subscribe(object name, object symbols = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        this.checkRequiredCredentials();
        object market = null;
        object messageHash = name;
        object productIds = null;
        if (isTrue(isEqual(symbols, null)))
        {
            symbols = this.getActiveSymbols();
        }
        object symbolsLength = getArrayLength(symbols);
        object messageHashes = new List<object>() {};
        if (isTrue(isGreaterThan(symbolsLength, 1)))
        {
            object parsedSymbols = this.marketSymbols(symbols);
            object marketIds = this.marketIds(parsedSymbols);
            productIds = marketIds;
            for (object i = 0; isLessThan(i, getArrayLength(parsedSymbols)); postFixIncrement(ref i))
            {
                ((IList<object>)messageHashes).Add(add(add(name, "::"), getValue(parsedSymbols, i)));
            }
        } else if (isTrue(isEqual(symbolsLength, 1)))
        {
            market = this.market(getValue(symbols, 0));
            messageHash = add(add(name, "::"), getValue(market, "symbol"));
            productIds = new List<object>() {getValue(market, "id")};
        }
        object url = getValue(getValue(this.urls, "api"), "ws");
        if (isTrue(isEqual(url, null)))
        {
            throw new NotSupported ((string)add(this.id, " is not supported in sandbox environment")) ;
        }
        object timestamp = ((object)this.nonce()).ToString();
        object auth = add(add(add(timestamp, this.apiKey), "CBINTLMD"), this.password);
        object signature = this.hmac(this.encode(auth), this.base64ToBinary(this.secret), sha256, "base64");
        object subscribe = new Dictionary<string, object>() {
            { "type", "SUBSCRIBE" },
            { "channels", new List<object>() {name} },
            { "time", timestamp },
            { "key", this.apiKey },
            { "passphrase", this.password },
            { "signature", signature },
        };
        if (isTrue(!isEqual(productIds, null)))
        {
            ((IDictionary<string,object>)subscribe)["product_ids"] = productIds;
        }
        if (isTrue(isGreaterThan(symbolsLength, 1)))
        {
            return await this.watchMultiple(url, messageHashes, this.extend(subscribe, parameters), messageHashes);
        }
        return await this.watch(url, messageHash, this.extend(subscribe, parameters), messageHash);
    }

    /**
     * @ignore
     * @method
     * @description subscribes to a websocket channel using watchMultiple
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-overview#subscribe
     * @param {string} name the name of the channel
     * @param {string|string[]} [symbols] unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} subscription to a websocket channel
     */
    public async virtual Task<object> subscribeMultiple(object name, object symbols = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        this.checkRequiredCredentials();
        if (isTrue(this.isEmpty(symbols)))
        {
            symbols = this.symbols;
        } else
        {
            symbols = this.marketSymbols(symbols);
        }
        object messageHashes = new List<object>() {};
        object productIds = new List<object>() {};
        for (object i = 0; isLessThan(i, getArrayLength(symbols)); postFixIncrement(ref i))
        {
            object marketId = this.marketId(getValue(symbols, i));
            object symbol = this.symbol(marketId);
            ((IList<object>)productIds).Add(marketId);
            ((IList<object>)messageHashes).Add(add(add(name, "::"), symbol));
        }
        object url = getValue(getValue(this.urls, "api"), "ws");
        if (isTrue(isEqual(url, null)))
        {
            throw new NotSupported ((string)add(this.id, " is not supported in sandbox environment")) ;
        }
        object timestamp = this.numberToString(this.seconds());
        object auth = add(add(add(timestamp, this.apiKey), "CBINTLMD"), this.password);
        object signature = this.hmac(this.encode(auth), this.base64ToBinary(this.secret), sha256, "base64");
        object subscribe = new Dictionary<string, object>() {
            { "type", "SUBSCRIBE" },
            { "time", timestamp },
            { "product_ids", productIds },
            { "channels", new List<object>() {name} },
            { "key", this.apiKey },
            { "passphrase", this.password },
            { "signature", signature },
        };
        return await this.watchMultiple(url, messageHashes, this.extend(subscribe, parameters), messageHashes);
    }

    /**
     * @method
     * @name coinbaseinternational#watchFundingRate
     * @description watch the current funding rate
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-channels#funding-channel
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [funding rate structure]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
     */
    public async override Task<object> watchFundingRate(object symbol, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        return await this.subscribe("RISK", new List<object>() {symbol}, parameters);
    }

    /**
     * @method
     * @name coinbaseinternational#watchFundingRates
     * @description watch the funding rate for multiple markets
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-channels#funding-channel
     * @param {string[]|undefined} symbols list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [funding rates structures]{@link https://docs.ccxt.com/#/?id=funding-rates-structure}, indexe by market symbols
     */
    public async override Task<object> watchFundingRates(object symbols, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object fundingRate = await this.subscribeMultiple("RISK", symbols, parameters);
        object symbol = this.safeString(fundingRate, "symbol");
        if (isTrue(this.newUpdates))
        {
            object result = new Dictionary<string, object>() {};
            ((IDictionary<string,object>)result)[(string)symbol] = fundingRate;
            return result;
        }
        return this.filterByArray(this.fundingRates, "symbol", symbols);
    }

    /**
     * @method
     * @name coinbaseinternational#watchTicker
     * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-channels#instruments-channel
     * @param {string} [symbol] unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.channel] the channel to watch, 'LEVEL1' or 'INSTRUMENTS', default is 'LEVEL1'
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    public async override Task<object> watchTicker(object symbol, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object channel = null;
        var channelparametersVariable = this.handleOptionAndParams(parameters, "watchTicker", "channel", "LEVEL1");
        channel = ((IList<object>)channelparametersVariable)[0];
        parameters = ((IList<object>)channelparametersVariable)[1];
        return await this.subscribe(channel, new List<object>() {symbol}, parameters);
    }

    public virtual object getActiveSymbols()
    {
        object symbols = this.symbols;
        object output = new List<object>() {};
        for (object i = 0; isLessThan(i, getArrayLength(symbols)); postFixIncrement(ref i))
        {
            object symbol = getValue(symbols, i);
            object market = getValue(this.markets, symbol);
            if (isTrue(getValue(market, "active")))
            {
                ((IList<object>)output).Add(symbol);
            }
        }
        return output;
    }

    /**
     * @method
     * @name coinbaseinternational#watchTickers
     * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-channels#instruments-channel
     * @param {string[]} [symbols] unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.channel] the channel to watch, 'LEVEL1' or 'INSTRUMENTS', default is 'INSTLEVEL1UMENTS'
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    public async override Task<object> watchTickers(object symbols = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object channel = null;
        var channelparametersVariable = this.handleOptionAndParams(parameters, "watchTickers", "channel", "LEVEL1");
        channel = ((IList<object>)channelparametersVariable)[0];
        parameters = ((IList<object>)channelparametersVariable)[1];
        object ticker = await this.subscribe(channel, symbols, parameters);
        if (isTrue(this.newUpdates))
        {
            object result = new Dictionary<string, object>() {};
            ((IDictionary<string,object>)result)[(string)getValue(ticker, "symbol")] = ticker;
            return result;
        }
        return this.filterByArray(this.tickers, "symbol", symbols);
    }

    public virtual void handleInstrument(WebSocketClient client, object message)
    {
        //
        //    {
        //        "sequence": 1,
        //        "product_id": "ETH-PERP",
        //        "instrument_type": "PERP",
        //        "base_asset_name": "ETH",
        //        "quote_asset_name": "USDC",
        //        "base_increment": "0.0001",
        //        "quote_increment": "0.01",
        //        "avg_daily_quantity": "43.0",
        //        "avg_daily_volume": "80245.2",
        //        "total_30_day_quantity":"1443.0",
        //        "total_30_day_volume":"3040449.0",
        //        "total_24_hour_quantity":"48.1",
        //        "total_24_hour_volume":"101348.3",
        //        "base_imf": "0.2",
        //        "min_quantity": "0.0001",
        //        "position_size_limit": "500",
        //        "funding_interval": "60000000000",
        //        "trading_state": "trading",
        //        "last_update_time": "2023-05-04T11:16:33.016Z",
        //        "time": "2023-05-10T14:58:47.000Z",
        //        "channel":"INSTRUMENTS",
        //        "type":"SNAPSHOT"
        //    }
        object ticker = this.parseWsInstrument(message);
        object channel = this.safeString(message, "channel");
        callDynamically(client as WebSocketClient, "resolve", new object[] {ticker, channel});
        callDynamically(client as WebSocketClient, "resolve", new object[] {ticker, add(add(channel, "::"), getValue(ticker, "symbol"))});
    }

    public virtual object parseWsInstrument(object ticker, object market = null)
    {
        //
        //    {
        //        "sequence": 1,
        //        "product_id": "ETH-PERP",
        //        "instrument_type": "PERP",
        //        "base_asset_name": "ETH",
        //        "quote_asset_name": "USDC",
        //        "base_increment": "0.0001",
        //        "quote_increment": "0.01",
        //        "avg_daily_quantity": "43.0",
        //        "avg_daily_volume": "80245.2",
        //        "total_30_day_quantity":"1443.0",
        //        "total_30_day_volume":"3040449.0",
        //        "total_24_hour_quantity":"48.1",
        //        "total_24_hour_volume":"101348.3",
        //        "base_imf": "0.2",
        //        "min_quantity": "0.0001",
        //        "position_size_limit": "500",
        //        "funding_interval": "60000000000",
        //        "trading_state": "trading",
        //        "last_update_time": "2023-05-04T11:16:33.016Z",
        //        "time": "2023-05-10T14:58:47.000Z",
        //        "channel":"INSTRUMENTS",
        //        "type":"SNAPSHOT"
        //    }
        // instruments
        //   {
        //       sequence: 0,
        //       instrument_type: 'PERP',
        //       instrument_mode: 'standard',
        //       base_asset_name: 'BTC',
        //       quote_asset_name: 'USDC',
        //       base_increment: '0.0001',
        //       quote_increment: '0.1',
        //       avg_daily_quantity: '502.8845',
        //       avg_daily_volume: '3.1495242961566668E7',
        //       total30_day_quantity: '15086.535',
        //       total30_day_volume: '9.44857288847E8',
        //       total24_hour_quantity: '5.0',
        //       total24_hour_volume: '337016.5',
        //       base_imf: '0.1',
        //       min_quantity: '0.0001',
        //       position_size_limit: '800',
        //       funding_interval: '3600000000000',
        //       trading_state: 'trading',
        //       last_updated_time: '2024-07-30T15:00:00Z',
        //       default_initial_margin: '0.2',
        //       base_asset_multiplier: '1.0',
        //       channel: 'INSTRUMENTS',
        //       type: 'SNAPSHOT',
        //       time: '2024-07-30T15:26:56.766Z',
        //   }
        //
        object marketId = this.safeString(ticker, "product_id");
        object datetime = this.safeString(ticker, "time");
        return this.safeTicker(new Dictionary<string, object>() {
            { "info", ticker },
            { "symbol", this.safeSymbol(marketId, market, "-") },
            { "timestamp", this.parse8601(datetime) },
            { "datetime", datetime },
            { "high", null },
            { "low", null },
            { "bid", null },
            { "bidVolume", null },
            { "ask", null },
            { "askVolume", null },
            { "vwap", null },
            { "open", null },
            { "close", null },
            { "last", null },
            { "previousClose", null },
            { "change", null },
            { "percentage", null },
            { "average", null },
            { "baseVolume", this.safeString2(ticker, "total_24_hour_quantity", "total24_hour_quantity") },
            { "quoteVolume", this.safeString2(ticker, "total_24_hour_volume", "total24_hour_volume") },
        });
    }

    public virtual void handleTicker(WebSocketClient client, object message)
    {
        //
        // snapshot
        //    {
        //        "sequence": 0,
        //        "product_id": "BTC-PERP",
        //        "time": "2023-05-10T14:58:47.000Z",
        //        "bid_price": "28787.8",
        //        "bid_qty": "0.466", // One side book
        //        "channel": "LEVEL1",
        //        "type": "SNAPSHOT"
        //    }
        // update
        //    {
        //       "sequence": 1,
        //       "product_id": "BTC-PERP",
        //       "time": "2023-05-10T14:58:47.547Z",
        //       "bid_price": "28787.8",
        //       "bid_qty": "0.466",
        //       "ask_price": "28788.8",
        //       "ask_qty": "1.566",
        //       "channel": "LEVEL1",
        //       "type": "UPDATE"
        //    }
        //
        object ticker = this.parseWsTicker(message);
        object channel = this.safeString(message, "channel");
        callDynamically(client as WebSocketClient, "resolve", new object[] {ticker, channel});
        callDynamically(client as WebSocketClient, "resolve", new object[] {ticker, add(add(channel, "::"), getValue(ticker, "symbol"))});
    }

    public virtual object parseWsTicker(object ticker, object market = null)
    {
        //
        //    {
        //       "sequence": 1,
        //       "product_id": "BTC-PERP",
        //       "time": "2023-05-10T14:58:47.547Z",
        //       "bid_price": "28787.8",
        //       "bid_qty": "0.466",
        //       "ask_price": "28788.8",
        //       "ask_qty": "1.566",
        //       "channel": "LEVEL1",
        //       "type": "UPDATE"
        //    }
        //
        object datetime = this.safeString(ticker, "time");
        object marketId = this.safeString(ticker, "product_id");
        return this.safeTicker(new Dictionary<string, object>() {
            { "info", ticker },
            { "symbol", this.safeSymbol(marketId, market) },
            { "timestamp", this.parse8601(datetime) },
            { "datetime", datetime },
            { "bid", this.safeNumber(ticker, "bid_price") },
            { "bidVolume", this.safeNumber(ticker, "bid_qty") },
            { "ask", this.safeNumber(ticker, "ask_price") },
            { "askVolume", this.safeNumber(ticker, "ask_qty") },
            { "high", null },
            { "low", null },
            { "open", null },
            { "close", null },
            { "last", null },
            { "change", null },
            { "percentage", null },
            { "average", null },
            { "vwap", null },
            { "baseVolume", null },
            { "quoteVolume", null },
            { "previousClose", null },
        });
    }

    /**
     * @method
     * @name coinbaseinternational#watchOHLCV
     * @description watches historical candlestick data containing the open, high, low, close price, and the volume of a market
     * @see https://docs.cdp.coinbase.com/intx/docs/websocket-channels#candles-channel
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    public async override Task<object> watchOHLCV(object symbol, object timeframe = null, object since = null, object limit = null, object parameters = null)
    {
        timeframe ??= "1m";
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        symbol = getValue(market, "symbol");
        object options = this.safeDict(this.options, "timeframes", new Dictionary<string, object>() {});
        object interval = this.safeString(options, timeframe, timeframe);
        object ohlcv = await this.subscribe(interval, new List<object>() {symbol}, parameters);
        if (isTrue(this.newUpdates))
        {
            limit = callDynamically(ohlcv, "getLimit", new object[] {symbol, limit});
        }
        return this.filterBySinceLimit(ohlcv, since, limit, 0, true);
    }

    public virtual void handleOHLCV(WebSocketClient client, object message)
    {
        //
        // {
        //     "sequence": 0,
        //     "product_id": "BTC-PERP",
        //     "channel": "CANDLES_ONE_MINUTE",
        //     "type": "SNAPSHOT",
        //     "candles": [
        //       {
        //           "time": "2023-05-10T14:58:47.000Z",
        //           "low": "28787.8",
        //           "high": "28788.8",
        //           "open": "28788.8",
        //           "close": "28787.8",
        //           "volume": "0.466"
        //        },
        //     ]
        //  }
        //
        object messageHash = this.safeString(message, "channel");
        object marketId = this.safeString(message, "product_id");
        object market = this.safeMarket(marketId);
        object symbol = getValue(market, "symbol");
        object timeframe = this.findTimeframe(messageHash);
        ((IDictionary<string,object>)this.ohlcvs)[(string)symbol] = this.safeValue(this.ohlcvs, symbol, new Dictionary<string, object>() {});
        if (isTrue(isEqual(this.safeValue(getValue(this.ohlcvs, symbol), timeframe), null)))
        {
            object limit = this.safeInteger(this.options, "OHLCVLimit", 1000);
            ((IDictionary<string,object>)getValue(this.ohlcvs, symbol))[(string)timeframe] = new ArrayCacheByTimestamp(limit);
        }
        object stored = getValue(getValue(this.ohlcvs, symbol), timeframe);
        object data = this.safeList(message, "candles", new List<object>() {});
        for (object i = 0; isLessThan(i, getArrayLength(data)); postFixIncrement(ref i))
        {
            object tick = getValue(data, i);
            object parsed = this.parseOHLCV(tick, market);
            callDynamically(stored, "append", new object[] {parsed});
        }
        callDynamically(client as WebSocketClient, "resolve", new object[] {stored, add(add(messageHash, "::"), symbol)});
    }

    /**
     * @method
     * @name coinbaseinternational#watchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-channels#match-channel
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
     */
    public async override Task<object> watchTrades(object symbol, object since = null, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        return await this.watchTradesForSymbols(new List<object>() {symbol}, since, limit, parameters);
    }

    /**
     * @method
     * @name coinbaseinternational#watchTradesForSymbols
     * @description get the list of most recent trades for a list of symbols
     * @param {string[]} symbols unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
     */
    public async override Task<object> watchTradesForSymbols(object symbols, object since = null, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols, null, false, true, true);
        object trades = await this.subscribeMultiple("MATCH", symbols, parameters);
        if (isTrue(this.newUpdates))
        {
            object first = this.safeDict(trades, 0);
            object tradeSymbol = this.safeString(first, "symbol");
            limit = callDynamically(trades, "getLimit", new object[] {tradeSymbol, limit});
        }
        return this.filterBySinceLimit(trades, since, limit, "timestamp", true);
    }

    public virtual object handleTrade(WebSocketClient client, object message)
    {
        //
        //    {
        //       "sequence": 0,
        //       "product_id": "BTC-PERP",
        //       "time": "2023-05-10T14:58:47.002Z",
        //       "match_id": "177101110052388865",
        //       "trade_qty": "0.006",
        //       "aggressor_side": "BUY",
        //       "trade_price": "28833.1",
        //       "channel": "MATCH",
        //       "type": "UPDATE"
        //    }
        //
        object trade = this.parseWsTrade(message);
        object symbol = getValue(trade, "symbol");
        object channel = this.safeString(message, "channel");
        if (!isTrue((inOp(this.trades, symbol))))
        {
            object limit = this.safeInteger(this.options, "tradesLimit", 1000);
            var tradesArrayCache = new ArrayCache(limit);
            ((IDictionary<string,object>)this.trades)[(string)symbol] = tradesArrayCache;
        }
        object tradesArray = getValue(this.trades, symbol);
        callDynamically(tradesArray, "append", new object[] {trade});
        ((IDictionary<string,object>)this.trades)[(string)symbol] = tradesArray;
        callDynamically(client as WebSocketClient, "resolve", new object[] {tradesArray, channel});
        callDynamically(client as WebSocketClient, "resolve", new object[] {tradesArray, add(add(channel, "::"), getValue(trade, "symbol"))});
        return message;
    }

    public override object parseWsTrade(object trade, object market = null)
    {
        //
        //    {
        //       "sequence": 0,
        //       "product_id": "BTC-PERP",
        //       "time": "2023-05-10T14:58:47.002Z",
        //       "match_id": "177101110052388865",
        //       "trade_qty": "0.006",
        //       "aggressor_side": "BUY",
        //       "trade_price": "28833.1",
        //       "channel": "MATCH",
        //       "type": "UPDATE"
        //    }
        object marketId = this.safeString2(trade, "symbol", "product_id");
        object datetime = this.safeString(trade, "time");
        return this.safeTrade(new Dictionary<string, object>() {
            { "info", trade },
            { "id", this.safeString(trade, "match_id") },
            { "order", null },
            { "timestamp", this.parse8601(datetime) },
            { "datetime", datetime },
            { "symbol", this.safeSymbol(marketId, market) },
            { "type", null },
            { "side", this.safeStringLower(trade, "agressor_side") },
            { "takerOrMaker", null },
            { "price", this.safeString(trade, "trade_price") },
            { "amount", this.safeString(trade, "trade_qty") },
            { "cost", null },
            { "fee", null },
        });
    }

    /**
     * @method
     * @name coinbaseinternational#watchOrderBook
     * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-channels#level2-channel
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    public async override Task<object> watchOrderBook(object symbol, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        return await this.watchOrderBookForSymbols(new List<object>() {symbol}, limit, parameters);
    }

    /**
     * @method
     * @name coinbaseinternational#watchOrderBook
     * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://docs.cloud.coinbase.com/intx/docs/websocket-channels#level2-channel
     * @param {string[]} symbols
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    public async override Task<object> watchOrderBookForSymbols(object symbols, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        return await this.subscribeMultiple("LEVEL2", symbols, parameters);
    }

    public virtual void handleOrderBook(WebSocketClient client, object message)
    {
        //
        // snapshot
        //    {
        //       "sequence": 0,
        //       "product_id": "BTC-PERP",
        //       "time": "2023-05-10T14:58:47.000Z",
        //       "bids": [
        //           ["29100", "0.02"],
        //           ["28950", "0.01"],
        //           ["28900", "0.01"]
        //       ],
        //       "asks": [
        //           ["29267.8", "18"],
        //           ["29747.6", "18"],
        //           ["30227.4", "9"]
        //       ],
        //       "channel": "LEVEL2",
        //       "type": "SNAPSHOT",
        //    }
        // update
        //    {
        //       "sequence": 1,
        //       "product_id": "BTC-PERP",
        //       "time": "2023-05-10T14:58:47.375Z",
        //       "changes": [
        //           [
        //               "BUY",
        //               "28787.7",
        //               "6"
        //           ]
        //       ],
        //       "channel": "LEVEL2",
        //       "type": "UPDATE"
        //    }
        //
        object type = this.safeString(message, "type");
        object marketId = this.safeString(message, "product_id");
        object symbol = this.safeSymbol(marketId);
        object datetime = this.safeString(message, "time");
        object channel = this.safeString(message, "channel");
        if (!isTrue((inOp(this.orderbooks, symbol))))
        {
            object limit = this.safeInteger(this.options, "watchOrderBookLimit", 1000);
            ((IDictionary<string,object>)this.orderbooks)[(string)symbol] = this.orderBook(new Dictionary<string, object>() {}, limit);
        }
        object orderbook = getValue(this.orderbooks, symbol);
        if (isTrue(isEqual(type, "SNAPSHOT")))
        {
            object parsedSnapshot = this.parseOrderBook(message, symbol, null, "bids", "asks");
            (orderbook as IOrderBook).reset(parsedSnapshot);
            ((IDictionary<string,object>)orderbook)["symbol"] = symbol;
        } else
        {
            object changes = this.safeList(message, "changes", new List<object>() {});
            this.handleDeltas(orderbook, changes);
        }
        ((IDictionary<string,object>)orderbook)["nonce"] = this.safeInteger(message, "sequence");
        ((IDictionary<string,object>)orderbook)["datetime"] = datetime;
        ((IDictionary<string,object>)orderbook)["timestamp"] = this.parse8601(datetime);
        ((IDictionary<string,object>)this.orderbooks)[(string)symbol] = orderbook;
        callDynamically(client as WebSocketClient, "resolve", new object[] {orderbook, add(add(channel, "::"), symbol)});
    }

    public override void handleDelta(object orderbook, object delta)
    {
        object rawSide = this.safeStringLower(delta, 0);
        object side = ((bool) isTrue((isEqual(rawSide, "buy")))) ? "bids" : "asks";
        object price = this.safeFloat(delta, 1);
        object amount = this.safeFloat(delta, 2);
        object bookside = getValue(orderbook, side);
        (bookside as IOrderBookSide).store(price, amount);
    }

    public override void handleDeltas(object orderbook, object deltas)
    {
        for (object i = 0; isLessThan(i, getArrayLength(deltas)); postFixIncrement(ref i))
        {
            this.handleDelta(orderbook, getValue(deltas, i));
        }
    }

    public virtual object handleSubscriptionStatus(WebSocketClient client, object message)
    {
        //
        //    {
        //       "channels": [
        //           {
        //               "name": "MATCH",
        //               "product_ids": [
        //                   "BTC-PERP",
        //                   "ETH-PERP"
        //               ]
        //           },
        //           {
        //               "name": "INSTRUMENTS",
        //               "product_ids": [
        //                   "BTC-PERP",
        //                   "ETH-PERP"
        //               ]
        //           }
        //       ],
        //       "authenticated": true,
        //       "channel": "SUBSCRIPTIONS",
        //       "type": "SNAPSHOT",
        //       "time": "2023-05-30T16:53:46.847Z"
        //    }
        //
        return message;
    }

    public virtual void handleFundingRate(WebSocketClient client, object message)
    {
        //
        // snapshot
        //    {
        //       "sequence": 0,
        //       "product_id": "BTC-PERP",
        //       "time": "2023-05-10T14:58:47.000Z",
        //       "funding_rate": "0.001387",
        //       "is_final": true,
        //       "channel": "FUNDING",
        //       "type": "SNAPSHOT"
        //    }
        // update
        //    {
        //       "sequence": 1,
        //       "product_id": "BTC-PERP",
        //       "time": "2023-05-10T15:00:00.000Z",
        //       "funding_rate": "0.001487",
        //       "is_final": false,
        //       "channel": "FUNDING",
        //       "type": "UPDATE"
        //    }
        //
        object channel = this.safeString(message, "channel");
        object fundingRate = this.parseFundingRate(message);
        ((IDictionary<string,object>)this.fundingRates)[(string)getValue(fundingRate, "symbol")] = fundingRate;
        callDynamically(client as WebSocketClient, "resolve", new object[] {fundingRate, add(add(channel, "::"), getValue(fundingRate, "symbol"))});
    }

    public virtual object handleErrorMessage(WebSocketClient client, object message)
    {
        //
        //    {
        //        message: 'Failed to subscribe',
        //        reason: 'Unable to authenticate',
        //        channel: 'SUBSCRIPTIONS',
        //        type: 'REJECT'
        //    }
        //
        object type = this.safeString(message, "type");
        if (isTrue(!isEqual(type, "REJECT")))
        {
            return false;
        }
        object reason = this.safeString(message, "reason");
        object errMsg = this.safeString(message, "message");
        try
        {
            object feedback = add(add(add(this.id, " "), errMsg), reason);
            this.throwExactlyMatchedException(getValue(this.exceptions, "exact"), reason, feedback);
            this.throwBroadlyMatchedException(getValue(this.exceptions, "broad"), reason, feedback);
            throw new ExchangeError ((string)feedback) ;
        } catch(Exception e)
        {
            ((WebSocketClient)client).reject(e);
        }
        return true;
    }

    public override void handleMessage(WebSocketClient client, object message)
    {
        if (isTrue(this.handleErrorMessage(client as WebSocketClient, message)))
        {
            return;
        }
        object channel = this.safeString(message, "channel", "");
        object methods = new Dictionary<string, object>() {
            { "SUBSCRIPTIONS", this.handleSubscriptionStatus },
            { "INSTRUMENTS", this.handleInstrument },
            { "LEVEL1", this.handleTicker },
            { "MATCH", this.handleTrade },
            { "LEVEL2", this.handleOrderBook },
            { "FUNDING", this.handleFundingRate },
            { "RISK", this.handleTicker },
        };
        object type = this.safeString(message, "type");
        if (isTrue(isEqual(type, "error")))
        {
            object errorMessage = this.safeString(message, "message");
            throw new ExchangeError ((string)errorMessage) ;
        }
        if (isTrue(isGreaterThan(getIndexOf(channel, "CANDLES"), -1)))
        {
            this.handleOHLCV(client as WebSocketClient, message);
        }
        object method = this.safeValue(methods, channel);
        if (isTrue(!isEqual(method, null)))
        {
            DynamicInvoker.InvokeMethod(method, new object[] { client, message});
        }
    }
}
