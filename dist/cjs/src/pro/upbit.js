'use strict';

var upbit$1 = require('../upbit.js');
var Cache = require('../base/ws/Cache.js');
var sha256 = require('../static_dependencies/noble-hashes/sha256.js');
var rsa = require('../base/functions/rsa.js');

//  ---------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
class upbit extends upbit$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'has': {
                'ws': true,
                'watchOrderBook': true,
                'watchTicker': true,
                'watchTickers': true,
                'watchTrades': true,
                'watchTradesForSymbols': true,
                'watchOrders': true,
                'watchMyTrades': true,
                'watchBalance': true,
            },
            'urls': {
                'api': {
                    'ws': 'wss://{hostname}/websocket/v1',
                },
            },
            'options': {
                'tradesLimit': 1000,
            },
        });
    }
    async watchPublic(symbol, channel, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        symbol = market['symbol'];
        const marketId = market['id'];
        const url = this.implodeParams(this.urls['api']['ws'], {
            'hostname': this.hostname,
        });
        this.options[channel] = this.safeValue(this.options, channel, {});
        this.options[channel][symbol] = true;
        const symbols = Object.keys(this.options[channel]);
        const marketIds = this.marketIds(symbols);
        const request = [
            {
                'ticket': this.uuid(),
            },
            {
                'type': channel,
                'codes': marketIds,
                // 'isOnlySnapshot': false,
                // 'isOnlyRealtime': false,
            },
        ];
        const messageHash = channel + ':' + marketId;
        return await this.watch(url, messageHash, request, messageHash);
    }
    async watchPublicMultiple(symbols, channel, params = {}) {
        await this.loadMarkets();
        if (symbols === undefined) {
            symbols = this.symbols;
        }
        symbols = this.marketSymbols(symbols);
        const marketIds = this.marketIds(symbols);
        const url = this.implodeParams(this.urls['api']['ws'], {
            'hostname': this.hostname,
        });
        const messageHashes = [];
        for (let i = 0; i < marketIds.length; i++) {
            messageHashes.push(channel + ':' + marketIds[i]);
        }
        const request = [
            {
                'ticket': this.uuid(),
            },
            {
                'type': channel,
                'codes': marketIds,
                // 'isOnlySnapshot': false,
                // 'isOnlyRealtime': false,
            },
        ];
        return await this.watchMultiple(url, messageHashes, request, messageHashes);
    }
    async watchTicker(symbol, params = {}) {
        /**
         * @method
         * @name upbit#watchTicker
         * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @see https://global-docs.upbit.com/reference/websocket-ticker
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        return await this.watchPublic(symbol, 'ticker');
    }
    async watchTickers(symbols = undefined, params = {}) {
        /**
         * @method
         * @name upbit#watchTicker
         * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @see https://global-docs.upbit.com/reference/websocket-ticker
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        const newTickers = await this.watchPublicMultiple(symbols, 'ticker');
        if (this.newUpdates) {
            const tickers = {};
            tickers[newTickers['symbol']] = newTickers;
            return tickers;
        }
        return this.filterByArray(this.tickers, 'symbol', symbols);
    }
    async watchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name upbit#watchTrades
         * @description get the list of most recent trades for a particular symbol
         * @see https://global-docs.upbit.com/reference/websocket-trade
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int} [since] timestamp in ms of the earliest trade to fetch
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
         */
        return await this.watchTradesForSymbols([symbol], since, limit, params);
    }
    async watchTradesForSymbols(symbols, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name upbit#watchTradesForSymbols
         * @description get the list of most recent trades for a list of symbols
         * @see https://global-docs.upbit.com/reference/websocket-trade
         * @param {string[]} symbols unified symbol of the market to fetch trades for
         * @param {int} [since] timestamp in ms of the earliest trade to fetch
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
         */
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols, undefined, false, true, true);
        const channel = 'trade';
        const messageHashes = [];
        const url = this.implodeParams(this.urls['api']['ws'], {
            'hostname': this.hostname,
        });
        if (symbols !== undefined) {
            for (let i = 0; i < symbols.length; i++) {
                const market = this.market(symbols[i]);
                const marketId = market['id'];
                const symbol = market['symbol'];
                this.options[channel] = this.safeValue(this.options, channel, {});
                this.options[channel][symbol] = true;
                messageHashes.push(channel + ':' + marketId);
            }
        }
        const optionSymbols = Object.keys(this.options[channel]);
        const marketIds = this.marketIds(optionSymbols);
        const request = [
            {
                'ticket': this.uuid(),
            },
            {
                'type': channel,
                'codes': marketIds,
                // 'isOnlySnapshot': false,
                // 'isOnlyRealtime': false,
            },
        ];
        const trades = await this.watchMultiple(url, messageHashes, request, messageHashes);
        if (this.newUpdates) {
            const first = this.safeValue(trades, 0);
            const tradeSymbol = this.safeString(first, 'symbol');
            limit = trades.getLimit(tradeSymbol, limit);
        }
        return this.filterBySinceLimit(trades, since, limit, 'timestamp', true);
    }
    async watchOrderBook(symbol, limit = undefined, params = {}) {
        /**
         * @method
         * @name upbit#watchOrderBook
         * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @see https://global-docs.upbit.com/reference/websocket-orderbook
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int} [limit] the maximum amount of order book entries to return
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        const orderbook = await this.watchPublic(symbol, 'orderbook');
        return orderbook.limit();
    }
    handleTicker(client, message) {
        // 2020-03-17T23:07:36.511Z "onMessage" <Buffer 7b 22 74 79 70 65 22 3a 22 74 69 63 6b 65 72 22 2c 22 63 6f 64 65 22 3a 22 42 54 43 2d 45 54 48 22 2c 22 6f 70 65 6e 69 6e 67 5f 70 72 69 63 65 22 3a ... >
        // { type: "ticker",
        //   "code": "BTC-ETH",
        //   "opening_price": 0.02295092,
        //   "high_price": 0.02295092,
        //   "low_price": 0.02161249,
        //   "trade_price": 0.02161249,
        //   "prev_closing_price": 0.02185802,
        //   "acc_trade_price": 2.32732482,
        //   "change": "FALL",
        //   "change_price": 0.00024553,
        //   "signed_change_price": -0.00024553,
        //   "change_rate": 0.0112329479,
        //   "signed_change_rate": -0.0112329479,
        //   "ask_bid": "ASK",
        //   "trade_volume": 2.12,
        //   "acc_trade_volume": 106.11798418,
        //   "trade_date": "20200317",
        //   "trade_time": "215843",
        //   "trade_timestamp": 1584482323000,
        //   "acc_ask_volume": 90.16935908,
        //   "acc_bid_volume": 15.9486251,
        //   "highest_52_week_price": 0.03537414,
        //   "highest_52_week_date": "2019-04-08",
        //   "lowest_52_week_price": 0.01614901,
        //   "lowest_52_week_date": "2019-09-06",
        //   "trade_status": null,
        //   "market_state": "ACTIVE",
        //   "market_state_for_ios": null,
        //   "is_trading_suspended": false,
        //   "delisting_date": null,
        //   "market_warning": "NONE",
        //   "timestamp": 1584482323378,
        //   "acc_trade_price_24h": 2.5955306323568927,
        //   "acc_trade_volume_24h": 118.38798416,
        //   "stream_type": "SNAPSHOT" }
        const marketId = this.safeString(message, 'code');
        const messageHash = 'ticker:' + marketId;
        const ticker = this.parseTicker(message);
        const symbol = ticker['symbol'];
        this.tickers[symbol] = ticker;
        client.resolve(ticker, messageHash);
    }
    handleOrderBook(client, message) {
        // { type: "orderbook",
        //   "code": "BTC-ETH",
        //   "timestamp": 1584486737444,
        //   "total_ask_size": 16.76384456,
        //   "total_bid_size": 168.9020623,
        //   "orderbook_units":
        //    [ { ask_price: 0.02295077,
        //        "bid_price": 0.02161249,
        //        "ask_size": 3.57100696,
        //        "bid_size": 22.5303265 },
        //      { ask_price: 0.02295078,
        //        "bid_price": 0.02152658,
        //        "ask_size": 0.52451651,
        //        "bid_size": 2.30355128 },
        //      { ask_price: 0.02295086,
        //        "bid_price": 0.02150802,
        //        "ask_size": 1.585,
        //        "bid_size": 5 }, ... ],
        //   "stream_type": "SNAPSHOT" }
        const marketId = this.safeString(message, 'code');
        const symbol = this.safeSymbol(marketId, undefined, '-');
        const type = this.safeString(message, 'stream_type');
        const options = this.safeValue(this.options, 'watchOrderBook', {});
        const limit = this.safeInteger(options, 'limit', 15);
        if (type === 'SNAPSHOT') {
            this.orderbooks[symbol] = this.orderBook({}, limit);
        }
        const orderbook = this.orderbooks[symbol];
        // upbit always returns a snapshot of 15 topmost entries
        // the "REALTIME" deltas are not incremental
        // therefore we reset the orderbook on each update
        // and reinitialize it again with new bidasks
        orderbook.reset({});
        orderbook['symbol'] = symbol;
        const bids = orderbook['bids'];
        const asks = orderbook['asks'];
        const data = this.safeValue(message, 'orderbook_units', []);
        for (let i = 0; i < data.length; i++) {
            const entry = data[i];
            const ask_price = this.safeFloat(entry, 'ask_price');
            const ask_size = this.safeFloat(entry, 'ask_size');
            const bid_price = this.safeFloat(entry, 'bid_price');
            const bid_size = this.safeFloat(entry, 'bid_size');
            asks.store(ask_price, ask_size);
            bids.store(bid_price, bid_size);
        }
        const timestamp = this.safeInteger(message, 'timestamp');
        const datetime = this.iso8601(timestamp);
        orderbook['timestamp'] = timestamp;
        orderbook['datetime'] = datetime;
        const messageHash = 'orderbook:' + marketId;
        client.resolve(orderbook, messageHash);
    }
    handleTrades(client, message) {
        // { type: "trade",
        //   "code": "KRW-BTC",
        //   "timestamp": 1584508285812,
        //   "trade_date": "2020-03-18",
        //   "trade_time": "05:11:25",
        //   "trade_timestamp": 1584508285000,
        //   "trade_price": 6747000,
        //   "trade_volume": 0.06499468,
        //   "ask_bid": "ASK",
        //   "prev_closing_price": 6774000,
        //   "change": "FALL",
        //   "change_price": 27000,
        //   "sequential_id": 1584508285000002,
        //   "stream_type": "REALTIME" }
        const trade = this.parseTrade(message);
        const symbol = trade['symbol'];
        let stored = this.safeValue(this.trades, symbol);
        if (stored === undefined) {
            const limit = this.safeInteger(this.options, 'tradesLimit', 1000);
            stored = new Cache.ArrayCache(limit);
            this.trades[symbol] = stored;
        }
        stored.append(trade);
        const marketId = this.safeString(message, 'code');
        const messageHash = 'trade:' + marketId;
        client.resolve(stored, messageHash);
    }
    async authenticate(params = {}) {
        this.checkRequiredCredentials();
        const wsOptions = this.safeDict(this.options, 'ws', {});
        const authenticated = this.safeString(wsOptions, 'token');
        if (authenticated === undefined) {
            const auth = {
                'access_key': this.apiKey,
                'nonce': this.uuid(),
            };
            const token = rsa.jwt(auth, this.encode(this.secret), sha256.sha256, false);
            wsOptions['token'] = token;
            wsOptions['options'] = {
                'headers': {
                    'authorization': 'Bearer ' + token,
                },
            };
            this.options['ws'] = wsOptions;
        }
        const url = this.urls['api']['ws'] + '/private';
        const client = this.client(url);
        return client;
    }
    async watchPrivate(symbol, channel, messageHash, params = {}) {
        await this.authenticate();
        const request = {
            'type': channel,
        };
        if (symbol !== undefined) {
            await this.loadMarkets();
            const market = this.market(symbol);
            symbol = market['symbol'];
            const symbols = [symbol];
            const marketIds = this.marketIds(symbols);
            request['codes'] = marketIds;
            messageHash = messageHash + ':' + symbol;
        }
        let url = this.implodeParams(this.urls['api']['ws'], {
            'hostname': this.hostname,
        });
        url += '/private';
        const message = [
            {
                'ticket': this.uuid(),
            },
            request,
        ];
        return await this.watch(url, messageHash, message, messageHash);
    }
    async watchOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name upbit#watchOrders
         * @description watches information on multiple orders made by the user
         * @see https://global-docs.upbit.com/reference/websocket-myorder
         * @param {string} symbol unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const channel = 'myOrder';
        const messageHash = 'myOrder';
        const orders = await this.watchPrivate(symbol, channel, messageHash);
        if (this.newUpdates) {
            limit = orders.getLimit(symbol, limit);
        }
        return this.filterBySymbolSinceLimit(orders, symbol, since, limit, true);
    }
    async watchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name upbit#watchMyTrades
         * @description watches information on multiple trades made by the user
         * @see https://global-docs.upbit.com/reference/websocket-myorder
         * @param {string} symbol unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        await this.loadMarkets();
        const channel = 'myOrder';
        const messageHash = 'myTrades';
        const trades = await this.watchPrivate(symbol, channel, messageHash);
        if (this.newUpdates) {
            limit = trades.getLimit(symbol, limit);
        }
        return this.filterBySymbolSinceLimit(trades, symbol, since, limit, true);
    }
    parseWsOrderStatus(status) {
        const statuses = {
            'wait': 'open',
            'done': 'closed',
            'cancel': 'canceled',
            'watch': 'open',
            'trade': 'open',
        };
        return this.safeString(statuses, status, status);
    }
    parseWsOrder(order, market = undefined) {
        //
        // {
        //     "type": "myOrder",
        //     "code": "SGD-XRP",
        //     "uuid": "ac2dc2a3-fce9-40a2-a4f6-5987c25c438f",
        //     "ask_bid": "BID",
        //     "order_type": "limit",
        //     "state": "trade",
        //     "price": 0.001453,
        //     "avg_price": 0.00145372,
        //     "volume": 30925891.29839369,
        //     "remaining_volume": 29968038.09235948,
        //     "executed_volume": 30925891.29839369,
        //     "trades_count": 1,
        //     "reserved_fee": 44.23943970238218,
        //     "remaining_fee": 21.77177967409916,
        //     "paid_fee": 22.467660028283017,
        //     "locked": 43565.33112787242,
        //     "executed_funds": 44935.32005656603,
        //     "order_timestamp": 1710751590000,
        //     "timestamp": 1710751597500,
        //     "stream_type": "REALTIME"
        // }
        //
        const id = this.safeString(order, 'uuid');
        let side = this.safeStringLower(order, 'ask_bid');
        if (side === 'bid') {
            side = 'buy';
        }
        else {
            side = 'sell';
        }
        const timestamp = this.parse8601(this.safeString(order, 'order_timestamp'));
        const status = this.parseWsOrderStatus(this.safeString(order, 'state'));
        const marketId = this.safeString(order, 'code');
        market = this.safeMarket(marketId, market);
        let fee = undefined;
        const feeCost = this.safeString(order, 'paid_fee');
        if (feeCost !== undefined) {
            fee = {
                'currency': market['quote'],
                'cost': feeCost,
            };
        }
        return this.safeOrder({
            'info': order,
            'id': id,
            'clientOrderId': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': this.safeString(order, 'trade_timestamp'),
            'symbol': market['symbol'],
            'type': this.safeString(order, 'order_type'),
            'timeInForce': this.safeString(order, 'time_in_force'),
            'postOnly': undefined,
            'side': side,
            'price': this.safeString(order, 'price'),
            'stopPrice': undefined,
            'triggerPrice': undefined,
            'cost': this.safeString(order, 'executed_funds'),
            'average': this.safeString(order, 'avg_price'),
            'amount': this.safeString(order, 'volume'),
            'filled': this.safeString(order, 'executed_volume'),
            'remaining': this.safeString(order, 'remaining_volume'),
            'status': status,
            'fee': fee,
            'trades': undefined,
        });
    }
    parseWsTrade(trade, market = undefined) {
        // see: parseWsOrder
        let side = this.safeStringLower(trade, 'ask_bid');
        if (side === 'bid') {
            side = 'buy';
        }
        else {
            side = 'sell';
        }
        const timestamp = this.parse8601(this.safeString(trade, 'trade_timestamp'));
        const marketId = this.safeString(trade, 'code');
        market = this.safeMarket(marketId, market);
        let fee = undefined;
        const feeCost = this.safeString(trade, 'paid_fee');
        if (feeCost !== undefined) {
            fee = {
                'currency': market['quote'],
                'cost': feeCost,
            };
        }
        return this.safeTrade({
            'id': this.safeString(trade, 'trade_uuid'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'side': side,
            'price': this.safeString(trade, 'price'),
            'amount': this.safeString(trade, 'volume'),
            'cost': this.safeString(trade, 'executed_funds'),
            'order': this.safeString(trade, 'uuid'),
            'takerOrMaker': undefined,
            'type': this.safeString(trade, 'order_type'),
            'fee': fee,
            'info': trade,
        }, market);
    }
    handleMyOrder(client, message) {
        // see: parseWsOrder
        const tradeId = this.safeString(message, 'trade_uuid');
        if (tradeId !== undefined) {
            this.handleMyTrade(client, message);
        }
        this.handleOrder(client, message);
    }
    handleMyTrade(client, message) {
        // see: parseWsOrder
        let myTrades = this.myTrades;
        if (myTrades === undefined) {
            const limit = this.safeInteger(this.options, 'tradesLimit', 1000);
            myTrades = new Cache.ArrayCacheBySymbolById(limit);
        }
        const trade = this.parseWsTrade(message);
        myTrades.append(trade);
        let messageHash = 'myTrades';
        client.resolve(myTrades, messageHash);
        messageHash = 'myTrades:' + trade['symbol'];
        client.resolve(myTrades, messageHash);
    }
    handleOrder(client, message) {
        const parsed = this.parseWsOrder(message);
        const symbol = this.safeString(parsed, 'symbol');
        const orderId = this.safeString(parsed, 'id');
        if (this.orders === undefined) {
            const limit = this.safeInteger(this.options, 'ordersLimit', 1000);
            this.orders = new Cache.ArrayCacheBySymbolById(limit);
        }
        const cachedOrders = this.orders;
        const orders = this.safeValue(cachedOrders.hashmap, symbol, {});
        const order = this.safeValue(orders, orderId);
        if (order !== undefined) {
            const fee = this.safeValue(order, 'fee');
            if (fee !== undefined) {
                parsed['fee'] = fee;
            }
            const fees = this.safeValue(order, 'fees');
            if (fees !== undefined) {
                parsed['fees'] = fees;
            }
            parsed['trades'] = this.safeValue(order, 'trades');
            parsed['timestamp'] = this.safeInteger(order, 'timestamp');
            parsed['datetime'] = this.safeString(order, 'datetime');
        }
        cachedOrders.append(parsed);
        let messageHash = 'myOrder';
        client.resolve(this.orders, messageHash);
        messageHash = messageHash + ':' + symbol;
        client.resolve(this.orders, messageHash);
    }
    async watchBalance(params = {}) {
        /**
         * @method
         * @name upbit#watchBalance
         * @see https://global-docs.upbit.com/reference/websocket-myasset
         * @description query for balance and get the amount of funds available for trading or funds locked in orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
         */
        await this.loadMarkets();
        const channel = 'myAsset';
        const messageHash = 'myAsset';
        return await this.watchPrivate(undefined, channel, messageHash);
    }
    handleBalance(client, message) {
        //
        // {
        //     "type": "myAsset",
        //     "asset_uuid": "e635f223-1609-4969-8fb6-4376937baad6",
        //     "assets": [
        //       {
        //         "currency": "SGD",
        //         "balance": 1386929.37231066771348207123,
        //         "locked": 10329.670127489597585685
        //       }
        //     ],
        //     "asset_timestamp": 1710146517259,
        //     "timestamp": 1710146517267,
        //     "stream_type": "REALTIME"
        // }
        //
        const data = this.safeList(message, 'assets', []);
        const timestamp = this.safeInteger(message, 'timestamp');
        this.balance['timestamp'] = timestamp;
        this.balance['datetime'] = this.iso8601(timestamp);
        for (let i = 0; i < data.length; i++) {
            const balance = data[i];
            const currencyId = this.safeString(balance, 'currency');
            const code = this.safeCurrencyCode(currencyId);
            const available = this.safeString(balance, 'balance');
            const frozen = this.safeString(balance, 'locked');
            const account = this.account();
            account['free'] = available;
            account['used'] = frozen;
            this.balance[code] = account;
            this.balance = this.safeBalance(this.balance);
        }
        const messageHash = this.safeString(message, 'type');
        client.resolve(this.balance, messageHash);
    }
    handleMessage(client, message) {
        const methods = {
            'ticker': this.handleTicker,
            'orderbook': this.handleOrderBook,
            'trade': this.handleTrades,
            'myOrder': this.handleMyOrder,
            'myAsset': this.handleBalance,
        };
        const methodName = this.safeString(message, 'type');
        const method = this.safeValue(methods, methodName);
        if (method) {
            method.call(this, client, message);
        }
    }
}

module.exports = upbit;
