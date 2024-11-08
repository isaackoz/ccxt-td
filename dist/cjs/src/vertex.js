'use strict';

var vertex$1 = require('./abstract/vertex.js');
var errors = require('./base/errors.js');
var Precise = require('./base/Precise.js');
var number = require('./base/functions/number.js');
var sha3 = require('./static_dependencies/noble-hashes/sha3.js');
var secp256k1 = require('./static_dependencies/noble-curves/secp256k1.js');
var crypto = require('./base/functions/crypto.js');

//  ---------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class vertex
 * @augments Exchange
 */
class vertex extends vertex$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'vertex',
            'name': 'Vertex',
            'countries': [],
            'version': 'v1',
            'rateLimit': 50,
            'certified': false,
            'pro': true,
            'dex': true,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': true,
                'future': true,
                'option': false,
                'addMargin': false,
                'borrowCrossMargin': false,
                'borrowIsolatedMargin': false,
                'cancelAllOrders': true,
                'cancelAllOrdersAfter': false,
                'cancelOrder': true,
                'cancelOrders': true,
                'cancelOrdersForSymbols': false,
                'closeAllPositions': false,
                'closePosition': false,
                'createMarketBuyOrderWithCost': false,
                'createMarketOrderWithCost': false,
                'createMarketSellOrderWithCost': false,
                'createOrder': true,
                'createOrders': true,
                'createReduceOnlyOrder': true,
                'editOrder': false,
                'fetchAccounts': false,
                'fetchBalance': true,
                'fetchBorrowInterest': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchCanceledOrders': false,
                'fetchClosedOrders': false,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchCurrencies': true,
                'fetchDepositAddress': false,
                'fetchDepositAddresses': false,
                'fetchDeposits': false,
                'fetchDepositWithdrawFee': false,
                'fetchDepositWithdrawFees': false,
                'fetchFundingHistory': false,
                'fetchFundingRate': true,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': true,
                'fetchIndexOHLCV': false,
                'fetchIsolatedBorrowRate': false,
                'fetchIsolatedBorrowRates': false,
                'fetchLedger': false,
                'fetchLeverage': false,
                'fetchLeverageTiers': false,
                'fetchLiquidations': false,
                'fetchMarginMode': undefined,
                'fetchMarketLeverageTiers': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMyLiquidations': false,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterest': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': true,
                'fetchOrderTrades': false,
                'fetchPosition': false,
                'fetchPositionMode': false,
                'fetchPositions': true,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchStatus': true,
                'fetchTicker': false,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': true,
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchWithdrawal': false,
                'fetchWithdrawals': false,
                'reduceMargin': false,
                'repayCrossMargin': false,
                'repayIsolatedMargin': false,
                'sandbox': true,
                'setLeverage': false,
                'setMarginMode': false,
                'setPositionMode': false,
                'transfer': false,
                'withdraw': true,
            },
            'timeframes': {
                '1m': 60,
                '5m': 300,
                '15m': 900,
                '1h': 3600,
                '2h': 7200,
                '4h': 14400,
                '1d': 86400,
                '1w': 604800,
                '1M': 604800,
            },
            'hostname': 'vertexprotocol.com',
            'urls': {
                'logo': 'https://github.com/ccxt/ccxt/assets/43336371/bd04a0fa-3b48-47b6-9d8b-124954d520a8',
                'api': {
                    'v1': {
                        'archive': 'https://archive.prod.{hostname}/v1',
                        'gateway': 'https://gateway.prod.{hostname}/v1',
                        'trigger': 'https://trigger.prod.{hostname}/v1',
                    },
                    'v2': {
                        'archive': 'https://archive.prod.{hostname}/v2',
                        'gateway': 'https://gateway.prod.{hostname}/v2',
                    },
                },
                'test': {
                    'v1': {
                        'archive': 'https://archive.sepolia-test.{hostname}/v1',
                        'gateway': 'https://gateway.sepolia-test.{hostname}/v1',
                        'trigger': 'https://trigger.sepolia-test.{hostname}/v1',
                    },
                    'v2': {
                        'archive': 'https://archive.sepolia-test.{hostname}/v2',
                        'gateway': 'https://gateway.sepolia-test.{hostname}/v2',
                    },
                },
                'www': 'https://vertexprotocol.com/',
                'doc': 'https://docs.vertexprotocol.com/',
                'fees': 'https://docs.vertexprotocol.com/basics/fees',
                'referral': 'https://app.vertexprotocol.com?referrer=0xCfC9BaB96a2eA3d3c3F031c005e82E1D9F295aC1',
            },
            'api': {
                'v1': {
                    'archive': {
                        'post': {
                            '': 1,
                        },
                    },
                    'gateway': {
                        'get': {
                            'query': 1,
                            'symbols': 1,
                            'time': 1,
                        },
                        'post': {
                            'query': 1,
                            'execute': 1,
                        },
                    },
                    'trigger': {
                        'post': {
                            'execute': 1,
                            'query': 1,
                        },
                    },
                },
                'v2': {
                    'archive': {
                        'get': {
                            'tickers': 1,
                            'contracts': 1,
                            'trades': 1,
                            'vrtx': 1,
                        },
                    },
                    'gateway': {
                        'get': {
                            'assets': 0.6667,
                            'pairs': 1,
                            'orderbook': 1,
                        },
                    },
                },
            },
            'fees': {
                'swap': {
                    'taker': this.parseNumber('0.0002'),
                    'maker': this.parseNumber('0.0002'),
                },
                'spot': {
                    'taker': this.parseNumber('0.0002'),
                    'maker': this.parseNumber('0.0002'),
                },
            },
            'requiredCredentials': {
                'apiKey': false,
                'secret': false,
                'walletAddress': true,
                'privateKey': true,
            },
            'exceptions': {
                'exact': {
                    '1000': errors.RateLimitExceeded,
                    '1015': errors.RateLimitExceeded,
                    '1001': errors.PermissionDenied,
                    '1002': errors.PermissionDenied,
                    '1003': errors.PermissionDenied,
                    '2000': errors.InvalidOrder,
                    '2001': errors.InvalidOrder,
                    '2002': errors.InvalidOrder,
                    '2003': errors.InvalidOrder,
                    '2004': errors.InvalidOrder,
                    '2005': errors.InvalidOrder,
                    '2006': errors.InvalidOrder,
                    '2007': errors.InvalidOrder,
                    '2008': errors.InvalidOrder,
                    '2009': errors.InvalidOrder,
                    '2010': errors.InvalidOrder,
                    '2011': errors.BadRequest,
                    '2012': errors.BadRequest,
                    '2013': errors.InvalidOrder,
                    '2014': errors.PermissionDenied,
                    '2015': errors.InvalidOrder,
                    '2016': errors.InvalidOrder,
                    '2017': errors.InvalidOrder,
                    '2019': errors.InvalidOrder,
                    '2020': errors.InvalidOrder,
                    '2021': errors.InvalidOrder,
                    '2022': errors.InvalidOrder,
                    '2023': errors.InvalidOrder,
                    '2024': errors.InsufficientFunds,
                    '2025': errors.InsufficientFunds,
                    '2026': errors.BadRequest,
                    '2027': errors.AuthenticationError,
                    '2028': errors.AuthenticationError,
                    '2029': errors.AuthenticationError,
                    '2030': errors.BadRequest,
                    '2031': errors.InvalidOrder,
                    '2033': errors.InvalidOrder,
                    '2034': errors.InvalidOrder,
                    '2035': errors.InvalidOrder,
                    '2036': errors.InvalidOrder,
                    '2037': errors.InvalidOrder,
                    '2038': errors.InvalidOrder,
                    '2039': errors.InvalidOrder,
                    '2040': errors.InvalidOrder,
                    '2041': errors.InvalidOrder,
                    '2042': errors.InvalidOrder,
                    '2043': errors.InvalidOrder,
                    '2044': errors.InvalidOrder,
                    '2045': errors.InvalidOrder,
                    '2046': errors.InvalidOrder,
                    '2047': errors.InvalidOrder,
                    '2048': errors.InvalidOrder,
                    '2049': errors.ExchangeError,
                    '2050': errors.PermissionDenied,
                    '2051': errors.InvalidOrder,
                    '2052': errors.InvalidOrder,
                    '2053': errors.InvalidOrder,
                    '2054': errors.InvalidOrder,
                    '2055': errors.InvalidOrder,
                    '2056': errors.InvalidOrder,
                    '2057': errors.InvalidOrder,
                    '2058': errors.InvalidOrder,
                    '2059': errors.InvalidOrder,
                    '2060': errors.InvalidOrder,
                    '2061': errors.InvalidOrder,
                    '2062': errors.InvalidOrder,
                    '2063': errors.InvalidOrder,
                    '2064': errors.InvalidOrder,
                    '2065': errors.InvalidOrder,
                    '2066': errors.InvalidOrder,
                    '2067': errors.InvalidOrder,
                    '2068': errors.InvalidOrder,
                    '2069': errors.InvalidOrder,
                    '2070': errors.InvalidOrder,
                    '2071': errors.InvalidOrder,
                    '2072': errors.InvalidOrder,
                    '2073': errors.InvalidOrder,
                    '2074': errors.InvalidOrder,
                    '2075': errors.InvalidOrder,
                    '2076': errors.InvalidOrder,
                    '3000': errors.BadRequest,
                    '3001': errors.BadRequest,
                    '3002': errors.BadRequest,
                    '3003': errors.BadRequest,
                    '4000': errors.BadRequest,
                    '4001': errors.ExchangeError,
                    '4002': errors.ExchangeError,
                    '4003': errors.ExchangeError,
                    '4004': errors.InvalidOrder,
                    '5000': errors.ExchangeError,
                },
                'broad': {},
            },
            'precisionMode': number.TICK_SIZE,
            'commonCurrencies': {},
            'options': {
                'defaultType': 'swap',
                'sandboxMode': false,
                'timeDifference': 0,
                'brokerId': 5930043274845996,
            },
        });
    }
    setSandboxMode(enabled) {
        super.setSandboxMode(enabled);
        this.options['sandboxMode'] = enabled;
    }
    convertToX18(num) {
        if (typeof num === 'string') {
            return Precise["default"].stringMul(num, '1000000000000000000');
        }
        const numStr = this.numberToString(num);
        return Precise["default"].stringMul(numStr, '1000000000000000000');
    }
    convertFromX18(num) {
        if (typeof num === 'string') {
            return Precise["default"].stringDiv(num, '1000000000000000000');
        }
        const numStr = this.numberToString(num);
        return Precise["default"].stringDiv(numStr, '1000000000000000000');
    }
    async fetchCurrencies(params = {}) {
        /**
         * @method
         * @name vertex#fetchCurrencies
         * @description fetches all available currencies on an exchange
         * @see https://docs.vertexprotocol.com/developer-resources/api/v2/assets
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an associative dictionary of currencies
         */
        const request = {};
        const response = await this.v2GatewayGetAssets(this.extend(request, params));
        //
        // [
        //     {
        //         "product_id": 2,
        //         "ticker_id": "BTC-PERP_USDC",
        //         "market_type": "perp",
        //         "name": "Bitcoin Perp",
        //         "symbol": "BTC-PERP",
        //         "maker_fee": 0.0002,
        //         "taker_fee": 0,
        //         "can_withdraw": false,
        //         "can_deposit": false
        //     },
        //     {
        //         "product_id": 1,
        //         "ticker_id": "BTC_USDC",
        //         "market_type": "spot",
        //         "name": "Bitcoin",
        //         "symbol": "BTC",
        //         "taker_fee": 0.0003,
        //         "maker_fee": 0,
        //         "can_withdraw": true,
        //         "can_deposit": true
        //     }
        // ]
        //
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const data = this.safeDict(response, i, {});
            const tickerId = this.safeString(data, 'ticker_id');
            if ((tickerId !== undefined) && (tickerId.indexOf('PERP') > 0)) {
                continue;
            }
            const id = this.safeString(data, 'product_id');
            const name = this.safeString(data, 'symbol');
            const code = this.safeCurrencyCode(name);
            result[code] = {
                'id': id,
                'name': name,
                'code': code,
                'precision': undefined,
                'info': data,
                'active': undefined,
                'deposit': this.safeBool(data, 'can_deposit'),
                'withdraw': this.safeBool(data, 'can_withdraw'),
                'networks': undefined,
                'fee': undefined,
                'limits': {
                    'amount': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
            };
        }
        return result;
    }
    parseMarket(market) {
        //
        // {
        //     "type": "spot",
        //     "product_id": 3,
        //     "symbol": "WETH",
        //     "price_increment_x18": "100000000000000000",
        //     "size_increment": "10000000000000000",
        //     "min_size": "100000000000000000",
        //     "min_depth_x18": "5000000000000000000000",
        //     "max_spread_rate_x18": "2000000000000000",
        //     "maker_fee_rate_x18": "0",
        //     "taker_fee_rate_x18": "300000000000000",
        //     "long_weight_initial_x18": "900000000000000000",
        //     "long_weight_maintenance_x18": "950000000000000000"
        // }
        //
        const marketType = this.safeString(market, 'type');
        const quoteId = 'USDC';
        const quote = this.safeCurrencyCode(quoteId);
        const baseId = this.safeString(market, 'symbol');
        const base = this.safeCurrencyCode(baseId);
        const settleId = quoteId;
        const settle = this.safeCurrencyCode(settleId);
        let symbol = base + '/' + quote;
        const spot = marketType === 'spot';
        const contract = !spot;
        const swap = !spot;
        if (swap) {
            const splitSymbol = base.split('-');
            symbol = splitSymbol[0] + '/' + quote + ':' + settle;
        }
        const priceIncrementX18 = this.safeString(market, 'price_increment_x18');
        const sizeIncrementX18 = this.safeString(market, 'size_increment');
        const minSizeX18 = this.safeString(market, 'min_size');
        const takerX18 = this.safeNumber(market, 'taker_fee_rate_x18');
        const makerX18 = this.safeNumber(market, 'maker_fee_rate_x18');
        const isInverse = (spot) ? undefined : false;
        const isLinear = (spot) ? undefined : true;
        const contractSize = (spot) ? undefined : this.parseNumber('1');
        return {
            'id': this.safeString(market, 'product_id'),
            'symbol': symbol,
            'base': base,
            'quote': quote,
            'settle': (spot) ? undefined : settle,
            'baseId': baseId,
            'quoteId': quoteId,
            'settleId': (spot) ? undefined : settleId,
            'type': (spot) ? 'spot' : 'swap',
            'spot': spot,
            'margin': undefined,
            'swap': swap,
            'future': false,
            'option': false,
            'active': true,
            'contract': contract,
            'linear': isLinear,
            'inverse': isInverse,
            'taker': this.parseNumber(this.convertFromX18(takerX18)),
            'maker': this.parseNumber(this.convertFromX18(makerX18)),
            'contractSize': contractSize,
            'expiry': undefined,
            'expiryDatetime': undefined,
            'strike': undefined,
            'optionType': undefined,
            'precision': {
                'amount': this.parseNumber(this.convertFromX18(sizeIncrementX18)),
                'price': this.parseNumber(this.convertFromX18(priceIncrementX18)),
            },
            'limits': {
                'leverage': {
                    'min': undefined,
                    'max': undefined,
                },
                'amount': {
                    'min': this.parseNumber(this.convertFromX18(minSizeX18)),
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
            },
            'created': undefined,
            'info': market,
        };
    }
    async fetchMarkets(params = {}) {
        /**
         * @method
         * @name vertex#fetchMarkets
         * @description retrieves data on all markets for vertex
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/queries/symbols
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} an array of objects representing market data
         */
        const request = {
            'type': 'symbols',
        };
        const response = await this.v1GatewayGetQuery(this.extend(request, params));
        //
        // {
        //     "status": "success",
        //     "data": {
        //         "symbols": {
        //             "WETH": {
        //                 "type": "spot",
        //                 "product_id": 3,
        //                 "symbol": "WETH",
        //                 "price_increment_x18": "100000000000000000",
        //                 "size_increment": "10000000000000000",
        //                 "min_size": "100000000000000000",
        //                 "min_depth_x18": "5000000000000000000000",
        //                 "max_spread_rate_x18": "2000000000000000",
        //                 "maker_fee_rate_x18": "0",
        //                 "taker_fee_rate_x18": "300000000000000",
        //                 "long_weight_initial_x18": "900000000000000000",
        //                 "long_weight_maintenance_x18": "950000000000000000"
        //             }
        //         }
        //     },
        //     "request_type": "query_symbols"
        // }
        //
        const data = this.safeDict(response, 'data', {});
        const markets = this.safeDict(data, 'symbols', {});
        const symbols = Object.keys(markets);
        const result = [];
        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i];
            const rawMarket = this.safeDict(markets, symbol, {});
            result.push(this.parseMarket(rawMarket));
        }
        return result;
    }
    async fetchTime(params = {}) {
        /**
         * @method
         * @name vertex#fetchTime
         * @description fetches the current integer timestamp in milliseconds from the exchange server
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {int} the current integer timestamp in milliseconds from the exchange server
         */
        const response = await this.v1GatewayGetTime(params);
        // 1717481623452
        return this.parseNumber(response);
    }
    async fetchStatus(params = {}) {
        /**
         * @method
         * @name vertex#fetchStatus
         * @description the latest known information on the availability of the exchange API
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/queries/status
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [status structure]{@link https://docs.ccxt.com/#/?id=exchange-status-structure}
         */
        const request = {
            'type': 'status',
        };
        const response = await this.v1GatewayGetQuery(this.extend(request, params));
        //
        // {
        //     "status": "success",
        //     "data": "active",
        //     "request_type": "query_status",
        // }
        //
        let status = this.safeString(response, 'data');
        if (status === 'active') {
            status = 'ok';
        }
        else {
            status = 'error';
        }
        return {
            'status': status,
            'updated': undefined,
            'eta': undefined,
            'url': undefined,
            'info': response,
        };
    }
    parseTrade(trade, market = undefined) {
        //
        // {
        //       "ticker_id": "ARB_USDC",
        //       "trade_id": 999994,
        //       "price": 1.1366122408151016,
        //       "base_filled": 175,
        //       "quote_filled": -198.90714214264278,
        //       "timestamp": 1691068943,
        //       "trade_type": "buy"
        // }
        // fetchMytrades
        // {
        //     "digest": "0x80ce789702b670b7d33f2aa67e12c85f124395c3f9acdb422dde3b4973ccd50c",
        //     "order": {
        //         "sender": "0x12a0b4888021576eb10a67616dd3dd3d9ce206b664656661756c740000000000",
        //         "priceX18": "27544000000000000000000",
        //         "amount": "2000000000000000000",
        //         "expiration": "4611686020107119633",
        //         "nonce": "1761322608857448448"
        //     },
        //     "base_filled": "736000000000000000",
        //     "quote_filled": "-20276464287857571514302",
        //     "fee": "4055287857571514302",
        //     "sequencer_fee": "0"
        //     "cumulative_fee": "4055287857571514302",
        //     "cumulative_base_filled": "736000000000000000",
        //     "cumulative_quote_filled": "-20276464287857571514302",
        //     "submission_idx": "563012",
        //     "pre_balance": {
        //       "base": {
        //         "perp": {
        //           "product_id": 2,
        //           "lp_balance": {
        //             "amount": "0",
        //             "last_cumulative_funding_x18": "1823351297710837"
        //           },
        //           "balance": {
        //             "amount": "2686684000000000000000",
        //             "v_quote_balance": "-76348662407149297671587247",
        //             "last_cumulative_funding_x18": "134999841911604906604576"
        //           }
        //         }
        //       },
        //       "quote": null
        //     },
        //     "post_balance": {
        //       "base": {
        //         "perp": {
        //           "product_id": 2,
        //           "lp_balance": {
        //             "amount": "0",
        //             "last_cumulative_funding_x18": "1823351297710837"
        //           },
        //           "balance": {
        //             "amount": "2686013000000000000000",
        //             "v_quote_balance": "-76328351274188497671587247",
        //             "last_cumulative_funding_x18": "134999841911604906604576"
        //           }
        //         }
        //       },
        //       "quote": null
        //     }
        //   }
        let price = undefined;
        let amount = undefined;
        let side = undefined;
        let fee = undefined;
        const feeCost = this.convertFromX18(this.safeString(trade, 'fee'));
        if (feeCost !== undefined) {
            fee = {
                'cost': feeCost,
                'currency': undefined,
            };
        }
        const id = this.safeString2(trade, 'trade_id', 'submission_idx');
        const order = this.safeString(trade, 'digest');
        const timestamp = this.safeTimestamp(trade, 'timestamp');
        if (timestamp === undefined) {
            // fetchMyTrades
            const baseBalance = this.safeDict(this.safeDict(trade, 'pre_balance', {}), 'base', {});
            let marketId = undefined;
            if ('perp' in baseBalance) {
                marketId = this.safeString(this.safeDict(baseBalance, 'perp', {}), 'product_id');
            }
            else {
                marketId = this.safeString(this.safeDict(baseBalance, 'spot', {}), 'product_id');
            }
            market = this.safeMarket(marketId);
            const subOrder = this.safeDict(trade, 'order', {});
            price = this.convertFromX18(this.safeString(subOrder, 'priceX18'));
            amount = this.convertFromX18(this.safeString(trade, 'base_filled'));
            if (Precise["default"].stringLt(amount, '0')) {
                side = 'sell';
            }
            else {
                side = 'buy';
            }
        }
        else {
            const tickerId = this.safeString(trade, 'ticker_id');
            const splitTickerId = tickerId.split('_');
            const splitSymbol = splitTickerId[0].split('-');
            const marketId = splitSymbol[0] + splitTickerId[1];
            market = this.safeMarket(marketId, market);
            price = this.safeString(trade, 'price');
            amount = this.safeString(trade, 'base_filled');
            side = this.safeStringLower(trade, 'trade_type');
        }
        amount = Precise["default"].stringAbs(amount);
        const symbol = market['symbol'];
        return this.safeTrade({
            'id': id,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': undefined,
            'order': order,
            'takerOrMaker': undefined,
            'type': undefined,
            'fee': fee,
            'info': trade,
        }, market);
    }
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchTrades
         * @description get the list of most recent trades for a particular symbol
         * @see https://docs.vertexprotocol.com/developer-resources/api/v2/trades
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int} [since] timestamp in ms of the earliest trade to fetch
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const marketId = market['baseId'] + '_USDC';
        const request = {
            'ticker_id': marketId,
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.v2ArchiveGetTrades(this.extend(request, params));
        //
        // [
        //     {
        //       "ticker_id": "ARB_USDC",
        //       "trade_id": 999994,
        //       "price": 1.1366122408151016,
        //       "base_filled": 175,
        //       "quote_filled": -198.90714214264278,
        //       "timestamp": 1691068943,
        //       "trade_type": "buy"
        //     },
        //     {
        //       "ticker_id": "ARB_USDC",
        //       "trade_id": 999978,
        //       "price": 1.136512210806099,
        //       "base_filled": 175,
        //       "quote_filled": -198.8896368910673,
        //       "timestamp": 1691068882,
        //       "trade_type": "buy"
        //     }
        // ]
        //
        return this.parseTrades(response, market, since, limit);
    }
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchMyTrades
         * @description fetch all trades made by the user
         * @see https://docs.vertexprotocol.com/developer-resources/api/archive-indexer/matches
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch trades for
         * @param {int} [limit] the maximum number of trades structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.user] user address, will default to this.walletAddress if not provided
         * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        await this.loadMarkets();
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchMyTrades', params);
        let market = undefined;
        const matchesRequest = {
            'subaccount': this.convertAddressToSender(userAddress),
        };
        if (symbol !== undefined) {
            market = this.market(symbol);
            matchesRequest['product_ids'] = [this.parseToNumeric(market['id'])];
        }
        const until = this.safeInteger(params, 'until');
        if (until !== undefined) {
            params = this.omit(params, 'until');
            matchesRequest['max_time'] = until;
        }
        if (limit !== undefined) {
            matchesRequest['limit'] = limit;
        }
        const request = {
            'matches': matchesRequest,
        };
        const response = await this.v1ArchivePost(this.extend(request, params));
        //
        // {
        //     "matches": [
        //       {
        //         "digest": "0x80ce789702b670b7d33f2aa67e12c85f124395c3f9acdb422dde3b4973ccd50c",
        //         "order": {
        //           "sender": "0x12a0b4888021576eb10a67616dd3dd3d9ce206b664656661756c740000000000",
        //           "priceX18": "27544000000000000000000",
        //           "amount": "2000000000000000000",
        //           "expiration": "4611686020107119633",
        //           "nonce": "1761322608857448448"
        //         },
        //         "base_filled": "736000000000000000",
        //         "quote_filled": "-20276464287857571514302",
        //         "fee": "4055287857571514302",
        //         "sequencer_fee": "0"
        //         "cumulative_fee": "4055287857571514302",
        //         "cumulative_base_filled": "736000000000000000",
        //         "cumulative_quote_filled": "-20276464287857571514302",
        //         "submission_idx": "563012",
        //         "pre_balance": {
        //           "base": {
        //             "perp": {
        //               "product_id": 2,
        //               "lp_balance": {
        //                 "amount": "0",
        //                 "last_cumulative_funding_x18": "1823351297710837"
        //               },
        //               "balance": {
        //                 "amount": "2686684000000000000000",
        //                 "v_quote_balance": "-76348662407149297671587247",
        //                 "last_cumulative_funding_x18": "134999841911604906604576"
        //               }
        //             }
        //           },
        //           "quote": null
        //         },
        //         "post_balance": {
        //           "base": {
        //             "perp": {
        //               "product_id": 2,
        //               "lp_balance": {
        //                 "amount": "0",
        //                 "last_cumulative_funding_x18": "1823351297710837"
        //               },
        //               "balance": {
        //                 "amount": "2686013000000000000000",
        //                 "v_quote_balance": "-76328351274188497671587247",
        //                 "last_cumulative_funding_x18": "134999841911604906604576"
        //               }
        //             }
        //           },
        //           "quote": null
        //         }
        //       },
        //       {
        //         "digest": "0x0f6e5a0434e36d8e6d4fed950d3624b0d8c91a8a84efd156bb25c1382561c0c2",
        //         "order": {
        //           "sender": "0x12a0b4888021576eb10a67616dd3dd3d9ce206b664656661756c740000000000",
        //           "priceX18": "27540000000000000000000",
        //           "amount": "2000000000000000000",
        //           "expiration": "4611686020107119623",
        //           "nonce": "1761322602510417920"
        //         },
        //         "base_filled": "723999999999999999",
        //         "quote_filled": "-19944943483044913474043",
        //         "fee": "5983483044913474042",
        //         "cumulative_fee": "11958484645393618085",
        //         "cumulative_base_filled": "1446999999999999998",
        //         "cumulative_quote_filled": "-39861640484645393618087",
        //         "submission_idx": "563011",
        //         "pre_balance": {
        //           "base": {
        //             "perp": {
        //               "product_id": 2,
        //               "lp_balance": {
        //                 "amount": "0",
        //                 "last_cumulative_funding_x18": "1823351297710837"
        //               },
        //               "balance": {
        //                 "amount": "2686684000000000000000",
        //                 "v_quote_balance": "-76348662407149297671587247",
        //                 "last_cumulative_funding_x18": "134999841911604906604576"
        //               }
        //             }
        //           },
        //           "quote": null
        //         },
        //         "post_balance": {
        //           "base": {
        //             "perp": {
        //               "product_id": 2,
        //               "lp_balance": {
        //                 "amount": "0",
        //                 "last_cumulative_funding_x18": "1823351297710837"
        //               },
        //               "balance": {
        //                 "amount": "2686013000000000000000",
        //                 "v_quote_balance": "-76328351274188497671587247",
        //                 "last_cumulative_funding_x18": "134999841911604906604576"
        //               }
        //             }
        //           },
        //           "quote": null
        //         }
        //       }
        //     ],
        //     "txs": [
        //       {
        //         "tx": {
        //           "match_orders": {
        //             "product_id": 2,
        //             "amm": true,
        //             "taker": {
        //               "order": {
        //                 "sender": "0x12a0b4888021576eb10a67616dd3dd3d9ce206b664656661756c740000000000",
        //                 "price_x18": "27544000000000000000000",
        //                 "amount": "2000000000000000000",
        //                 "expiration": 4611686020107120000,
        //                 "nonce": 1761322608857448400
        //               },
        //               "signature": "0xe8fa7151bde348afa3b46dc52798046b7c8318f1b0a7f689710debbc094658cc1bf5a7e478ccc8278b625da0b9402c86b580d2e31e13831337dfd6153f4b37811b"
        //             },
        //             "maker": {
        //               "order": {
        //                 "sender": "0xebdbbcdbd2646c5f23a1e0806027eee5f71b074664656661756c740000000000",
        //                 "price_x18": "27544000000000000000000",
        //                 "amount": "-736000000000000000",
        //                 "expiration": 1679731669,
        //                 "nonce": 1761322585591644200
        //               },
        //               "signature": "0x47f9d47f0777f3ca0b13f07b7682dbeea098c0e377b87dcb025754fe34c900e336b8c7744e021fb9c46a4f8c6a1478bafa28bf0d023ae496aa3efa4d8e81df181c"
        //             }
        //           }
        //         },
        //         "submission_idx": "563012",
        //         "timestamp": "1679728133"
        //       },
        //       {
        //         "tx": {
        //           "match_orders": {
        //             "product_id": 1,
        //             "amm": true,
        //             "taker": {
        //               "order": {
        //                 "sender": "0x12a0b4888021576eb10a67616dd3dd3d9ce206b664656661756c740000000000",
        //                 "price_x18": "27540000000000000000000",
        //                 "amount": "2000000000000000000",
        //                 "expiration": 4611686020107120000,
        //                 "nonce": 1761322602510418000
        //               },
        //               "signature": "0x826c68f1a3f76d9ffbe8041f8d45e969d31f1ab6f2ae2f6379d1493e479e56436091d6cf4c72e212dd2f1d2fa17c627c4c21bd6d281c77172b8af030488478b71c"
        //             },
        //             "maker": {
        //               "order": {
        //                 "sender": "0xf8d240d9514c9a4715d66268d7af3b53d619642564656661756c740000000000",
        //                 "price_x18": "27540000000000000000000",
        //                 "amount": "-724000000000000000",
        //                 "expiration": 1679731656,
        //                 "nonce": 1761322565506171000
        //               },
        //               "signature": "0xd8b6505b8d9b8c3cbfe793080976388035682c02a27893fb26b48a5b2bfe943f4162dea3a42e24e0dff5e2f74fbf77e33d83619140a2a581117c55e6cc236bdb1c"
        //             }
        //           }
        //         },
        //         "submission_idx": "563011",
        //         "timestamp": "1679728127"
        //       }
        //     ]
        // }
        //
        const trades = this.safeList(response, 'matches', []);
        return this.parseTrades(trades, market, since, limit, params);
    }
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @see https://docs.vertexprotocol.com/developer-resources/api/v2/orderbook
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int} [limit] the maximum amount of order book entries to return
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const marketId = market['baseId'] + '_USDC';
        if (limit === undefined) {
            limit = 100;
        }
        const request = {
            'ticker_id': marketId,
            'depth': limit,
        };
        const response = await this.v2GatewayGetOrderbook(this.extend(request, params));
        //
        // {
        //     "ticker_id": "ETH-PERP_USDC",
        //     "bids": [
        //         [
        //             1612.3,
        //             0.31
        //         ],
        //         [
        //             1612.0,
        //             0.93
        //         ],
        //         [
        //             1611.5,
        //             1.55
        //         ],
        //         [
        //             1610.8,
        //             2.17
        //         ]
        //     ],
        //     "asks": [
        //         [
        //             1612.9,
        //             0.93
        //         ],
        //         [
        //             1613.4,
        //             1.55
        //         ],
        //         [
        //             1614.1,
        //             2.17
        //         ]
        //     ],
        //     "timestamp": 1694375362016
        // }
        //
        const timestamp = this.safeInteger(response, 'timestamp');
        return this.parseOrderBook(response, symbol, timestamp, 'bids', 'asks');
    }
    async fetchTradingFees(params = {}) {
        /**
         * @method
         * @name vertex#fetchTradingFees
         * @description fetch the trading fees for multiple markets
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/queries/fee-rates
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.user] user address, will default to this.walletAddress if not provided
         * @returns {object} a dictionary of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure} indexed by market symbols
         */
        await this.loadMarkets();
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchTradingFees', params);
        const request = {
            'type': 'fee_rates',
            'sender': this.convertAddressToSender(userAddress),
        };
        const response = await this.v1GatewayGetQuery(this.extend(request, params));
        //
        // {
        //     "status": "success",
        //     "data": {
        //       "taker_fee_rates_x18": [
        //         "0",
        //         "300000000000000",
        //         "200000000000000",
        //         "300000000000000",
        //         "200000000000000"
        //       ],
        //       "maker_fee_rates_x18": [
        //         "0",
        //         "0",
        //         "0",
        //         "0",
        //         "0"
        //       ],
        //       "liquidation_sequencer_fee": "250000000000000000",
        //       "health_check_sequencer_fee": "100000000000000000",
        //       "taker_sequencer_fee": "25000000000000000",
        //       "withdraw_sequencer_fees": [
        //         "10000000000000000",
        //         "40000000000000",
        //         "0",
        //         "600000000000000",
        //         "0"
        //       ]
        //     },
        //     "request_type": "query_fee_rates",
        // }
        //
        const data = this.safeDict(response, 'data', {});
        const maker = this.safeList(data, 'maker_fee_rates_x18', []);
        const taker = this.safeList(data, 'taker_fee_rates_x18', []);
        const result = {};
        for (let i = 0; i < taker.length; i++) {
            const market = this.safeMarket(this.numberToString(i));
            if (market['id'] === undefined) {
                continue;
            }
            const symbol = market['symbol'];
            result[symbol] = {
                'info': response,
                'symbol': symbol,
                'maker': this.parseNumber(this.convertFromX18(maker[i])),
                'taker': this.parseNumber(this.convertFromX18(taker[i])),
                'percentage': true,
                'tierBased': false,
            };
        }
        return result;
    }
    parseOHLCV(ohlcv, market = undefined) {
        // example response in fetchOHLCV
        return [
            this.safeTimestamp(ohlcv, 'timestamp'),
            this.parseNumber(this.convertFromX18(this.safeString(ohlcv, 'open_x18'))),
            this.parseNumber(this.convertFromX18(this.safeString(ohlcv, 'high_x18'))),
            this.parseNumber(this.convertFromX18(this.safeString(ohlcv, 'low_x18'))),
            this.parseNumber(this.convertFromX18(this.safeString(ohlcv, 'close_x18'))),
            this.parseNumber(this.convertFromX18(this.safeString(ohlcv, 'volume'))),
        ];
    }
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchOHLCV
         * @see https://docs.vertexprotocol.com/developer-resources/api/archive-indexer/candlesticks
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int} [since] timestamp in ms of the earliest candle to fetch
         * @param {int} [limit] max=1000, max=100 when since is defined and is less than (now - (999 * (timeframe in ms)))
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const ohlcvRequest = {
            'product_id': this.parseToInt(market['id']),
            'granularity': this.safeInteger(this.timeframes, timeframe),
        };
        const until = this.safeInteger(params, 'until');
        if (until !== undefined) {
            params = this.omit(params, 'until');
            ohlcvRequest['max_time'] = until;
        }
        if (limit !== undefined) {
            ohlcvRequest['limit'] = Math.min(limit, 1000);
        }
        const request = {
            'candlesticks': ohlcvRequest,
        };
        const response = await this.v1ArchivePost(this.extend(request, params));
        //
        // {
        //     "candlesticks": [
        //       {
        //         "product_id": 1,
        //         "granularity": 60,
        //         "submission_idx": "627709",
        //         "timestamp": "1680118140",
        //         "open_x18": "27235000000000000000000",
        //         "high_x18": "27298000000000000000000",
        //         "low_x18": "27235000000000000000000",
        //         "close_x18": "27298000000000000000000",
        //         "volume": "1999999999999999998"
        //       },
        //       {
        //         "product_id": 1,
        //         "granularity": 60,
        //         "submission_idx": "627699",
        //         "timestamp": "1680118080",
        //         "open_x18": "27218000000000000000000",
        //         "high_x18": "27245000000000000000000",
        //         "low_x18": "27218000000000000000000",
        //         "close_x18": "27245000000000000000000",
        //         "volume": "11852999999999999995"
        //       }
        //     ]
        // }
        //
        const rows = this.safeList(response, 'candlesticks', []);
        return this.parseOHLCVs(rows, market, timeframe, since, limit);
    }
    parseFundingRate(ticker, market = undefined) {
        //
        // {
        //     "product_id": 4,
        //     "funding_rate_x18": "2447900598160952",
        //     "update_time": "1680116326"
        // }
        //
        // {
        //     "ETH-PERP_USDC": {
        //         "ticker_id": "ETH-PERP_USDC",
        //         "base_currency": "ETH-PERP",
        //         "quote_currency": "USDC",
        //         "last_price": 1620.3,
        //         "base_volume": 1309.2,
        //         "quote_volume": 2117828.093867611,
        //         "product_type": "perpetual",
        //         "contract_price": 1620.372642114429,
        //         "contract_price_currency": "USD",
        //         "open_interest": 1635.2,
        //         "open_interest_usd": 2649633.3443855145,
        //         "index_price": 1623.293496279935,
        //         "mark_price": 1623.398589416731,
        //         "funding_rate": 0.000068613217104332,
        //         "next_funding_rate_timestamp": 1694379600,
        //         "price_change_percent_24h": -0.6348599635253989
        //     }
        // }
        //
        let fundingRate = this.safeNumber(ticker, 'funding_rate');
        if (fundingRate === undefined) {
            const fundingRateX18 = this.safeString(ticker, 'funding_rate_x18');
            fundingRate = this.parseNumber(this.convertFromX18(fundingRateX18));
        }
        const fundingTimestamp = this.safeTimestamp2(ticker, 'update_time', 'next_funding_rate_timestamp');
        const markPrice = this.safeNumber(ticker, 'mark_price');
        const indexPrice = this.safeNumber(ticker, 'index_price');
        return {
            'info': ticker,
            'symbol': market['symbol'],
            'markPrice': markPrice,
            'indexPrice': indexPrice,
            'interestRate': undefined,
            'estimatedSettlePrice': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'fundingRate': fundingRate,
            'fundingTimestamp': fundingTimestamp,
            'fundingDatetime': this.iso8601(fundingTimestamp),
            'nextFundingRate': undefined,
            'nextFundingTimestamp': undefined,
            'nextFundingDatetime': undefined,
            'previousFundingRate': undefined,
            'previousFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
            'interval': undefined,
        };
    }
    async fetchFundingRate(symbol, params = {}) {
        /**
         * @method
         * @name vertex#fetchFundingRate
         * @description fetch the current funding rate
         * @see https://docs.vertexprotocol.com/developer-resources/api/archive-indexer/funding-rate
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [funding rate structure]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'funding_rate': {
                'product_id': this.parseToInt(market['id']),
            },
        };
        const response = await this.v1ArchivePost(this.extend(request, params));
        //
        // {
        //     "product_id": 4,
        //     "funding_rate_x18": "2447900598160952",
        //     "update_time": "1680116326"
        // }
        //
        return this.parseFundingRate(response, market);
    }
    async fetchFundingRates(symbols = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchFundingRates
         * @description fetches funding rates for multiple markets
         * @see https://docs.vertexprotocol.com/developer-resources/api/v2/contracts
         * @param {string[]} symbols unified symbols of the markets to fetch the funding rates for, all market funding rates are returned if not assigned
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} an array of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
         */
        await this.loadMarkets();
        const request = {};
        if (symbols !== undefined) {
            symbols = this.marketSymbols(symbols);
        }
        const response = await this.v2ArchiveGetContracts(this.extend(request, params));
        //
        // {
        //     "ETH-PERP_USDC": {
        //         "ticker_id": "ETH-PERP_USDC",
        //         "base_currency": "ETH-PERP",
        //         "quote_currency": "USDC",
        //         "last_price": 1620.3,
        //         "base_volume": 1309.2,
        //         "quote_volume": 2117828.093867611,
        //         "product_type": "perpetual",
        //         "contract_price": 1620.372642114429,
        //         "contract_price_currency": "USD",
        //         "open_interest": 1635.2,
        //         "open_interest_usd": 2649633.3443855145,
        //         "index_price": 1623.293496279935,
        //         "mark_price": 1623.398589416731,
        //         "funding_rate": 0.000068613217104332,
        //         "next_funding_rate_timestamp": 1694379600,
        //         "price_change_percent_24h": -0.6348599635253989
        //     }
        // }
        //
        const keys = Object.keys(response);
        const fundingRates = {};
        for (let i = 0; i < keys.length; i++) {
            const tickerId = keys[i];
            const parsedTickerId = tickerId.split('-');
            const data = response[tickerId];
            const marketId = parsedTickerId[0] + '/USDC:USDC';
            const market = this.market(marketId);
            const ticker = this.parseFundingRate(data, market);
            const symbol = ticker['symbol'];
            fundingRates[symbol] = ticker;
        }
        return this.filterByArray(fundingRates, 'symbol', symbols);
    }
    parseOpenInterest(interest, market = undefined) {
        //
        // {
        //     "ETH-PERP_USDC": {
        //         "ticker_id": "ETH-PERP_USDC",
        //         "base_currency": "ETH-PERP",
        //         "quote_currency": "USDC",
        //         "last_price": 1620.3,
        //         "base_volume": 1309.2,
        //         "quote_volume": 2117828.093867611,
        //         "product_type": "perpetual",
        //         "contract_price": 1620.372642114429,
        //         "contract_price_currency": "USD",
        //         "open_interest": 1635.2,
        //         "open_interest_usd": 2649633.3443855145,
        //         "index_price": 1623.293496279935,
        //         "mark_price": 1623.398589416731,
        //         "funding_rate": 0.000068613217104332,
        //         "next_funding_rate_timestamp": 1694379600,
        //         "price_change_percent_24h": -0.6348599635253989
        //     }
        // }
        //
        const value = this.safeNumber(interest, 'open_interest_usd');
        return this.safeOpenInterest({
            'symbol': market['symbol'],
            'openInterestAmount': undefined,
            'openInterestValue': value,
            'timestamp': undefined,
            'datetime': undefined,
            'info': interest,
        }, market);
    }
    async fetchOpenInterest(symbol, params = {}) {
        /**
         * @method
         * @name vertex#fetchOpenInterest
         * @description Retrieves the open interest of a derivative trading pair
         * @see https://docs.vertexprotocol.com/developer-resources/api/v2/contracts
         * @param {string} symbol Unified CCXT market symbol
         * @param {object} [params] exchange specific parameters
         * @returns {object} an open interest structure{@link https://docs.ccxt.com/#/?id=open-interest-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['contract']) {
            throw new errors.BadRequest(this.id + ' fetchOpenInterest() supports contract markets only');
        }
        const request = {};
        const response = await this.v2ArchiveGetContracts(this.extend(request, params));
        //
        // {
        //     "ETH-PERP_USDC": {
        //         "ticker_id": "ETH-PERP_USDC",
        //         "base_currency": "ETH-PERP",
        //         "quote_currency": "USDC",
        //         "last_price": 1620.3,
        //         "base_volume": 1309.2,
        //         "quote_volume": 2117828.093867611,
        //         "product_type": "perpetual",
        //         "contract_price": 1620.372642114429,
        //         "contract_price_currency": "USD",
        //         "open_interest": 1635.2,
        //         "open_interest_usd": 2649633.3443855145,
        //         "index_price": 1623.293496279935,
        //         "mark_price": 1623.398589416731,
        //         "funding_rate": 0.000068613217104332,
        //         "next_funding_rate_timestamp": 1694379600,
        //         "price_change_percent_24h": -0.6348599635253989
        //     }
        // }
        //
        const tickerId = market['base'] + '_USDC';
        const openInterest = this.safeDict(response, tickerId, {});
        return this.parseOpenInterest(openInterest, market);
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "ticker_id": "BTC_USDC",
        //         "base_currency": "BTC",
        //         "quote_currency": "USDC",
        //         "last_price": 25728.0,
        //         "base_volume": 552.048,
        //         "quote_volume": 14238632.207250029,
        //         "price_change_percent_24h": -0.6348599635253989
        //     }
        //
        const base = this.safeString(ticker, 'base_currency');
        const quote = this.safeString(ticker, 'quote_currency');
        let marketId = base + '/' + quote;
        if (base.indexOf('PERP') > 0) {
            marketId = marketId.replace('-PERP', '') + ':USDC';
        }
        market = this.market(marketId);
        const last = this.safeString(ticker, 'last_price');
        return this.safeTicker({
            'symbol': market['symbol'],
            'timestamp': undefined,
            'datetime': undefined,
            'high': undefined,
            'low': undefined,
            'bid': undefined,
            'bidVolume': undefined,
            'ask': undefined,
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': this.safeString(ticker, 'price_change_percent_24h'),
            'average': undefined,
            'baseVolume': this.safeString(ticker, 'base_volume'),
            'quoteVolume': this.safeString(ticker, 'quote_volume'),
            'info': ticker,
        }, market);
    }
    async fetchTickers(symbols = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchTickers
         * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
         * @see https://docs.vertexprotocol.com/developer-resources/api/v2/tickers
         * @param {string[]} [symbols] unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols, undefined, true, true, true);
        const request = {};
        const response = await this.v2ArchiveGetTickers(this.extend(request, params));
        //
        // {
        //     "ETH_USDC": {
        //         "ticker_id": "ETH_USDC",
        //         "base_currency": "ETH",
        //         "quote_currency": "USDC",
        //         "last_price": 1619.1,
        //         "base_volume": 1428.32,
        //         "quote_volume": 2310648.316391866,
        //         "price_change_percent_24h": -1.0509394462969588
        //     },
        //     "BTC_USDC": {
        //         "ticker_id": "BTC_USDC",
        //         "base_currency": "BTC",
        //         "quote_currency": "USDC",
        //         "last_price": 25728.0,
        //         "base_volume": 552.048,
        //         "quote_volume": 14238632.207250029,
        //         "price_change_percent_24h": -0.6348599635253989
        //     }
        // }
        //
        const tickers = Object.values(response);
        return this.parseTickers(tickers, symbols);
    }
    async queryContracts(params = {}) {
        // query contract addresses for sending order
        const cachedContracts = this.safeDict(this.options, 'v1contracts');
        if (cachedContracts !== undefined) {
            return cachedContracts;
        }
        const request = {
            'type': 'contracts',
        };
        const response = await this.v1GatewayGetQuery(this.extend(request, params));
        const data = this.safeDict(response, 'data', {});
        this.options['v1contracts'] = data;
        return data;
    }
    nonce() {
        return this.milliseconds() - this.options['timeDifference'];
    }
    hashMessage(message) {
        return '0x' + this.hash(message, sha3.keccak_256, 'hex');
    }
    signHash(hash, privateKey) {
        const signature = crypto.ecdsa(hash.slice(-64), privateKey.slice(-64), secp256k1.secp256k1, undefined);
        const r = signature['r'];
        const s = signature['s'];
        const v = this.intToBase16(this.sum(27, signature['v']));
        return '0x' + r.padStart(64, '0') + s.padStart(64, '0') + v;
    }
    signMessage(message, privateKey) {
        return this.signHash(this.hashMessage(message), privateKey.slice(-64));
    }
    buildSig(chainId, messageTypes, message, verifyingContractAddress = '') {
        const domain = {
            'chainId': chainId,
            'name': 'Vertex',
            'verifyingContract': verifyingContractAddress,
            'version': '0.0.1',
        };
        const msg = this.ethEncodeStructuredData(domain, messageTypes, message);
        const signature = this.signMessage(msg, this.privateKey);
        return signature;
    }
    buildCreateOrderSig(message, chainId, verifyingContractAddress) {
        const messageTypes = {
            'Order': [
                { 'name': 'sender', 'type': 'bytes32' },
                { 'name': 'priceX18', 'type': 'int128' },
                { 'name': 'amount', 'type': 'int128' },
                { 'name': 'expiration', 'type': 'uint64' },
                { 'name': 'nonce', 'type': 'uint64' },
            ],
        };
        return this.buildSig(chainId, messageTypes, message, verifyingContractAddress);
    }
    buildListTriggerTxSig(message, chainId, verifyingContractAddress) {
        const messageTypes = {
            'ListTriggerOrders': [
                { 'name': 'sender', 'type': 'bytes32' },
                { 'name': 'recvTime', 'type': 'uint64' },
            ],
        };
        return this.buildSig(chainId, messageTypes, message, verifyingContractAddress);
    }
    buildCancelAllOrdersSig(message, chainId, verifyingContractAddress) {
        const messageTypes = {
            'CancellationProducts': [
                { 'name': 'sender', 'type': 'bytes32' },
                { 'name': 'productIds', 'type': 'uint32[]' },
                { 'name': 'nonce', 'type': 'uint64' },
            ],
        };
        return this.buildSig(chainId, messageTypes, message, verifyingContractAddress);
    }
    buildCancelOrdersSig(message, chainId, verifyingContractAddress) {
        const messageTypes = {
            'Cancellation': [
                { 'name': 'sender', 'type': 'bytes32' },
                { 'name': 'productIds', 'type': 'uint32[]' },
                { 'name': 'digests', 'type': 'bytes32[]' },
                { 'name': 'nonce', 'type': 'uint64' },
            ],
        };
        return this.buildSig(chainId, messageTypes, message, verifyingContractAddress);
    }
    buildWithdrawSig(message, chainId, verifyingContractAddress) {
        const messageTypes = {
            'WithdrawCollateral': [
                { 'name': 'sender', 'type': 'bytes32' },
                { 'name': 'productId', 'type': 'uint32' },
                { 'name': 'amount', 'type': 'uint128' },
                { 'name': 'nonce', 'type': 'uint64' },
            ],
        };
        return this.buildSig(chainId, messageTypes, message, verifyingContractAddress);
    }
    convertAddressToSender(address) {
        const sender = address + '64656661756c74';
        return sender.padEnd(66, '0');
    }
    getNonce(now, expiration) {
        if (now === undefined) {
            now = this.nonce();
        }
        // nonce = ((now + expiration) << 20) + 1000
        // 1 << 20 = 1048576
        return Precise["default"].stringAdd(Precise["default"].stringMul(Precise["default"].stringAdd(this.numberToString(now), this.numberToString(expiration)), '1048576'), '1000');
    }
    getExpiration(now, timeInForce, postOnly, reduceOnly) {
        let expiration = Precise["default"].stringAdd(this.numberToString(now), '86400');
        if (timeInForce === 'ioc') {
            // 1 << 62 = 4611686018427387904
            expiration = Precise["default"].stringOr(expiration, '4611686018427387904');
        }
        else if (timeInForce === 'fok') {
            // 2 << 62 = 9223372036854775808
            expiration = Precise["default"].stringOr(expiration, '9223372036854775808');
        }
        else if (postOnly) {
            // 3 << 62 = 13835058055282163712
            expiration = Precise["default"].stringOr(expiration, '13835058055282163712');
        }
        if (reduceOnly) {
            // 1 << 61 = 2305843009213693952
            expiration = Precise["default"].stringOr(expiration, '2305843009213693952');
        }
        return expiration;
    }
    getAmount(amount, side) {
        let amountString = this.numberToString(amount);
        if (side === 'sell') {
            if (amount > 0) {
                // amount *= -1;
                amountString = Precise["default"].stringMul(amountString, '-1');
            }
        }
        else {
            if (amount < 0) {
                // amount *= -1;
                amountString = Precise["default"].stringMul(amountString, '-1');
            }
        }
        return amountString;
    }
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name vertex#createOrder
         * @description create a trade order
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/executes/place-order
         * @see https://docs.vertexprotocol.com/developer-resources/api/trigger/executes/place-order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.timeInForce] ioc, fok
         * @param {bool} [params.postOnly] true or false whether the order is post-only
         * @param {bool} [params.reduceOnly] true or false whether the order is reduce-only, only works for ioc and fok order
         * @param {float} [params.triggerPrice] The price at which a trigger order is triggered at
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        this.checkRequiredCredentials();
        const marketType = type.toLowerCase();
        const isMarketOrder = marketType === 'market';
        if (isMarketOrder && price === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' createOrder() requires a price argument for market order');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const marketId = this.parseToInt(market['id']);
        const contracts = await this.queryContracts();
        const chainId = this.safeString(contracts, 'chain_id');
        const bookAddresses = this.safeList(contracts, 'book_addrs', []);
        const verifyingContractAddress = this.safeString(bookAddresses, marketId);
        const defaultTimeInForce = (isMarketOrder) ? 'fok' : undefined;
        const timeInForce = this.safeStringLower(params, 'timeInForce', defaultTimeInForce);
        const postOnly = this.safeBool(params, 'postOnly', false);
        const reduceOnly = this.safeBool(params, 'reduceOnly', false);
        const triggerPrice = this.safeString2(params, 'triggerPrice', 'stopPrice');
        const stopLossPrice = this.safeString(params, 'stopLossPrice', triggerPrice);
        const takeProfitPrice = this.safeString(params, 'takeProfitPrice');
        const isTrigger = (stopLossPrice || takeProfitPrice);
        const now = this.nonce();
        let nonce = this.getNonce(now, 90000);
        if (postOnly && reduceOnly) {
            throw new errors.NotSupported(this.id + ' reduceOnly not supported when postOnly is enabled');
        }
        const expiration = this.getExpiration(now, timeInForce, postOnly, reduceOnly);
        if (isTrigger) {
            // 1 << 63 = 9223372036854775808
            nonce = Precise["default"].stringOr(nonce, '9223372036854775808');
        }
        const amountString = this.getAmount(amount, side);
        const order = {
            'sender': this.convertAddressToSender(this.walletAddress),
            'priceX18': this.convertToX18(this.priceToPrecision(symbol, price)),
            'amount': this.convertToX18(this.amountToPrecision(symbol, amountString)),
            'expiration': expiration,
            'nonce': nonce,
        };
        const request = {
            'place_order': {
                'product_id': marketId,
                'order': {
                    'sender': order['sender'],
                    'priceX18': order['priceX18'],
                    'amount': order['amount'],
                    'expiration': this.numberToString(order['expiration']),
                    'nonce': order['nonce'],
                },
                'signature': this.buildCreateOrderSig(order, chainId, verifyingContractAddress),
                'id': this.safeInteger(this.options, 'brokerId', 5930043274845996),
            },
        };
        params = this.omit(params, ['timeInForce', 'reduceOnly', 'postOnly', 'triggerPrice', 'stopPrice', 'stopLossPrice', 'takeProfitPrice']);
        let response = undefined;
        if (isTrigger) {
            const trigger = {};
            if (stopLossPrice !== undefined) {
                trigger['last_price_below'] = this.convertToX18(stopLossPrice);
            }
            else if (takeProfitPrice !== undefined) {
                trigger['last_price_above'] = this.convertToX18(takeProfitPrice);
            }
            request['place_order']['trigger'] = trigger;
            response = await this.v1TriggerPostExecute(this.extend(request, params));
        }
        else {
            response = await this.v1GatewayPostExecute(this.extend(request, params));
        }
        //
        // {
        //     "status": "success",
        //     "signature": {signature},
        //     "data": {
        //       "digest": {order digest}
        //     },
        //     "request_type": "execute_place_order"
        //     "id": 100
        // }
        //
        const data = this.safeDict(response, 'data', {});
        return this.safeOrder({
            'id': this.safeString(data, 'digest'),
        });
    }
    async editOrder(id, symbol, type, side, amount = undefined, price = undefined, params = {}) {
        /**
         * @method
         * @name vertex#editOrder
         * @description edit a trade order
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/executes/cancel-and-place
         * @param {string} id cancel order id
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.timeInForce] ioc, fok
         * @param {bool} [params.postOnly] true or false whether the order is post-only
         * @param {bool} [params.reduceOnly] true or false whether the order is reduce-only, only works for ioc and fok order
         * @param {float} [params.triggerPrice] The price at which a trigger order is triggered at
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        this.checkRequiredCredentials();
        const marketType = type.toLowerCase();
        const isMarketOrder = marketType === 'market';
        if (isMarketOrder && price === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' editOrder() requires a price argument for market order');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const marketId = this.parseToInt(market['id']);
        const defaultTimeInForce = (isMarketOrder) ? 'fok' : undefined;
        const timeInForce = this.safeStringLower(params, 'timeInForce', defaultTimeInForce);
        const postOnly = this.safeBool(params, 'postOnly', false);
        const reduceOnly = this.safeBool(params, 'reduceOnly', false);
        const triggerPrice = this.safeString2(params, 'triggerPrice', 'stopPrice');
        const stopLossPrice = this.safeString(params, 'stopLossPrice', triggerPrice);
        const takeProfitPrice = this.safeString(params, 'takeProfitPrice');
        const isTrigger = (stopLossPrice || takeProfitPrice);
        const contracts = await this.queryContracts();
        const chainId = this.safeString(contracts, 'chain_id');
        const bookAddresses = this.safeList(contracts, 'book_addrs', []);
        const verifyingContractAddressOrder = this.safeString(bookAddresses, marketId);
        const verifyingContractAddressCancel = this.safeString(contracts, 'endpoint_addr');
        const now = this.nonce();
        const nonce = this.getNonce(now, 90000);
        const sender = this.convertAddressToSender(this.walletAddress);
        if (postOnly && reduceOnly) {
            throw new errors.NotSupported(this.id + ' reduceOnly not supported when postOnly is enabled');
        }
        if (isTrigger) {
            throw new errors.NotSupported(this.id + ' editOrder() not supported for trigger order');
        }
        const expiration = this.getExpiration(now, timeInForce, postOnly, reduceOnly);
        const amountString = this.getAmount(amount, side);
        const order = {
            'sender': sender,
            'priceX18': this.convertToX18(this.priceToPrecision(symbol, price)),
            'amount': this.convertToX18(this.amountToPrecision(symbol, amountString)),
            'expiration': expiration,
            'nonce': nonce,
        };
        const cancels = {
            'sender': sender,
            'productIds': [marketId],
            'digests': [id],
            'nonce': nonce,
        };
        const request = {
            'cancel_and_place': {
                'cancel_tx': {
                    'sender': cancels['sender'],
                    'productIds': cancels['productIds'],
                    'digests': cancels['digests'],
                    'nonce': this.numberToString(cancels['nonce']),
                },
                'cancel_signature': this.buildCancelOrdersSig(cancels, chainId, verifyingContractAddressCancel),
                'place_order': {
                    'product_id': marketId,
                    'order': {
                        'sender': order['sender'],
                        'priceX18': order['priceX18'],
                        'amount': order['amount'],
                        'expiration': this.numberToString(order['expiration']),
                        'nonce': order['nonce'],
                    },
                    'signature': this.buildCreateOrderSig(order, chainId, verifyingContractAddressOrder),
                    'id': this.safeInteger(this.options, 'brokerId', 5930043274845996),
                },
            },
        };
        params = this.omit(params, ['timeInForce', 'reduceOnly', 'postOnly', 'triggerPrice', 'stopPrice', 'stopLossPrice', 'takeProfitPrice']);
        const response = await this.v1GatewayPostExecute(this.extend(request, params));
        //
        // {
        //     "status": "success",
        //     "signature": {signature},
        //     "data": {
        //       "digest": {order digest}
        //     },
        //     "request_type": "execute_cancel_and_place"
        // }
        //
        const data = this.safeDict(response, 'data', {});
        return this.safeOrder({
            'id': this.safeString(data, 'digest'),
        });
    }
    parseOrderStatus(status) {
        if (status !== undefined) {
            const statuses = {
                'pending': 'open',
            };
            if (typeof status === 'string') {
                return this.safeString(statuses, status, status);
            }
            const statusCancelled = this.safeDict(status, 'cancelled');
            if (statusCancelled !== undefined) {
                return 'canceled';
            }
            const statusTriggered = this.safeDict(status, 'triggered', {});
            const triggeredStatus = this.safeString(statusTriggered, 'status', 'failure');
            if (triggeredStatus === 'success') {
                return 'closed';
            }
            return 'canceled';
        }
        return status;
    }
    parseOrder(order, market = undefined) {
        //
        // {
        //     "product_id": 1,
        //     "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43000000000000000000000000",
        //     "price_x18": "1000000000000000000",
        //     "amount": "1000000000000000000",
        //     "expiration": "2000000000",
        //     "nonce": "1",
        //     "unfilled_amount": "1000000000000000000",
        //     "digest": "0x0000000000000000000000000000000000000000000000000000000000000000",
        //     "placed_at": 1681951347,
        //     "order_type": "ioc"
        // }
        // stop order
        // {
        //     "order": {
        //       "order": {
        //         "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43000000000000000000000000",
        //         "priceX18": "1000000000000000000",
        //         "amount": "1000000000000000000",
        //         "expiration": "2000000000",
        //         "nonce": "1",
        //       },
        //       "signature": "0x...",
        //       "product_id": 1,
        //       "spot_leverage": true,
        //       "trigger": {
        //         "price_above": "1000000000000000000"
        //       },
        //       "digest": "0x..."
        //     },
        //     "status": "pending",
        //     "updated_at": 1688768157050
        // }
        //
        let marketId = this.safeString(order, 'product_id');
        let timestamp = this.safeTimestamp(order, 'placed_at');
        let amount = this.safeString(order, 'amount');
        let price = this.safeString(order, 'price_x18');
        const remaining = this.safeString(order, 'unfilled_amount');
        let triggerPriceNum = undefined;
        const status = this.safeValue(order, 'status');
        if (status !== undefined) {
            // trigger order
            const outerOrder = this.safeDict(order, 'order', {});
            const innerOrder = this.safeDict(outerOrder, 'order', {});
            marketId = this.safeString(outerOrder, 'product_id');
            amount = this.safeString(innerOrder, 'amount');
            price = this.safeString(innerOrder, 'priceX18');
            timestamp = this.safeTimestamp(order, 'updated_at');
            const trigger = this.safeDict(outerOrder, 'trigger', {});
            const triggerPrice = this.safeStringN(trigger, ['price_above', 'price_below', 'last_price_above', 'last_price_below']);
            if (triggerPrice !== undefined) {
                triggerPriceNum = this.parseToNumeric(this.convertFromX18(triggerPrice));
            }
        }
        market = this.safeMarket(marketId, market);
        const symbol = market['symbol'];
        let priceNum = undefined;
        if (price !== undefined) {
            priceNum = this.parseToNumeric(this.convertFromX18(price));
        }
        let amountNum = undefined;
        if (amount !== undefined) {
            amountNum = this.parseToNumeric(this.convertFromX18(amount));
        }
        let remainingNum = undefined;
        if (remaining !== undefined) {
            remainingNum = this.parseToNumeric(this.convertFromX18(remaining));
        }
        let side = undefined;
        if (amountNum !== undefined && remainingNum !== undefined) {
            side = (amountNum < 0 || remainingNum < 0) ? 'sell' : 'buy';
        }
        const tif = this.parseTimeInForce(this.safeString(order, 'order_type'));
        const isPostOnly = (tif === 'PO');
        return this.safeOrder({
            'info': order,
            'id': this.safeString(order, 'digest'),
            'clientOrderId': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': undefined,
            'lastUpdateTimestamp': undefined,
            'symbol': symbol,
            'type': undefined,
            'timeInForce': tif,
            'postOnly': isPostOnly,
            'reduceOnly': undefined,
            'side': side,
            'price': priceNum,
            'triggerPrice': triggerPriceNum,
            'amount': amountNum,
            'cost': undefined,
            'average': undefined,
            'filled': undefined,
            'remaining': remainingNum,
            'status': this.parseOrderStatus(status),
            'fee': undefined,
            'trades': undefined,
        }, market);
    }
    parseTimeInForce(timeInForce) {
        const timeInForces = {
            'POST_ONLY': 'PO',
        };
        return this.safeStringUpper(timeInForces, timeInForce, timeInForce);
    }
    async fetchOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchOrder
         * @description fetches information on an order made by the user
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/queries/order
         * @param {string} id the order id
         * @param {string} symbol unified symbol of the market the order was made in
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'type': 'order',
            'product_id': this.parseToInt(market['id']),
            'digest': id,
        };
        const response = await this.v1GatewayGetQuery(this.extend(request, params));
        //
        // {
        //     "status": "success",
        //     "data": {
        //       "product_id": 1,
        //       "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43000000000000000000000000",
        //       "price_x18": "1000000000000000000",
        //       "amount": "1000000000000000000",
        //       "expiration": "2000000000",
        //       "nonce": "1",
        //       "unfilled_amount": "1000000000000000000",
        //       "digest": "0x0000000000000000000000000000000000000000000000000000000000000000",
        //       "placed_at": 1681951347,
        //       "order_type": "ioc"
        //     },
        //     "request_type": "query_order",
        // }
        //
        const data = this.safeDict(response, 'data');
        return this.parseOrder(data, market);
    }
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchOpenOrders
         * @description fetch all unfilled currently open orders
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/queries/orders
         * @see https://docs.vertexprotocol.com/developer-resources/api/trigger/queries/list-trigger-orders
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch open orders for
         * @param {int} [limit] the maximum number of open orders structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.stop] whether the order is a stop/algo order
         * @param {string} [params.user] user address, will default to this.walletAddress if not provided
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        this.checkRequiredCredentials();
        await this.loadMarkets();
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchOpenOrders', params);
        const request = {};
        let market = undefined;
        const stop = this.safeBool2(params, 'stop', 'trigger');
        params = this.omit(params, ['stop', 'trigger']);
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['product_id'] = this.parseToNumeric(market['id']);
        }
        let response = undefined;
        if (stop) {
            const contracts = await this.queryContracts();
            const chainId = this.safeString(contracts, 'chain_id');
            const verifyingContractAddress = this.safeString(contracts, 'endpoint_addr');
            const tx = {
                'sender': this.convertAddressToSender(userAddress),
                'recvTime': this.nonce() + 90000,
            };
            request['signature'] = this.buildListTriggerTxSig(tx, chainId, verifyingContractAddress);
            request['tx'] = {
                'sender': tx['sender'],
                'recvTime': this.numberToString(tx['recvTime']),
            };
            request['type'] = 'list_trigger_orders';
            request['pending'] = true;
            const until = this.safeInteger(params, 'until');
            params = this.omit(params, 'until');
            if (until !== undefined) {
                request['max_update_time'] = until;
            }
            if (limit !== undefined) {
                request['limit'] = limit;
            }
            response = await this.v1TriggerPostQuery(this.extend(request, params));
            //
            // {
            //     "status": "success",
            //     "data": {
            //       "orders": [
            //         {
            //           "order": {
            //             "order": {
            //               "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43000000000000000000000000",
            //               "priceX18": "1000000000000000000",
            //               "amount": "1000000000000000000",
            //               "expiration": "2000000000",
            //               "nonce": "1",
            //             },
            //             "signature": "0x...",
            //             "product_id": 1,
            //             "spot_leverage": true,
            //             "trigger": {
            //               "price_above": "1000000000000000000"
            //             },
            //             "digest": "0x..."
            //           },
            //           "status": "pending",
            //           "updated_at": 1688768157050
            //         }
            //       ]
            //     },
            //     "request_type": "query_list_trigger_orders"
            // }
            //
        }
        else {
            this.checkRequiredArgument('fetchOpenOrders', symbol, 'symbol');
            request['type'] = 'subaccount_orders';
            request['sender'] = this.convertAddressToSender(userAddress);
            response = await this.v1GatewayPostQuery(this.extend(request, params));
            //
            // {
            //     "status": "success",
            //     "data": {
            //       "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43000000000000000000000000",
            //       "product_id": 1,
            //       "orders": [
            //         {
            //           "product_id": 1,
            //           "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43000000000000000000000000",
            //           "price_x18": "1000000000000000000",
            //           "amount": "1000000000000000000",
            //           "expiration": "2000000000",
            //           "nonce": "1",
            //           "order_type": "default",
            //           "unfilled_amount": "1000000000000000000",
            //           "digest": "0x0000000000000000000000000000000000000000000000000000000000000000",
            //           "placed_at": 1682437739,
            //           "order_type": "ioc"
            //         }
            //       ]
            //     },
            //     "request_type": "query_subaccount_orders"
            // }
            //
        }
        const data = this.safeDict(response, 'data', {});
        const orders = this.safeList(data, 'orders');
        return this.parseOrders(orders, market, since, limit);
    }
    async fetchOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchOrders
         * @description fetches information on multiple orders made by the user
         * @see https://docs.vertexprotocol.com/developer-resources/api/trigger/queries/list-trigger-orders
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch open orders for
         * @param {int} [limit] the maximum number of open orders structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.stop] whether the order is a stop/algo order
         * @param {string} [params.user] user address, will default to this.walletAddress if not provided
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        this.checkRequiredCredentials();
        const stop = this.safeBool2(params, 'stop', 'trigger');
        params = this.omit(params, ['stop', 'trigger']);
        if (!stop) {
            throw new errors.NotSupported(this.id + ' fetchOrders only support trigger orders');
        }
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchOrders', params);
        await this.loadMarkets();
        let market = undefined;
        const request = {
            'type': 'list_trigger_orders',
            'pending': false,
        };
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['product_id'] = this.parseToNumeric(market['id']);
        }
        const contracts = await this.queryContracts();
        const chainId = this.safeString(contracts, 'chain_id');
        const verifyingContractAddress = this.safeString(contracts, 'endpoint_addr');
        const tx = {
            'sender': this.convertAddressToSender(userAddress),
            'recvTime': this.nonce() + 90000,
        };
        request['signature'] = this.buildListTriggerTxSig(tx, chainId, verifyingContractAddress);
        request['tx'] = {
            'sender': tx['sender'],
            'recvTime': this.numberToString(tx['recvTime']),
        };
        const until = this.safeInteger(params, 'until');
        params = this.omit(params, 'until');
        if (until !== undefined) {
            request['max_update_time'] = until;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.v1TriggerPostQuery(this.extend(request, params));
        //
        // {
        //     "status": "success",
        //     "data": {
        //       "orders": [
        //         {
        //           "order": {
        //             "order": {
        //               "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43000000000000000000000000",
        //               "priceX18": "1000000000000000000",
        //               "amount": "1000000000000000000",
        //               "expiration": "2000000000",
        //               "nonce": "1",
        //             },
        //             "signature": "0x...",
        //             "product_id": 1,
        //             "spot_leverage": true,
        //             "trigger": {
        //               "price_above": "1000000000000000000"
        //             },
        //             "digest": "0x..."
        //           },
        //           "status": "pending",
        //           "updated_at": 1688768157050
        //         }
        //       ]
        //     },
        //     "request_type": "query_list_trigger_orders"
        // }
        //
        const data = this.safeDict(response, 'data', {});
        const orders = this.safeList(data, 'orders');
        return this.parseOrders(orders, market, since, limit);
    }
    async cancelAllOrders(symbol = undefined, params = {}) {
        /**
         * @method
         * @name vertex#cancelAllOrders
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/executes/cancel-product-orders
         * @see https://docs.vertexprotocol.com/developer-resources/api/trigger/executes/cancel-product-orders
         * @description cancel all open orders in a market
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.stop] whether the order is a stop/algo order
         * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        this.checkRequiredCredentials();
        await this.loadMarkets();
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' cancelAllOrders() requires a symbol argument');
        }
        const market = this.market(symbol);
        const marketId = market['id'];
        const contracts = await this.queryContracts();
        const chainId = this.safeString(contracts, 'chain_id');
        const verifyingContractAddress = this.safeString(contracts, 'endpoint_addr');
        const now = this.nonce();
        const nonce = this.getNonce(now, 90000);
        const cancels = {
            'sender': this.convertAddressToSender(this.walletAddress),
            'productIds': [
                this.parseToNumeric(marketId),
            ],
            'nonce': nonce,
        };
        const request = {
            'cancel_product_orders': {
                'tx': {
                    'sender': cancels['sender'],
                    'productIds': cancels['productIds'],
                    'nonce': this.numberToString(cancels['nonce']),
                },
                'signature': this.buildCancelAllOrdersSig(cancels, chainId, verifyingContractAddress),
            },
        };
        const stop = this.safeBool2(params, 'stop', 'trigger');
        params = this.omit(params, ['stop', 'trigger']);
        let response = undefined;
        if (stop) {
            response = await this.v1TriggerPostExecute(this.extend(request, params));
            //
            // {
            //     "status": "success",
            //     "signature": {signature},
            //     "request_type": "execute_cancel_product_orders"
            // }
            //
        }
        else {
            response = await this.v1GatewayPostExecute(this.extend(request, params));
            //
            // {
            //     "status": "success",
            //     "signature": {signature},
            //     "data": {
            //       "cancelled_orders": [
            //         {
            //           "product_id": 2,
            //           "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43746573743000000000000000",
            //           "price_x18": "20000000000000000000000",
            //           "amount": "-100000000000000000",
            //           "expiration": "1686332748",
            //           "order_type": "post_only",
            //           "nonce": "1768248100142339392",
            //           "unfilled_amount": "-100000000000000000",
            //           "digest": "0x3195a7929feb8307edecf9c045j5ced68925108f0aa305f0ee5773854159377c",
            //           "placed_at": 1686332708
            //         },
            //         ...
            //       ]
            //     },
            //     "request_type": "execute_cancel_product_orders"
            // }
            //
        }
        return response;
    }
    async cancelOrder(id, symbol = undefined, params = {}) {
        /**
         * @method
         * @name vertex#cancelOrder
         * @description cancels an open order
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/executes/cancel-orders
         * @see https://docs.vertexprotocol.com/developer-resources/api/trigger/executes/cancel-orders
         * @param {string} id order id
         * @param {string} symbol unified symbol of the market the order was made in
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        return await this.cancelOrders([id], symbol, params);
    }
    async cancelOrders(ids, symbol = undefined, params = {}) {
        /**
         * @method
         * @name vertex#cancelOrders
         * @description cancel multiple orders
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/executes/cancel-orders
         * @see https://docs.vertexprotocol.com/developer-resources/api/trigger/executes/cancel-orders
         * @param {string[]} ids order ids
         * @param {string} [symbol] unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        this.checkRequiredCredentials();
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' cancelOrders() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const marketId = market['id'];
        const contracts = await this.queryContracts();
        const chainId = this.safeString(contracts, 'chain_id');
        const verifyingContractAddress = this.safeString(contracts, 'endpoint_addr');
        const now = this.nonce();
        const nonce = this.getNonce(now, 90000);
        const cancels = {
            'sender': this.convertAddressToSender(this.walletAddress),
            'productIds': [],
            'digests': ids,
            'nonce': nonce,
        };
        const marketIdNum = this.parseToNumeric(marketId);
        for (let i = 0; i < ids.length; i++) {
            cancels['productIds'].push(marketIdNum);
        }
        const request = {
            'cancel_orders': {
                'tx': {
                    'sender': cancels['sender'],
                    'productIds': cancels['productIds'],
                    'digests': cancels['digests'],
                    'nonce': this.numberToString(cancels['nonce']),
                },
                'signature': this.buildCancelOrdersSig(cancels, chainId, verifyingContractAddress),
            },
        };
        const stop = this.safeBool2(params, 'stop', 'trigger');
        params = this.omit(params, ['stop', 'trigger']);
        let response = undefined;
        if (stop) {
            response = await this.v1TriggerPostExecute(this.extend(request, params));
            //
            // {
            //     "status": "success",
            //     "signature": {signature},
            //     "request_type": "execute_cancel_orders"
            // }
            //
        }
        else {
            response = await this.v1GatewayPostExecute(this.extend(request, params));
            //
            // {
            //     "status": "success",
            //     "signature": {signature},
            //     "data": {
            //       "cancelled_orders": [
            //         {
            //           "product_id": 2,
            //           "sender": "0x7a5ec2748e9065794491a8d29dcf3f9edb8d7c43746573743000000000000000",
            //           "price_x18": "20000000000000000000000",
            //           "amount": "-100000000000000000",
            //           "expiration": "1686332748",
            //           "order_type": "post_only",
            //           "nonce": "1768248100142339392",
            //           "unfilled_amount": "-100000000000000000",
            //           "digest": "0x3195a7929feb8307edecf9c045j5ced68925108f0aa305f0ee5773854159377c",
            //           "placed_at": 1686332708
            //         },
            //         ...
            //       ]
            //     },
            //     "request_type": "execute_cancel_orders"
            // }
            //
        }
        return response;
    }
    async fetchBalance(params = {}) {
        /**
         * @method
         * @name vertex#fetchBalance
         * @description query for balance and get the amount of funds available for trading or funds locked in orders
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/queries/subaccount-info
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.user] user address, will default to this.walletAddress if not provided
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
         */
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchBalance', params);
        const request = {
            'type': 'subaccount_info',
            'subaccount': this.convertAddressToSender(userAddress),
        };
        const response = await this.v1GatewayGetQuery(this.extend(request, params));
        //
        // {
        //     "status": "success",
        //     "data": {
        //       "subaccount": "0x265167ddfac55365d6ff07fc5943276319aa6b9f64656661756c740000000000",
        //       "exists": true,
        //       "healths": [
        //         {
        //           "assets": "75323297691833342306",
        //           "liabilities": "46329556869051092241",
        //           "health": "28993740822782250065"
        //         },
        //         {
        //           "assets": "75323297691833342306",
        //           "liabilities": "35968911700887320741",
        //           "health": "39354385990946021565"
        //         },
        //         {
        //           "assets": "80796966663601107565",
        //           "liabilities": "0",
        //           "health": "80796966663601107565"
        //         }
        //       ],
        //       "health_contributions": [
        //         [
        //           "75323297691833340000",
        //           "75323297691833340000",
        //           "75323297691833340000"
        //         ],
        //         [
        //           "0",
        //           "0",
        //           "0"
        //         ],
        //         [
        //           "0",
        //           "0",
        //           "0"
        //         ],
        //         [
        //           "0",
        //           "0",
        //           "0"
        //         ],
        //         [
        //           "-46329556869051090000",
        //           "-35968911700887323000",
        //           "5473668971767765000"
        //         ]
        //       ],
        //       "spot_count": 3,
        //       "perp_count": 2,
        //       "spot_balances": [
        //         {
        //           "product_id": 1,
        //           "lp_balance": {
        //             "amount": "0"
        //           },
        //           "balance": {
        //             "amount": "0",
        //             "last_cumulative_multiplier_x18": "1003419811982007193"
        //           }
        //         },
        //         {
        //           "product_id": 3,
        //           "lp_balance": {
        //             "amount": "0"
        //           },
        //           "balance": {
        //             "amount": "0",
        //             "last_cumulative_multiplier_x18": "1007584195035969404"
        //           }
        //         },
        //         {
        //           "product_id": 0,
        //           "lp_balance": {
        //             "amount": "0"
        //           },
        //           "balance": {
        //             "amount": "75323297691833342306",
        //             "last_cumulative_multiplier_x18": "1000000002391497578"
        //           }
        //         }
        //       ],
        //       "perp_balances": [
        //         {
        //           "product_id": 2,
        //           "lp_balance": {
        //             "amount": "0",
        //             "last_cumulative_funding_x18": "-284321955122859921"
        //           },
        //           "balance": {
        //             "amount": "0",
        //             "v_quote_balance": "0",
        //             "last_cumulative_funding_x18": "6363466629611946777168"
        //           }
        //         },
        //         {
        //           "product_id": 4,
        //           "lp_balance": {
        //             "amount": "0",
        //             "last_cumulative_funding_x18": "-90979748449893411"
        //           },
        //           "balance": {
        //             "amount": "-200000000000000000",
        //             "v_quote_balance": "419899475698318625259",
        //             "last_cumulative_funding_x18": "141182516563970577208"
        //           }
        //         }
        //       ],
        //       "spot_products": [
        //         {
        //           "product_id": 1,
        //           "oracle_price_x18": "30217830336443750750000",
        //           "risk": {
        //             "long_weight_initial_x18": "750000000000000000",
        //             "short_weight_initial_x18": "1250000000000000000",
        //             "long_weight_maintenance_x18": "800000000000000000",
        //             "short_weight_maintenance_x18": "1200000000000000000",
        //             "large_position_penalty_x18": "0"
        //           },
        //           "config": {
        //             "token": "0x5cc7c91690b2cbaee19a513473d73403e13fb431",
        //             "interest_inflection_util_x18": "800000000000000000",
        //             "interest_floor_x18": "10000000000000000",
        //             "interest_small_cap_x18": "40000000000000000",
        //             "interest_large_cap_x18": "1000000000000000000"
        //           },
        //           "state": {
        //             "cumulative_deposits_multiplier_x18": "1001304691727847318",
        //             "cumulative_borrows_multiplier_x18": "1003419811982007193",
        //             "total_deposits_normalized": "213107447159798397806318",
        //             "total_borrows_normalized": "4907820740150097483532"
        //           },
        //           "lp_state": {
        //             "supply": "1304981417419495030893348",
        //             "quote": {
        //               "amount": "2048495687410669565222259",
        //               "last_cumulative_multiplier_x18": "1000000002391497578"
        //             },
        //             "base": {
        //               "amount": "67623029247538886515",
        //               "last_cumulative_multiplier_x18": "1001304691727847318"
        //             }
        //           },
        //           "book_info": {
        //             "size_increment": "1000000000000000",
        //             "price_increment_x18": "1000000000000000000",
        //             "min_size": "10000000000000000",
        //             "collected_fees": "8865582805773573662738183",
        //             "lp_spread_x18": "3000000000000000"
        //           }
        //         },
        //         {
        //           "product_id": 3,
        //           "oracle_price_x18": "2075217009708333333333",
        //           "risk": {
        //             "long_weight_initial_x18": "750000000000000000",
        //             "short_weight_initial_x18": "1250000000000000000",
        //             "long_weight_maintenance_x18": "800000000000000000",
        //             "short_weight_maintenance_x18": "1200000000000000000",
        //             "large_position_penalty_x18": "0"
        //           },
        //           "config": {
        //             "token": "0xcc59686e3a32fb104c8ff84dd895676265efb8a6",
        //             "interest_inflection_util_x18": "800000000000000000",
        //             "interest_floor_x18": "10000000000000000",
        //             "interest_small_cap_x18": "40000000000000000",
        //             "interest_large_cap_x18": "1000000000000000000"
        //           },
        //           "state": {
        //             "cumulative_deposits_multiplier_x18": "1003722507760089346",
        //             "cumulative_borrows_multiplier_x18": "1007584195035969404",
        //             "total_deposits_normalized": "232750303205807326418622",
        //             "total_borrows_normalized": "110730726549469855171025"
        //           },
        //           "lp_state": {
        //             "supply": "902924999999999999774268",
        //             "quote": {
        //               "amount": "1165328092090344104989049",
        //               "last_cumulative_multiplier_x18": "1000000002391497578"
        //             },
        //             "base": {
        //               "amount": "563265647183403990588",
        //               "last_cumulative_multiplier_x18": "1003722507760089346"
        //             }
        //           },
        //           "book_info": {
        //             "size_increment": "10000000000000000",
        //             "price_increment_x18": "100000000000000000",
        //             "min_size": "100000000000000000",
        //             "collected_fees": "1801521329724633001446457",
        //             "lp_spread_x18": "3000000000000000"
        //           }
        //         },
        //         {
        //           "product_id": 0,
        //           "oracle_price_x18": "1000000000000000000",
        //           "risk": {
        //             "long_weight_initial_x18": "1000000000000000000",
        //             "short_weight_initial_x18": "1000000000000000000",
        //             "long_weight_maintenance_x18": "1000000000000000000",
        //             "short_weight_maintenance_x18": "1000000000000000000",
        //             "large_position_penalty_x18": "0"
        //           },
        //           "config": {
        //             "token": "0x179522635726710dd7d2035a81d856de4aa7836c",
        //             "interest_inflection_util_x18": "800000000000000000",
        //             "interest_floor_x18": "10000000000000000",
        //             "interest_small_cap_x18": "40000000000000000",
        //             "interest_large_cap_x18": "1000000000000000000"
        //           },
        //           "state": {
        //             "cumulative_deposits_multiplier_x18": "1000000002391497578",
        //             "cumulative_borrows_multiplier_x18": "1001593395547514024",
        //             "total_deposits_normalized": "60000256267437588885818752247843",
        //             "total_borrows_normalized": "391445043137305055810336885"
        //           },
        //           "lp_state": {
        //             "supply": "0",
        //             "quote": {
        //               "amount": "0",
        //               "last_cumulative_multiplier_x18": "0"
        //             },
        //             "base": {
        //               "amount": "0",
        //               "last_cumulative_multiplier_x18": "0"
        //             }
        //           },
        //           "book_info": {
        //             "size_increment": "0",
        //             "price_increment_x18": "0",
        //             "min_size": "0",
        //             "collected_fees": "0",
        //             "lp_spread_x18": "0"
        //           }
        //         }
        //       ],
        //       "perp_products": [
        //         {
        //           "product_id": 2,
        //           "oracle_price_x18": "30219079716463070000000",
        //           "risk": {
        //             "long_weight_initial_x18": "875000000000000000",
        //             "short_weight_initial_x18": "1125000000000000000",
        //             "long_weight_maintenance_x18": "900000000000000000",
        //             "short_weight_maintenance_x18": "1100000000000000000",
        //             "large_position_penalty_x18": "0"
        //           },
        //           "state": {
        //             "cumulative_funding_long_x18": "6363466629611946777168",
        //             "cumulative_funding_short_x18": "6363466629611946777168",
        //             "available_settle": "100612314098927536086702448",
        //             "open_interest": "57975708279961875623240"
        //           },
        //           "lp_state": {
        //             "supply": "783207415944433511804197",
        //             "last_cumulative_funding_x18": "6363466629611946777168",
        //             "cumulative_funding_per_lp_x18": "-284321955122859921",
        //             "base": "37321000000000000000",
        //             "quote": "1150991638943862165224593"
        //           },
        //           "book_info": {
        //             "size_increment": "1000000000000000",
        //             "price_increment_x18": "1000000000000000000",
        //             "min_size": "10000000000000000",
        //             "collected_fees": "7738341933653651206856235",
        //             "lp_spread_x18": "3000000000000000"
        //           }
        //         },
        //         {
        //           "product_id": 4,
        //           "oracle_price_x18": "2072129033632754300000",
        //           "risk": {
        //             "long_weight_initial_x18": "875000000000000000",
        //             "short_weight_initial_x18": "1125000000000000000",
        //             "long_weight_maintenance_x18": "900000000000000000",
        //             "short_weight_maintenance_x18": "1100000000000000000",
        //             "large_position_penalty_x18": "0"
        //           },
        //           "state": {
        //             "cumulative_funding_long_x18": "141182516563970577208",
        //             "cumulative_funding_short_x18": "141182516563970577208",
        //             "available_settle": "33807443862986950288685582",
        //             "open_interest": "316343836992291503987611"
        //           },
        //           "lp_state": {
        //             "supply": "541756546038144467864559",
        //             "last_cumulative_funding_x18": "141182516563970577208",
        //             "cumulative_funding_per_lp_x18": "-90979748449893411",
        //             "base": "362320000000000000000",
        //             "quote": "750080187685127907834038"
        //           },
        //           "book_info": {
        //             "size_increment": "10000000000000000",
        //             "price_increment_x18": "100000000000000000",
        //             "min_size": "100000000000000000",
        //             "collected_fees": "1893278317732551619694831",
        //             "lp_spread_x18": "3000000000000000"
        //           }
        //         }
        //       ]
        //     },
        //     "request_type": "query_subaccount_info"
        // }
        //
        const data = this.safeDict(response, 'data', {});
        const balances = this.safeList(data, 'spot_balances', []);
        const result = { 'info': response };
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const marketId = this.safeString(balance, 'product_id');
            const market = this.safeMarket(marketId);
            const isUsdcMarketId = marketId === '0';
            if (market['id'] === undefined && !isUsdcMarketId) {
                continue;
            }
            const baseId = (isUsdcMarketId) ? 'USDC' : this.safeString(market, 'baseId');
            const code = this.safeCurrencyCode(baseId);
            const account = this.account();
            const tokenBalance = this.safeDict(balance, 'balance', {});
            const total = this.convertFromX18(this.safeString(tokenBalance, 'amount'));
            account['total'] = total;
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    parsePosition(position, market = undefined) {
        //
        // {
        //     "product_id": 2,
        //     "lp_balance": {
        //       "amount": "0",
        //       "last_cumulative_funding_x18": "-284321955122859921"
        //     },
        //     "balance": {
        //       "amount": "0",
        //       "v_quote_balance": "0",
        //       "last_cumulative_funding_x18": "6363466629611946777168"
        //     }
        //   },
        //   {
        //     "product_id": 4,
        //     "lp_balance": {
        //       "amount": "0",
        //       "last_cumulative_funding_x18": "-90979748449893411"
        //     },
        //     "balance": {
        //       "amount": "-200000000000000000",
        //       "v_quote_balance": "419899475698318625259",
        //       "last_cumulative_funding_x18": "141182516563970577208"
        //     }
        // }
        //
        const marketId = this.safeString(position, 'product_id');
        market = this.safeMarket(marketId);
        const balance = this.safeDict(position, 'balance', {});
        const contractSize = this.convertFromX18(this.safeString(balance, 'amount'));
        let side = 'buy';
        if (Precise["default"].stringLt(contractSize, '1')) {
            side = 'sell';
        }
        return this.safePosition({
            'info': position,
            'id': undefined,
            'symbol': this.safeString(market, 'symbol'),
            'timestamp': undefined,
            'datetime': undefined,
            'lastUpdateTimestamp': undefined,
            'initialMargin': undefined,
            'initialMarginPercentage': undefined,
            'maintenanceMargin': undefined,
            'maintenanceMarginPercentage': undefined,
            'entryPrice': undefined,
            'notional': undefined,
            'leverage': undefined,
            'unrealizedPnl': undefined,
            'contracts': undefined,
            'contractSize': this.parseToNumeric(contractSize),
            'marginRatio': undefined,
            'liquidationPrice': undefined,
            'markPrice': undefined,
            'lastPrice': undefined,
            'collateral': undefined,
            'marginMode': 'cross',
            'marginType': undefined,
            'side': side,
            'percentage': undefined,
            'hedged': undefined,
            'stopLossPrice': undefined,
            'takeProfitPrice': undefined,
        });
    }
    async fetchPositions(symbols = undefined, params = {}) {
        /**
         * @method
         * @name vertex#fetchPositions
         * @description fetch all open positions
         * @see https://docs.vertexprotocol.com/developer-resources/api/gateway/queries/subaccount-info
         * @param {string[]} [symbols] list of unified market symbols
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.user] user address, will default to this.walletAddress if not provided
         * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
         */
        let userAddress = undefined;
        [userAddress, params] = this.handlePublicAddress('fetchPositions', params);
        const request = {
            'type': 'subaccount_info',
            'subaccount': this.convertAddressToSender(userAddress),
        };
        const response = await this.v1GatewayGetQuery(this.extend(request, params));
        // the response is the same as fetchBalance
        const data = this.safeDict(response, 'data', {});
        const positions = this.safeList(data, 'perp_balances', []);
        symbols = this.marketSymbols(symbols);
        const result = [];
        for (let i = 0; i < positions.length; i++) {
            const position = this.extend(this.parsePosition(positions[i], undefined), params);
            if (position['contractSize'] === 0) {
                continue;
            }
            result.push(position);
        }
        return this.filterByArrayPositions(result, 'symbol', symbols, false);
    }
    async queryNonces() {
        const request = {
            'type': 'nonces',
            'address': this.walletAddress,
        };
        const response = await this.v1GatewayGetQuery(request);
        //
        // {
        //     "status":"success",
        //     "data":{
        //       "tx_nonce": 0,
        //       "order_nonce": 1753048133299863552
        //     },
        //     "request_type": "query_nonces",
        // }
        //
        return this.safeDict(response, 'data', {});
    }
    async withdraw(code, amount, address, tag = undefined, params = {}) {
        /**
         * @method
         * @name vertex#withdraw
         * @description make a withdrawal
         * @see https://docs.vertexprotocol.com/developer-resources/api/withdrawing-on-chain
         * @param {string} code unified currency code
         * @param {float} amount the amount to withdraw
         * @param {string} address the address to withdraw to
         * @param {string} tag
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        this.checkRequiredCredentials();
        await this.loadMarkets();
        const currency = this.currency(code);
        const contracts = await this.queryContracts();
        const chainId = this.safeString(contracts, 'chain_id');
        const verifyingContractAddress = this.safeString(contracts, 'endpoint_addr');
        const nonces = await this.queryNonces();
        const nonce = this.safeNumber(nonces, 'tx_nonce');
        const withdraw = {
            'sender': this.convertAddressToSender(this.walletAddress),
            'productId': this.parseToNumeric(currency['id']),
            'amount': amount.toString(),
            'nonce': nonce,
        };
        const request = {
            'withdraw_collateral': {
                'tx': {
                    'sender': withdraw['sender'],
                    'productId': withdraw['productId'],
                    'amount': withdraw['amount'],
                    'nonce': this.numberToString(withdraw['nonce']),
                },
                'signature': this.buildWithdrawSig(withdraw, chainId, verifyingContractAddress),
            },
        };
        const response = await this.v1GatewayPostExecute(this.extend(request, params));
        //
        //     {
        //         "status": "success",
        //         "signature": {signature},
        //         "request_type": "execute_withdraw_collateral"
        //     }
        //
        const transaction = this.parseTransaction(response, currency);
        return this.extend(transaction, {
            'amount': amount,
            'address': address,
        });
    }
    parseTransaction(transaction, currency = undefined) {
        //
        //     {
        //         "status": "success",
        //         "signature": {signature},
        //         "request_type": "execute_withdraw_collateral"
        //     }
        //
        let code = undefined;
        if (currency !== undefined) {
            code = currency['code'];
        }
        return {
            'info': transaction,
            'id': undefined,
            'txid': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'addressFrom': undefined,
            'address': undefined,
            'addressTo': undefined,
            'tagFrom': undefined,
            'tag': undefined,
            'tagTo': undefined,
            'type': 'withdrawal',
            'amount': undefined,
            'currency': code,
            'status': this.parseTransactionStatus(this.safeString(transaction, 'status')),
            'updated': undefined,
            'network': undefined,
            'comment': undefined,
            'internal': undefined,
            'fee': undefined,
        };
    }
    parseTransactionStatus(status) {
        const statuses = {
            'success': 'ok',
        };
        return this.safeString(statuses, status, status);
    }
    handlePublicAddress(methodName, params) {
        let userAux = undefined;
        [userAux, params] = this.handleOptionAndParams(params, methodName, 'user');
        let user = userAux;
        [user, params] = this.handleOptionAndParams(params, methodName, 'address', userAux);
        if ((user !== undefined) && (user !== '')) {
            return [user, params];
        }
        if ((this.walletAddress !== undefined) && (this.walletAddress !== '')) {
            return [this.walletAddress, params];
        }
        throw new errors.ArgumentsRequired(this.id + ' ' + methodName + '() requires a user parameter inside \'params\' or the wallet address set');
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (!response) {
            return undefined; // fallback to default error handler
        }
        //
        //
        const status = this.safeString(response, 'status', '');
        if (status === 'failure') {
            const message = this.safeString(response, 'error');
            const feedback = this.id + ' ' + body;
            const errorCode = this.safeString(response, 'error_code');
            this.throwExactlyMatchedException(this.exceptions['exact'], errorCode, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], message, feedback);
            throw new errors.ExchangeError(feedback);
        }
        return undefined;
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const version = this.safeString(api, 0);
        const type = this.safeString(api, 1);
        let url = this.implodeHostname(this.urls['api'][version][type]);
        if (version !== 'v1' || type !== 'archive') {
            url = url + '/' + path;
        }
        if (method === 'POST') {
            headers = {
                'Content-Type': 'application/json',
            };
            body = this.json(params);
        }
        else {
            if (Object.keys(params).length) {
                url += '?' + this.urlencode(params);
            }
        }
        if (path !== 'execute') {
            // required encoding for public methods
            if (headers !== undefined) {
                headers['Accept-Encoding'] = 'gzip';
            }
            else {
                headers = {
                    'Accept-Encoding': 'gzip',
                };
            }
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
}

module.exports = vertex;
