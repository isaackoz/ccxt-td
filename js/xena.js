'use strict';

const Exchange = require ('./base/Exchange');
const { ExchangeError, ArgumentsRequired, BadRequest, InsufficientFunds, InvalidAddress, BadSymbol, InvalidOrder } = require ('./base/errors');

module.exports = class xena extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'xena',
            'name': 'Xena Exchange',
            'countries': [ 'VC', 'UK' ],
            'rateLimit': 500,
            'has': {
                'CORS': false,
                'createDepositAddress': true,
                'createOrder': true,
                'fetchClosedOrders': true,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDeposits': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchMyTrades': true,
                'fetchOrderBook': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchWithdrawals': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/51840849/87489843-bb469280-c64c-11ea-91aa-69c6326506af.jpg',
                'api': {
                    'public': 'https://trading.xena.exchange/api',
                    'private': 'https://api.xena.exchange',
                },
                'www': 'https://xena.exchange',
                'doc': 'https://support.xena.exchange/support/solutions/articles/44000222066-introduction-to-xena-api',
                'fees': 'https://trading.xena.exchange/en/platform-specification/fee-schedule',
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '4h': '4h',
                '12h': '12h',
                '1d': '1d',
                '1w': '1w',
            },
            'api': {
                'public': {
                    'get': [
                        'common/currencies',
                        'common/instruments',
                        'common/features',
                        'common/commissions',
                        'common/news',
                        'market-data/candles/{marketId}/{timeframe}',
                        'market-data/market-watch',
                        'market-data/dom/{symbol}',
                        'market-data/candles/{symbol}/{timeframe}',
                        'market-data/trades/{symbol}',
                        'market-data/server-time',
                        'market-data/v2/candles/{symbol}/{timeframe}',
                        'market-data/v2/trades/{symbol}',
                        'market-data/v2/dom/{symbol}/',
                        'market-data/v2/server-time',
                    ],
                },
                'private': {
                    'get': [
                        'trading/accounts/{accountId}/order',
                        'trading/accounts/{accountId}/active-orders',
                        'trading/accounts/{accountId}/last-order-statuses',
                        'trading/accounts/{accountId}/positions',
                        'trading/accounts/{accountId}/positions-history',
                        'trading/accounts/{accountId}/margin-requirements',
                        'trading/accounts',
                        'trading/accounts/{accountId}/balance',
                        'trading/accounts/{accountId}/trade-history',
                        // 'trading/accounts/{accountId}/trade-history?symbol=BTC/USDT&client_order_id=EMBB8Veke&trade_id=220143254',
                        'transfers/accounts',
                        'transfers/accounts/{accountId}',
                        'transfers/accounts/{accountId}/deposit-address/{currency}',
                        'transfers/accounts/{accountId}/deposits',
                        'transfers/accounts/{accountId}/trusted-addresses',
                        'transfers/accounts/{accountId}/withdrawals',
                        'transfers/accounts/{accountId}/balance-history',
                        // 'transfers/accounts/{accountId}/balance-history?currency={currency}&from={time}&to={time}&kind={kind}&kind={kind}',
                        // 'transfers/accounts/{accountId}/balance-history?page={page}&limit={limit}',
                        // 'transfers/accounts/{accountId}/balance-history?txid=3e1db982c4eed2d6355e276c5bae01a52a27c9cef61574b0e8c67ee05fc26ccf',
                    ],
                    'post': [
                        'trading/order/new',
                        'trading/order/heartbeat',
                        'trading/order/cancel',
                        'trading/order/mass-cancel',
                        'trading/order/replace',
                        'trading/position/maintenance',
                        'transfers/accounts/{accountId}/withdrawals',
                        'transfers/accounts/{accountId}/deposit-address/{currency}',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.0005,
                    'taker': 0.001,
                    'tierBased': true,
                    'percentage': true,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {},
                    'deposit': {},
                },
            },
            'exceptions': {
                'exact': {
                    'Validation failed': BadRequest,
                },
                'broad': {
                    'Invalid aggregation ratio or depth': BadRequest,
                    'address': InvalidAddress,
                    'Money not enough': InsufficientFunds,
                },
            },
            'options': {
                'defaultType': 'margin', // 'margin',
                'accountId': undefined, // '1012838157',
            },
        });
    }

    async fetchTime (params = {}) {
        const response = await this.publicGetMarketDataV2ServerTime (params);
        //
        //     {
        //         "msgType":"0",
        //         "transactTime":1594774454112817637
        //     }
        //
        const transactTime = this.safeInteger (response, 'transactTime');
        return parseInt (transactTime / 1000000);
    }

    async fetchMarkets (params = {}) {
        const response = await this.publicGetCommonInstruments (params);
        //
        //     [
        //         {
        //             "id":"ETHUSD_3M_250920",
        //             "type":"Margin",
        //             "marginType":"XenaFuture",
        //             "symbol":"ETHUSD_3M_250920",
        //             "baseCurrency":"ETH",
        //             "quoteCurrency":"USD",
        //             "settlCurrency":"BTC",
        //             "tickSize":2,
        //             "minOrderQuantity":"1",
        //             "orderQtyStep":"1",
        //             "limitOrderMaxDistance":"10",
        //             "priceInputMask":"0000.00",
        //             "enabled":true,
        //             "liquidationMaxDistance":"0.01",
        //             "contractValue":"1",
        //             "contractCurrency":"BTC",
        //             "lotSize":"1",
        //             "tickValue":"0.00000001", // linear contracts only
        //             "maxOrderQty":"175000",
        //             "maxPosVolume":"1750000",
        //             "mark":".ETHUSD_3M_250920",
        //             "underlying":".ETHUSD_TWAP",
        //             "openInterest":".ETHUSD_3M_250920_OpenInterest",
        //             "floatingPL":"BidAsk", // perpetual contracts only
        //             "addUvmToFreeMargin":"ProfitAndLoss",
        //             "margin":{
        //                 "netting":"PositionsAndOrders",
        //                 "rates":[
        //                     {"maxVolume":"175000","initialRate":"0.05","maintenanceRate":"0.0125"},
        //                     {"maxVolume":"350000","initialRate":"0.1","maintenanceRate":"0.025"},
        //                     {"maxVolume":"500000","initialRate":"0.2","maintenanceRate":"0.05"},
        //                     {"maxVolume":"750000","initialRate":"0.3","maintenanceRate":"0.075"},
        //                     {"maxVolume":"1050000","initialRate":"0.4","maintenanceRate":"0.1"},
        //                     {"maxVolume":"1400000","initialRate":"0.5","maintenanceRate":"0.125"},
        //                     {"maxVolume":"1750000","initialRate":"1","maintenanceRate":"0.25"}
        //                 ],
        //                 "rateMultipliers":{
        //                     "LimitBuy":"1",
        //                     "LimitSell":"1",
        //                     "Long":"1",
        //                     "MarketBuy":"1",
        //                     "MarketSell":"1",
        //                     "Short":"1",
        //                     "StopBuy":"0",
        //                     "StopSell":"0"
        //                 }
        //             },
        //             "clearing":{"enabled":true,"index":".ETHUSD_3M_250920"},
        //             "premium":{"enabled":true,"index":".XBTUSD_Premium_IR_Corrected"}, // perpetual contracts only
        //             "riskAdjustment":{"enabled":true,"index":".RiskAdjustment_IR"},
        //             "expiration":{"enabled":true,"index":".ETHUSD_TWAP"}, // futures only
        //             "pricePrecision":3,
        //             "priceRange":{
        //                 "enabled":true,
        //                 "distance":"0.03",
        //                 "movingBoundary":"0",
        //                 "lowIndex":".ETHUSD_3M_250920_LOWRANGE",
        //                 "highIndex":".ETHUSD_3M_250920_HIGHRANGE"
        //             },
        //             "priceLimits":{
        //                 "enabled":true,
        //                 "distance":"0.5",
        //                 "movingBoundary":"0",
        //                 "lowIndex":".ETHUSD_3M_250920_LOWLIMIT",
        //                 "highIndex":".ETHUSD_3M_250920_HIGHLIMIT"
        //             },
        //             "inverse":true, // inverse contracts only
        //             "serie":"ETHUSD", // futures only
        //             "tradingStartDate":"2020-03-27 07:00:00",
        //             "expiryDate":"2020-09-25 08:00:00" // futures only
        //         },
        //         {
        //             "type":"Index",
        //             "symbol":".ETHUSD_Premium_IR_Corrected",
        //             "tickSize":6,
        //             "enabled":true,
        //             "basis":365
        //         },
        //     ]
        //
        const result = [];
        for (let i = 0; i < response.length; i++) {
            const market = response[i];
            let type = this.safeStringLower (market, 'type');
            const id = this.safeString (market, 'symbol');
            const numericId = this.safeString (market, 'id');
            const marginType = this.safeString (market, 'marginType');
            const baseId = this.safeString (market, 'baseCurrency');
            const quoteId = this.safeString (market, 'quoteCurrency');
            const base = this.safeCurrencyCode (baseId);
            const quote = this.safeCurrencyCode (quoteId);
            if (type === 'margin') {
                if (marginType === 'XenaFuture') {
                    type = 'future';
                } else if (marginType === 'XenaListedPerpetual') {
                    type = 'swap';
                }
            }
            const future = (type === 'future');
            const swap = (type === 'swap');
            const symbol = id;
            const pricePrecision = this.safeInteger2 (market, 'tickSize', 'pricePrecision');
            const precision = {
                'price': pricePrecision,
                'amount': 0,
            };
            const maxCost = this.safeFloat (market, 'maxOrderQty');
            const minCost = this.safeFloat (market, 'minOrderQuantity');
            const limits = {
                'amount': {
                    'min': undefined,
                    'max': undefined,
                },
                'price': {
                    'min': undefined,
                    'max': undefined,
                },
                'cost': {
                    'min': minCost,
                    'max': maxCost,
                },
            };
            const active = this.safeValue (market, 'enabled', false);
            const inverse = this.safeValue (market, 'inverse', false);
            result.push ({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'baseId': baseId,
                'quoteId': quoteId,
                'numericId': numericId,
                'active': active,
                'type': type,
                'spot': false,
                'future': future,
                'swap': swap,
                'inverse': inverse,
                'precision': precision,
                'limits': limits,
                'info': market,
            });
        }
        return result;
    }

    async fetchCurrencies (params = {}) {
        const response = await this.publicGetCommonCurrencies (params);
        //
        //     {
        //         "BAB": {
        //             "name":"BAB",
        //             "title":"Bitcoin ABC",
        //             "blockchain":{
        //                 "name":"BAB",
        //                 "title":"Bitcoin ABC",
        //                 "deposit":{"confirmations":6},
        //                 "withdraw":{"confirmations":1},
        //                 "addressReuseAllowed":false,
        //                 "view":{
        //                     "uriTemplate":"bitcoinabc:%s?message=Xena Exchange",
        //                     "recommendedFee":"0.00001",
        //                     "transactionUrl":"https://blockchair.com/bitcoin-cash/transaction/${txId}",
        //                     "walletUrl":"https://blockchair.com/bitcoin-cash/address/${walletId}"
        //                 }
        //             },
        //             "precision":5,
        //             "withdraw":{"minAmount":"0.01","commission":"0.001"},
        //             "view":{
        //                 "color":"#DC7C08",
        //                 "site":"https://www.bitcoinabc.org"
        //             },
        //             "enabled":true
        //         },
        //     }
        const ids = Object.keys (response);
        const result = {};
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const currency = response[id];
            const code = this.safeCurrencyCode (id);
            const name = this.safeString (currency, 'title');
            const precision = this.safeInteger (currency, 'precision');
            const enabled = this.safeValue (currency, 'enabled');
            const active = (enabled === true);
            const withdraw = this.safeValue (currency, 'withdraw', {});
            result[code] = {
                'id': id,
                'code': code,
                'info': currency,
                'name': name,
                'active': active,
                'fee': this.safeFloat (withdraw, 'commission'),
                'precision': precision,
                'limits': {
                    'amount': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': this.safeFloat (withdraw, 'minAmount'),
                        'max': undefined,
                    },
                },
            };
        }
        return result;
    }

    parseTicker (ticker, market = undefined) {
        //
        // fetchTicker, fetchTickers
        //
        //     {
        //         "symbol":".XBTUSD_3M_250920_MID",
        //         "firstPx":"9337.49",
        //         "lastPx":"9355.81",
        //         "highPx":"9579.42",
        //         "lowPx":"9157.63",
        //         "buyVolume":"0",
        //         "sellVolume":"0",
        //         "bid":"0",
        //         "ask":"0"
        //     }
        //
        const timestamp = this.milliseconds ();
        const marketId = this.safeString (ticker, 'symbol');
        let symbol = undefined;
        if (marketId !== undefined) {
            if (marketId in this.markets_by_id) {
                market = this.markets_by_id[marketId];
            } else {
                symbol = marketId;
            }
        }
        if ((symbol === undefined) && (market !== undefined)) {
            symbol = market['symbol'];
        }
        const last = this.safeFloat (ticker, 'lastPx');
        const open = this.safeFloat (ticker, 'firstPx');
        let percentage = undefined;
        let change = undefined;
        let average = undefined;
        if ((last !== undefined) && (open !== undefined)) {
            change = last - open;
            average = this.sum (last, open) / 2;
            if (open > 0) {
                percentage = change / open * 100;
            }
        }
        const buyVolume = this.safeFloat (ticker, 'buyVolume');
        const sellVolume = this.safeFloat (ticker, 'sellVolume');
        const baseVolume = this.sum (buyVolume, sellVolume);
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeFloat (ticker, 'highPx'),
            'low': this.safeFloat (ticker, 'lowPx'),
            'bid': this.safeFloat (ticker, 'bid'),
            'bidVolume': undefined,
            'ask': this.safeFloat (ticker, 'ask'),
            'askVolume': undefined,
            'vwap': undefined,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': percentage,
            'average': average,
            'baseVolume': baseVolume,
            'quoteVolume': undefined,
            'info': ticker,
        };
    }

    async fetchTicker (symbol, params = {}) {
        await this.loadMarkets ();
        const tickers = await this.fetchTickers (undefined, params);
        if (symbol in tickers) {
            return tickers[symbol];
        }
        throw new BadSymbol (this.id + ' fetchTicker could not find a ticker with symbol ' + symbol);
    }

    async fetchTickers (symbols = undefined, params = {}) {
        await this.loadMarkets ();
        const tickers = await this.publicGetMarketDataMarketWatch (params);
        //
        //     [
        //         {
        //             "symbol":".XBTUSD_3M_250920_MID",
        //             "firstPx":"9337.49",
        //             "lastPx":"9355.81",
        //             "highPx":"9579.42",
        //             "lowPx":"9157.63",
        //             "buyVolume":"0",
        //             "sellVolume":"0",
        //             "bid":"0",
        //             "ask":"0"
        //         }
        //     ]
        //
        const result = {};
        for (let i = 0; i < tickers.length; i++) {
            const ticker = this.parseTicker (tickers[i]);
            const symbol = ticker['symbol'];
            result[symbol] = ticker;
        }
        return result;
    }

    async fetchOrderBook (symbol, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {
            'symbol': this.marketId (symbol),
        };
        if (limit !== undefined) {
            request['depth'] = limit;
        }
        const response = await this.publicGetMarketDataV2DomSymbol (this.extend (request, params));
        //
        //     {
        //         "msgType":"W",
        //         "mdStreamId":"DOM:XBTUSD:aggregated",
        //         "lastUpdateTime":1594772683037691997,
        //         "mdBookType":"2",
        //         "symbol":"XBTUSD",
        //         "lowRangePx":"9132.24",
        //         "highRangePx":"9410.36",
        //         "lowLimitPx":"9132.24",
        //         "highLimitPx":"9410.36",
        //         "clearingPx":"9253.4",
        //         "bestBid":"9269.8",
        //         "bestAsk":"9275.9",
        //         "mdEntry":[
        //             {"mdEntryType":"1","mdEntryPx":"9275.9","mdEntrySize":"3000","numberOfOrders":1},
        //             {"mdEntryType":"1","mdEntryPx":"9277.7","mdEntrySize":"50000","numberOfOrders":1},
        //             {"mdEntryType":"1","mdEntryPx":"9277.8","mdEntrySize":"2000","numberOfOrders":1},
        //             {"mdEntryType":"0","mdEntryPx":"9269.8","mdEntrySize":"2000","numberOfOrders":1},
        //             {"mdEntryType":"0","mdEntryPx":"9267.9","mdEntrySize":"3000","numberOfOrders":1},
        //             {"mdEntryType":"0","mdEntryPx":"9267.8","mdEntrySize":"50000","numberOfOrders":1},
        //         ]
        //     }
        //
        const mdEntry = this.safeValue (response, 'mdEntry', []);
        const mdEntriesByType = this.groupBy (mdEntry, 'mdEntryType');
        const lastUpdateTime = this.safeInteger (response, 'lastUpdateTime');
        const timestamp = parseInt (lastUpdateTime / 1000000);
        return this.parseOrderBook (mdEntriesByType, timestamp, '0', '1', 'mdEntryPx', 'mdEntrySize');
    }

    async fetchAccounts (params = {}) {
        const response = await this.privateGetTradingAccounts (params);
        //
        //     {
        //         "accounts": [
        //             { "id":8273231, "kind": "Spot" },
        //             { "id":10012833469, "kind": "Margin", "currency": "BTC" }
        //         ]
        //     }
        //
        const accounts = this.safeValue (response, 'accounts');
        const result = [];
        for (let i = 0; i < accounts.length; i++) {
            const account = accounts[i];
            const accountId = this.safeString (account, 'id');
            const currencyId = this.safeString (account, 'currency');
            const code = this.safeCurrencyCode (currencyId);
            const type = this.safeStringLower (account, 'kind');
            result.push ({
                'id': accountId,
                'type': type,
                'currency': code,
                'info': account,
            });
        }
        return result;
    }

    async findAccountByType (type) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountsByType = this.groupBy (this.accounts, 'type');
        const accounts = this.safeValue (accountsByType, type);
        if (accounts === undefined) {
            throw new ExchangeError (this.id + " findAccountByType() could not find an accountId with type '" + type + "', specify the 'accountId' parameter instead"); // eslint-disable-line quotes
        }
        const numAccounts = accounts.length;
        if (numAccounts > 1) {
            throw new ExchangeError (this.id + " findAccountByType() found more than one accountId with type '" + type + "', specify the 'accountId' parameter instead"); // eslint-disable-line quotes
        }
        return accounts[0];
    }

    async getAccountId (params) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const defaultAccountId = this.safeString (this.options, 'accountId');
        const accountId = this.safeString (params, 'accountId', defaultAccountId);
        if (accountId !== undefined) {
            return accountId;
        }
        const defaultType = this.safeString2 (this.options, 'fetchBalance', 'defaultType', 'spot');
        const type = this.safeString (params, 'type', defaultType);
        params = this.omit (params, 'type');
        if (type === undefined) {
            throw new ArgumentsRequired (this.id + " fetchBalance() requires an 'accountId' parameter or a 'type' parameter ('spot' or 'margin')");
        }
        const account = await this.findAccountByType (type);
        return account['id'];
    }

    async fetchBalance (params = {}) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        const request = {
            'accountId': accountId,
        };
        const response = await this.privateGetTradingAccountsAccountIdBalance (this.extend (request, params));
        //
        //     {
        //         "balances": [
        //             {"available":"0","onHold":"0","settled":"0","equity":"0","currency":"BAB","lastUpdated":1564811790485125345},
        //             {"available":"0","onHold":"0","settled":"0","equity":"0","currency":"BSV","lastUpdated":1564811790485125345},
        //             {"available":"0","onHold":"0","settled":"0","equity":"0","currency":"BTC","lastUpdated":1564811790485125345},
        //         ]
        //     }
        //
        const result = { 'info': response };
        const balances = this.safeValue (response, 'balances', []);
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const currencyId = this.safeString (balance, 'currency');
            const code = this.safeCurrencyCode (currencyId);
            const account = this.account ();
            account['free'] = this.safeFloat (balance, 'available');
            account['used'] = this.safeFloat (balance, 'onHold');
            result[code] = account;
        }
        return this.parseBalance (result);
    }

    parseTrade (trade, market = undefined) {
        //
        //     {
        //         "mdUpdateAction":"0",
        //         "mdEntryType":"2",
        //         "mdEntryPx":"9225.16",
        //         "mdEntrySize":"10000",
        //         "transactTime":1594728504524977655,
        //         "tradeId":"6ac51bb7-7505-4f35-85ef-61eb738cb4d9",
        //         "aggressorSide":"1"
        //     }
        //
        // fetchMyTrades
        //
        //     {
        //         "account":8263118,
        //         "clOrdId":"Kw9664m22",
        //         "orderId":"7aa7f445-89be-47ec-b649-e0671e238609",
        //         "symbol":"BTC/USDT",
        //         "ordType":"Limit",
        //         "price":"8000",
        //         "transactTime":1557916859727908000,
        //         "execId":"9aa20f1f-5c73-408d-909d-07f74f04edfd",
        //         "tradeId":"220143240",
        //         "side":"Sell",
        //         "orderQty":"1",
        //         "leavesQty":"0",
        //         "cumQty":"1",
        //         "lastQty":"1",
        //         "lastPx":"8000",
        //         "avgPx":"0",
        //         "calculatedCcyLastQty":"8000",
        //         "netMoney":"8000",
        //         "commission":"0",
        //         "commCurrency":"USDT",
        //         "positionEffect":"UnknownPositionEffect"
        //     }
        //
        const id = this.safeString (trade, 'tradeId');
        let timestamp = this.safeInteger (trade, 'transactTime');
        if (timestamp !== undefined) {
            timestamp = parseInt (timestamp / 1e6);
        }
        const type = this.safeStringLower (trade, 'ordType');
        let side = this.safeStringLower (trade, 'side');
        if (side === undefined) {
            side = this.safeInteger (trade, 'aggressorSide');
            if (side === 1) {
                side = 'buy';
            } else if (side === 2) {
                side = 'sell';
            }
        }
        const orderId = this.safeString (trade, 'orderId');
        let symbol = undefined;
        const marketId = this.safeString (trade, 'symbol');
        if (marketId !== undefined) {
            if (marketId in this.markets_by_id) {
                market = this.markets_by_id[symbol];
                symbol = market['id'];
            } else {
                const [ baseId, quoteId ] = marketId.split ('/');
                const base = this.safeCurrencyCode (baseId);
                const quote = this.safeCurrencyCode (quoteId);
                symbol = base + '/' + quote;
            }
        }
        if ((symbol === undefined) && (market !== undefined)) {
            symbol = market['symbol'];
        }
        const price = this.safeFloat2 (trade, 'price', 'mdEntryPx');
        const amount = this.safeFloat2 (trade, 'cumQty', 'mdEntrySize');
        let cost = this.safeFloat (trade, 'netMoney');
        if (cost === undefined) {
            if (price !== undefined) {
                if (amount !== undefined) {
                    cost = price * amount;
                }
            }
        }
        let fee = undefined;
        if ('fee_amount' in trade) {
            const feeCost = this.safeFloat (trade, 'commission');
            const feeCurrencyId = this.safeString (trade, 'commCurrency');
            const feeCurrencyCode = this.safeCurrencyCode (feeCurrencyId);
            fee = {
                'cost': feeCost,
                'currency': feeCurrencyCode,
            };
        }
        return {
            'id': id,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': symbol,
            'type': type,
            'order': orderId,
            'side': side,
            'takerOrMaker': undefined,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': fee,
        };
    }

    async fetchMyTrades (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        const request = {
            'accountId': accountId,
            // 'page': 1,
            // 'limit': integer,
            // 'from': time,
            // 'to': time,
            // 'symbol': currency['id'],
            // 'trade_id': id,
            // 'client_order_id': id,
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['symbol'] = market['id'];
        }
        if (since !== undefined) {
            request['from'] = since * 1e6;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.privateGetTradingAccountsAccountIdTradeHistory (this.extend (request, params));
        //
        //     [
        //         {
        //             "account":8263118,
        //             "clOrdId":"Kw9664m22",
        //             "orderId":"7aa7f445-89be-47ec-b649-e0671e238609",
        //             "symbol":"BTC/USDT",
        //             "ordType":"Limit",
        //             "price":"8000",
        //             "transactTime":1557916859727908000,
        //             "execId":"9aa20f1f-5c73-408d-909d-07f74f04edfd",
        //             "tradeId":"220143240",
        //             "side":"Sell",
        //             "orderQty":"1",
        //             "leavesQty":"0",
        //             "cumQty":"1",
        //             "lastQty":"1",
        //             "lastPx":"8000",
        //             "avgPx":"0",
        //             "calculatedCcyLastQty":"8000",
        //             "netMoney":"8000",
        //             "commission":"0",
        //             "commCurrency":"USDT",
        //             "positionEffect":"UnknownPositionEffect"
        //         },
        //         {
        //             "account":8263118,
        //             "clOrdId":"8yk33JO4b",
        //             "orderId":"fcd4d7c2-31c9-4e4b-96bc-bb241ddb392d",
        //             "symbol":"BTC/USDT",
        //             "ordType":"Limit",
        //             "price":"8000",
        //             "transactTime":1557912994901110000,
        //             "execId":"cef664d4-f438-4ad5-a7ad-279f725380d3",
        //             "tradeId":"220143239",
        //             "side":"Sell",
        //             "orderQty":"1",
        //             "leavesQty":"0",
        //             "cumQty":"1",
        //             "lastQty":"1",
        //             "lastPx":"8000",
        //             "avgPx":"0",
        //             "calculatedCcyLastQty":"8000",
        //             "netMoney":"8000",
        //             "commission":"0",
        //             "commCurrency":"USDT",
        //             "positionEffect":"UnknownPositionEffect"
        //         }
        //     ]
        //
        return this.parseTrades (response, market, since, limit);
    }

    parseOHLCV (ohlcv, market = undefined) {
        //
        //     {
        //         "transactTime":1594784700000000000,
        //         "firstPx":"9246.3",
        //         "lastPx":"9232.8",
        //         "highPx":"9246.3",
        //         "lowPx":"9232.8",
        //         "buyVolume":"0",
        //         "sellVolume":"0"
        //     }
        //
        const transactTime = this.safeInteger (ohlcv, 'transactTime');
        const timestamp = parseInt (transactTime / 1000000);
        const buyVolume = this.safeFloat (ohlcv, 'buyVolume');
        const sellVolume = this.safeFloat (ohlcv, 'sellVolume');
        const volume = this.sum (buyVolume, sellVolume);
        return [
            timestamp,
            this.safeFloat (ohlcv, 'firstPx'),
            this.safeFloat (ohlcv, 'highPx'),
            this.safeFloat (ohlcv, 'lowPx'),
            this.safeFloat (ohlcv, 'lastPx'),
            volume,
        ];
    }

    async fetchOHLCV (symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
            'timeframe': this.timeframes[timeframe],
        };
        const durationInSeconds = this.parseTimeframe (timeframe);
        const duration = durationInSeconds * 1000;
        if (since !== undefined) {
            request['from'] = since * 1000000;
            if (limit !== undefined) {
                request['to'] = this.sum (since, limit * duration) * 1000000;
            }
        } else {
            const now = this.milliseconds ();
            // max limit is 1000
            if (limit !== undefined) {
                request['from'] = (now - limit * duration) * 1000000;
            }
        }
        const response = await this.publicGetMarketDataV2CandlesSymbolTimeframe (this.extend (request, params));
        //
        //     {
        //         "mdEntry":[
        //             {"transactTime":1594784700000000000,"firstPx":"9246.3","lastPx":"9232.8","highPx":"9246.3","lowPx":"9232.8","buyVolume":"0","sellVolume":"0"},
        //             {"transactTime":1594785600000000000,"firstPx":"9231.8","lastPx":"9227.3","highPx":"9232.8","lowPx":"9227.3","buyVolume":"0","sellVolume":"0"},
        //             {"transactTime":1594786500000000000,"firstPx":"9226.3","lastPx":"9230.3","highPx":"9230.3","lowPx":"9220.6","buyVolume":"0","sellVolume":"0"}
        //         ]
        //     }
        //
        const mdEntry = this.safeValue (response, 'mdEntry', []);
        return this.parseOHLCVs (mdEntry, market, timeframe, since, limit);
    }

    async fetchTrades (symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
            // 'from': this.iso8601 (since),
            // 'to': this.iso8601 (this.milliseconds ()),
            // 'page': 1,
            // 'limit': limit,
        };
        if (since !== undefined) {
            request['from'] = this.iso8601 (since);
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.publicGetMarketDataV2TradesSymbol (this.extend (request, params));
        //
        //     {
        //         "msgType":"W",
        //         "lastUpdateTime":1594737830902223803,
        //         "symbol":"XBTUSD",
        //         "mdEntry":[
        //             {
        //                 "mdUpdateAction":"0",
        //                 "mdEntryType":"2",
        //                 "mdEntryPx":"9225.16",
        //                 "mdEntrySize":"10000",
        //                 "transactTime":1594728504524977655,
        //                 "tradeId":"6ac51bb7-7505-4f35-85ef-61eb738cb4d9",
        //                 "aggressorSide":"1"
        //             },
        //         ]
        //     }
        //
        const mdEntry = this.safeValue (response, 'mdEntry', []);
        return this.parseTrades (mdEntry, market, since, limit);
    }

    parseOrderStatus (status) {
        const statuses = {
            'A': 'open', // PendingNew
            '0': 'open', // New
            '1': 'open', // PartiallyFilled
            '2': 'closed', // Filled
            '6': 'canceled', // PendingCancel
            '4': 'canceled', // Cancelled
            'E': 'open', // PendingReplace
            '8': 'rejected', // Rejected
        };
        return this.safeString (statuses, status, status);
    }

    parseOrder (order, market = undefined) {
        //
        // createOrder
        //
        //     {
        //         "msgType":"8",
        //         "account":1012838720,
        //         "clOrdId":"XAq0pRQ1g",
        //         "orderId":"64d7a06a-27e5-422e-99d9-3cadc04f5a35",
        //         "symbol":"XBTUSD",
        //         "ordType":"2",
        //         "price":"9000",
        //         "transactTime":1593778763271127920,
        //         "execId":"ff5fb8153652f0516bf07b6979255bed053c84b9",
        //         "execType":"I",
        //         "ordStatus":"0",
        //         "side":"1",
        //         "orderQty":"1",
        //         "leavesQty":"1",
        //         "cumQty":"0",
        //         "positionEffect":"O",
        //         "marginAmt":"0.00000556",
        //         "marginAmtType":"11"
        //     }
        //
        const id = this.safeString (order, 'orderId');
        const clientOrderId = this.safeString (order, 'clOrdId');
        const transactTime = this.safeInteger (order, 'transactTime');
        const timestamp = transactTime / 1000000;
        const status = this.parseOrderStatus (this.safeString (order, 'ordStatus'));
        let symbol = undefined;
        const marketId = this.safeString (order, 'symbol');
        if (marketId !== undefined) {
            if (marketId in this.markets_by_id) {
                market = this.markets_by_id[marketId];
            } else {
                symbol = marketId;
            }
        }
        if ((symbol === undefined) && (market !== undefined)) {
            symbol = market['symbol'];
        }
        const price = this.safeFloat (order, 'price');
        const amount = this.safeFloat (order, 'orderQty');
        const filled = this.safeFloat (order, 'cumQty');
        const remaining = this.safeFloat (order, 'leavesQty');
        let cost = undefined;
        const side = this.safeStringLower (order, 'side');
        const type = this.safeStringLower (order, 'type');
        if (cost === undefined) {
            if ((price !== undefined) && (filled !== undefined)) {
                cost = price * filled;
            }
        }
        return {
            'id': id,
            'clientOrderId': clientOrderId,
            'info': order,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'lastTradeTimestamp': undefined,
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'average': undefined,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': undefined,
            'trades': undefined,
        };
    }

    async createOrder (symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        //
        //     MsgType 35 M D
        //     Account 1 M // ulong Account ID
        //     ClOrdId 11 M string (40)
        //     Symbol 55 M string
        //     OrdType 40 M OrdType // 1 Market 2 Limit 3 Stop 4 Stop-Limit
        //     Side 54 M // 1 - Buy 2 - Sell
        //     OrderQty 38 M decimal
        //     Price 44 C decimal // Required for Limit and Stop-Limit orders
        //     StopPx 99 C decimal // Stop (trigger) price, required for Stop and Stop-Limit orders
        //     TimeInForce 59 O TimeInForce
        //     ExecInst 18 O ExecInst
        //     PositionID 2618 C ulong // Required when PositionEffect == Close and hedged accounting is used
        //     PositionEffect 77 O // C — Close O — Open Send C along with the PositionID if the order must close a position (in the hedged accounting mode)
        //     TransactTime 60 M timestamp // Current timestamp
        //     Text 58 O string (40) // Optional comment for the order
        //     GrpID TODO O string (40) // Group identifier for cancel on disconnect orders
        //
        //     {
        //         "account":1013838923,
        //         "clOrdId":str(int(time.time() * 100000000)),
        //         "orderQty":"1",
        //         "ordType":"2",
        //         "side":"1",
        //         "price":"9527",
        //         "symbol": "XBTUSD",
        //         "transactTime":11
        //     }
        //
        const orderTypes = {
            'market': '1',
            'limit': '2',
            'stop': '3',
            'stop-limit': '4',
        };
        const orderType = this.safeString (orderTypes, type);
        if (orderType === undefined) {
            throw new InvalidOrder (this.id + ' createOrder does not support order type ' + type + ', supported order types are market, limit, stop, stop-limit');
        }
        const orderSides = {
            'buy': '1',
            'sell': '2',
        };
        const orderSide = this.safeString (orderSides, side);
        if (orderSide === undefined) {
            throw new InvalidOrder (this.id + ' createOrder does not support order side ' + side + ', supported order sides are buy, sell');
        }
        const market = this.market (symbol);
        const request = {
            'accountId': accountId,
            'symbol': market['id'],
            'ordType': orderType,
            'side': orderSide,
            'orderQty': this.amountToPrecision (symbol, amount),
            'transactTime': this.milliseconds () * 1000000,
        };
        if ((type === 'limit') || (type === 'stop-limit')) {
            if (price === undefined) {
                throw new InvalidOrder (this.id + ' createOrder requires a price argument for order type ' + type);
            }
            request['price'] = this.priceToPrecision (symbol, price);
        }
        if ((type === 'stop') || (type === 'stop-limit')) {
            const stopPx = this.safeFloat (params, 'stopPx');
            if (stopPx === undefined) {
                throw new InvalidOrder (this.id + ' createOrder requires a stopPx param for order type ' + type);
            }
            request['stopPx'] = this.priceToPrecision (symbol, stopPx);
            params = this.omit (params, 'stopPx');
        }
        const clientOrderId = this.safeString2 (params, 'clientOrderId', 'clOrdId');
        if (clientOrderId !== undefined) {
            request['clOrdId'] = clientOrderId;
            params = this.omit (params, [ 'clientOrderId', 'clOrdId' ]);
        }
        const response = await this.privatePostTradingOrderNew (this.extend (request, params));
        //
        //     {
        //         "msgType":"8",
        //         "account":1012838720,
        //         "clOrdId":"XAq0pRQ1g",
        //         "orderId":"64d7a06a-27e5-422e-99d9-3cadc04f5a35",
        //         "symbol":"XBTUSD",
        //         "ordType":"2",
        //         "price":"9000",
        //         "transactTime":1593778763271127920,
        //         "execId":"ff5fb8153652f0516bf07b6979255bed053c84b9",
        //         "execType":"I",
        //         "ordStatus":"0",
        //         "side":"1",
        //         "orderQty":"1",
        //         "leavesQty":"1",
        //         "cumQty":"0",
        //         "positionEffect":"O",
        //         "marginAmt":"0.00000556",
        //         "marginAmtType":"11"
        //     }
        //
        return this.parseOrder (response, market);
    }

    async fetchOpenOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        const request = {
            'account_id': accountId,
            // 'symbol': market['id'],
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['symbol'] = market['id'];
        }
        const response = await this.privateGetTradingAccountsAccountIdActiveOrders (this.extend (request, params));
        //
        //     [
        //         {
        //             "msgType":"8",
        //             "account":1012838720,
        //             "clOrdId":"XAq0pRQ1g",
        //             "orderId":"64d7a06a-27e5-422e-99d9-3cadc04f5a35",
        //             "symbol":"XBTUSD",
        //             "ordType":"2",
        //             "price":"9000",
        //             "transactTime":1593778763271127920,
        //             "execId":"ff5fb8153652f0516bf07b6979255bed053c84b9",
        //             "execType":"I",
        //             "ordStatus":"0",
        //             "side":"1",
        //             "orderQty":"1",
        //             "leavesQty":"1",
        //             "cumQty":"0",
        //             "positionEffect":"O",
        //             "marginAmt":"0.00000556",
        //             "marginAmtType":"11"
        //         }
        //     ]
        //
        return this.parseOrders (response, market, since, limit);
    }

    async fetchClosedOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        const request = {
            'account_id': accountId,
            // 'from': this.iso8601 (since) * 1000000,
            // 'to': this.iso8601 (this.milliseconds ()) * 1000000, // max range is 7 days
            // 'symbol': market['id'],
            // 'limit': 100,
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['symbol'] = market['id'];
        }
        if (since !== undefined) {
            request['from'] = this.iso8601 (since) * 1000000;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.privateGetTradingAccountsAccountIdLastOrderStatuses (this.extend (request, params));
        //
        //     [
        //         {
        //             "msgType":"8",
        //             "account":1012838720,
        //             "clOrdId":"XAq0pRQ1g",
        //             "orderId":"64d7a06a-27e5-422e-99d9-3cadc04f5a35",
        //             "symbol":"XBTUSD",
        //             "ordType":"2",
        //             "price":"9000",
        //             "transactTime":1593778763271127920,
        //             "execId":"ff5fb8153652f0516bf07b6979255bed053c84b9",
        //             "execType":"I",
        //             "ordStatus":"0",
        //             "side":"1",
        //             "orderQty":"1",
        //             "leavesQty":"1",
        //             "cumQty":"0",
        //             "positionEffect":"O",
        //             "marginAmt":"0.00000556",
        //             "marginAmtType":"11"
        //         }
        //     ]
        //
        return this.parseOrders (response, market, since, limit);
    }

    async createDepositAddress (code, params = {}) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        const currency = this.currency (code);
        const request = {
            'accountId': accountId,
            'currency': currency['id'],
        };
        const response = await this.privatePostTransfersAccountsAccountIdDepositAddressCurrency (this.extend (request, params));
        //
        //     {
        //         "address": "mu5GceHFAG38mGRYCFqafe5ZiNKLX3rKk9",
        //         "uri": "bitcoin:mu5GceHFAG38mGRYCFqafe5ZiNKLX3rKk9?message=Xena Exchange",
        //         "allowsRenewal": true
        //     }
        //
        const address = this.safeValue (response, 'address');
        const tag = undefined;
        this.checkAddress (address);
        return {
            'currency': code,
            'address': address,
            'tag': tag,
            'info': response,
        };
    }

    async fetchDepositAddress (code, params = {}) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        const currency = this.currency (code);
        const request = {
            'accountId': accountId,
            'currency': currency['id'],
        };
        const response = await this.privateGetTransfersAccountsAccountIdDepositAddressCurrency (this.extend (request, params));
        //
        //     {
        //         "address": "mu5GceHFAG38mGRYCFqafe5ZiNKLX3rKk9",
        //         "uri": "bitcoin:mu5GceHFAG38mGRYCFqafe5ZiNKLX3rKk9?message=Xena Exchange",
        //         "allowsRenewal": true
        //     }
        //
        const address = this.safeValue (response, 'address');
        const tag = undefined;
        this.checkAddress (address);
        return {
            'currency': code,
            'address': address,
            'tag': tag,
            'info': response,
        };
    }

    async fetchTransactionsByType (type, code = undefined, since = undefined, limit = undefined, params = {}) {
        if (code === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchTransactions() requires a currency `code` argument');
        }
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request = {
            'currency': currency['id'],
        };
        if (since !== undefined) {
            request['since'] = parseInt (since / 1000);
        }
        const method = 'privateGetTransfersAccountsAccountId' + this.capitalize (type);
        const response = await this[method] (this.extend (request, params));
        //
        //     {
        //         "withdrawals": [
        //             {
        //                 "withdrawalRequestId": 47383243,
        //                 "externalId": "...",    // external ID submitted by the client when creating the request
        //                 "status": 1,
        //                 "statusMessage": "Pending confirmation",
        //                 "amount": "10.2",
        //                 "currency": "BTC",
        //                 "lastUpdated": <UNIX nanoseconds>,
        //                 "blockchain": "Bitcoin",
        //                 "address": "mu5GceHFAG38mGRYCFqafe5ZiNKLX3rKk9",
        //                 "txId": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"
        //             }
        //         ]
        //     }
        //
        //     {
        //         "deposits": [
        //             {
        //                 "currency": "BTC",
        //                 "amount": "1.2",
        //                 "status": 1,
        //                 "statusMessage": "Processing",
        //                 "blockchain": "Bitcoin",
        //                 "txId": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
        //                 "address": "mu5GceHFAG38mGRYCFqafe5ZiNKLX3rKk9",
        //                 "lastUpdated": <UNIX nanoseconds>
        //                 "confirmations": 2,
        //                 "requiredConfirmations": 6
        //             }
        //         ]
        //     }
        //
        //
        const transactions = this.safeValue (response, 'withdrawals', []);
        return this.parseTransactions (transactions, currency, since, limit);
    }

    async fetchWithdrawals (code = undefined, since = undefined, limit = undefined, params = {}) {
        return await this.fetchTransactionsByType ('withdrawals', code, since, limit, params);
    }

    async fetchDeposits (code = undefined, since = undefined, limit = undefined, params = {}) {
        return await this.fetchTransactionsByType ('deposits', code, since, limit, params);
    }

    parseTransaction (transaction, currency = undefined) {
        //
        // withdraw()
        //
        //     {
        //         "withdrawalRequestId": 47383243,
        //         "status": 1,
        //         "statusMessage": "Pending confirmation"
        //     }
        //
        // fetchWithdrawals
        //
        //     {
        //         "withdrawalRequestId": 47383243,
        //         "externalId": "...",    // external ID submitted by the client when creating the request
        //         "status": 1,
        //         "statusMessage": "Pending confirmation",
        //         "amount": "10.2",
        //         "currency": "BTC",
        //         "lastUpdated": <UNIX nanoseconds>,
        //         "blockchain": "Bitcoin",
        //         "address": "mu5GceHFAG38mGRYCFqafe5ZiNKLX3rKk9",
        //         "txId": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"
        //     }
        //
        // fetchDeposits
        //
        //     {
        //         "currency": "BTC",
        //         "amount": "1.2",
        //         "status": 1,
        //         "statusMessage": "Processing",
        //         "blockchain": "Bitcoin",
        //         "txId": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
        //         "address": "mu5GceHFAG38mGRYCFqafe5ZiNKLX3rKk9",
        //         "lastUpdated": <UNIX nanoseconds>
        //         "confirmations": 2,
        //         "requiredConfirmations": 6
        //     }
        //
        const id = this.safeString (transaction, 'withdrawalRequestId');
        const type = (id === undefined) ? 'deposit' : 'withdrawal';
        let updated = this.safeInteger (transaction, 'lastUpdated');
        if (updated !== undefined) {
            updated = parseInt (updated / 1e6);
        }
        const timestamp = undefined;
        const txid = this.safeString (transaction, 'txId');
        const currencyId = this.safeString (transaction, 'currency');
        const code = this.safeCurrencyCode (currencyId, currency);
        const address = this.safeString (transaction, 'address');
        let addressFrom = undefined;
        let addressTo = undefined;
        if (type === 'deposit') {
            addressFrom = address;
        } else {
            addressTo = address;
        }
        const amount = this.safeFloat (transaction, 'amount');
        const status = this.parseTransactionStatus (this.safeString (transaction, 'status'));
        const fee = undefined;
        return {
            'info': transaction,
            'id': id,
            'txid': txid,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'addressFrom': addressFrom,
            'addressTo': addressTo,
            'address': address,
            'tagFrom': undefined,
            'tagTo': undefined,
            'tag': undefined,
            'type': type,
            'amount': amount,
            'currency': code,
            'status': status,
            'updated': updated,
            'fee': fee,
        };
    }

    parseTransactionStatus (status) {
        const statuses = {
            '1': 'pending', // new
            '2': 'ok', // completed
            '3': 'failed', // duplicate
            '4': 'failed', // not enough money
            '5': 'pending', // waiting for manual approval from XENA
            '100': 'pending', // request is being processed
            '101': 'pending', // request is being processed
            '102': 'pending', // request is being processed
            '103': 'pending', // request is being processed
        };
        return this.safeString (statuses, status, status);
    }

    async withdraw (code, amount, address, tag = undefined, params = {}) {
        this.checkAddress (address);
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        const currency = this.currency (code);
        let uuid = this.uuid ();
        uuid = uuid.split ('-');
        uuid = uuid.join ('');
        const request = {
            'currency': currency['id'],
            'accountId': accountId,
            'amount': this.currencyToPrecision (code, amount),
            'address': address,
            'id': uuid, // mandatory external ID (string), used by the client to identify his request
        };
        const response = await this.privatePostTransfersAccountsAccountIdWithdrawals (this.extend (request, params));
        //
        //     {
        //         "withdrawalRequestId": 47383243,
        //         "status": 1,
        //         "statusMessage": "Pending confirmation"
        //     }
        //
        return this.parseTransaction (response, currency);
    }

    parseLedgerEntryType (type) {
        const types = {
            'deposit': 'transaction',
            'withdrawal': 'transaction',
            'internal deposit': 'transfer',
            'internal withdrawal': 'transfer',
            'rebate': 'rebate',
            'reward': 'reward',
        };
        return this.safeString (types, type, type);
    }

    parseLedgerEntry (item, currency = undefined) {
        //
        //     {
        //         "accountId":8263118,
        //         "ts":1551974415000000000,
        //         "amount":"-1",
        //         "currency":"BTC",
        //         "kind":"internal withdrawal",
        //         "commission":"0",
        //         "id":96
        //     }
        //
        const id = this.safeString (item, 'id');
        let direction = undefined;
        const account = this.safeString (item, 'accountId');
        const referenceId = undefined;
        const referenceAccount = undefined;
        const type = this.parseLedgerEntryType (this.safeString (item, 'kind'));
        const code = this.safeCurrencyCode (this.safeString (item, 'currency'), currency);
        let amount = this.safeFloat (item, 'amount');
        if (amount < 0) {
            direction = 'out';
            amount = Math.abs (amount);
        } else {
            direction = 'in';
        }
        let timestamp = this.safeInteger (item, 'ts');
        if (timestamp !== undefined) {
            timestamp = parseInt (timestamp / 1e6);
        }
        const fee = {
            'cost': this.safeFloat (item, 'commission'),
            'currency': code,
        };
        const before = undefined;
        const after = this.safeFloat (item, 'balance');
        const status = 'ok';
        return {
            'info': item,
            'id': id,
            'direction': direction,
            'account': account,
            'referenceId': referenceId,
            'referenceAccount': referenceAccount,
            'type': type,
            'currency': code,
            'amount': amount,
            'before': before,
            'after': after,
            'status': status,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'fee': fee,
        };
    }

    async fetchLedger (code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        await this.loadAccounts ();
        const accountId = await this.getAccountId (params);
        const request = {
            'accountId': accountId,
            // 'page': 1,
            // 'limit': 5000, // max 5000
            // 'from': time,
            // 'to': time,
            // 'symbol': currency['id'],
            // 'trade_id': id,
            // 'client_order_id': id,
            // 'txid': txid,
            // 'kind': 'deposit', // 'withdrawal, 'internal deposit', 'internal withdrawal', 'rebate', 'reward'
        };
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency (code);
            request['symbol'] = currency['id'];
        }
        if (since !== undefined) {
            request['from'] = since * 1e6;
        }
        if (limit !== undefined) {
            request['limit'] = limit; // max 5000
        }
        const response = await this.privateGetTransfersAccountsAccountIdBalanceHistory (this.extend (request, params));
        //
        //     [
        //         {
        //             "accountId":8263118,
        //             "ts":1551974415000000000,
        //             "amount":"-1",
        //             "currency":"BTC",
        //             "kind":"internal withdrawal",
        //             "commission":"0",
        //             "id":96
        //         },
        //         {
        //             "accountId":8263118,
        //             "ts":1551964677000000000,
        //             "amount":"-1",
        //             "currency":"BTC",
        //             "kind":"internal deposit",
        //             "commission":"0",
        //             "id":95
        //         }
        //     ]
        //
        return this.parseLedger (response, currency, since, limit);
    }

    nonce () {
        return this.milliseconds ();
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = this.urls['api'][api] + '/' + this.implodeParams (path, params);
        const query = this.omit (params, this.extractParams (path));
        if (api === 'public') {
            if (Object.keys (query).length) {
                url += '?' + this.urlencode (query);
            }
        } else if (api === 'private') {
            this.checkRequiredCredentials ();
            let nonce = this.nonce ();
            // php does not format it properly
            // therefore we use string concatenation here
            // nonce *= 1000000;
            nonce = nonce.toString ();
            nonce = nonce + '000000'; // see the comment a few lines above
            const payload = 'AUTH' + nonce;
            const secret = this.secret.slice (14, 78);
            const ecdsa = this.ecdsa (payload, secret, 'p256', 'sha256');
            const signature = ecdsa['r'] + ecdsa['s'];
            headers = {
                'X-AUTH-API-KEY': this.apiKey,
                'X-AUTH-API-PAYLOAD': payload,
                'X-AUTH-API-SIGNATURE': signature,
                'X-AUTH-API-NONCE': nonce,
            };
            if (method === 'GET') {
                if (Object.keys (query).length) {
                    url += '?' + this.urlencode (query);
                }
            } else if (method === 'POST') {
                body = this.json (query);
                headers['Content-Type'] = 'application/json';
            }
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    handleErrors (code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return;
        }
        //
        //     {"error":"Validation failed","fields":["address"]}
        //     {"error":"Money not enough. You have only: 0 ETH","fields":["amount"]}
        //
        if (code >= 400) {
            const feedback = this.id + ' ' + this.json (response);
            const message = this.safeString (response, 'error');
            const exact = this.exceptions['exact'];
            if (message in exact) {
                throw new exact[message] (feedback);
            }
            const broad = this.exceptions['broad'];
            const broadKey = this.findBroadlyMatchedKey (broad, body);
            if (broadKey !== undefined) {
                throw new broad[broadKey] (feedback);
            }
            throw new ExchangeError (feedback); // unknown message
        }
    }
};
