
// ---------------------------------------------------------------------------

import Exchange from './abstract/coincatch.js';
import { ArgumentsRequired, AuthenticationError, BadRequest, BadSymbol, DDoSProtection, ExchangeError, InvalidNonce, InsufficientFunds, InvalidOrder, NotSupported, OnMaintenance, OrderNotFound, PermissionDenied, RateLimitExceeded } from './base/errors.js';
import { Precise } from './base/Precise.js';
import { TICK_SIZE } from './base/functions/number.js';
import { sha256 } from './static_dependencies/noble-hashes/sha256.js';
import type { Balances, Bool, Currency, Currencies, DepositAddress, Dict, FundingRate, FundingRateHistory, int, Int, LedgerEntry, Leverage, MarginMode, MarginModification, Market, Num, OHLCV, Order, OrderBook, OrderRequest, OrderSide, OrderType, Position, Str, Strings, Ticker, Tickers, Trade, Transaction, TransferEntry } from './base/types.js';

// ---------------------------------------------------------------------------

/**
 * @class coincatch
 * @augments Exchange
 */
export default class coincatch extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'coincatch',
            'name': 'CoinCatch',
            'countries': [ 'VG' ], // British Virgin Islands
            'rateLimit': 50, // 20 times per second
            'version': 'v1',
            'certified': false,
            'pro': true,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': true,
                'future': false,
                'option': false,
                'addMargin': true,
                'cancelAllOrders': true,
                'cancelAllOrdersAfter': false,
                'cancelOrder': true,
                'cancelOrders': true,
                'cancelWithdraw': false,
                'closePosition': false,
                'createConvertTrade': false,
                'createDepositAddress': false,
                'createLimitBuyOrder': true,
                'createLimitSellOrder': true,
                'createMarketBuyOrder': true,
                'createMarketBuyOrderWithCost': true,
                'createMarketOrder': true,
                'createMarketOrderWithCost': false,
                'createMarketSellOrder': true,
                'createMarketSellOrderWithCost': false,
                'createOrder': true,
                'createOrders': true,
                'createOrderWithTakeProfitAndStopLoss': true,
                'createPostOnlyOrder': true,
                'createReduceOnlyOrder': true,
                'createStopLimitOrder': true,
                'createStopLossOrder': true,
                'createStopMarketOrder': true,
                'createStopOrder': true,
                'createTakeProfitOrder': true,
                'createTrailingAmountOrder': false,
                'createTrailingPercentOrder': false,
                'createTriggerOrder': true,
                'fetchAccounts': false,
                'fetchBalance': true,
                'fetchCanceledAndClosedOrders': true,
                'fetchCanceledOrders': false,
                'fetchClosedOrder': false,
                'fetchClosedOrders': false,
                'fetchConvertCurrencies': false,
                'fetchConvertQuote': false,
                'fetchConvertTrade': false,
                'fetchConvertTradeHistory': false,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDeposits': true,
                'fetchDepositsWithdrawals': false,
                'fetchFundingHistory': false,
                'fetchFundingRate': true,
                'fetchFundingRateHistory': true,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchLedger': true,
                'fetchLeverage': true,
                'fetchLeverageTiers': false,
                'fetchMarginAdjustmentHistory': false,
                'fetchMarginMode': true,
                'fetchMarkets': true,
                'fetchMarkOHLCV': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrder': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': false,
                'fetchOrderTrades': true,
                'fetchPosition': true,
                'fetchPositionHistory': false,
                'fetchPositionMode': true,
                'fetchPositions': true,
                'fetchPositionsForSymbol': true,
                'fetchPositionsHistory': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchStatus': false,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchTransactions': false,
                'fetchTransfers': false,
                'fetchWithdrawals': true,
                'reduceMargin': true,
                'sandbox': false,
                'setLeverage': true,
                'setMargin': false,
                'setMarginMode': true,
                'setPositionMode': true,
                'transfer': false,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1m',
                '3m': '3m',
                '5m': '5m',
                '15': '15m',
                '30': '30m',
                '1h': '1H',
                '2h': '2H',
                '4h': '4H',
                '6h': '6H',
                '12h': '12H',
                '1d': '1D',
                '3d': '3D',
                '1w': '1W',
                '1M': '1M',
            },
            'urls': {
                'logo': 'https://github.com/user-attachments/assets/3d49065f-f05d-4573-88a2-1b5201ec6ff3',
                'api': {
                    'public': 'https://api.coincatch.com',
                    'private': 'https://api.coincatch.com',
                },
                'www': 'https://www.coincatch.com/',
                'doc': 'https://coincatch.github.io/github.io/en/',
                'fees': 'https://www.coincatch.com/en/rate/',
                'referral': {
                    'url': 'https://partner.coincatch.cc/bg/92hy70391729607848548',
                    'discount': 0.1,
                },
            },
            'api': {
                'public': {
                    'get': {
                        'api/spot/v1/public/time': 1, // done
                        'api/spot/v1/public/currencies': 20 / 3, // done
                        'api/spot/v1/market/ticker': 1, // done
                        'api/spot/v1/market/tickers': 1, // done
                        'api/spot/v1/market/fills': 2, // not used
                        'api/spot/v1/market/fills-history': 2, // done
                        'api/spot/v1/market/candles': 1, // done
                        'api/spot/v1/market/history-candles': 1, // not used
                        'api/spot/v1/market/depth': 1, // not used
                        'api/spot/v1/market/merge-depth': 1, // done
                        'api/mix/v1/market/contracts': 1, // done
                        'api/mix/v1/market/merge-depth': 1, // done
                        'api/mix/v1/market/depth': 1, // not used
                        'api/mix/v1/market/ticker': 1, // done
                        'api/mix/v1/market/tickers': 1, // done
                        'api/mix/v1/market/fills': 1, // not used
                        'api/mix/v1/market/fills-history': 1, // done
                        'api/mix/v1/market/candles': 1, // done
                        'pi/mix/v1/market/index': 1,
                        'api/mix/v1/market/funding-time': 1,
                        'api/mix/v1/market/history-fundRate': 1, // done
                        'api/mix/v1/market/current-fundRate': 1, // done
                        'api/mix/v1/market/open-interest': 1,
                        'api/mix/v1/market/mark-price': 1,
                        'api/mix/v1/market/symbol-leverage': 1, // done
                        'api/mix/v1/market/queryPositionLever': 1,
                    },
                },
                'private': {
                    'get': {
                        'api/spot/v1/wallet/deposit-address': 4, // done
                        'pi/spot/v1/wallet/withdrawal-list': 1, // not used
                        'api/spot/v1/wallet/withdrawal-list-v2': 1, // done but should be checked
                        'api/spot/v1/wallet/deposit-list': 1, // done
                        'api/spot/v1/account/getInfo': 1,
                        'api/spot/v1/account/assets': 2, // done
                        'api/spot/v1/account/transferRecords': 1,
                        'api/mix/v1/account/account': 2, // done
                        'api/mix/v1/account/accounts': 2, // done
                        'api/mix/v1/position/singlePosition-v2': 2, // done
                        'api/mix/v1/position/allPosition-v2': 4, // done
                        'api/mix/v1/account/accountBill': 2,
                        'api/mix/v1/account/accountBusinessBill': 4,
                        'api/mix/v1/order/current': 1, // done
                        'api/mix/v1/order/marginCoinCurrent': 1, // done
                        'api/mix/v1/order/history': 2, // done
                        'api/mix/v1/order/historyProductType': 4, // done
                        'api/mix/v1/order/detail': 2, // done
                        'api/mix/v1/order/fills': 2, // done
                        'api/mix/v1/order/allFills': 2, // done
                        'api/mix/v1/plan/currentPlan': 1, // done
                        'api/mix/v1/plan/historyPlan': 2, // done
                    },
                    'post': {
                        'api/spot/v1/wallet/transfer-v2': 4, // done
                        'api/spot/v1/wallet/withdrawal-v2': 4, // done but should be checked
                        'api/spot/v1/wallet/withdrawal-inner-v2': 1,
                        'api/spot/v1/account/bills': 2, // done
                        'api/spot/v1/trade/orders': 2, // done
                        'api/spot/v1/trade/batch-orders': { 'cost': 4, 'step': 10 }, // done
                        'api/spot/v1/trade/cancel-order': 1, // not used
                        'api/spot/v1/trade/cancel-order-v2': 2, // done
                        'api/spot/v1/trade/cancel-symbol-order': 2, // done
                        'api/spot/v1/trade/cancel-batch-orders': 1, // not used
                        'api/spot/v1/trade/cancel-batch-orders-v2': 1, // done
                        'api/spot/v1/trade/orderInfo': 1, // done
                        'api/spot/v1/trade/open-orders': 1, // done
                        'api/spot/v1/trade/history': 1, // done
                        'api/spot/v1/trade/fills': 1, // done
                        'api/spot/v1/plan/placePlan': 1, // done
                        'api/spot/v1/plan/modifyPlan': 1, // done
                        'api/spot/v1/plan/cancelPlan': 1, // done
                        'api/spot/v1/plan/currentPlan': 1, // done
                        'api/spot/v1/plan/historyPlan': 1, // done
                        'api/spot/v1/plan/batchCancelPlan': 2, // done
                        'api/mix/v1/account/open-count': 1,
                        'api/mix/v1/account/setLeverage': 4, // done
                        'api/mix/v1/account/setMargin': 4, // done
                        'api/mix/v1/account/setMarginMode': 4, // done
                        'api/mix/v1/account/setPositionMode': 4, // done
                        'api/mix/v1/order/placeOrder': 2, // done
                        'api/mix/v1/order/batch-orders': { 'cost': 4, 'step': 10 }, // done
                        'api/mix/v1/order/cancel-order': 2, // done
                        'api/mix/v1/order/cancel-batch-orders': 2, // done
                        'api/mix/v1/order/cancel-symbol-orders': 2, // done
                        'api/mix/v1/order/cancel-all-orders': 2, // done
                        'api/mix/v1/plan/placePlan': 2, // done
                        'api/mix/v1/plan/modifyPlan': 2,
                        'api/mix/v1/plan/modifyPlanPreset': 2,
                        'api/mix/v1/plan/placeTPSL': 2, // done
                        'api/mix/v1/plan/placeTrailStop': 2, // not used
                        'api/mix/v1/plan/placePositionsTPSL': 2, // not used
                        'api/mix/v1/plan/modifyTPSLPlan': 2,
                        'api/mix/v1/plan/cancelPlan': 2, // done
                        'api/mix/v1/plan/cancelSymbolPlan': 2, // done
                        'api/mix/v1/plan/cancelAllPlan': 2, // done
                    },
                },
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'password': true,
            },
            'fees': {
                'trading': {
                    'spot': {
                        'tierBased': false,
                        'percentage': true,
                        'feeSide': 'get',
                        'maker': this.parseNumber ('0.001'),
                        'taker': this.parseNumber ('0.001'),
                    },
                },
            },
            'options': {
                'brokerId': '47cfy',
                'createMarketBuyOrderRequiresPrice': true, // for spot orders only
                'timeframes': {
                    'spot': {
                        '1m': '1min',
                        '5m': '5min',
                        '15m': '15min',
                        '30m': '30min',
                        '1h': '1h',
                        '4h': '4h',
                        '6h': '6h',
                        '12h': '12h',
                        '1d': '1day',
                        '3d': '3day',
                        '1w': '1week',
                        '1M': '1M',
                    },
                    'swap': {
                        '1m': '1m',
                        '3m': '3m',
                        '5m': '5m',
                        '15': '15m',
                        '30': '30m',
                        '1h': '1H',
                        '2h': '2H',
                        '4h': '4H',
                        '6h': '6H',
                        '12h': '12H',
                        '1d': '1D',
                        '3d': '3D',
                        '1w': '1W',
                        '1M': '1M',
                    },
                },
                'currencyIdsListForParseMarket': undefined,
                'broker': '',
                'networks': {
                    'BTC': 'BITCOIN',
                    'ERC20': 'ERC20',
                    'TRC20': 'TRC20',
                    'BEP20': 'BEP20',
                    'ARB': 'ArbitrumOne',
                    'OPTIMISM': 'Optimism',
                    'LTC': 'LTC',
                    'BCH': 'BCH',
                    'ETC': 'ETC',
                    'SOL': 'SOL',
                    'NEO3': 'NEO3',
                    'STX': 'stacks',
                    'EGLD': 'Elrond',
                    'NEAR': 'NEARProtocol',
                    'ACA': 'AcalaToken',
                    'KLAY': 'Klaytn',
                    'FTM': 'Fantom',
                    'TERRA': 'Terra',
                    'WAVES': 'WAVES',
                    'TAO': 'TAO',
                    'SUI': 'SUI',
                    'SEI': 'SEI',
                    'RUNE': 'THORChain',
                    'ZIL': 'ZIL',
                    'SXP': 'Solar',
                    'FET': 'FET',
                    'AVAX': 'C-Chain',
                    'XRP': 'XRP',
                    'EOS': 'EOS',
                    'DOGE': 'DOGECOIN',
                    'CAP20': 'CAP20',
                    'MATIC': 'Polygon',
                    'CSPR': 'CSPR',
                    'GLMR': 'Moonbeam',
                    'MINA': 'MINA',
                    'CFX': 'CFX',
                    'STRAT': 'StratisEVM',
                    'TIA': 'Celestia',
                    'ChilizChain': 'ChilizChain',
                    'APT': 'Aptos',
                    'ONT': 'Ontology',
                    'ICP': 'ICP',
                    'ADA': 'Cardano',
                    'FIL': 'FIL',
                    'CELO': 'CELO',
                    'DOT': 'DOT',
                    'XLM': 'StellarLumens',
                    'ATOM': 'ATOM',
                    'CRO': 'CronosChain',
                },
                'networksById': {
                    'BITCOIN': 'BTC',
                    'ERC20': 'ERC20',
                    'TRC20': 'TRC20',
                    'TRX(TRC20)': 'TRC20',
                    'BEP20': 'BEP20',
                    'ArbitrumOne': 'ARB', // todo check
                    'Optimism': 'OPTIMISM',
                    'LTC': 'LTC',
                    'BCH': 'BCH',
                    'ETC': 'ETC',
                    'SOL': 'SOL',
                    'NEO3': 'NEO3',
                    'stacks': 'STX',
                    'Elrond': 'EGLD',
                    'NEARProtocol': 'NEAR',
                    'AcalaToken': 'ACA',
                    'Klaytn': 'KLAY',
                    'Fantom': 'FTM',
                    'Terra': 'TERRA',
                    'WAVES': 'WAVES',
                    'TAO': 'TAO',
                    'SUI': 'SUI',
                    'SEI': 'SEI',
                    'THORChain': 'RUNE', // todo check
                    'ZIL': 'ZIL',
                    'Solar': 'SXP', // todo check
                    'FET': 'FET',
                    'C-Chain': 'AVAX', // todo check
                    'XRP': 'XRP',
                    'EOS': 'EOS',
                    'DOGECOIN': 'DOGE',
                    'CAP20': 'CAP20', // todo check
                    'Polygon': 'MATIC',
                    'CSPR': 'CSPR',
                    'Moonbeam': 'GLMR',
                    'MINA': 'MINA',
                    'CFXeSpace': 'CFX', // todo check
                    'CFX': 'CFX',
                    'StratisEVM': 'STRAT', // todo check
                    'Celestia': 'TIA',
                    'ChilizChain': 'ChilizChain', // todo check
                    'Aptos': 'APT',
                    'Ontology': 'ONT',
                    'ICP': 'ICP',
                    'Cardano': 'ADA',
                    'FIL': 'FIL',
                    'CELO': 'CELO',
                    'DOT': 'DOT',
                    'StellarLumens': 'XLM', // todo check
                    'ATOM': 'ATOM',
                    'CronosChain': 'CRO', // todo check
                },
            },
            'commonCurrencies': {},
            'exceptions': {
                'exact': {
                    '22001': OrderNotFound, // No order to cancel
                    '429': DDoSProtection, // Request is too frequent
                    '40001': AuthenticationError, // The request header "ACCESS_KEY" cannot be empty
                    '40002': AuthenticationError, // The request header "ACCESS_SIGN" cannot be empty
                    '40003': AuthenticationError, // The request header "ACCESS_TIMESTAMP" cannot be empty
                    '40005': InvalidNonce, // Invalid ACCESS_TIMESTAMP
                    '40006': AuthenticationError, // Invalid ACCESS_KEY
                    '40007': BadRequest, // Invalid Content_Type，please use“application/json”format
                    '40008': InvalidNonce, // Request timestamp expired
                    '40009': AuthenticationError, // api verification failed
                    '40011': AuthenticationError, // The request header "ACCESS_PASSPHRASE" cannot be empty
                    '40012': AuthenticationError, // apikey/passphrase is incorrect
                    '40013': ExchangeError, // User has been frozen
                    '40014': PermissionDenied, // Incorrect permissions
                    '40015': ExchangeError, // System error
                    '40016': PermissionDenied, // The user must bind a mobile phone or Google authenticator
                    '40017': ExchangeError, // Parameter verification failed
                    '40018': PermissionDenied, // Illegal IP request
                    '40019': BadRequest, // Parameter {0} cannot be empty
                    '40020': BadRequest, // Parameter orderIds or clientOids error
                    '40034': BadRequest, // Parameter {0} does not exist
                    '400172': BadRequest, // symbol cannot be empty
                    '40912': BadRequest, // Batch processing orders can only process up to 50
                    '40913': BadRequest, // orderId or clientOrderId must be passed one
                    '40102': BadRequest, // The contract configuration does not exist, please check the parameters
                    '40200': OnMaintenance, // Server upgrade, please try again later
                    '40305': BadRequest, // client_oid length is not greater than 40, and cannot be Martian characters
                    '40409': ExchangeError, // wrong format
                    '40704': ExchangeError, // Only check the data of the last three months
                    '40724': BadRequest, // Parameter is empty
                    '40725': ExchangeError, // spot service return an error
                    '40762': InsufficientFunds, // The order amount exceeds the balance
                    '40774': BadRequest, // The order type for unilateral position must also be the unilateral position type.
                    '40808': BadRequest, // Parameter verification exception {0}
                    '43001': OrderNotFound, // The order does not exist
                    '43002': InvalidOrder, // Pending order failed
                    '43004': OrderNotFound, // There is no order to cancel
                    '43005': RateLimitExceeded, // Exceeded the maximum order limit of transaction volume
                    '43006': BadRequest, // The order quantity is less than the minimum transaction quantity
                    '43007': BadRequest, // The order quantity is greater than the maximum transaction quantity
                    '43008': BadRequest, // The current order price cannot be less than {0}
                    '43009': BadRequest, // The current commission price exceeds the limit {0}
                    '43010': BadRequest, // The transaction amount cannot be less than {0}
                    '43011': BadRequest, // The current order price cannot be less than {0}
                    '43012': InsufficientFunds, // {"code":"43012","msg":"Insufficient balance","requestTime":1729327822139,"data":null}
                    '43117': InsufficientFunds, // Exceeds the maximum amount that can be transferred
                    '43118': BadRequest, // clientOrderId duplicate
                    '43122': BadRequest, // The purchase limit of this currency is {0}, and there is still {1} left
                    '45006': InsufficientFunds, // Insufficient position
                    '45110': BadRequest, // less than the minimum amount {0} {1}
                    // {"code":"40913","msg":"orderId or clientOrderId must be passed one","requestTime":1726160988275,"data":null}
                },
                'broad': {},
            },
            'precisionMode': TICK_SIZE,
        });
    }

    calculateRateLimiterCost (api, method, path, params, config = {}) {
        const step = this.safeInteger (config, 'step');
        const cost = this.safeInteger (config, 'cost', 1);
        const orders = this.safeList2 (params, 'orderList', 'orderDataList', []);
        const ordersLength = orders.length;
        if ((step !== undefined) && (ordersLength > step)) {
            const numberOfSteps = Math.ceil (ordersLength / step);
            return cost * numberOfSteps;
        } else {
            return cost;
        }
    }

    async fetchTime (params = {}) {
        /**
         * @method
         * @name coincatch#fetchTime
         * @description fetches the current integer timestamp in milliseconds from the exchange server
         * @see https://coincatch.github.io/github.io/en/spot/#get-server-time
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {int} the current integer timestamp in milliseconds from the exchange server
         */
        const response = await this.publicGetApiSpotV1PublicTime (params);
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1725046822028,
        //         "data": "1725046822028"
        //     }
        //
        return this.safeInteger (response, 'data');
    }

    async fetchCurrencies (params = {}): Promise<Currencies> {
        /**
         * @method
         * @name coincatch#fetchCurrencies
         * @description fetches all available currencies on an exchange
         * @see https://coincatch.github.io/github.io/en/spot/#get-coin-list
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an associative dictionary of currencies
         */
        const response = await this.publicGetApiSpotV1PublicCurrencies (params);
        const data = this.safeList (response, 'data', []);
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1725102364202,
        //         "data": [
        //             {
        //                 "coinId": "1",
        //                 "coinName": "BTC",
        //                 "transfer": "true",
        //                 "chains": [
        //                     {
        //                         "chainId": "10",
        //                         "chain": "BITCOIN",
        //                         "needTag": "false",
        //                         "withdrawable": "true",
        //                         "rechargeable": "true",
        //                         "withdrawFee": "0.0005",
        //                         "extraWithDrawFee": "0",
        //                         "depositConfirm": "1",
        //                         "withdrawConfirm": "1",
        //                         "minDepositAmount": "0.00001",
        //                         "minWithdrawAmount": "0.001",
        //                         "browserUrl": "https://blockchair.com/bitcoin/transaction/"
        //                     }
        //                 ]
        //             },
        //             ...
        //         ]
        //     }
        //
        const result: Dict = {};
        const currenciesIds = [];
        for (let i = 0; i < data.length; i++) {
            const currecy = data[i];
            const currencyId = this.safeString (currecy, 'coinName');
            currenciesIds.push (currencyId);
            const code = this.safeCurrencyCode (currencyId);
            let allowDeposit = false;
            let allowWithdraw = false;
            let minDeposit: Str = undefined;
            let minWithdraw: Str = undefined;
            const networks = this.safeList (currecy, 'chains');
            const networksById = this.safeDict (this.options, 'networksById');
            const parsedNetworks: Dict = {};
            for (let j = 0; j < networks.length; j++) {
                const network = networks[j];
                const networkId = this.safeString (network, 'chain');
                const networkName = this.safeString (networksById, networkId, networkId);
                const networkDepositString = this.safeString (network, 'rechargeable');
                const networkDeposit = networkDepositString === 'true';
                const networkWithdrawString = this.safeString (network, 'withdrawable');
                const networkWithdraw = networkWithdrawString === 'true';
                const networkMinDeposit = this.safeString (network, 'minDepositAmount');
                const networkMinWithdraw = this.safeString (network, 'minWithdrawAmount');
                parsedNetworks[networkId] = {
                    'id': networkId,
                    'network': networkName,
                    'limits': {
                        'deposit': {
                            'min': this.parseNumber (networkMinDeposit),
                            'max': undefined,
                        },
                        'withdraw': {
                            'min': this.parseNumber (networkMinWithdraw),
                            'max': undefined,
                        },
                    },
                    'active': networkDeposit && networkWithdraw,
                    'deposit': networkDeposit,
                    'withdraw': networkWithdraw,
                    'fee': this.safeNumber (network, 'withdrawFee'),
                    'precision': undefined,
                    'info': network,
                };
                allowDeposit = allowDeposit ? allowDeposit : networkDeposit;
                allowWithdraw = allowWithdraw ? allowWithdraw : networkWithdraw;
                minDeposit = minDeposit ? Precise.stringMin (networkMinDeposit, minDeposit) : networkMinDeposit;
                minWithdraw = minWithdraw ? Precise.stringMin (networkMinWithdraw, minWithdraw) : networkMinWithdraw;
            }
            result[code] = {
                'id': currencyId,
                'numericId': this.safeInteger (currecy, 'coinId'),
                'code': code,
                'precision': undefined,
                'type': undefined,
                'name': undefined,
                'active': allowWithdraw && allowDeposit,
                'deposit': allowDeposit,
                'withdraw': allowWithdraw,
                'fee': undefined,
                'limits': {
                    'deposit': {
                        'min': this.parseNumber (minDeposit),
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': this.parseNumber (minWithdraw),
                        'max': undefined,
                    },
                },
                'networks': parsedNetworks,
                'info': currecy,
            };
        }
        if (this.safeList (this.options, 'currencyIdsListForParseMarket') === undefined) {
            this.options['currencyIdsListForParseMarket'] = currenciesIds;
        }
        return result;
    }

    async fetchMarkets (params = {}): Promise<Market[]> {
        /**
         * @method
         * @name coincatch#fetchMarkets
         * @description retrieves data on all markets for the exchange
         * @see https://coincatch.github.io/github.io/en/spot/#get-all-tickers
         * @see https://coincatch.github.io/github.io/en/mix/#get-all-symbols
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} an array of objects representing market data
         */
        let response = await this.publicGetApiSpotV1MarketTickers (params);
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1725114040155,
        //         "data": [
        //             {
        //                 "symbol": "BTCUSDT",
        //                 "high24h": "59461.34",
        //                 "low24h": "57723.23",
        //                 "close": "59056.02",
        //                 "quoteVol": "18240112.23368",
        //                 "baseVol": "309.05564",
        //                 "usdtVol": "18240112.2336744",
        //                 "ts": "1725114038951",
        //                 "buyOne": "59055.85",
        //                 "sellOne": "59057.45",
        //                 "bidSz": "0.0139",
        //                 "askSz": "0.0139",
        //                 "openUtc0": "59126.71",
        //                 "changeUtc": "-0.0012",
        //                 "change": "0.01662"
        //             },
        //             ...
        //         ]
        //     }
        //
        if (this.safeList (this.options, 'currencyIdsListForParseMarket') === undefined) {
            await this.fetchCurrencies ();
        }
        const spotMarkets = this.safeList (response, 'data', []);
        const request: Dict = {};
        let productType: Str = undefined;
        [ productType, params ] = this.handleOptionAndParams (params, 'fetchMarkets', 'productType', productType);
        let swapMarkets = [];
        request['productType'] = 'umcbl';
        response = await this.publicGetApiMixV1MarketContracts (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1725297439225,
        //         "data": [
        //             {
        //                 "symbol": "BTCUSDT_UMCBL",
        //                 "makerFeeRate": "0.0002",
        //                 "takerFeeRate": "0.0006",
        //                 "feeRateUpRatio": "0.005",
        //                 "openCostUpRatio": "0.01",
        //                 "quoteCoin": "USDT",
        //                 "baseCoin": "BTC",
        //                 "buyLimitPriceRatio": "0.01",
        //                 "sellLimitPriceRatio": "0.01",
        //                 "supportMarginCoins": [ "USDT" ],
        //                 "minTradeNum": "0.001",
        //                 "priceEndStep": "1",
        //                 "volumePlace": "3",
        //                 "pricePlace": "1",
        //                 "sizeMultiplier": "0.001",
        //                 "symbolType": "perpetual",
        //                 "symbolStatus": "normal",
        //                 "offTime": "-1",
        //                 "limitOpenTime": "-1",
        //                 "maintainTime": "",
        //                 "symbolName": "BTCUSDT",
        //                 "minTradeUSDT": null,
        //                 "maxPositionNum": null,
        //                 "maxOrderNum": null
        //             }
        //         ]
        //     }
        //
        const swapUMCBL = this.safeList (response, 'data', []);
        request['productType'] = 'dmcbl';
        response = await this.publicGetApiMixV1MarketContracts (this.extend (request, params));
        //
        //     {
        //         "code":"00000",
        //         "msg":"success",
        //         "requestTime":1725297439646,
        //         "data":[
        //             {
        //                 "symbol":"BTCUSD_DMCBL",
        //                 "makerFeeRate":"0.0002",
        //                 "takerFeeRate":"0.0006",
        //                 "feeRateUpRatio":"0.005",
        //                 "openCostUpRatio":"0.01",
        //                 "quoteCoin":"USD",
        //                 "baseCoin":"BTC",
        //                 "buyLimitPriceRatio":"0.01",
        //                 "sellLimitPriceRatio":"0.01",
        //                 "supportMarginCoins":[
        //                     "BTC",
        //                     "ETH"
        //                 ],
        //                 "minTradeNum":"0.001",
        //                 "priceEndStep":"1",
        //                 "volumePlace":"3",
        //                 "pricePlace":"1",
        //                 "sizeMultiplier":"0.001",
        //                 "symbolType":"perpetual",
        //                 "symbolStatus":"normal",
        //                 "offTime":"-1",
        //                 "limitOpenTime":"-1",
        //                 "maintainTime":"",
        //                 "symbolName":"BTCUSD",
        //                 "minTradeUSDT":null,
        //                 "maxPositionNum":null,
        //                 "maxOrderNum":null
        //             }
        //         ]
        //     }
        const swapDMCBL = this.safeList (response, 'data', []);
        const swapDMCBLExtended = [];
        for (let i = 0; i < swapDMCBL.length; i++) {
            const market = swapDMCBL[i];
            const supportMarginCoins = this.safeList (market, 'supportMarginCoins', []);
            for (let j = 0; j < supportMarginCoins.length; j++) {
                const settle = supportMarginCoins[j];
                const obj = {
                    'supportMarginCoins': [ settle ],
                };
                swapDMCBLExtended.push (this.extend (market, obj));
            }
        }
        swapMarkets = this.arrayConcat (swapUMCBL, swapDMCBLExtended);
        const markets = this.arrayConcat (spotMarkets, swapMarkets);
        return this.parseMarkets (markets);
    }

    parseMarket (market: Dict): Market {
        //
        // spot
        //     {
        //         "symbol": "BTCUSDT",
        //         "high24h": "59461.34",
        //         "low24h": "57723.23",
        //         "close": "59056.02",
        //         "quoteVol": "18240112.23368",
        //         "baseVol": "309.05564",
        //         "usdtVol": "18240112.2336744",
        //         "ts": "1725114038951",
        //         "buyOne": "59055.85",
        //         "sellOne": "59057.45",
        //         "bidSz": "0.0139",
        //         "askSz": "0.0139",
        //         "openUtc0": "59126.71",
        //         "changeUtc": "-0.0012",
        //         "change": "0.01662"
        //     },
        //
        // swap
        //     {
        //         "symbol": "BTCUSDT_UMCBL",
        //         "makerFeeRate": "0.0002",
        //         "takerFeeRate": "0.0006",
        //         "feeRateUpRatio": "0.005",
        //         "openCostUpRatio": "0.01",
        //         "quoteCoin": "USDT",
        //         "baseCoin": "BTC",
        //         "buyLimitPriceRatio": "0.01",
        //         "sellLimitPriceRatio": "0.01",
        //         "supportMarginCoins": [ "USDT" ],
        //         "minTradeNum": "0.001",
        //         "priceEndStep": "1",
        //         "volumePlace": "3",
        //         "pricePlace": "1",
        //         "sizeMultiplier": "0.001",
        //         "symbolType": "perpetual",
        //         "symbolStatus": "normal",
        //         "offTime": "-1",
        //         "limitOpenTime": "-1",
        //         "maintainTime": "",
        //         "symbolName": "BTCUSDT",
        //         "minTradeUSDT": null,
        //         "maxPositionNum": null,
        //         "maxOrderNum": null
        //     }
        //
        let marketId = this.safeString (market, 'symbol');
        const tradingFees = this.safeDict (this.fees, 'trading');
        const fees = this.safeDict (tradingFees, 'spot');
        let baseId = this.safeString (market, 'baseCoin');
        let quoteId = this.safeString (market, 'quoteCoin');
        let settleId: Str = undefined;
        let suffix = '';
        let settle: Str = undefined;
        let type = 'spot';
        let isLinear: Bool = undefined;
        let isInverse: Bool = undefined;
        let subType: Str = undefined;
        const isSpot = baseId === undefined; // for now spot markets have no properties baseCoin and quoteCoin
        if (isSpot) {
            const parsedMarketId = this.parseSpotMarketId (marketId);
            baseId = this.safeString (parsedMarketId, 'baseId');
            quoteId = this.safeString (parsedMarketId, 'quoteId');
            marketId += '_SPBL'; // spot markets should have current suffix
        } else {
            type = 'swap';
            fees['taker'] = this.safeNumber (market, 'takerFeeRate');
            fees['maker'] = this.safeNumber (market, 'makerFeeRate');
            const supportMarginCoins = this.safeList (market, 'supportMarginCoins', []);
            settleId = this.safeString (supportMarginCoins, 0);
            settle = this.safeCurrencyCode (settleId);
            suffix = ':' + settle;
            isLinear = baseId === settleId; // todo check
            isInverse = quoteId === settleId; // todo check
            if (isLinear) {
                subType = 'linear';
            } else if (isInverse) {
                subType = 'inverse';
            }
        }
        const base = this.safeCurrencyCode (baseId);
        const quote = this.safeCurrencyCode (quoteId);
        const symbol = base + '/' + quote + suffix;
        const symbolStatus = this.safeString (market, 'symbolStatus');
        const active = symbolStatus ? (symbolStatus === 'normal') : undefined;
        const volumePlace = this.safeString (market, 'volumePlace');
        const amountPrecisionString = this.parsePrecision (volumePlace);
        const pricePlace = this.safeString (market, 'pricePlace');
        const priceEndStep = this.safeString (market, 'priceEndStep');
        const pricePrecisionString = Precise.stringMul (this.parsePrecision (pricePlace), priceEndStep);
        return this.safeMarketStructure ({
            'id': marketId,
            'symbol': symbol,
            'base': base,
            'quote': quote,
            'baseId': baseId,
            'quoteId': quoteId,
            'active': active,
            'type': type,
            'subType': subType,
            'spot': isSpot,
            'margin': isSpot ? false : undefined,
            'swap': !isSpot,
            'future': false,
            'option': false,
            'contract': !isSpot,
            'settle': settle,
            'settleId': settleId,
            'contractSize': this.safeNumber (market, 'sizeMultiplier'),
            'linear': isLinear,
            'inverse': isInverse,
            'taker': this.safeNumber (fees, 'taker'),
            'maker': this.safeNumber (fees, 'maker'),
            'percentage': this.safeBool (fees, 'percentage'),
            'tierBased': this.safeBool (fees, 'tierBased'),
            'feeSide': this.safeString (fees, 'feeSide'),
            'expiry': undefined,
            'expiryDatetime': undefined,
            'strike': undefined,
            'optionType': undefined,
            'precision': {
                'amount': this.parseNumber (amountPrecisionString),
                'price': this.parseNumber (pricePrecisionString),
            },
            'limits': {
                'amount': {
                    'min': this.safeNumber (market, 'minTradeNum'),
                    'max': undefined,
                },
                'price': {
                    'min': undefined,
                    'max': undefined,
                },
                'leverage': {
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
        });
    }

    parseSpotMarketId (marketId) {
        let baseId = undefined;
        let quoteId = undefined;
        const currencyIds = this.safeList (this.options, 'currencyIdsListForParseMarket', []);
        for (let i = 0; i < currencyIds.length; i++) {
            const currencyId = currencyIds[i];
            const entryIndex = marketId.indexOf (currencyId);
            if (entryIndex > -1) {
                const restId = marketId.replace (currencyId, '');
                if (entryIndex === 0) {
                    baseId = currencyId;
                    quoteId = restId;
                } else {
                    baseId = restId;
                    quoteId = currencyId;
                }
                break;
            }
        }
        const result: Dict = {
            'baseId': baseId,
            'quoteId': quoteId,
        };
        return result;
    }

    async fetchTicker (symbol: string, params = {}): Promise<Ticker> {
        /**
         * @method
         * @name coincatch#fetchTicker
         * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @see https://coincatch.github.io/github.io/en/spot/#get-single-ticker
         * @see https://coincatch.github.io/github.io/en/mix/#get-single-symbol-ticker
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
        };
        let response = undefined;
        if (market['spot']) {
            response = await this.publicGetApiSpotV1MarketTicker (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725132487751,
            //         "data": {
            //             "symbol": "ETHUSDT",
            //             "high24h": "2533.76",
            //             "low24h": "2492.72",
            //             "close": "2499.76",
            //             "quoteVol": "21457850.7442",
            //             "baseVol": "8517.1869",
            //             "usdtVol": "21457850.744163",
            //             "ts": "1725132487476",
            //             "buyOne": "2499.75",
            //             "sellOne": "2499.76",
            //             "bidSz": "0.5311",
            //             "askSz": "4.5806",
            //             "openUtc0": "2525.69",
            //             "changeUtc": "-0.01027",
            //             "change": "-0.00772"
            //         }
            //     }
            //
        } else if (market['swap']) {
            response = await this.publicGetApiMixV1MarketTicker (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725316687174,
            //         "data": {
            //             "symbol": "ETHUSDT_UMCBL",
            //             "last": "2540.6",
            //             "bestAsk": "2540.71",
            //             "bestBid": "2540.38",
            //             "bidSz": "12.1",
            //             "askSz": "20",
            //             "high24h": "2563.91",
            //             "low24h": "2398.3",
            //             "timestamp": "1725316687177",
            //             "priceChangePercent": "0.01134",
            //             "baseVolume": "706928.96",
            //             "quoteVolume": "1756401737.8766",
            //             "usdtVolume": "1756401737.8766",
            //             "openUtc": "2424.49",
            //             "chgUtc": "0.04789",
            //             "indexPrice": "2541.977142",
            //             "fundingRate": "0.00006",
            //             "holdingAmount": "144688.49",
            //             "deliveryStartTime": null,
            //             "deliveryTime": null,
            //             "deliveryStatus": "normal"
            //         }
            //     }
            //
        } else {
            throw new NotSupported (this.id + ' ' + 'fetchTicker() is not supported for ' + market['type'] + ' type of markets');
        }
        const data = this.safeDict (response, 'data', {});
        return this.parseTicker (data, market);
    }

    async fetchTickers (symbols: Strings = undefined, params = {}): Promise<Tickers> {
        /**
         * @method
         * @name coincatch#fetchTickers
         * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
         * @see https://coincatch.github.io/github.io/en/spot/#get-all-tickers
         * @see https://coincatch.github.io/github.io/en/mix/#get-all-symbol-ticker
         * @param {string[]} [symbols] unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.type] 'spot' or 'swap' (default 'spot')
         * @param {string} [params.productType] 'umcbl' or 'dmcbl' (default 'umcbl') - USDT perpetual contract or Universal margin perpetual contract
         * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        const methodName = 'fetchTickers';
        await this.loadMarkets ();
        symbols = this.marketSymbols (symbols, undefined, true, true);
        const market = this.getMarketFromSymbols (symbols);
        let marketType = 'spot';
        [ marketType, params ] = this.handleMarketTypeAndParams (methodName, market, params, marketType);
        let response = undefined;
        if (marketType === 'spot') {
            response = await this.publicGetApiSpotV1MarketTickers (params);
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725114040155,
            //         "data": [
            //             {
            //                 "symbol": "BTCUSDT",
            //                 "high24h": "59461.34",
            //                 "low24h": "57723.23",
            //                 "close": "59056.02",
            //                 "quoteVol": "18240112.23368",
            //                 "baseVol": "309.05564",
            //                 "usdtVol": "18240112.2336744",
            //                 "ts": "1725114038951",
            //                 "buyOne": "59055.85",
            //                 "sellOne": "59057.45",
            //                 "bidSz": "0.0139",
            //                 "askSz": "0.0139",
            //                 "openUtc0": "59126.71",
            //                 "changeUtc": "-0.0012",
            //                 "change": "0.01662"
            //             },
            //             ...
            //         ]
            //     }
            //
        } else if (marketType === 'swap') {
            let productType = 'umcbl';
            [ productType, params ] = this.handleOptionAndParams (params, methodName, 'productType', productType);
            const request: Dict = {
                'productType': productType,
            };
            response = await this.publicGetApiMixV1MarketTickers (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725320291340,
            //         "data": [
            //             {
            //                 "symbol": "BTCUSDT_UMCBL",
            //                 "last": "59110.5",
            //                 "bestAsk": "59113.2",
            //                 "bestBid": "59109.5",
            //                 "bidSz": "1.932",
            //                 "askSz": "0.458",
            //                 "high24h": "59393.5",
            //                 "low24h": "57088.5",
            //                 "timestamp": "1725320291347",
            //                 "priceChangePercent": "0.01046",
            //                 "baseVolume": "59667.001",
            //                 "quoteVolume": "3472522256.9927",
            //                 "usdtVolume": "3472522256.9927",
            //                 "openUtc": "57263",
            //                 "chgUtc": "0.03231",
            //                 "indexPrice": "59151.25442",
            //                 "fundingRate": "0.00007",
            //                 "holdingAmount": "25995.377",
            //                 "deliveryStartTime": null,
            //                 "deliveryTime": null,
            //                 "deliveryStatus": "normal"}
            //             },
            //             ...
            //         ]
            //     }
            //
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
        const data = this.safeList (response, 'data', []);
        return this.parseTickers (data, symbols);
    }

    parseTicker (ticker, market: Market = undefined): Ticker {
        //
        // spot
        //     {
        //         "symbol": "BTCUSDT",
        //         "high24h": "59461.34",
        //         "low24h": "57723.23",
        //         "close": "59056.02",
        //         "quoteVol": "18240112.23368",
        //         "baseVol": "309.05564",
        //         "usdtVol": "18240112.2336744",
        //         "ts": "1725114038951",
        //         "buyOne": "59055.85",
        //         "sellOne": "59057.45",
        //         "bidSz": "0.0139",
        //         "askSz": "0.0139",
        //         "openUtc0": "59126.71",
        //         "changeUtc": "-0.0012",
        //         "change": "0.01662"
        //     }
        //
        // swap
        //     {
        //         "symbol": "ETHUSDT_UMCBL",
        //         "last": "2540.6",
        //         "bestAsk": "2540.71",
        //         "bestBid": "2540.38",
        //         "bidSz": "12.1",
        //         "askSz": "20",
        //         "high24h": "2563.91",
        //         "low24h": "2398.3",
        //         "timestamp": "1725316687177",
        //         "priceChangePercent": "0.01134",
        //         "baseVolume": "706928.96",
        //         "quoteVolume": "1756401737.8766",
        //         "usdtVolume": "1756401737.8766",
        //         "openUtc": "2424.49",
        //         "chgUtc": "0.04789",
        //         "indexPrice": "2541.977142",
        //         "fundingRate": "0.00006",
        //         "holdingAmount": "144688.49",
        //         "deliveryStartTime": null,
        //         "deliveryTime": null,
        //         "deliveryStatus": "normal"
        //     }
        //
        const timestamp = this.safeInteger2 (ticker, 'ts', 'timestamp');
        let marketId = this.safeString (ticker, 'symbol', '');
        if (marketId.indexOf ('_') < 0) {
            marketId += '_SPBL'; // spot markets from tickers endpoints have no suffix specific for market id
        }
        market = this.safeMarketCustom (marketId, market);
        const last = this.safeString2 (ticker, 'close', 'last');
        return this.safeTicker ({
            'symbol': market['symbol'],
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeString (ticker, 'high24h'),
            'low': this.safeString (ticker, 'low24h'),
            'bid': this.safeString2 (ticker, 'buyOne', 'bestBid'),
            'bidVolume': this.safeString (ticker, 'bidSz'),
            'ask': this.safeString2 (ticker, 'sellOne', 'bestAsk'),
            'askVolume': this.safeString (ticker, 'askSz'),
            'vwap': undefined,
            'open': this.safeString2 (ticker, 'openUtc0', 'openUtc'),
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': Precise.stringMul (this.safeString2 (ticker, 'changeUtc', 'chgUtc'), '100'),
            'average': undefined,
            'baseVolume': this.safeString2 (ticker, 'baseVol', 'baseVolume'),
            'quoteVolume': this.safeString2 (ticker, 'quoteVol', 'quoteVolume'),
            'indexPrice': this.safeString (ticker, 'indexPrice'),
            'markPrice': undefined,
            'info': ticker,
        }, market);
    }

    async fetchOrderBook (symbol: string, limit: Int = undefined, params = {}): Promise<OrderBook> {
        /**
         * @method
         * @name coincatch#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @see https://coincatch.github.io/github.io/en/spot/#get-merged-depth-data
         * @see https://coincatch.github.io/github.io/en/mix/#get-merged-depth-data
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int} [limit] the maximum amount of order book entries to return (maximum and default value is 100)
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.precision] 'scale0' (default), 'scale1', 'scale2' or 'scale3' - price accuracy, according to the selected accuracy as the step size to return the cumulative depth
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets ();
        const methodName = 'fetchOrderBook';
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        let precision: Str = undefined;
        [ precision, params ] = this.handleOptionAndParams (params, methodName, 'precision');
        if (precision !== undefined) {
            request['precision'] = precision;
        }
        let response = undefined;
        if (market['spot']) {
            response = await this.publicGetApiSpotV1MarketMergeDepth (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725137170814,
            //         "data": {
            //             "asks": [ [ 2507.07, 0.4248 ] ],
            //             "bids": [ [ 2507.05, 0.1198 ] ],
            //             "ts": "1725137170850",
            //             "scale": "0.01",
            //             "precision": "scale0",
            //             "isMaxPrecision": "NO"
            //         }
            //     }
            //
        } else if (market['swap']) {
            response = await this.publicGetApiMixV1MarketMergeDepth (this.extend (request, params));
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + market['type'] + ' type of markets');
        }
        const data = this.safeDict (response, 'data', {});
        const timestamp = this.safeInteger (data, 'ts');
        return this.parseOrderBook (data, symbol, timestamp, 'bids', 'asks');
    }

    async fetchOHLCV (symbol: string, timeframe = '1m', since: Int = undefined, limit: Int = undefined, params = {}): Promise<OHLCV[]> {
        /**
         * @method
         * @name coincatch#fetchOHLCV
         * @see https://coincatch.github.io/github.io/en/spot/#get-candle-data
         * @see https://coincatch.github.io/github.io/en/mix/#get-candle-data
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int} [since] timestamp in ms of the earliest candle to fetch
         * @param {int} [limit] the maximum amount of candles to fetch (default 100)
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] timestamp in ms of the latest candle to fetch
         * @param {string} [params.price] "mark" for mark price candles
         * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        const methodName = 'fetchOHLCV';
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
        };
        let until: Int = undefined;
        [ until, params ] = this.handleOptionAndParams (params, methodName, 'until');
        const marketType = market['type'];
        const timeframes = this.options['timeframes'][marketType];
        const encodedTimeframe = this.safeString (timeframes, timeframe, timeframe);
        const maxLimit = 1000;
        let requestedLimit = limit;
        if ((since !== undefined) || (until !== undefined)) {
            requestedLimit = maxLimit; // the exchange returns only last limit candles, so we have to fetch max limit if since or until are provided
        }
        if (requestedLimit !== undefined) {
            request['limit'] = requestedLimit;
        }
        let response = undefined;
        if (market['spot']) {
            request['period'] = encodedTimeframe;
            if (since !== undefined) {
                request['after'] = since;
            }
            if (until !== undefined) {
                request['before'] = until;
            }
            response = await this.publicGetApiSpotV1MarketCandles (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725142465742,
            //         "data": [
            //             {
            //                 "open": "2518.6",
            //                 "high": "2519.19",
            //                 "low": "2518.42",
            //                 "close": "2518.86",
            //                 "quoteVol": "17193.239401",
            //                 "baseVol": "6.8259",
            //                 "usdtVol": "17193.239401",
            //                 "ts": "1725142200000"
            //             },
            //             ...
            //         ]
            //     }
            //
            const data = this.safeList (response, 'data', []);
            return this.parseOHLCVs (data, market, timeframe, since, limit);
        } else if (market['swap']) {
            request['granularity'] = encodedTimeframe;
            if (until === undefined) {
                until = this.milliseconds ();
            }
            if (since === undefined) {
                const duration = this.parseTimeframe (timeframe);
                since = until - (duration * maxLimit * 1000);
            }
            request['startTime'] = since; // since and until are mandatory for swap
            request['endTime'] = until;
            let priceType: Str = undefined;
            [ priceType, params ] = this.handleOptionAndParams (params, methodName, 'price');
            if (priceType === 'mark') {
                request['kLineType'] = 'market mark index';
            }
            response = await this.publicGetApiMixV1MarketCandles (this.extend (request, params));
            //
            //     [
            //         [
            //             "1725379020000",
            //             "57614",
            //             "57636",
            //             "57614",
            //             "57633",
            //             "28.725",
            //             "1655346.493"
            //         ],
            //         ...
            //     ]
            //
            return this.parseOHLCVs (response, market, timeframe, since, limit);
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + market['type'] + ' type of markets');
        }
    }

    parseOHLCV (ohlcv, market: Market = undefined): OHLCV {
        return [
            this.safeInteger2 (ohlcv, 'ts', 0),
            this.safeNumber2 (ohlcv, 'open', 1),
            this.safeNumber2 (ohlcv, 'high', 2),
            this.safeNumber2 (ohlcv, 'low', 3),
            this.safeNumber2 (ohlcv, 'close', 4),
            this.safeNumber2 (ohlcv, 'baseVol', 5),
        ];
    }

    async fetchTrades (symbol: string, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        /**
         * @method
         * @name coincatch#fetchTrades
         * @description get the list of most recent trades for a particular symbol
         * @see https://coincatch.github.io/github.io/en/spot/#get-recent-trades
         * @see https://coincatch.github.io/github.io/en/mix/#get-fills
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int} [since] timestamp in ms of the earliest trade to fetch
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] timestamp in ms of the latest entry to fetch
         * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
         */
        const methodName = 'fetchTrades';
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
        };
        let until: Int = undefined;
        [ until, params ] = this.handleOptionAndParams (params, methodName, 'until');
        const maxLimit = 1000;
        let requestLimit = limit;
        if ((since !== undefined) || (until !== undefined)) {
            requestLimit = maxLimit;
            if (since !== undefined) {
                request['startTime'] = since;
            }
            if (until !== undefined) {
                request['endTime'] = until;
            }
        }
        if (requestLimit !== undefined) {
            request['limit'] = requestLimit;
        }
        let response = undefined;
        if (market['spot']) {
            response = await this.publicGetApiSpotV1MarketFillsHistory (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725198410976,
            //         "data": [
            //             {
            //                 "symbol": "ETHUSDT_SPBL",
            //                 "tradeId": "1214135619719827457",
            //                 "side": "buy",
            //                 "fillPrice": "2458.62",
            //                 "fillQuantity": "0.4756",
            //                 "fillTime": "1725198409967"
            //             }
            //         ]
            //     }
            //
        } else if (market['swap']) {
            response = await this.publicGetApiMixV1MarketFillsHistory (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725389251975,
            //         "data": [
            //             {
            //                 "tradeId": "1214936067582234782",
            //                 "price": "57998.5",
            //                 "size": "1.918",
            //                 "side": "Sell",
            //                 "timestamp": "1725389251000",
            //                 "symbol": "BTCUSDT_UMCBL"
            //             },
            //             ...
            //         ]
            //     }
            //
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + market['type'] + ' type of markets');
        }
        const data = this.safeList (response, 'data', []);
        return this.parseTrades (data, market, since, limit);
    }

    parseTrade (trade: Dict, market: Market = undefined): Trade {
        //
        // fetchTrades spot
        //     {
        //         "symbol": "ETHUSDT_SPBL",
        //         "tradeId": "1214135619719827457",
        //         "side": "Buy",
        //         "fillPrice": "2458.62",
        //         "fillQuantity": "0.4756",
        //         "fillTime": "1725198409967"
        //     }
        //
        // fetchTrades swap
        //     {
        //         "tradeId": "1214936067582234782",
        //         "price": "57998.5",
        //         "size": "1.918",
        //         "side": "Sell",
        //         "timestamp": "1725389251000",
        //         "symbol": "BTCUSDT_UMCBL"
        //     }
        //
        // fetchMyTrades spot
        //     {
        //         "accountId": "1002820815393",
        //         "symbol": "ETHUSDT_SPBL",
        //         "orderId": "1217143186968068096",
        //         "fillId": "1217143193356505089",
        //         "orderType": "market",
        //         "side": "buy",
        //         "fillPrice": "2340.55",
        //         "fillQuantity": "0.0042",
        //         "fillTotalAmount": "9.83031",
        //         "feeCcy": "ETH",
        //         "fees": "-0.0000042",
        //         "takerMakerFlag": "taker",
        //         "cTime": "1725915471400"
        //     }
        //
        // fetchMyTrades swap
        //     {
        //         "tradeId": "1225467075440189441",
        //         "symbol": "ETHUSD_DMCBL",
        //         "orderId": "1225467075288719360",
        //         "price": "2362.03",
        //         "sizeQty": "0.1",
        //         "fee": "-0.00005996",
        //         "side": "burst_close_long",
        //         "fillAmount": "236.203",
        //         "profit": "-0.0083359",
        //         "enterPointSource": "SYS",
        //         "tradeSide": "burst_close_long",
        //         "holdMode": "double_hold",
        //         "takerMakerFlag": "taker",
        //         "cTime": "1727900039539"
        //     }
        //
        const marketId = this.safeString (trade, 'symbol');
        market = this.safeMarketCustom (marketId, market);
        const timestamp = this.safeIntegerN (trade, [ 'fillTime', 'timestamp', 'cTime' ]);
        const fees = this.safeString2 (trade, 'fees', 'fee');
        let feeCost: Str = undefined;
        if (fees !== undefined) {
            feeCost = Precise.stringAbs (fees);
        }
        let feeCurrency = this.safeString (trade, 'feeCcy');
        if ((feeCurrency === undefined) && (market['settle'] !== undefined)) {
            feeCurrency = market['settle'];
        }
        const side = this.safeStringLower2 (trade, 'tradeSide', 'side');
        return this.safeTrade ({
            'id': this.safeString2 (trade, 'tradeId', 'fillId'),
            'order': this.safeString (trade, 'orderId'),
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': market['symbol'],
            'type': this.safeString (trade, 'orderType'),
            'side': this.parseOrderSide (side),
            'takerOrMaker': this.safeString (trade, 'takerMakerFlag'),
            'price': this.safeString2 (trade, 'fillPrice', 'price'),
            'amount': this.safeStringN (trade, [ 'fillQuantity', 'size', 'sizeQty' ]),
            'cost': this.safeString2 (trade, 'fillTotalAmount', 'fillAmount'),
            'fee': {
                'cost': feeCost,
                'currency': feeCurrency,
            },
            'info': trade,
        }, market);
    }

    async fetchFundingRate (symbol: string, params = {}): Promise<FundingRate> {
        /**
         * @method
         * @name coincatch#fetchFundingRate
         * @description fetch the current funding rate
         * @see https://coincatch.github.io/github.io/en/mix/#get-current-funding-rate
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [funding rate structure]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const marketId = market['id'];
        const parts = marketId.split ('_');
        const request: Dict = {
            'symbol': marketId,
            'productType': this.safeString (parts, 1),
        };
        const response = await this.publicGetApiMixV1MarketCurrentFundRate (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1725402130395,
        //         "data": {
        //             "symbol": "BTCUSDT_UMCBL",
        //             "fundingRate": "0.000043"
        //         }
        //     }
        //
        const data = this.safeDict (response, 'data', {});
        return this.parseFundingRate (data, market);
    }

    parseFundingRate (contract, market: Market = undefined) {
        const marketId = this.safeString (contract, 'symbol');
        market = this.safeMarketCustom (marketId, market);
        const fundingRate = this.safeNumber (contract, 'fundingRate');
        return {
            'info': contract,
            'symbol': market['symbol'],
            'markPrice': undefined,
            'indexPrice': undefined,
            'interestRate': undefined,
            'estimatedSettlePrice': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'fundingRate': fundingRate,
            'fundingTimestamp': undefined,
            'fundingDatetime': undefined,
            'nextFundingRate': undefined,
            'nextFundingTimestamp': undefined,
            'nextFundingDatetime': undefined,
            'previousFundingRate': undefined,
            'previousFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
        };
    }

    handleOptionParamsAndRequest (params: object, methodName: string, optionName: string, request: object, requestProperty: string, defaultValue = undefined) {
        const [ option, paramsOmited ] = this.handleOptionAndParams (params, methodName, optionName, defaultValue);
        if (option !== undefined) {
            request[requestProperty] = option;
        }
        return [ request, paramsOmited ];
    }

    async fetchFundingRateHistory (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#fetchFundingRateHistory
         * @description fetches historical funding rate prices
         * @see https://coincatch.github.io/github.io/en/mix/#get-history-funding-rate
         * @param {string} symbol unified symbol of the market to fetch the funding rate history for
         * @param {int} [since] timestamp in ms of the earliest funding rate to fetch
         * @param {int} [limit] the maximum amount of entries to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.pageNo] the page number to fetch
         * @param {bool} [params.nextPage] whether to query the next page (default false)
         * @returns {object[]} a list of [funding rate structures]{@link https://docs.ccxt.com/#/?id=funding-rate-history-structure}
         */
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchFundingRateHistory() requires a symbol argument');
        }
        await this.loadMarkets ();
        const maxEntriesPerRequest = 100;
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
        };
        let requestedLimit = limit;
        if (since !== undefined) {
            requestedLimit = maxEntriesPerRequest;
        }
        if (requestedLimit !== undefined) {
            request['pageSize'] = requestedLimit;
        }
        const response = await this.publicGetApiMixV1MarketHistoryFundRate (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1725455810888,
        //         "data": [
        //             {
        //                 "symbol": "BTCUSD",
        //                 "fundingRate": "0.000635",
        //                 "settleTime": "1724889600000"
        //             }
        //         ]
        //     }
        //
        const data = this.safeList (response, 'data', []);
        const rates = [];
        for (let i = 0; i < data.length; i++) {
            const entry = data[i];
            const timestamp = this.safeInteger (entry, 'settleTime');
            rates.push ({
                'info': entry,
                'symbol': this.safeSymbol (this.safeString (entry, 'symbol'), market, undefined, 'swap'),
                'fundingRate': this.safeNumber (entry, 'fundingRate'),
                'timestamp': timestamp,
                'datetime': this.iso8601 (timestamp),
            });
        }
        const sorted = this.sortBy (rates, 'timestamp');
        return this.filterBySinceLimit (sorted, since, limit) as FundingRateHistory[];
    }

    async fetchBalance (params = {}): Promise<Balances> {
        /**
         * @method
         * @name coincatch#fetchBalance
         * @description query for balance and get the amount of funds available for trading or funds locked in orders
         * @see https://coincatch.github.io/github.io/en/spot/#get-account-assets
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.type] 'spot' or 'swap' - the type of the market to fetch balance for (default 'spot')
         * @param {string} [params.productType] *swap only* 'umcbl' or 'dmcbl' (default 'umcbl')
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
         */
        await this.loadMarkets ();
        const methodName = 'fetchBalance';
        let marketType = undefined;
        [ marketType, params ] = this.handleMarketTypeAndParams (methodName, undefined, params);
        let response = undefined;
        if (marketType === 'spot') {
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725202685986,
            //         "data": [
            //             {
            //                 "coinId": 2,
            //                 "coinName": "USDT",
            //                 "available": "99.20000000",
            //                 "frozen": "0.00000000",
            //                 "lock": "0.00000000",
            //                 "uTime": "1724938746000"
            //             }
            //         ]
            //     }
            //
            response = await this.privateGetApiSpotV1AccountAssets (params);
        } else if (marketType === 'swap') {
            let productType = 'umcbl';
            [ productType, params ] = this.handleOptionAndParams (params, methodName, 'productType', productType);
            const request: Dict = {
                'productType': productType,
            };
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1726666298135,
            //         "data": [
            //             {
            //                 "marginCoin": "USDT",
            //                 "locked": "0",
            //                 "available": "60",
            //                 "crossMaxAvailable": "60",
            //                 "fixedMaxAvailable": "60",
            //                 "maxTransferOut": "60",
            //                 "equity": "60",
            //                 "usdtEquity": "60",
            //                 "btcEquity": "0.001002360626",
            //                 "crossRiskRate": "0",
            //                 "unrealizedPL": "0",
            //                 "bonus": "0",
            //                 "crossedUnrealizedPL": null,
            //                 "isolatedUnrealizedPL": null
            //             }
            //         ]
            //     }
            //
            response = await this.privateGetApiMixV1AccountAccounts (this.extend (request, params));
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
        const data = this.safeList (response, 'data', []);
        return this.parseBalance (data);
    }

    parseBalance (balances): Balances {
        //
        // spot
        //     [
        //         {
        //             "coinId": 2,
        //             "coinName": "USDT",
        //             "available": "99.20000000",
        //             "frozen": "0.00000000",
        //             "lock": "0.00000000",
        //             "uTime": "1724938746000"
        //         }
        //     ]
        //
        // swap
        //     [
        //         {
        //             "marginCoin": "USDT",
        //             "locked": "0",
        //             "available": "60",
        //             "crossMaxAvailable": "60",
        //             "fixedMaxAvailable": "60",
        //             "maxTransferOut": "60",
        //             "equity": "60",
        //             "usdtEquity": "60",
        //             "btcEquity": "0.001002360626",
        //             "crossRiskRate": "0",
        //             "unrealizedPL": "0",
        //             "bonus": "0",
        //             "crossedUnrealizedPL": null,
        //             "isolatedUnrealizedPL": null
        //         }
        //     ]
        //
        const result: Dict = {
            'info': balances,
        };
        for (let i = 0; i < balances.length; i++) {
            const balanceEntry = this.safeDict (balances, i, {});
            const currencyId = this.safeString2 (balanceEntry, 'coinName', 'marginCoin');
            const code = this.safeCurrencyCode (currencyId);
            const account = this.account ();
            account['free'] = this.safeString (balanceEntry, 'available');
            const locked = this.safeString2 (balanceEntry, 'lock', 'locked');
            const frozen = this.safeString (balanceEntry, 'frozen', '0');
            account['used'] = Precise.stringAdd (locked, frozen);
            account['total'] = this.safeString (balanceEntry, 'equity');
            result[code] = account;
        }
        return this.safeBalance (result);
    }

    async transfer (code: string, amount: number, fromAccount: string, toAccount:string, params = {}): Promise<TransferEntry> {
        /**
         * @method
         * @name coincatch#transfer
         * @description transfer currency internally between wallets on the same account
         * @see https://coincatch.github.io/github.io/en/spot/#transfer
         * @param {string} code unified currency code
         * @param {float} amount amount to transfer
         * @param {string} fromAccount 'spot' or 'swap' or 'mix_usdt' or 'mix_usd' - account to transfer from
         * @param {string} toAccount 'spot' or 'swap' or 'mix_usdt' or 'mix_usd' - account to transfer to
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.clientOrderId] a unique id for the transfer
         * @returns {object} a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
         */
        await this.loadMarkets ();
        const currency = this.currency (code);
        if (fromAccount === 'swap') {
            if (code === 'USDT') {
                fromAccount = 'mix_usdt';
            } else {
                fromAccount = 'mix_usd';
            }
        }
        if (toAccount === 'swap') {
            if (code === 'USDT') {
                toAccount = 'mix_usdt';
            } else {
                toAccount = 'mix_usd';
            }
        }
        const request: Dict = {
            'coin': currency['id'],
            'amount': this.currencyToPrecision (code, amount),
            'fromType': fromAccount,
            'toType': toAccount,
        };
        let clientOrderId: Str = undefined;
        [ clientOrderId, params ] = this.handleOptionAndParams (params, 'transfer', 'clientOrderId');
        if (clientOrderId !== undefined) {
            request['clientOid'] = clientOrderId;
        }
        const response = await this.privatePostApiSpotV1WalletTransferV2 (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1726664727436,
        //         "data": {
        //             "transferId": "1220285801129066496",
        //             "clientOrderId": null
        //         }
        //     }
        //
        return this.parseTransfer (response, currency);
    }

    parseTransfer (transfer, currency: Currency = undefined) {
        const msg = this.safeString (transfer, 'msg');
        let status: Str = undefined;
        if (msg === 'success') {
            status = 'ok';
        }
        const data = this.safeDict (transfer, 'data', {});
        return {
            'id': this.safeString (data, 'transferId'),
            'timestamp': undefined,
            'datetime': undefined,
            'currency': this.safeCurrencyCode (undefined, currency),
            'amount': undefined,
            'fromAccount': undefined,
            'toAccount': undefined,
            'status': status,
            'info': transfer,
        };
    }

    async fetchDepositAddress (code: string, params = {}): Promise<DepositAddress> {
        /**
         * @method
         * @name coincatch#fetchDepositAddress
         * @description fetch the deposit address for a currency associated with this account
         * @see https://coincatch.github.io/github.io/en/spot/#get-coin-address
         * @param {string} code unified currency code
         * @param {string} [params.network] network for fetch deposit address
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
         */
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request: Dict = {
            'coin': currency['id'],
        };
        let networkCode: Str = undefined;
        [ networkCode, params ] = this.handleNetworkCodeAndParams (params);
        if (networkCode === undefined) {
            networkCode = this.defaultNetworkCode (code);
        }
        if (networkCode === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchDepositAddress() requires a network parameter or a default network code');
        }
        request['chain'] = this.networkCodeToId (networkCode, code);
        const response = await this.privateGetApiSpotV1WalletDepositAddress (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1725210515143,
        //         "data": {
        //             "coin": "USDT",
        //             "address": "TKTUt7qiTaMgnTwZXjE3ZBkPB6LKhLPJyZ",
        //             "chain": "TRC20",
        //             "tag": null,
        //             "url": "https://tronscan.org/#/transaction/"
        //         }
        //     }
        //
        const data = this.safeDict (response, 'data', {});
        const depositAddress = this.parseDepositAddress (data, currency);
        return depositAddress;
    }

    parseDepositAddress (depositAddress, currency: Currency = undefined): DepositAddress {
        //
        //     {
        //         "coin": "USDT",
        //         "address": "TKTUt7qiTaMgnTwZXjE3ZBkPB6LKhLPJyZ",
        //         "chain": "TRC20",
        //         "tag": null,
        //         "url": "https://tronscan.org/#/transaction/"
        //     }
        //
        const address = this.safeString (depositAddress, 'address');
        this.checkAddress (address);
        const networkId = this.safeString (depositAddress, 'chain');
        const network = this.safeString (this.options['networksById'], networkId, networkId);
        const tag = this.safeString (depositAddress, 'tag');
        return {
            'currency': currency['code'],
            'address': address,
            'tag': tag,
            'network': network,
            'info': depositAddress,
        };
    }

    async fetchDeposits (code: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Transaction[]> {
        /**
         * @method
         * @name coincatch#fetchDeposits
         * @description fetch all deposits made to an account
         * @see https://coincatch.github.io/github.io/en/spot/#get-deposit-list
         * @param {string} code unified currency code of the currency transferred
         * @param {int} [since] the earliest time in ms to fetch transfers for (default 24 hours ago)
         * @param {int} [limit] the maximum number of transfer structures to retrieve (not used by exchange)
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] the latest time in ms to fetch transfers for (default time now)
         * @param {int} [params.pageNo] pageNo default 1
         * @param {int} [params.pageSize] pageSize (default 20, max 100)
         * @returns {object[]} a list of [transfer structures]{@link https://docs.ccxt.com/#/?id=transfer-structure}
         */
        const methodName = 'fetchDeposits';
        await this.loadMarkets ();
        const request: Dict = {};
        let currency: Currency = undefined;
        if (code !== undefined) {
            currency = this.currency (code);
            request['coin'] = currency['id'];
        }
        if (since !== undefined) {
            request['startTime'] = since;
        }
        let until: Int = undefined;
        [ until, params ] = this.handleOptionAndParams (params, methodName, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
        }
        const response = await this.privateGetApiSpotV1WalletDepositList (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1725205525239,
        //         "data": [
        //             {
        //                 "id": "1213046466852196352",
        //                 "txId": "824246b030cd84d56400661303547f43a1d9fef66cf968628dd5112f362053ff",
        //                 "coin": "USDT",
        //                 "type": "deposit",
        //                 "amount": "99.20000000",
        //                 "status": "success",
        //                 "toAddress": "TKTUt7qiTaMgnTwZXjE3ZBkPB6LKhLPJyZ",
        //                 "fee": null,
        //                 "chain": "TRX(TRC20)",
        //                 "confirm": null,
        //                 "clientOid": null,
        //                 "tag": null,
        //                 "fromAddress": null,
        //                 "dest": "on_chain",
        //                 "cTime": "1724938735688",
        //                 "uTime": "1724938746015"
        //             }
        //         ]
        //     }
        //
        const data = this.safeList (response, 'data', []);
        return this.parseTransactions (data, currency, since, limit);
    }

    async fetchWithdrawals (code: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Transaction[]> {
        /**
         * @method
         * @name coincatch#fetchWithdrawals
         * @description fetch all withdrawals made from an account
         * @see https://coincatch.github.io/github.io/en/spot/#get-withdraw-list-v2
         * @param {string} code unified currency code of the currency transferred
         * @param {int} [since] the earliest time in ms to fetch transfers for (default 24 hours ago)
         * @param {int} [limit] the maximum number of transfer structures to retrieve (default 50, max 200)
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] the latest time in ms to fetch transfers for (default time now)
         * @param {string} [params.clientOid] clientOid
         * @param {string} [params.orderId] The response orderId
         * @param {string} [params.idLessThan] Requests the content on the page before this ID (older data), the value input should be the orderId of the corresponding interface.
         * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        const methodName = 'fetchWithdrawals';
        await this.loadMarkets ();
        const request: Dict = {};
        let currency: Currency = undefined;
        if (code !== undefined) {
            currency = this.currency (code);
            request['coin'] = currency['id'];
        }
        if (since !== undefined) {
            request['startTime'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        let until: Int = undefined;
        [ until, params ] = this.handleOptionAndParams (params, methodName, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
        }
        const response = await this.privateGetApiSpotV1WalletWithdrawalListV2 (this.extend (request, params));
        // todo add after withdrawal
        //
        const data = this.safeList (response, 'data', []);
        return this.parseTransactions (data, currency, since, limit);
    }

    async withdraw (code: string, amount: number, address: string, tag = undefined, params = {}): Promise<Transaction> {
        /**
         * @method
         * @name coincatch#withdraw
         * @description make a withdrawal
         * @see https://coincatch.github.io/github.io/en/spot/#withdraw
         * @param {string} code unified currency code
         * @param {float} amount the amount to withdraw
         * @param {string} address the address to withdraw to
         * @param {string} [tag]
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} params.network network for withdraw (mandatory)
         * @param {string} [params.remark] remark
         * @param {string} [params.clientOid] custom id
         * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        [ tag, params ] = this.handleWithdrawTagAndParams (tag, params);
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request: Dict = {
            'coin': currency['id'],
            'address': address,
            'amount': amount,
        };
        if (tag !== undefined) {
            request['tag'] = tag;
        }
        let networkCode: Str = undefined;
        [ networkCode, params ] = this.handleNetworkCodeAndParams (params);
        if (networkCode !== undefined) {
            request['chain'] = this.networkCodeToId (networkCode);
        }
        const response = await this.privatePostApiSpotV1WalletWithdrawalV2 (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "data": {
        //             "orderId":888291686266343424",
        //             "clientOrderId":"123"
        //         }
        //     }
        //
        const data = this.safeDict (response, 'data', {});
        return this.parseTransaction (data, currency);
    }

    parseTransaction (transaction, currency: Currency = undefined): Transaction {
        //
        // fetchDeposits
        //
        //     {
        //         "id": "1213046466852196352",
        //         "txId": "824246b030cd84d56400661303547f43a1d9fef66cf968628dd5112f362053ff",
        //         "coin": "USDT",
        //         "type": "deposit",
        //         "amount": "99.20000000",
        //         "status": "success",
        //         "toAddress": "TKTUt7qiTaMgnTwZXjE3ZBkPB6LKhLPJyZ",
        //         "fee": null,
        //         "chain": "TRX(TRC20)",
        //         "confirm": null,
        //         "clientOid": null,
        //         "tag": null,
        //         "fromAddress": null,
        //         "dest": "on_chain",
        //         "cTime": "1724938735688",
        //         "uTime": "1724938746015"
        //     }
        //
        // withdraw
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "data": {
        //             "orderId":888291686266343424",
        //             "clientOrderId":"123"
        //         }
        //     }
        //
        let status = this.safeString (transaction, 'status');
        if (status === 'success') {
            status = 'ok';
        }
        const txid = this.safeString (transaction, 'txId');
        const coin = this.safeString (transaction, 'coin');
        const code = this.safeCurrencyCode (coin, currency);
        const timestamp = this.safeInteger (transaction, 'cTime');
        const amount = this.safeNumber (transaction, 'amount');
        const networkId = this.safeString (transaction, 'chain');
        const network = this.safeString (this.options['networksById'], networkId, networkId);
        const addressTo = this.safeString (transaction, 'toAddress');
        const addressFrom = this.safeString (transaction, 'fromAddress');
        const tag = this.safeString (transaction, 'tag');
        const type = this.safeString (transaction, 'type');
        const feeCost = this.safeNumber (transaction, 'fee');
        let fee = undefined;
        if (feeCost !== undefined) {
            fee = {
                'cost': feeCost,
                'currency': code,
            };
        }
        return {
            'info': transaction,
            'id': this.safeString2 (transaction, 'id', 'orderId'),
            'txid': txid,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'network': network,
            'address': undefined,
            'addressTo': addressTo,
            'addressFrom': addressFrom,
            'tag': tag,
            'tagTo': undefined,
            'tagFrom': undefined,
            'type': type,
            'amount': amount,
            'currency': code,
            'status': status,
            'updated': undefined,
            'internal': undefined,
            'comment': undefined,
            'fee': fee,
        } as Transaction;
    }

    async createMarketBuyOrderWithCost (symbol: string, cost: number, params = {}) {
        /**
         * @method
         * @name coincatch#createMarketBuyOrderWithCost
         * @description create a market buy order by providing the symbol and cost
         * @see https://coincatch.github.io/github.io/en/spot/#place-order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {float} cost how much you want to trade in units of the quote currency
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const methodName = 'createMarketBuyOrderWithCost';
        const market = this.market (symbol);
        if (!market['spot']) {
            throw new NotSupported (this.id + ' ' + methodName + '() supports spot orders only');
        }
        params['methodName'] = methodName;
        params['createMarketBuyOrderRequiresPrice'] = false;
        return await this.createOrder (symbol, 'market', 'buy', cost, undefined, params);
    }

    async createOrder (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}): Promise<Order> {
        /**
         * @method
         * @name coincatch#createOrder
         * @description create a trade order
         * @see https://coincatch.github.io/github.io/en/spot/#place-order
         * @see https://coincatch.github.io/github.io/en/spot/#place-plan-order
         * @see https://coincatch.github.io/github.io/en/mix/#place-order
         * @see https://coincatch.github.io/github.io/en/mix/#place-plan-order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit' or 'LIMIT_MAKER' for spot, 'market' or 'limit' or 'STOP' for swap
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of you want to trade in units of the base currency
         * @param {float} [price] the price that the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {float} [params.cost] *spot market buy only* the quote quantity that can be used as an alternative for the amount
         * @param {float} [params.triggerPrice] the price that the order is to be triggered
         * @param {bool} [params.postOnly] if true, the order will only be posted to the order book and not executed immediately
         * @param {string} [params.timeInForce] 'GTC', 'IOC', 'FOK' or 'PO'
         * @param {string} [params.clientOrderId] a unique id for the order - is mandatory for swap
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        params['methodName'] = this.safeString (params, 'methodName', 'createOrder');
        const market = this.market (symbol);
        if (market['spot']) {
            return await this.createSpotOrder (symbol, type, side, amount, price, params);
        } else if (market['swap']) {
            return await this.createSwapOrder (symbol, type, side, amount, price, params);
        } else {
            throw new NotSupported (this.id + ' createOrder() is not supported for ' + market['type'] + ' type of markets');
        }
    }

    async createSpotOrder (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}): Promise<Order> {
        /**
         * @method
         * @name coincatch#createSpotOrder
         * @description create a trade order on spot market
         * @see https://coincatch.github.io/github.io/en/spot/#place-order
         * @see https://coincatch.github.io/github.io/en/spot/#place-plan-order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of you want to trade in units of the base currency
         * @param {float} [price] the price that the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {float} [params.cost] *market buy only* the quote quantity that can be used as an alternative for the amount
         * @param {float} [params.triggerPrice] the price that the order is to be triggered at
         * @param {bool} [params.postOnly] if true, the order will only be posted to the order book and not executed immediately
         * @param {string} [params.timeInForce] 'GTC', 'IOC', 'FOK' or 'PO'
         * @param {string} [params.clientOrderId] a unique id for the order (max length 40)
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        params['methodName'] = this.safeString (params, 'methodName', 'createSpotOrder');
        const request: Dict = this.createSpotOrderRequest (symbol, type, side, amount, price, params);
        const isPlanOrer = this.safeString (request, 'triggerPrice') !== undefined;
        let response = undefined;
        if (isPlanOrer) {
            response = await this.privatePostApiSpotV1PlanPlacePlan (request);
        } else {
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725915469815,
            //         "data": {
            //             "orderId": "1217143186968068096",
            //             "clientOrderId": "8fa3eb89-2377-4519-a199-35d5db9ed262"
            //         }
            //     }
            //
            response = await this.privatePostApiSpotV1TradeOrders (request);
        }
        const data = this.safeDict (response, 'data', {});
        const market = this.market (symbol);
        return this.parseOrder (data, market);
    }

    createSpotOrderRequest (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}): Dict {
        /**
         * @method
         * @ignore
         * @name hashkey#createSpotOrderRequest
         * @description helper function to build request
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of you want to trade in units of the base currency
         * @param {float} [price] the price that the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {float} [params.triggerPrice] the price that the order is to be triggered at
         * @param {float} [params.cost] *market buy only* the quote quantity that can be used as an alternative for the amount
         * @param {bool} [params.postOnly] if true, the order will only be posted to the order book and not executed immediately
         * @param {string} [params.timeInForce] 'GTC', 'IOC', 'FOK' or 'PO' (default 'GTC')
         * @param {string} [params.clientOrderId] a unique id for the order (max length 40)
         * @returns {object} request to be sent to the exchange
         */
        let methodName = 'createSpotOrderRequest';
        // spot market info has no presicion so we do not use it
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
            'side': side,
            'orderType': type,
        };
        const isMarketOrder = (type === 'market');
        const timeInForceAndParams = this.handleTimeInForceAndPostOnly (methodName, params, isMarketOrder);
        params = timeInForceAndParams['params'];
        const timeInForce = timeInForceAndParams['timeInForce'];
        let cost: Str = undefined;
        [ cost, params ] = this.handleParamString (params, 'cost');
        let triggerPrice: Str = undefined;
        [ triggerPrice, params ] = this.handleParamString (params, 'triggerPrice');
        const isMarketBuy = isMarketOrder && (side === 'buy');
        if ((!isMarketBuy) && (cost !== undefined)) {
            throw new NotSupported (this.id + ' ' + methodName + ' supports cost parameter for market buy orders only');
        }
        if (isMarketBuy) {
            const costAndParams = this.handleRequiresPriceAndCost (methodName, params, price, amount, cost);
            cost = costAndParams['cost'];
            params = costAndParams['params'];
        }
        if (triggerPrice === undefined) {
            if (type === 'limit') {
                request['price'] = price; // spot markets have no precision
            }
            request['quantity'] = isMarketBuy ? cost : this.numberToString (amount); // spot markets have no precision
            request['force'] = timeInForce ? timeInForce : 'normal'; // the exchange requres force but accepts any value
        } else {
            request['triggerPrice'] = triggerPrice; // spot markets have no precision
            if (timeInForce !== undefined) {
                request['timeInForceValue'] = timeInForce;
            }
            let clientOrderId: Str = undefined;
            [ clientOrderId, params ] = this.handleParamString (params, 'clientOrderId');
            if (clientOrderId !== undefined) {
                request['clientOid'] = clientOrderId;
            }
            if (type === 'limit') {
                request['executePrice'] = price; // spot markets have no precision
            }
            let triggerType: Str = undefined;
            if (isMarketOrder) {
                triggerType = 'market_price';
            } else {
                triggerType = 'fill_price';
            }
            request['triggerType'] = triggerType;
            // tood check placeType
            request['size'] = isMarketOrder ? cost : this.numberToString (amount); // spot markets have no precision
        }
        return this.extend (request, params);
    }

    handleRequiresPriceAndCost (methodName: string, params: Dict = {}, price: Num = undefined, amount: Num = undefined, cost: Str = undefined, side: string = 'buy') {
        const optionName = 'createMarket' + this.capitalize (side) + 'OrderRequiresPrice';
        let requiresPrice = true;
        [ requiresPrice, params ] = this.handleOptionAndParams (params, methodName, optionName, true);
        let amountString: Str = undefined;
        if (amount !== undefined) {
            amountString = this.numberToString (amount);
        }
        let priceString: Str = undefined;
        if (price !== undefined) {
            priceString = this.numberToString (price);
        }
        if (requiresPrice) {
            if ((price === undefined) && (cost === undefined)) {
                throw new InvalidOrder (this.id + ' ' + methodName + '() requires the price argument for market ' + side + ' orders to calculate the total cost to spend (amount * price), alternatively set the ' + optionName + ' option or param to false and pass the cost to spend in the amount argument');
            } else if (cost === undefined) {
                cost = Precise.stringMul (amountString, priceString);
            }
        } else {
            cost = cost ? cost : amountString;
        }
        const result: Dict = {
            'cost': cost,
            'params': params,
        };
        return result;
    }

    handleTimeInForceAndPostOnly (methodName: string, params: Dict = {}, isMarketOrder: Bool = false) {
        let timeInForce: Str = undefined;
        [ timeInForce, params ] = this.handleOptionAndParams (params, methodName, 'timeInForce');
        let postOnly = false;
        [ postOnly, params ] = this.handlePostOnly (isMarketOrder, timeInForce === 'post_only', params);
        if (postOnly) {
            timeInForce = 'PO';
        }
        timeInForce = this.encodeTimeInForce (timeInForce);
        const result: Dict = {
            'timeInForce': timeInForce,
            'params': params,
        };
        return result;
    }

    async createSwapOrder (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}): Promise<Order> {
        /**
         * @method
         * @name coincatch#createSwapOrder
         * @description create a trade order on swap market
         * @see https://coincatch.github.io/github.io/en/mix/#place-order
         * @see https://coincatch.github.io/github.io/en/mix/#place-plan-order
         * @see https://coincatch.github.io/github.io/en/mix/#place-stop-order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of you want to trade in units of the base currency
         * @param {float} [price] the price that the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {bool} [params.postOnly] *non-trigger orders only* if true, the order will only be posted to the order book and not executed immediately
         * @param {bool} [params.reduceOnly] true or false whether the order is reduce only
         * @param {string} [params.timeInForce] *non-trigger orders only* 'GTC', 'FOK', 'IOC' or 'PO'
         * @param {string} [params.clientOrderId] a unique id for the order
         * @param {float} [params.triggerPrice] the price that the order is to be triggered at
         * @param {float} [params.stopLossPrice] The price at which a stop loss order is triggered at
         * @param {float} [params.takeProfitPrice] The price at which a take profit order is triggered at
         * @param {object} [params.takeProfit] *takeProfit object in params* containing the triggerPrice at which the attached take profit order will be triggered (perpetual swap markets only)
         * @param {float} [params.takeProfit.triggerPrice] take profit trigger price
         * @param {object} [params.stopLoss] *stopLoss object in params* containing the triggerPrice at which the attached stop loss order will be triggered (perpetual swap markets only)
         * @param {float} [params.stopLoss.triggerPrice] stop loss trigger price
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        params['methodName'] = this.safeString (params, 'methodName', 'createSwapOrder');
        await this.loadMarkets ();
        const market = this.market (symbol);
        let request = this.createSwapOrderRequest (symbol, type, side, amount, price, params);
        const endpointType = this.safeString (request, 'endpointType');
        request = this.omit (request, 'endpointType');
        let response = undefined;
        if (endpointType === 'trigger') {
            response = await this.privatePostApiMixV1PlanPlacePlan (request);
        } else if (endpointType === 'tpsl') {
            response = await this.privatePostApiMixV1PlanPlaceTPSL (request);
        } else { // standard
            response = await this.privatePostApiMixV1OrderPlaceOrder (request);
        }
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1727977301979,
        //         "data":
        //         {
        //             "clientOid": "1225791137701519360",
        //             "orderId": "1225791137697325056"
        //         }
        //     }
        //
        const data = this.safeDict (response, 'data', {});
        return this.parseOrder (data, market);
    }

    createSwapOrderRequest (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}): Dict {
        /**
         * @method
         * @ignore
         * @name hashkey#createSwapOrderRequest
         * @description helper function to build request
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of you want to trade in units of the base currency
         * @param {float} [price] the price that the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {bool} [params.hedged] default false
         * @param {bool} [params.postOnly] *non-trigger orders only* if true, the order will only be posted to the order book and not executed immediately
         * @param {bool} [params.reduceOnly] true or false whether the order is reduce only
         * @param {string} [params.timeInForce] *non-trigger orders only* 'GTC', 'FOK', 'IOC' or 'PO'
         * @param {string} [params.clientOrderId] a unique id for the order
         * @param {float} [params.triggerPrice] the price that the order is to be triggered at
         * @param {float} [params.stopLossPrice] The price at which a stop loss order is triggered at
         * @param {float} [params.takeProfitPrice] The price at which a take profit order is triggered at
         * @param {object} [params.takeProfit] *takeProfit object in params* containing the triggerPrice at which the attached take profit order will be triggered (perpetual swap markets only)
         * @param {float} [params.takeProfit.triggerPrice] take profit trigger price
         * @param {object} [params.stopLoss] *stopLoss object in params* containing the triggerPrice at which the attached stop loss order will be triggered (perpetual swap markets only)
         * @param {float} [params.stopLoss.triggerPrice] stop loss trigger price
         * @returns {object} request to be sent to the exchange
         */
        let methodName = 'createSwapOrderRequest';
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        const market = this.market (symbol);
        let request: Dict = {
            'symbol': market['id'],
            'marginCoin': market['settleId'],
            'size': this.amountToPrecision (symbol, amount),
        };
        [ request, params ] = this.handleOptionParamsAndRequest (params, methodName, 'clientOrderId', request, 'clientOid');
        const isMarketOrder = (type === 'market');
        params = this.handleTriggerStopLossAndTakeProfit (symbol, side, type, price, methodName, params);
        const endpointType = this.safeString (params, 'endpointType');
        if ((endpointType === undefined) || (endpointType === 'standard')) {
            const timeInForceAndParams = this.handleTimeInForceAndPostOnly (methodName, params, isMarketOrder); // only for non-trigger orders
            params = timeInForceAndParams['params'];
            const timeInForce = timeInForceAndParams['timeInForce'];
            if (timeInForce !== undefined) {
                request['timeInForceValue'] = timeInForce;
            }
            if (price !== undefined) {
                request['price'] = this.priceToPrecision (symbol, price);
            }
        }
        if ((endpointType !== 'tpsl')) {
            request['orderType'] = type;
            let hedged: Bool = false;
            [ hedged, params ] = this.handleOptionAndParams (params, methodName, 'hedged', hedged);
            // hedged and non-hedged orders have different side values and reduceOnly handling
            let reduceOnly: Bool = false;
            [ reduceOnly, params ] = this.handleParamBool (params, 'reduceOnly', reduceOnly);
            if (hedged) {
                if (reduceOnly) {
                    if (side === 'buy') {
                        side = 'close_short';
                    } else if (side === 'sell') {
                        side = 'close_long';
                    }
                } else {
                    if (side === 'buy') {
                        side = 'open_long';
                    } else if (side === 'sell') {
                        side = 'open_short';
                    }
                }
            } else {
                side = side.toLowerCase () + '_single';
            }
            request['side'] = side;
        }
        return this.extend (request, params);
    }

    handleTriggerStopLossAndTakeProfit (symbol, side, type, price, methodName = 'createOrder', params = {}) {
        const request: Dict = {};
        let endpointType = 'standard'; // standard, trigger, tpsl, trailing - to define the endpoint to use
        let stopLossPrice = this.safeString (params, 'stopLossPrice');
        let takeProfitPrice = this.safeString (params, 'takeProfitPrice');
        let requestTriggerPrice: Str = undefined;
        const takeProfitParams = this.safeDict (params, 'takeProfit');
        const stopLossParams = this.safeDict (params, 'stopLoss');
        const triggerPrice = this.safeString2 (params, 'triggerPrice', 'stopPrice');
        const isTrigger = (triggerPrice !== undefined);
        const trailingPercent = this.safeString (params, 'trailingPercent');
        const trailingTriggerPrice = this.safeString (params, 'trailingTriggerPrice');
        let hasTPPrice = (takeProfitPrice !== undefined);
        let hasSLPrice = (stopLossPrice !== undefined);
        const hasTPParams = (takeProfitParams !== undefined);
        if (hasTPParams && !hasTPPrice) {
            takeProfitPrice = this.safeString (takeProfitParams, 'triggerPrice');
            hasTPPrice = (takeProfitPrice !== undefined);
        }
        const hasSLParams = (stopLossParams !== undefined);
        if (hasSLParams && !hasSLPrice) {
            stopLossPrice = this.safeString (stopLossParams, 'triggerPrice');
            hasSLPrice = (stopLossPrice !== undefined);
        }
        const hasBothTPAndSL = hasTPPrice && hasSLPrice;
        const isTrailingPercentOrder = (trailingPercent !== undefined);
        const isMarketOrder = (type === 'market');
        // handle with triggerPrice stopLossPrice and takeProfitPrice
        if (hasBothTPAndSL || isTrigger || (methodName === 'createOrderWithTakeProfitAndStopLoss')) {
            if (isTrigger) {
                if (isMarketOrder) {
                    request['triggerType'] = 'market_price';
                } else {
                    request['triggerType'] = 'fill_price';
                    request['executePrice'] = this.priceToPrecision (symbol, price);
                }
                request['triggerPrice'] = this.priceToPrecision (symbol, triggerPrice);
                endpointType = 'trigger'; // if order also has triggerPrice we use endpoint for trigger orders
            }
            if (methodName === 'createOrders') {
                endpointType = undefined; // we do not provide endpointType for createOrders
            }
            if (hasTPPrice) {
                request['presetTakeProfitPrice'] = takeProfitPrice;
            }
            if (hasSLPrice) {
                request['presetStopLossPrice'] = stopLossPrice;
            }
        } else if (hasTPPrice || hasSLPrice || isTrailingPercentOrder) {
            if (!isMarketOrder) {
                throw new NotSupported (this.id + ' ' + methodName + '() supports does not support ' + type + ' type of stop loss and take profit orders (only market type is supported for stop loss and take profit orders). To create a market order with stop loss or take profit attached use createOrderWithTakeProfitAndStopLoss()');
            }
            endpointType = 'tpsl'; // if order has only one of the two we use endpoint for tpsl orders
            let holdSide = 'long';
            if (side === 'buy') {
                holdSide = 'short';
            }
            request['holdSide'] = holdSide;
            if (isTrailingPercentOrder) {
                if (trailingTriggerPrice === undefined) {
                    throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires the trailingTriggerPrice parameter for trailing stop orders');
                }
                requestTriggerPrice = trailingTriggerPrice;
                request['rangeRate'] = trailingPercent;
                request['planType'] = 'moving_plan';
            } else if (hasTPPrice) { // take profit
                requestTriggerPrice = takeProfitPrice;
                request['planType'] = 'profit_plan';
            } else { // stop loss
                requestTriggerPrice = stopLossPrice;
                request['planType'] = 'loss_plan';
            }
            request['triggerPrice'] = this.priceToPrecision (symbol, requestTriggerPrice);
        }
        if (endpointType !== undefined) {
            request['endpointType'] = endpointType;
        }
        params = this.omit (params, [ 'stopLoss', 'takeProfit', 'stopLossPrice', 'takeProfitPrice', 'triggerPrice', 'stopPrice', 'trailingPercent', 'trailingTriggerPrice' ]);
        return this.extend (request, params);
    }

    async createOrderWithTakeProfitAndStopLoss (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, takeProfit: Num = undefined, stopLoss: Num = undefined, params = {}): Promise<Order> {
        /**
         * @method
         * @name coincatch#createOrderWithTakeProfitAndStopLoss
         * @description *swap markets only* create an order with a stop loss or take profit attached (type 3)
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much you want to trade in units of the base currency or the number of contracts
         * @param {float} [price] the price to fulfill the order, in units of the quote currency, ignored in market orders
         * @param {float} [takeProfit] the take profit price, in units of the quote currency
         * @param {float} [stopLoss] the stop loss price, in units of the quote currency
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const methodName = 'createOrderWithTakeProfitAndStopLoss';
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (!market['swap']) {
            throw new NotSupported (this.id + ' ' + methodName + '() is supported for swap markets only');
        }
        params['methodName'] = methodName;
        return super.createOrderWithTakeProfitAndStopLoss (symbol, type, side, amount, price, takeProfit, stopLoss, params);
    }

    encodeTimeInForce (timeInForce: Str): Str {
        const timeInForceMap = {
            'GTC': 'normal',
            'IOC': 'iok',
            'FOK': 'fok',
            'PO': 'post_only',
        };
        return this.safeString (timeInForceMap, timeInForce, timeInForce);
    }

    async createOrders (orders: OrderRequest[], params = {}) {
        /**
         * @method
         * @name coincatch#createOrders
         * @description create a list of trade orders (all orders should be of the same symbol)
         * @see https://hashkeyglobal-apidoc.readme.io/reference/create-multiple-orders
         * @see https://hashkeyglobal-apidoc.readme.io/reference/batch-create-new-futures-order
         * @param {Array} orders list of orders to create, each object should contain the parameters required by createOrder, namely symbol, type, side, amount, price and params (max 50 entries)
         * @param {object} [params] extra parameters specific to the api endpoint
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        // same symbol for all orders
        const methodName = 'createOrders';
        params['methodName'] = methodName;
        const ordersRequests = [];
        let symbols = [];
        for (let i = 0; i < orders.length; i++) {
            const rawOrder = orders[i];
            const symbol = this.safeString (rawOrder, 'symbol');
            symbols.push (symbol);
            const type = this.safeString (rawOrder, 'type');
            const side = this.safeString (rawOrder, 'side');
            const amount = this.safeNumber (rawOrder, 'amount');
            const price = this.safeNumber (rawOrder, 'price');
            const orderParams = this.safeDict (rawOrder, 'params', {});
            const orderRequest = this.createOrderRequest (symbol, type, side, amount, price, orderParams);
            const triggerPrice = this.safeString (orderParams, 'triggerPrice');
            if (triggerPrice !== undefined) {
                throw new NotSupported (this.id + ' ' + methodName + '() does not support trigger orders');
            }
            const clientOrderId = this.safeString (orderRequest, 'clientOrderId');
            if (clientOrderId === undefined) {
                orderRequest['clientOrderId'] = this.uuid (); // both spot and swap endpoints require clientOrderId
            }
            ordersRequests.push (orderRequest);
        }
        symbols = this.unique (symbols);
        const symbolsLength = symbols.length;
        if (symbolsLength !== 1) {
            throw new BadRequest (this.id + ' createOrders() requires all orders to be of the same symbol');
        }
        const ordersSymbol = this.safeString (symbols, 0);
        const market = this.market (ordersSymbol);
        const request: Dict = {
            'symbol': market['id'],
        };
        const marketType = market['type'];
        let response = undefined;
        let responseOrders = undefined;
        let propertyName: Str = undefined;
        if (marketType === 'spot') {
            request['orderList'] = ordersRequests;
            response = await this.privatePostApiSpotV1TradeBatchOrders (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1726160718706,
            //         "data": {
            //             "resultList": [
            //                 {
            //                     "orderId": "1218171835238367232",
            //                     "clientOrderId": "28759338-ca10-42dd-8ac3-5183785ef60b"
            //                 }
            //             ],
            //             "failure": [
            //                 {
            //                     "orderId": "",
            //                     "clientOrderId": "ee2e67c9-47fc-4311-9cc1-737ec408d509",
            //                     "errorMsg": "The order price of eth_usdt cannot be less than 5.00% of the current price",
            //                     "errorCode": "43008"
            //                 },
            //                 {
            //                     "orderId": "",
            //                     "clientOrderId": "1af2defa-0c2d-4bb5-acb7-6feb6a86787a",
            //                     "errorMsg": "less than the minimum amount 1 USDT",
            //                     "errorCode": "45110"
            //                 }
            //             ]
            //         }
            //     }
            //
            propertyName = 'resultList';
        } else if (market['swap']) {
            request['marginCoin'] = market['settleId'];
            request['orderDataList'] = ordersRequests;
            response = await this.privatePostApiMixV1OrderBatchOrders (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1729100084017,
            //         "data": {
            //             "orderInfo": [
            //                 {
            //                     "orderId": "1230500426827522049",
            //                     "clientOid": "1230500426898825216"
            //                 }
            //             ],
            //             "failure": [
            //                 {
            //                     "orderId": "",
            //                     "clientOid": null,
            //                     "errorMsg": "The order price exceeds the maximum price limit: 2,642.53",
            //                     "errorCode": "22047"
            //                 }
            //             ],
            //             "result": true
            //         }
            //     }
            //
            propertyName = 'orderInfo';
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
        const data = this.safeDict (response, 'data', {});
        responseOrders = this.safeList (data, propertyName, []);
        return this.parseOrders (responseOrders);
    }

    createOrderRequest (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}): Dict {
        const methodName = this.safeString (params, 'methodName', 'createOrderRequest');
        params['methodName'] = methodName;
        const market = this.market (symbol);
        if (market['spot']) {
            return this.createSpotOrderRequest (symbol, type, side, amount, price, params);
        } else if (market['swap']) {
            return this.createSwapOrderRequest (symbol, type, side, amount, price, params);
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + market['type'] + ' type of markets');
        }
    }

    async editOrder (id: string, symbol: string, type:OrderType, side: OrderSide, amount: Num = undefined, price: Num = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#editOrder
         * @description edit a trade trigger, stop-looss or take-profit order
         * @see https://coincatch.github.io/github.io/en/spot/#modify-plan-order
         * @param {string} id order id
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const methodName = 'editOrder';
        // only trigger, stop-looss or take-profit orders can be edited
        params['methodName'] = methodName;
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (market['spot']) {
            return await this.editSpotOrder (id, symbol, type, side, amount, price, params);
        } else {
            // todo return await this.editSwapOrder (id, symbol, type, side, amount, price, params);
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + market['type'] + ' type of markets');
        }
    }

    async editSpotOrder (id: string, symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#editSpotOrder
         * @ignore
         * @description edit a trade order
         * @see https://coincatch.github.io/github.io/en/spot/#modify-plan-order
         * @param {string} id order id
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.clientOrderId] a unique id for the order that can be used as an alternative for the id
         * @param {string} params.triggerPrice *mandatory* the price that the order is to be triggered at
         * @param {float} [params.cost] *market buy only* the quote quantity that can be used as an alternative for the amount
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        let methodName = 'editSpotOrder';
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        const market = this.market (symbol);
        if (!market['spot']) {
            throw new NotSupported (this.id + ' editSpotOrder() does not support ' + market['type'] + ' orders');
        }
        const request: Dict = {
            'orderType': type,
        };
        const clientOrderId = this.safeString (params, 'clientOrderId');
        if (clientOrderId !== undefined) {
            request['clientOid'] = clientOrderId;
        } else if (id === undefined) {
            throw new BadRequest (this.id + ' ' + methodName + '() requires id or clientOrderId');
        } else {
            request['orderId'] = id;
        }
        let cost: Str = undefined;
        [ cost, params ] = this.handleParamString (params, 'cost');
        const isMarketBuy = (type === 'market') && (side === 'buy');
        if ((!isMarketBuy) && (cost !== undefined)) {
            throw new NotSupported (this.id + ' ' + methodName + '() supports cost parameter for market buy orders only');
        }
        if (amount !== undefined) {
            if (isMarketBuy) {
                const costAndParams = this.handleRequiresPriceAndCost (methodName, params, price, amount, cost);
                cost = costAndParams['cost'];
                params = costAndParams['params'];
            } else {
                request['size'] = this.numberToString (amount); // spot markets have no precision
            }
        }
        if (cost !== undefined) {
            request['size'] = cost; // spot markets have no precision
        }
        if ((type === 'limit') && (price !== undefined)) {
            request['price'] = price; // spot markets have no precision
        }
        const response = await this.privatePostApiSpotV1PlanModifyPlan (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1668136575920,
        //         "data": {
        //             "orderId": "974792060738441216",
        //             "clientOrderId": "974792554995224576"
        //         }
        //     }
        //
        const data = this.safeDict (response, 'data', {});
        return this.parseOrder (data, market);
    }

    async fetchOrder (id: string, symbol: Str = undefined, params = {}): Promise<Order> {
        /**
         * @method
         * @name coincatch#fetchOrder
         * @description fetches information on an order made by the user (non-trigger orders only)
         * @see https://coincatch.github.io/github.io/en/spot/#get-order-details
         * @see https://coincatch.github.io/github.io/en/mix/#get-order-details
         * @param {string} id the order id
         * @param {string} symbol unified symbol of the market the order was made in (is mandatory for swap)
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.type] 'spot' or 'swap' - the type of the market to fetch entry for (default 'spot')
         * @param {string} [params.clientOrderId] a unique id for the order that can be used as an alternative for the id
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const methodName = 'fetchOrder';
        // for non-trigger orders only
        await this.loadMarkets ();
        const request: Dict = {};
        const clientOrderId = this.safeString (params, 'clientOrderId');
        if (clientOrderId === undefined) {
            request['orderId'] = id;
        }
        let market: Market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
        }
        let marketType = 'spot';
        [ marketType, params ] = this.handleMarketTypeAndParams (methodName, market, params, marketType);
        let response = undefined;
        let order: Dict = undefined;
        if (marketType === 'spot') {
            // user could query cancelled/filled order details within 24 hours, After 24 hours should use fetchOrders
            response = await this.privatePostApiSpotV1TradeOrderInfo (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725918004434,
            //         "data": [
            //             {
            //                 "accountId": "1002820815393",
            //                 "symbol": "ETHUSDT_SPBL",
            //                 "orderId": "1217143186968068096",
            //                 "clientOrderId": "8fa3eb89-2377-4519-a199-35d5db9ed262",
            //                 "price": "0",
            //                 "quantity": "10.0000000000000000",
            //                 "orderType": "market",
            //                 "side": "buy",
            //                 "status": "full_fill",
            //                 "fillPrice": "2340.5500000000000000",
            //                 "fillQuantity": "0.0042000000000000",
            //                 "fillTotalAmount": "9.8303100000000000",
            //                 "enterPointSource": "API",
            //                 "feeDetail": "{
            //                     \"ETH\": {
            //                         \"deduction\": false,
            //                         \"feeCoinCode\": \"ETH\",
            //                         \"totalDeductionFee\": 0,
            //                         \"totalFee\": -0.0000042000000000},
            //                         \"newFees\": {
            //                         \"c\": 0,
            //                         \"d\": 0,
            //                         \"deduction\": false,
            //                         \"r\": -0.0000042,
            //                         \"t\": -0.0000042,
            //                         \"totalDeductionFee\": 0
            //                     }
            //                 }",
            //                 "orderSource": "market",
            //                 "cTime": "1725915469877"
            //             }
            //         ]
            //     }
            //
            let data = this.safeList (response, 'data');
            if (data === undefined) {
                response = JSON.parse (response); // the response from closed orders is not a standard JSON
                data = this.safeList (response, 'data', []);
            }
            order = this.safeDict (data, 0, {});
        } else if (marketType === 'swap') {
            if (market === undefined) {
                throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires a symbol argument for ' + marketType + ' type of markets');
            }
            request['symbol'] = market['id'];
            if (clientOrderId !== undefined) {
                params = this.omit (params, 'clientOrderId');
                request['clientOid'] = clientOrderId;
            }
            response = await this.privateGetApiMixV1OrderDetail (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1727981421364,
            //         "data": {
            //             "symbol": "ETHUSDT_UMCBL",
            //             "size": 0.01,
            //             "orderId": "1225791137697325056",
            //             "clientOid": "1225791137701519360",
            //             "filledQty": 0.01,
            //             "fee": -0.01398864,
            //             "price": null,
            //             "priceAvg": 2331.44,
            //             "state": "filled",
            //             "side": "close_long",
            //             "timeInForce": "normal",
            //             "totalProfits": -2.23680000,
            //             "posSide": "long",
            //             "marginCoin": "USDT",
            //             "filledAmount": 23.3144,
            //             "orderType": "market",
            //             "leverage": "5",
            //             "marginMode": "crossed",
            //             "reduceOnly": true,
            //             "enterPointSource": "API",
            //             "tradeSide": "close_long",
            //             "holdMode": "double_hold",
            //             "orderSource": "market",
            //             "cTime": "1727977302003",
            //             "uTime": "1727977303604"
            //         }
            //     }
            //
            order = this.safeDict (response, 'data', {});
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
        return this.parseOrder (order, market);
    }

    async fetchOpenOrders (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        /**
         * @method
         * @name coincatch#fetchOpenOrders
         * @description fetch all unfilled currently open orders
         * @see https://coincatch.github.io/github.io/en/spot/#get-order-list
         * @see https://coincatch.github.io/github.io/en/spot/#get-current-plan-orders
         * @see https://coincatch.github.io/github.io/en/mix/#get-open-order
         * @see https://coincatch.github.io/github.io/en/mix/#get-all-open-order
         * @see https://coincatch.github.io/github.io/en/mix/#get-plan-order-tpsl-list
         * @param {string} [symbol] unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.trigger] true if fetching trigger orders (default false)
         * @param {string} [params.type] 'spot' or 'swap' - the type of the market to fetch entries for (default 'spot')
         * @param {string} [params.productType] *swap only* 'umcbl' or 'dmcbl' - the product type of the market to fetch entries for (default 'umcbl')
         * @param {string} [params.marginCoin] *swap only* the margin coin of the market to fetch entries for
         * @param {string} [params.isPlan] *swap trigger only* 'plan' or 'profit_loss' ('plan' (default) for trigger (plan) orders, 'profit_loss' for stop-loss and take-profit orders)
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const methodName = 'fetchOpenOrders';
        await this.loadMarkets ();
        let market: Market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
        }
        let marketType = 'spot';
        [ marketType, params ] = this.handleMarketTypeAndParams (methodName, market, params, marketType);
        params['methodName'] = methodName;
        if (marketType === 'spot') {
            return await this.fetchOpenSpotOrders (symbol, since, limit, params);
        } else if (marketType === 'swap') {
            return await this.fetchOpenSwapOrders (symbol, since, limit, params);
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
    }

    async fetchOpenSpotOrders (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        /**
         * @method
         * @ignore
         * @name coincatch#fetchOpenSpotOrders
         * @description fetch all unfilled currently open orders for spot markets
         * @see https://coincatch.github.io/github.io/en/spot/#get-order-list
         * @see https://coincatch.github.io/github.io/en/spot/#get-current-plan-orders
         * @param {string} [symbol] unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.trigger] true if fetching trigger orders (default false)
         * @param {string} [params.lastEndId] *for trigger orders only* the last order id to fetch entries after
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        let methodName = 'fetchOpenSpotOrders';
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        const request: Dict = {};
        let market: Market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['symbol'] = market['id'];
        }
        let isTrigger = false;
        [ isTrigger, params ] = this.handleOptionAndParams2 (params, methodName, 'trigger', 'stop', isTrigger);
        let result = undefined;
        if (isTrigger) {
            if (symbol === undefined) {
                throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires a symbol argument for trigger orders');
            }
            if (limit !== undefined) {
                request['pageSize'] = limit;
            }
            const response = await this.privatePostApiSpotV1PlanCurrentPlan (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1728664710749,
            //         "data": {
            //             "nextFlag": false,
            //             "endId": 1228661660806787072,
            //             "orderList": [
            //                 {
            //                     "orderId": "1228669617606991872",
            //                     "clientOid": "1228669617573437440",
            //                     "symbol": "ETHUSDT_SPBL",
            //                     "size": "50",
            //                     "executePrice": "0",
            //                     "triggerPrice": "4000",
            //                     "status": "not_trigger",
            //                     "orderType": "market",
            //                     "side": "sell",
            //                     "triggerType": "fill_price",
            //                     "enterPointSource": "API",
            //                     "placeType": null,
            //                     "cTime": "1728663585092",
            //                     "uTime": null
            //                 },
            //             ]
            //         }
            //     }
            //
            const data = this.safeDict (response, 'data', {});
            result = this.safeList (data, 'orderList', []);
        } else {
            const response = await this.privatePostApiSpotV1TradeOpenOrders (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725965783430,
            //         "data": [
            //             {
            //                 "accountId": "1002820815393",
            //                 "symbol": "ETHUSDT_SPBL",
            //                 "orderId": "1217347655911653376",
            //                 "clientOrderId": "c57c07d1-bd00-4167-95e2-9b22a55fbc28",
            //                 "price": "2000.0000000000000000",
            //                 "quantity": "0.0010000000000000",
            //                 "orderType": "limit",
            //                 "side": "buy",
            //                 "status": "new",
            //                 "fillPrice": "0",
            //                 "fillQuantity": "0.0000000000000000",
            //                 "fillTotalAmount": "0.0000000000000000",
            //                 "enterPointSource": "API",
            //                 "feeDetail": "",
            //                 "orderSource": "normal",
            //                 "cTime": "1725964219072"
            //             },
            //             ...
            //         ]
            //     }
            //
            result = this.safeList (response, 'data', []);
        }
        return this.parseOrders (result, market, since, limit);
    }

    async fetchOpenSwapOrders (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        /**
         * @method
         * @ignore
         * @name coincatch#fetchOpenSwapOrders
         * @description fetch all unfilled currently open orders for swap markets
         * @see https://coincatch.github.io/github.io/en/mix/#get-open-order
         * @see https://coincatch.github.io/github.io/en/mix/#get-all-open-order
         * @see https://coincatch.github.io/github.io/en/mix/#get-plan-order-tpsl-list
         * @param {string} [symbol] unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {boolean} [params.trigger] true if fetching trigger orders (default false)
         * @param {string} [params.isPlan] 'plan' or 'profit_loss' ('plan' (default) for trigger (plan) orders, 'profit_loss' for stop-loss and take-profit orders)
         * @param {string} [params.productType] 'umcbl' or 'dmcbl' - the product type of the market to fetch entries for (default 'umcbl')
         * @param {string} [params.marginCoin] the margin coin of the market to fetch entries for
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        let methodName = 'fetchOpenSwapOrders';
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        let isTrigger = false;
        [ isTrigger, params ] = this.handleOptionAndParams2 (params, methodName, 'trigger', 'stop', isTrigger);
        let plan: Str = undefined;
        [ plan, params ] = this.handleOptionAndParams (params, methodName, 'isPlan', plan);
        let productType = this.handleOption (methodName, 'productType');
        let market: Market = undefined;
        let response = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            const request: Dict = {
                'symbol': market['id'],
            };
            if ((isTrigger) || (plan !== undefined)) { // the same endpoint is used for trigger and stop-loss/take-profit orders
                if (productType !== undefined) {
                    request['productType'] = productType;
                }
                if (plan !== undefined) {
                    request['isPlan'] = plan; // current param is used to define the type of the orders to fetch (trigger or stop-loss/take-profit)
                }
                //
                //     {
                //         "code": "00000",
                //         "msg": "success",
                //         "requestTime": 1729168682690,
                //         "data": [
                //             {
                //                 "orderId": "1230779428914049025",
                //                 "clientOid": "1230779428914049024",
                //                 "symbol": "ETHUSDT_UMCBL",
                //                 "marginCoin": "USDT",
                //                 "size": "0.01",
                //                 "executePrice": "1000",
                //                 "triggerPrice": "1200",
                //                 "status": "not_trigger",
                //                 "orderType": "limit",
                //                 "planType": "normal_plan",
                //                 "side": "buy_single",
                //                 "triggerType": "fill_price",
                //                 "presetTakeProfitPrice": "4000",
                //                 "presetTakeLossPrice": "900",
                //                 "rangeRate": "",
                //                 "enterPointSource": "API",
                //                 "tradeSide": "buy_single",
                //                 "holdMode": "single_hold",
                //                 "reduceOnly": false,
                //                 "cTime": "1729166603306",
                //                 "uTime": null
                //             }
                //         ]
                //     }
                //
                response = await this.privateGetApiMixV1PlanCurrentPlan (this.extend (request, params));
            } else {
                response = await this.privateGetApiMixV1OrderCurrent (this.extend (request, params));
            }
        } else if (isTrigger) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires a symbol argument for swap trigger orders');
        } else {
            if (productType === undefined) {
                productType = 'umcbl';
            }
            const request: Dict = {
                'productType': productType, // is mandatory for current endpoint (all open non-trigger orders)
            };
            let marginCoin: Str = undefined;
            marginCoin = this.handleOption (methodName, 'marginCoin', marginCoin);
            if (marginCoin !== undefined) {
                request['marginCoin'] = marginCoin;
            }
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1728127869097,
            //         "data": [
            //             {
            //                 "symbol": "ETHUSDT_UMCBL",
            //                 "size": 0.02,
            //                 "orderId": "1226422495431974913",
            //                 "clientOid": "1226422495457140736",
            //                 "filledQty": 0.00,
            //                 "fee": 0E-8,
            //                 "price": 500.00,
            //                 "state": "new",
            //                 "side": "buy_single",
            //                 "timeInForce": "normal",
            //                 "totalProfits": 0E-8,
            //                 "posSide": "long",
            //                 "marginCoin": "USDT",
            //                 "filledAmount": 0.0000,
            //                 "orderType": "limit",
            //                 "leverage": "5",
            //                 "marginMode": "crossed",
            //                 "reduceOnly": false,
            //                 "enterPointSource": "API",
            //                 "tradeSide": "buy_single",
            //                 "holdMode": "single_hold",
            //                 "orderSource": "normal",
            //                 "cTime": "1728127829422",
            //                 "uTime": "1728127830980"
            //             }
            //         ]
            //     }
            //
            response = await this.privateGetApiMixV1OrderMarginCoinCurrent (this.extend (request, params));
        }
        const data = this.safeList (response, 'data', []);
        return this.parseOrders (data, market, since, limit);
    }

    async fetchCanceledAndClosedOrders (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        /**
         * @method
         * @name coincatch#fetchCanceledAndClosedOrders
         * @description fetches information on multiple canceled and closed orders made by the user
         * @see https://coincatch.github.io/github.io/en/spot/#get-order-list
         * @see https://coincatch.github.io/github.io/en/spot/#get-history-plan-orders
         * @see https://coincatch.github.io/github.io/en/mix/#get-history-orders
         * @see https://coincatch.github.io/github.io/en/mix/#get-producttype-history-orders
         * @see https://coincatch.github.io/github.io/en/mix/#get-history-plan-orders-tpsl
         * @param {string} symbol *is mandatory* unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] the latest time in ms to fetch orders for
         * @param {boolean} [params.trigger] true if fetching trigger orders (default false)
         * @param {string} [params.isPlan] *swap only* 'plan' or 'profit_loss' ('plan' (default) for trigger (plan) orders, 'profit_loss' for stop-loss and take-profit orders)
         * @param {string} [params.type] 'spot' or 'swap' - the type of the market to fetch entries for (default 'spot')
         * @param {string} [params.productType] *swap only* 'umcbl' or 'dmcbl' - the product type of the market to fetch entries for (default 'umcbl')
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const methodName = 'fetchCanceledAndClosedOrders';
        await this.loadMarkets ();
        let market: Market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
        }
        let marketType = 'spot';
        [ marketType, params ] = this.handleMarketTypeAndParams (methodName, market, params, marketType);
        params['methodName'] = methodName;
        if (marketType === 'spot') {
            return await this.fetchCanceledAndClosedSpotOrders (symbol, since, limit, params);
        } else if (marketType === 'swap') {
            return await this.fetchCanceledAndClosedSwapOrders (symbol, since, limit, params);
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
    }

    async fetchCanceledAndClosedSpotOrders (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        /**
         * @method
         * @ignore
         * @name coincatch#fetchCanceledAndClosedSpotOrders
         * @description fetches information on multiple canceled and closed orders made by the user on spot markets
         * @see https://coincatch.github.io/github.io/en/spot/#get-order-history
         * @see https://coincatch.github.io/github.io/en/spot/#get-history-plan-orders
         * @param {string} symbol *is mandatory* unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] *for trigger orders only* the latest time in ms to fetch orders for
         * @param {boolean} [params.trigger] true if fetching trigger orders (default false)
         * @param {string} [params.lastEndId] *for trigger orders only* the last order id to fetch entries after
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        let methodName = 'fetchCanceledAndClosedSpotOrders';
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + ' () requires a symbol argument for spot markets');
        }
        const maxLimit = 500;
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
        };
        let requestLimit = limit;
        let isTrigger = false;
        [ isTrigger, params ] = this.handleOptionAndParams2 (params, methodName, 'trigger', 'stop', isTrigger);
        let result = undefined;
        if (isTrigger) {
            let until: Int = undefined;
            [ until, params ] = this.handleOptionAndParams (params, methodName, 'until', until);
            // const now = this.milliseconds ();
            let requestSince = since;
            const interval = 90 * 24 * 60 * 60 * 1000; // startTime and endTime interval cannot be greater than 90 days
            const now = this.milliseconds ();
            // both since and until are required for trigger orders
            if ((until === undefined) && (requestSince === undefined)) {
                requestSince = now - interval;
                until = now;
            } else if (until !== undefined) {
                requestSince = until - interval;
            } else { // if since is defined
                until = since + interval;
            }
            request['startTime'] = requestSince;
            request['endTime'] = until;
            if (requestLimit === undefined) {
                requestLimit = maxLimit;
            }
            request['pageSize'] = requestLimit;
            const response = await this.privatePostApiSpotV1PlanHistoryPlan (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1728668998002,
            //         "data": {
            //             "nextFlag": false,
            //             "endId": 1228669617606991872,
            //             "orderList": [
            //                 {
            //                     "orderId": "1228669617606991872",
            //                     "clientOid": "1228669617573437440",
            //                     "symbol": "ETHUSDT_SPBL",
            //                     "size": "50",
            //                     "executePrice": "0",
            //                     "triggerPrice": "4000",
            //                     "status": "cancel",
            //                     "orderType": "market",
            //                     "side": "sell",
            //                     "triggerType": "fill_price",
            //                     "enterPointSource": "API",
            //                     "placeType": null,
            //                     "cTime": "1728663585092",
            //                     "uTime": "1728666719223"
            //                 }
            //             ]
            //         }
            //     }
            //
            const data = this.safeDict (response, 'data', {});
            result = this.safeList (data, 'orderList', []);
        } else {
            if (since !== undefined) {
                request['after'] = since;
                requestLimit = maxLimit;
            }
            if (requestLimit !== undefined) {
                request['limit'] = requestLimit;
            }
            const response = await this.privatePostApiSpotV1TradeHistory (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725963777690,
            //         "data": [
            //             {
            //                 "accountId": "1002820815393",
            //                 "symbol": "ETHUSDT_SPBL",
            //                 "orderId": "1217143186968068096",
            //                 "clientOrderId": "8fa3eb89-2377-4519-a199-35d5db9ed262",
            //                 "price": "0",
            //                 "quantity": "10.0000000000000000",
            //                 "orderType": "market",
            //                 "side": "buy",
            //                 "status": "full_fill",
            //                 "fillPrice": "2340.5500000000000000",
            //                 "fillQuantity": "0.0042000000000000",
            //                 "fillTotalAmount": "9.8303100000000000",
            //                 "enterPointSource": "API",
            //                 "feeDetail": "{
            //                     \"ETH\": {
            //                         \"deduction\": false,
            //                         \"feeCoinCode\": \"ETH\",
            //                         \"totalDeductionFee\": 0,
            //                         \"totalFee\": -0.0000042000000000
            //                     },
            //                     \"newFees\": {
            //                         \"c\": 0,
            //                         \"d\": 0,
            //                         \"deduction\": false,
            //                         \"r\": -0.0000042,
            //                         \"t\": -0.0000042,
            //                         \"totalDeductionFee\": 0
            //                     }
            //                 }",
            //                 "orderSource": "market",
            //                 "cTime": "1725915469877"
            //             },
            //             ...
            //         ]
            //     }
            //
            const parsedResponse = JSON.parse (response); // the response is not a standard JSON
            result = this.safeList (parsedResponse, 'data', []);
        }
        return this.parseOrders (result, market, since, limit);
    }

    async fetchCanceledAndClosedSwapOrders (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        /**
         * @method
         * @ignore
         * @name coincatch#fetchCanceledAndClosedSwapOrders
         * @description fetches information on multiple canceled and closed orders made by the user on swap markets
         * @see https://coincatch.github.io/github.io/en/mix/#get-history-orders
         * @see https://coincatch.github.io/github.io/en/mix/#get-producttype-history-orders
         * @see https://coincatch.github.io/github.io/en/mix/#get-history-plan-orders-tpsl
         * @param {string} [symbol] unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of order structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] the latest time in ms to fetch orders for
         * @param {boolean} [params.trigger] true if fetching trigger orders (default false)
         * @param {string} [params.isPlan] *swap only* 'plan' or 'profit_loss' ('plan' (default) for trigger (plan) orders, 'profit_loss' for stop-loss and take-profit orders)
         * @param {string} [params.productType] *swap only* 'umcbl' or 'dmcbl' - the product type of the market to fetch entries for (default 'umcbl')
         * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        let methodName = 'fetchCanceledAndClosedSwapOrders';
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        let requestSince = since;
        let until: Int = undefined;
        [ until, params ] = this.handleOptionAndParams (params, methodName, 'until', until);
        const now = this.milliseconds ();
        // since and until are mandatory
        // they should be within 90 days interval
        const interval = 90 * 24 * 60 * 60 * 1000;
        if ((until === undefined) && (requestSince === undefined)) {
            requestSince = now - interval;
            until = now;
        } else if (until !== undefined) {
            requestSince = until - interval;
        } else { // if since is defined
            until = since + interval;
        }
        const request: Dict = {
            'startTime': requestSince,
            'endTime': until,
        };
        if (limit !== undefined) {
            request['pageSize'] = limit;
        }
        let market: Market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['symbol'] = market['id'];
        }
        let productType = this.handleOption (methodName, 'productType');
        let isTrigger = false;
        [ isTrigger, params ] = this.handleOptionAndParams2 (params, methodName, 'trigger', 'stop', isTrigger);
        let plan: Str = undefined;
        [ plan, params ] = this.handleOptionAndParams (params, methodName, 'isPlan', plan);
        let response = undefined;
        let result = undefined;
        if ((isTrigger) || (plan !== undefined)) {
            if (plan !== undefined) {
                request['isPlan'] = plan;
            }
            if (productType !== undefined) {
                request['productType'] = productType;
            }
            response = await this.privateGetApiMixV1PlanHistoryPlan (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1729174716526,
            //         "data": [
            //             {
            //                 "orderId": "1230763430987104257",
            //                 "clientOid": "1230763431003881472",
            //                 "executeOrderId": "",
            //                 "symbol": "ETHUSDT_UMCBL",
            //                 "marginCoin": "USDT",
            //                 "size": "0.03",
            //                 "executePrice": "0",
            //                 "triggerPrice": "2000",
            //                 "status": "cancel",
            //                 "orderType": "market",
            //                 "planType": "loss_plan",
            //                 "side": "sell_single",
            //                 "triggerType": "fill_price",
            //                 "presetTakeProfitPrice": "0",
            //                 "presetTakeLossPrice": "0",
            //                 "rangeRate": null,
            //                 "enterPointSource": "SYS",
            //                 "tradeSide": "sell_single",
            //                 "holdMode": "single_hold",
            //                 "reduceOnly": true,
            //                 "executeTime": "1729173770776",
            //                 "executeSize": "0",
            //                 "cTime": "1729162789103",
            //                 "uTime": "1729173770776"
            //             }
            //         ]
            //     }
            //
            result = this.safeList (response, 'data', []);
        } else {
            if (symbol !== undefined) {
                market = this.market (symbol);
                request['symbol'] = market['id'];
                response = await this.privateGetApiMixV1OrderHistory (this.extend (request, params));
            } else {
                if (productType === undefined) {
                    productType = 'umcbl'; // is mandatory for current endpoint
                }
                request['productType'] = productType;
                response = await this.privateGetApiMixV1OrderHistoryProductType (this.extend (request, params));
            }
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1728129807637,
            //         "data": {
            //             "nextFlag": false,
            //             "endId": "1221413696648339457",
            //             "orderList": [
            //                 {
            //                     "symbol": "ETHUSD_DMCBL",
            //                     "size": 0.1,
            //                     "orderId": "1225467075288719360",
            //                     "clientOid": "1225467075288719361",
            //                     "filledQty": 0.1,
            //                     "fee": -0.00005996,
            //                     "price": null,
            //                     "priceAvg": 2362.03,
            //                     "state": "filled",
            //                     "side": "burst_close_long",
            //                     "timeInForce": "normal",
            //                     "totalProfits": -0.00833590,
            //                     "posSide": "long",
            //                     "marginCoin": "ETH",
            //                     "filledAmount": 236.20300000,
            //                     "orderType": "market",
            //                     "leverage": "12",
            //                     "marginMode": "fixed",
            //                     "reduceOnly": true,
            //                     "enterPointSource": "SYS",
            //                     "tradeSide": "burst_close_long",
            //                     "holdMode": "double_hold",
            //                     "orderSource": "market",
            //                     "cTime": "1727900039503",
            //                     "uTime": "1727900039576"
            //                 }
            //             ]
            //         }
            //     }
            //
            const data = this.safeDict (response, 'data', {});
            result = this.safeList (data, 'orderList', []);
        }
        return this.parseOrders (result, market);
    }

    async cancelOrder (id: string, symbol: Str = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#cancelOrder
         * @description cancels an open order
         * @see https://coincatch.github.io/github.io/en/spot/#cancel-order-v2
         * @see https://coincatch.github.io/github.io/en/spot/#cancel-plan-order
         * @see https://coincatch.github.io/github.io/en/mix/#cancel-order
         * @see https://coincatch.github.io/github.io/en/mix/#cancel-plan-order-tpsl
         * @param {string} id order id
         * @param {string} symbol unified symbol of the market the order was made in
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.clientOrderId] a unique id for the order that can be used as an alternative for the id
         * @param {bool} [params.trigger] true for canceling a trigger order (default false)
         * @param {bool} [params.stop] *swap only* an alternative for trigger param
         * @param {string} [params.planType] *swap trigger only* the type of the plan order to cancel: 'profit_plan' - profit order, 'loss_plan' - loss order, 'normal_plan' - plan order, 'pos_profit' - position profit, 'pos_loss' - position loss, 'moving_plan' - Trailing TP/SL, 'track_plan' - Trailing Stop
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const methodName = 'cancelOrder';
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + ' () requires a symbol argument');
        }
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {};
        let clientOrderId: Str = undefined;
        [ clientOrderId, params ] = this.handleParamString (params, 'clientOrderId');
        if ((id === undefined) && (clientOrderId === undefined)) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + ' () requires an id argument or clientOrderId parameter');
        }
        if (clientOrderId !== undefined) {
            request['clientOid'] = clientOrderId;
        } else {
            request['orderId'] = id;
        }
        const marketType = market['type'];
        let trigger = false;
        [ trigger, params ] = this.handleOptionAndParams2 (params, methodName, 'trigger', 'stop', trigger);
        let response = undefined;
        if (!trigger || (marketType !== 'spot')) {
            request['symbol'] = market['id'];
        }
        if (marketType === 'spot') {
            if (trigger) {
                response = await this.privatePostApiSpotV1PlanCancelPlan (this.extend (request, params));
            } else {
                response = await this.privatePostApiSpotV1TradeCancelOrderV2 (this.extend (request, params));
            }
        } else if (marketType === 'swap') {
            let planType: Str = undefined;
            [ planType, params ] = this.handleOptionAndParams (params, methodName, 'planType', planType);
            request['marginCoin'] = market['settleId'];
            if ((trigger) || (planType !== undefined)) {
                if (planType === undefined) {
                    throw new ArgumentsRequired (this.id + ' ' + methodName + ' () requires a planType parameter for swap trigger orders ("profit_plan" - profit order, "loss_plan" - loss order, "normal_plan" - plan order, "pos_profit" - position profit, "pos_loss" - position loss, "moving_plan" - Trailing TP/SL, "track_plan" - Trailing Stop)');
                }
                request['planType'] = planType;
                response = await this.privatePostApiMixV1PlanCancelPlan (this.extend (request, params));
            } else {
                response = await this.privatePostApiMixV1OrderCancelOrder (this.extend (request, params));
            }
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
        const data = this.safeDict (response, 'data', {});
        return this.parseOrder (data, market);
    }

    async cancelAllOrders (symbol: Str = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#cancelAllOrders
         * @description cancels all open orders
         * @see https://coincatch.github.io/github.io/en/spot/#cancel-all-orders
         * @see https://coincatch.github.io/github.io/en/spot/#batch-cancel-plan-orders
         * @see https://coincatch.github.io/github.io/en/mix/#batch-cancel-order
         * @see https://coincatch.github.io/github.io/en/mix/#cancel-order-by-symbol
         * @see https://coincatch.github.io/github.io/en/mix/#cancel-plan-order-tpsl-by-symbol
         * @see https://coincatch.github.io/github.io/en/mix/#cancel-all-trigger-order-tpsl
         * @param {string} [symbol] unified symbol of the market the orders were made in
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.type] 'spot' or 'swap' - the type of the market to cancel orders for (default 'spot')
         * @param {bool} [params.trigger] true for canceling a trigger orders (default false)
         * @param {string} [params.productType] *swap only (if symbol is not provided* 'umcbl' or 'dmcbl' - the product type of the market to cancel orders for (default 'umcbl')
         * @param {string} [params.marginCoin] *mandatory for swap non-trigger dmcb (if symbol is not provided)* the margin coin of the market to cancel orders for
         * @param {string} [params.planType] *swap trigger only* the type of the plan order to cancel: 'profit_plan' - profit order, 'loss_plan' - loss order, 'normal_plan' - plan order, 'pos_profit' - position profit, 'pos_loss' - position loss, 'moving_plan' - Trailing TP/SL, 'track_plan' - Trailing Stop
         * @returns {object} response from the exchange
         */
        const methodName = 'cancelAllOrders';
        await this.loadMarkets ();
        let market: Market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
        }
        const request: Dict = {};
        let marketType = 'spot';
        [ marketType, params ] = this.handleMarketTypeAndParams (methodName, market, params, marketType);
        let trigger = false;
        [ trigger, params ] = this.handleOptionAndParams2 (params, methodName, 'trigger', 'stop', trigger);
        let response = undefined;
        if (marketType === 'spot') {
            if (trigger) {
                if (symbol !== undefined) {
                    request['symbols'] = [ market['id'] ];
                }
                response = await this.privatePostApiSpotV1PlanBatchCancelPlan (this.extend (request, params));
                //
                //     {
                //         "code": "00000",
                //         "msg": "success",
                //         "requestTime": 1728670464735,
                //         "data": [
                //             {
                //                 "orderId": "1228661660806787072",
                //                 "clientOid": "1228661660752261120",
                //                 "result": true
                //             }
                //         ]
                //     }
                //
                const data = this.safeList (response, 'data', []);
                return this.parseOrders (data, market);
            } else {
                if (symbol === undefined) {
                    throw new ArgumentsRequired (this.id + ' ' + methodName + ' () requires a symbol argument for spot non-trigger orders');
                }
                request['symbol'] = market['id'];
                //
                //     {
                //         "code": "00000",
                //         "msg": "success",
                //         "requestTime": 1725989560461,
                //         "data": "ETHUSDT_SPBL"
                //     }
                //
                response = await this.privatePostApiSpotV1TradeCancelSymbolOrder (this.extend (request, params));
            }
        } else if (marketType === 'swap') {
            let productType = 'umcbl';
            if (symbol !== undefined) {
                request['symbol'] = market['id'];
            } else {
                productType = this.handleOption (methodName, 'productType', productType);
                request['productType'] = productType; // we need either symbol or productType
            }
            let planType: Str = undefined;
            [ planType, params ] = this.handleOptionAndParams (params, methodName, 'planType', planType);
            if ((trigger) || (planType !== undefined)) { // if trigger or stop-loss/take-profit orders
                if (planType === undefined) {
                    throw new ArgumentsRequired (this.id + ' ' + methodName + ' () requires a planType parameter for swap trigger orders ("profit_plan" - profit order, "loss_plan" - loss order, "normal_plan" - plan order, "pos_profit" - position profit, "pos_loss" - position loss, "moving_plan" - Trailing TP/SL, "track_plan" - Trailing Stop)');
                }
                request['planType'] = planType;
                if (symbol !== undefined) {
                    response = await this.privatePostApiMixV1PlanCancelSymbolPlan (this.extend (request, params));
                } else {
                    response = await this.privatePostApiMixV1PlanCancelAllPlan (this.extend (request, params));
                }
            } else if (symbol !== undefined) { // if non-trigger orders and symbol is provided
                request['marginCoin'] = market['settleId'];
                response = await this.privatePostApiMixV1OrderCancelSymbolOrders (this.extend (request, params));
            } else { // if non-trigger orders and symbol is not provided
                let marginCoin: Str = undefined;
                if (productType === 'umcbl') {
                    marginCoin = 'USDT';
                } else {
                    [ marginCoin, params ] = this.handleOptionAndParams (params, methodName, 'marginCoin', marginCoin);
                    if (marginCoin === undefined) {
                        throw new ArgumentsRequired (this.id + ' ' + methodName + ' () requires a marginCoin parameter for dmcbl product type');
                    }
                }
                request['marginCoin'] = marginCoin;
                response = await this.privatePostApiMixV1OrderCancelAllOrders (this.extend (request, params));
            }
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1729104940774,
            //         "data": {
            //             "result": true,
            //             "order_ids": [ "1230500426827522049" ],
            //             "client_order_ids": [ "1230500426898825216" ],
            //             "fail_infos": []
            //         }
            //     }
            //
            const result = this.getResultFromBatchCancelingSwapOrders (response);
            return this.parseOrders (result, market);
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
        const order = this.safeOrder (response);
        order['info'] = response;
        return [ order ];
    }

    async cancelOrders (ids: string[], symbol: Str = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#cancelOrders
         * @description cancel multiple non-trigger orders
         * @see https://coincatch.github.io/github.io/en/spot/#cancel-order-in-batch-v2-single-instruments
         * @param {string[]} ids order ids
         * @param {string} symbol *is mandatory* unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string[]} [params.clientOrderIds] client order ids
         * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const methodName = 'cancelOrders';
        // only non-trigger and not tp/sl orders can be canceled via cancelOrders
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires a symbol argument');
        }
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
        };
        const marketType = market['type'];
        const clientOrderIds = this.safeList (params, 'clientOrderIds');
        if (clientOrderIds !== undefined) {
            request['clientOids'] = clientOrderIds;
            params = this.omit (params, 'clientOrderIds');
        } else if (ids === undefined) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires either ids argument or clientOrderIds parameter');
        } else {
            request['orderIds'] = ids;
        }
        let response = undefined;
        let result = undefined;
        if (marketType === 'spot') {
            response = await this.privatePostApiSpotV1TradeCancelBatchOrdersV2 (this.extend (request));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1726491486352,
            //         "data": {
            //             "resultList": [
            //                 {
            //                     "orderId": "1219555778395160576",
            //                     "clientOrderId": "e229d70a-bb16-4633-a45c-d7f4d3b5d2cf"
            //                 }
            //             ],
            //             "failure": [
            //                 {
            //                     "orderId": "123124124",
            //                     "clientOrderId": null,
            //                     "errorMsg": "The order does not exist",
            //                     "errorCode": "43001"
            //                 }
            //             ]
            //         }
            //     }
            //
            const data = this.safeDict (response, 'data', {});
            result = this.safeList (data, 'resultList', []);
        } else if (marketType === 'swap') {
            request['marginCoin'] = market['settleId'];
            response = await this.privatePostApiMixV1OrderCancelBatchOrders (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1729101962321,
            //         "data": {
            //             "result": true,
            //             "symbol": "ETHUSDT_UMCBL",
            //             "order_ids": [ "1226441551501418496", "1230506854262857729" ],
            //             "client_order_ids": [],
            //             "fail_infos": []
            //         }
            //     }
            //
            result = this.getResultFromBatchCancelingSwapOrders (response);
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
        return this.parseOrders (result, market);
    }

    getResultFromBatchCancelingSwapOrders (response) {
        const data = this.safeDict (response, 'data', {});
        const result = [];
        const orderIds = this.safeValue (data, 'order_ids', []);
        for (let i = 0; i < orderIds.length; i++) {
            const orderId = orderIds[i];
            const resultItem = {
                'orderId': orderId,
            };
            result.push (resultItem);
        }
        return result;
    }

    parseOrder (order, market = undefined): Order {
        //
        // createOrder spot
        //     {
        //         "orderId": "1217143186968068096",
        //         "clientOrderId": "8fa3eb89-2377-4519-a199-35d5db9ed262"
        //     }
        //
        // createOrder swap
        //     {
        //         "clientOid": "1225791137701519360",
        //         "orderId": "1225791137697325056"
        //     }
        //
        // privatePostApiSpotV1TradeOrderInfo, privatePostApiSpotV1TradeHistory
        //     {
        //         "accountId": "1002820815393",
        //         "symbol": "ETHUSDT_SPBL",
        //         "orderId": "1217143186968068096",
        //         "clientOrderId": "8fa3eb89-2377-4519-a199-35d5db9ed262",
        //         "price": "0",
        //         "quantity": "10.0000000000000000",
        //         "orderType": "market",
        //         "side": "buy",
        //         "status": "full_fill",
        //         "fillPrice": "2340.5500000000000000",
        //         "fillQuantity": "0.0042000000000000",
        //         "fillTotalAmount": "9.8303100000000000",
        //         "enterPointSource": "API",
        //         "feeDetail": "{
        //             \"ETH\": {
        //                 \"deduction\": false,
        //                 \"feeCoinCode\": \"ETH\",
        //                 \"totalDeductionFee\": 0,
        //                 \"totalFee\": -0.0000042000000000},
        //                 \"newFees\": {
        //                     \"c\": 0,
        //                     \"d\": 0,
        //                     \"deduction\": false,
        //                     \"r\": -0.0000042,
        //                     \"t\": -0.0000042,
        //                     \"totalDeductionFee\": 0
        //             }
        //         }",
        //         "orderSource": "market",
        //         "cTime": "1725915469877"
        //     }
        //
        // privatePostApiMixV1OrderDetail, privateGetApiMixV1OrderMarginCoinCurrent
        //     {
        //         "symbol": "ETHUSDT_UMCBL",
        //         "size": 0.01,
        //         "orderId": "1225791137697325056",
        //         "clientOid": "1225791137701519360",
        //         "filledQty": 0.01,
        //         "fee": -0.01398864,
        //         "price": null,
        //         "priceAvg": 2331.44,
        //         "state": "filled",
        //         "side": "close_long",
        //         "timeInForce": "normal",
        //         "totalProfits": -2.23680000,
        //         "posSide": "long",
        //         "marginCoin": "USDT",
        //         "filledAmount": 23.3144,
        //         "orderType": "market",
        //         "leverage": "5",
        //         "marginMode": "crossed",
        //         "reduceOnly": true,
        //         "enterPointSource": "API",
        //         "tradeSide": "close_long",
        //         "holdMode": "double_hold",
        //         "orderSource": "market",
        //         "cTime": "1727977302003",
        //         "uTime": "1727977303604"
        //     }
        //
        // privatePostApiSpotV1TradeOpenOrders
        //     {
        //         "accountId": "1002820815393",
        //         "symbol": "ETHUSDT_SPBL",
        //         "orderId": "1217347655911653376",
        //         "clientOrderId": "c57c07d1-bd00-4167-95e2-9b22a55fbc28",
        //         "price": "2000.0000000000000000",
        //         "quantity": "0.0010000000000000",
        //         "orderType": "limit",
        //         "side": "buy",
        //         "status": "new",
        //         "fillPrice": "0",
        //         "fillQuantity": "0.0000000000000000",
        //         "fillTotalAmount": "0.0000000000000000",
        //         "enterPointSource": "API",
        //         "feeDetail": "",
        //         "orderSource": "normal",
        //         "cTime": "1725964219072"
        //     }
        //
        // privatePostApiSpotV1PlanCurrentPlan, privatePostApiSpotV1PlanHistoryPlan
        //     {
        //         "orderId": "1228669617606991872",
        //         "clientOid": "1228669617573437440",
        //         "symbol": "ETHUSDT_SPBL",
        //         "size": "50",
        //         "executePrice": "0",
        //         "triggerPrice": "4000",
        //         "status": "not_trigger",
        //         "orderType": "market",
        //         "side": "sell",
        //         "triggerType": "fill_price",
        //         "enterPointSource": "API",
        //         "placeType": null,
        //         "cTime": "1728663585092",
        //         "uTime": null
        //     }
        //
        // privateGetApiMixV1PlanCurrentPlan
        //     {
        //         "orderId": "1230779428914049025",
        //         "clientOid": "1230779428914049024",
        //         "symbol": "ETHUSDT_UMCBL",
        //         "marginCoin": "USDT",
        //         "size": "0.01",
        //         "executePrice": "1000",
        //         "triggerPrice": "1200",
        //         "status": "not_trigger",
        //         "orderType": "limit",
        //         "planType": "normal_plan",
        //         "side": "buy_single",
        //         "triggerType": "fill_price",
        //         "presetTakeProfitPrice": "4000",
        //         "presetTakeLossPrice": "900",
        //         "rangeRate": "",
        //         "enterPointSource": "API",
        //         "tradeSide": "buy_single",
        //         "holdMode": "single_hold",
        //         "reduceOnly": false,
        //         "cTime": "1729166603306",
        //         "uTime": null
        //     }
        //
        const marketId = this.safeString (order, 'symbol');
        const marginCoin = this.safeString (order, 'marginCoin');
        market = this.safeMarketCustom (marketId, market, marginCoin);
        const timestamp = this.safeInteger (order, 'cTime');
        let price = this.omitZero (this.safeString2 (order, 'price', 'executePrice')); // price is zero for market orders
        const priceAvg = this.omitZero (this.safeString (order, 'priceAvg'));
        if (price === undefined) {
            price = priceAvg;
        }
        const type = this.safeString (order, 'orderType');
        const side = this.parseOrderSide (this.safeStringLower (order, 'side'));
        let amount = this.safeString2 (order, 'quantity', 'size');
        const isTrigger = this.safeString (order, 'triggerType') !== undefined;
        const isMarketBuy = (type === 'market') && (side === 'buy');
        if ((market['spot']) && (isMarketBuy) && (!isTrigger)) {
            amount = undefined; // cost instead of amount is returned for market buy spot non-trigger orders
        }
        const status = this.safeString2 (order, 'status', 'state');
        const feeDetailString = this.safeString (order, 'feeDetail');
        let fees = undefined;
        let feeCurrency: Str = undefined;
        let feeCost: Str = undefined;
        if (feeDetailString !== undefined) {
            fees = this.parseFeeDetailString (feeDetailString);
        } else {
            feeCurrency = marginCoin ? this.safeCurrencyCode (marginCoin) : undefined;
            feeCost = Precise.stringAbs (this.safeString (order, 'fee'));
        }
        const timeInForce = this.parseOrderTimeInForce (this.safeStringLower (order, 'timeInForce'));
        let postOnly: Bool = undefined;
        if (timeInForce !== undefined) {
            postOnly = timeInForce === 'PO';
        }
        const triggerPrice = this.omitZero (this.safeString (order, 'triggerPrice'));
        let takeProfitPrice = this.omitZero (this.safeString (order, 'presetTakeProfitPrice'));
        let stopLossPrice = this.omitZero (this.safeString2 (order, 'presetTakeProfitPrice', 'presetTakeLossPrice'));
        const planType = this.safeString (order, 'planType');
        if (planType === 'loss_plan') {
            stopLossPrice = triggerPrice;
        } else if (planType === 'profit_plan') {
            takeProfitPrice = triggerPrice;
        }
        return this.safeOrder ({
            'id': this.safeString (order, 'orderId'),
            'clientOrderId': this.safeString2 (order, 'clientOrderId', 'clientOid'),
            'datetime': this.iso8601 (timestamp),
            'timestamp': timestamp,
            'lastTradeTimestamp': undefined,
            'lastUpdateTimestamp': this.safeInteger (order, 'uTime'),
            'status': this.parseOrderStatus (status),
            'symbol': market['symbol'],
            'type': type,
            'timeInForce': timeInForce,
            'side': side,
            'price': price,
            'average': priceAvg ? priceAvg : this.safeString (order, 'fillPrice'),
            'amount': amount,
            'filled': this.safeString2 (order, 'fillQuantity', 'filledQty'),
            'remaining': undefined,
            'stopPrice': undefined,
            'triggerPrice': triggerPrice,
            'takeProfitPrice': takeProfitPrice,
            'stopLossPrice': stopLossPrice,
            'cost': this.safeString2 (order, 'fillTotalAmount', 'filledAmount'),
            'trades': undefined,
            'fee': {
                'currency': feeCurrency,
                'cost': feeCost,
            },
            'fees': fees,
            'reduceOnly': this.safeBool (order, 'reduceOnly'),
            'postOnly': postOnly,
            'info': order,
        }, market);
    }

    parseOrderStatus (status: Str): Str {
        const satuses = {
            'not_trigger': 'open',
            'init': 'open',
            'new': 'open',
            'partially_filled': 'open',
            'full_fill': 'closed',
            'filled': 'closed',
            'cancel': 'canceled',
            'canceled': 'canceled',
            'cancelled': 'canceled',
        };
        return this.safeString (satuses, status, status);
    }

    parseOrderSide (side: Str): Str {
        const sides = {
            'buy': 'buy',
            'sell': 'sell',
            'open_long': 'buy',
            'open_short': 'sell',
            'close_long': 'sell',
            'close_short': 'buy',
            'reduce_close_long': 'sell',
            'reduce_close_short': 'buy',
            'offset_close_long': 'sell',
            'offset_close_short': 'buy',
            'burst_close_long': 'sell',
            'burst_close_short': 'buy',
            'delivery_close_long': 'sell',
            'delivery_close_short': 'buy',
            'buy_single': 'buy',
            'sell_single': 'sell',
        };
        return this.safeString (sides, side, side);
    }

    parseOrderTimeInForce (timeInForce: Str): Str {
        const timeInForces = {
            'normal': 'GTC',
            'post_only': 'PO',
            'iok': 'IOC',
            'fok': 'FOK',
        };
        return this.safeString (timeInForces, timeInForce, timeInForce);
    }

    parseFeeDetailString (feeDetailString: Str) {
        const result = [];
        const feeDetail = this.parseJson (feeDetailString);
        if (feeDetail) {
            const keys = Object.keys (feeDetail);
            for (let i = 0; i < keys.length; i++) {
                const currencyId = this.safeString (keys, i);
                if (currencyId in this.currencies_by_id) {
                    const currency = this.safeCurrencyCode (currencyId);
                    const feeEntry = this.safeDict (feeDetail, currencyId, {});
                    const amount = Precise.stringAbs (this.safeString (feeEntry, 'totalFee'));
                    result.push ({
                        'currency': currency,
                        'amount': amount,
                    });
                }
            }
        }
        return result;
    }

    async fetchMyTrades (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        /**
         * @method
         * @name coincatch#fetchMyTrades
         * @description fetch all trades made by the user
         * @see https://coincatch.github.io/github.io/en/spot/#get-transaction-details
         * @see https://coincatch.github.io/github.io/en/mix/#get-order-fill-detail
         * @see https://coincatch.github.io/github.io/en/mix/#get-producttype-order-fill-detail
         * @param {string} symbol *is mandatory* unified market symbol
         * @param {int} [since] the earliest time in ms to fetch trades for
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] *swap markets only* the latest time in ms to fetch trades for, only supports the last 30 days timeframe
         * @param {string} [params.lastEndId] *swap markets only* query the data after this tradeId
         * @returns {Trade[]} a list of [trade structures]{@link https://github.com/ccxt/ccxt/wiki/Manual#trade-structure}
         */
        let methodName = 'fetchMyTrades';
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        await this.loadMarkets ();
        let market: Market = undefined;
        let marketType = 'spot';
        const request: Dict = {};
        if (symbol !== undefined) {
            market = this.market (symbol);
            marketType = market['type'];
            request['symbol'] = market['id'];
        } else {
            [ marketType, params ] = this.handleMarketTypeAndParams (methodName, market, params, marketType);
            if (marketType === 'spot') {
                throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires a symbol argument for spot markets');
            }
        }
        let response = undefined;
        let requestLimit = limit;
        if (marketType === 'spot') {
            const maxSpotLimit = 500;
            if (since !== undefined) {
                requestLimit = maxSpotLimit;
            }
            if (requestLimit !== undefined) {
                request['limit'] = requestLimit;
            }
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1725968747299,
            //         "data": [
            //             {
            //                 "accountId": "1002820815393",
            //                 "symbol": "ETHUSDT_SPBL",
            //                 "orderId": "1217143186968068096",
            //                 "fillId": "1217143193356505089",
            //                 "orderType": "market",
            //                 "side": "buy",
            //                 "fillPrice": "2340.55",
            //                 "fillQuantity": "0.0042",
            //                 "fillTotalAmount": "9.83031",
            //                 "feeCcy": "ETH",
            //                 "fees": "-0.0000042",
            //                 "takerMakerFlag": "taker",
            //                 "cTime": "1725915471400"
            //             },
            //             ...
            //         ]
            //     }
            //
            response = await this.privatePostApiSpotV1TradeFills (this.extend (request, params));
        } else if (marketType === 'swap') {
            if (since !== undefined) {
                params['startTime'] = since;
            } else {
                params['startTime'] = 0; // mandatory
            }
            let until: Int = undefined;
            [ until, params ] = this.handleOptionAndParams (params, methodName, 'until');
            if (until !== undefined) {
                request['endTime'] = until;
            } else {
                request['endTime'] = this.milliseconds (); // mandatory
            }
            if (symbol !== undefined) {
                //
                //     {
                //         "code": "00000",
                //         "msg": "success",
                //         "requestTime": 1728306590704,
                //         "data": [
                //             {
                //                 "tradeId": "1221355735285014530",
                //                 "symbol": "ETHUSDT_UMCBL",
                //                 "orderId": "1221355728716259329",
                //                 "price": "2555.12",
                //                 "sizeQty": "0.01",
                //                 "fee": "-0.01533072",
                //                 "side": "open_long",
                //                 "fillAmount": "25.5512",
                //                 "profit": "0",
                //                 "enterPointSource": "API",
                //                 "tradeSide": "open_long",
                //                 "holdMode": "double_hold",
                //                 "takerMakerFlag": "taker",
                //                 "cTime": "1726919819661"
                //             }
                //         ]
                //     }
                //
                response = await this.privateGetApiMixV1OrderFills (this.extend (request, params));
            } else {
                let productType = 'umcbl';
                productType = this.handleOption (methodName, 'productType', productType);
                request['productType'] = productType;
                //
                //     {
                //         "code": "00000",
                //         "msg": "success",
                //         "requestTime": 1728306372044,
                //         "data": [
                //             {
                //                 "tradeId": "1225467075440189441",
                //                 "symbol": "ETHUSD_DMCBL",
                //                 "orderId": "1225467075288719360",
                //                 "price": "2362.03",
                //                 "sizeQty": "0.1",
                //                 "fee": "-0.00005996",
                //                 "side": "burst_close_long",
                //                 "fillAmount": "236.203",
                //                 "profit": "-0.0083359",
                //                 "enterPointSource": "SYS",
                //                 "tradeSide": "burst_close_long",
                //                 "holdMode": "double_hold",
                //                 "takerMakerFlag": "taker",
                //                 "cTime": "1727900039539"
                //             },
                //             ...
                //         ]
                //     }
                //
                response = await this.privateGetApiMixV1OrderAllFills (this.extend (request, params));
            }
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + marketType + ' type of markets');
        }
        const data = this.safeList (response, 'data', []);
        return this.parseTrades (data, market, since, limit);
    }

    async fetchOrderTrades (id: string, symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        /**
         * @method
         * @name coincatch#fetchOrderTrades
         * @description fetch all the trades made from a single order
         * @see https://coincatch.github.io/github.io/en/spot/#get-transaction-details
         * @param {string} id order id
         * @param {string} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch trades for
         * @param {int} [limit] the maximum number of trades to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        const methodName = 'fetchOrderTrades';
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + ' () requires a symbol argument');
        }
        const request: Dict = {
            'orderId': id,
            'methodName': methodName,
        };
        return await this.fetchMyTrades (symbol, since, limit, this.extend (request, params));
    }

    async fetchMarginMode (symbol: string, params = {}): Promise<MarginMode> {
        /**
         * @method
         * @name coincatch#fetchMarginMode
         * @description fetches the margin mode of the trading pair
         * @see https://coincatch.github.io/github.io/en/mix/#get-single-account
         * @param {string} symbol unified symbol of the market to fetch the margin mode for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [margin mode structure]{@link https://docs.ccxt.com/#/?id=margin-mode-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
            'marginCoin': market['settleId'],
        };
        const response = await this.privateGetApiMixV1AccountAccount (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1726669633799,
        //         "data": {
        //             "marginCoin": "ETH",
        //             "locked": "0",
        //             "available": "0.01",
        //             "crossMaxAvailable": "0.01",
        //             "fixedMaxAvailable": "0.01",
        //             "maxTransferOut": "0.01",
        //             "equity": "0.01",
        //             "usdtEquity": "22.97657025",
        //             "btcEquity": "0.000386195288",
        //             "crossRiskRate": "0",
        //             "crossMarginLeverage": 100,
        //             "fixedLongLeverage": 100,
        //             "fixedShortLeverage": 100,
        //             "marginMode": "crossed",
        //             "holdMode": "double_hold",
        //             "unrealizedPL": "0",
        //             "bonus": "0",
        //             "crossedUnrealizedPL": "0",
        //             "isolatedUnrealizedPL": ""
        //         }
        //     }
        //
        const data = this.safeDict (response, 'data', {});
        return this.parseMarginMode (data, market);
    }

    parseMarginMode (marginMode: Dict, market = undefined): MarginMode {
        const marginType = this.safeStringLower (marginMode, 'marginMode');
        return {
            'info': marginMode,
            'symbol': this.safeSymbol (undefined, market),
            'marginMode': this.parseMarginModeType (marginType),
        } as MarginMode;
    }

    parseMarginModeType (type: string): string {
        const types: Dict = {
            'crossed': 'cross',
            'fixed': 'isolated',
        };
        return this.safeString (types, type, type);
    }

    async setMarginMode (marginMode: string, symbol: Str = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#setMarginMode
         * @description set margin mode to 'cross' or 'isolated'
         * @see https://coincatch.github.io/github.io/en/mix/#change-margin-mode
         * @param {string} marginMode 'cross' or 'isolated'
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} response from the exchange
         */
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' setMarginMode() requires a symbol argument');
        }
        marginMode = marginMode.toLowerCase ();
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (market['type'] !== 'swap') {
            throw new NotSupported (this.id + ' setMarginMode() is not supported for ' + market['type'] + ' type of markets');
        }
        const request: Dict = {
            'symbol': market['id'],
            'marginCoin': market['settleId'],
            'marginMode': this.encodeMarginModeType (marginMode),
        };
        const response = await this.privatePostApiMixV1AccountSetMarginMode (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1726670096099,
        //         "data": {
        //             "symbol": "ETHUSD_DMCBL",
        //             "marginCoin": "ETH",
        //             "longLeverage": 10,
        //             "shortLeverage": 10,
        //             "crossMarginLeverage": null,
        //             "marginMode": "fixed"
        //         }
        //     }
        //
        return response;
    }

    encodeMarginModeType (type: string): string {
        const types: Dict = {
            'cross': 'crossed',
            'isolated': 'fixed',
        };
        return this.safeString (types, type, type);
    }

    async fetchPositionMode (symbol: Str = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#fetchPositionMode
         * @description fetchs the position mode, hedged or one way
         * @see https://coincatch.github.io/github.io/en/mix/#get-single-account
         * @param {string} symbol unified symbol of the market to fetch entry for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} an object detailing whether the market is in hedged or one-way mode
         */
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchPositionMode() requires a symbol argument');
        }
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (market['type'] !== 'swap') {
            throw new NotSupported (this.id + ' fetchPositionMode() is not supported for ' + market['type'] + ' type of markets');
        }
        const request: Dict = {
            'symbol': market['id'],
            'marginCoin': market['settleId'],
        };
        const response = await this.privateGetApiMixV1AccountAccount (this.extend (request, params)); // same endpoint as fetchMarginMode
        const data = this.safeDict (response, 'data', {});
        const holdMode = this.safeString (data, 'holdMode');
        return {
            'info': response,
            'hedged': holdMode === 'double_hold',
        };
    }

    async setPositionMode (hedged: boolean, symbol: Str = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#setPositionMode
         * @description set hedged to true or false for a market
         * @see https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html#Set%20Position%20Mode
         * @param {bool} hedged set to true to use dualSidePosition
         * @param {string} symbol unified symbol of the market to fetch entry for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.productType] 'umcbl' or 'dmcbl' (default 'umcbl' if symbol is not provided)
         * @returns {object} response from the exchange
         */
        const methodName = 'setPositionMode';
        const defaultProductType = 'umcbl';
        await this.loadMarkets ();
        let productType = this.safeString (params, 'productType');
        if (productType === undefined) {
            if (symbol !== undefined) {
                const market = this.market (symbol);
                if (market['type'] !== 'swap') {
                    throw new NotSupported (this.id + ' setPositionMode() is not supported for ' + market['type'] + ' type of markets');
                }
                const marketId = market['id'];
                const parts = marketId.split ('_');
                productType = this.safeStringLower (parts, 1, productType);
            } else {
                productType = this.handleOption (methodName, 'productType', defaultProductType);
            }
        }
        const request: Dict = {
            'productType': productType,
            'holdMode': hedged ? 'double_hold' : 'single_hold',
        };
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1726677135005,
        //         "data": {
        //             "marginCoin": "ETH",
        //             "dualSidePosition": false
        //         }
        //     }
        //
        return await this.privatePostApiMixV1AccountSetPositionMode (this.extend (request, params));
    }

    async fetchLeverage (symbol: string, params = {}): Promise<Leverage> {
        /**
         * @method
         * @name coincatch#fetchLeverage
         * @description fetch the set leverage for a market
         * @see https://coincatch.github.io/github.io/en/mix/#get-single-account
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [leverage structure]{@link https://docs.ccxt.com/#/?id=leverage-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (market['type'] !== 'swap') {
            throw new NotSupported (this.id + ' fetchLeverage() is not supported for ' + market['type'] + ' type of markets');
        }
        const request: Dict = {
            'symbol': market['id'],
            'marginCoin': market['settleId'],
        };
        const response = await this.privateGetApiMixV1AccountAccount (this.extend (request, params)); // same endpoint as fetchMarginMode
        const data = this.safeDict (response, 'data', {});
        return this.parseLeverage (data, market);
    }

    async setLeverage (leverage: Int, symbol: Str = undefined, params = {}) {
        /**
         * @method
         * @name hashkey#setLeverage
         * @description set the level of leverage for a market
         * @see https://hashkeyglobal-apidoc.readme.io/reference/change-futures-leverage-trade
         * @param {float} leverage the rate of leverage
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.side] *for isolated margin mode with hedged position mode only* 'long' or 'short'
         * @returns {object} response from the exchange
         */
        const methodName = 'setLeverage';
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' ' + methodName + '() requires a symbol argument');
        }
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (market['type'] !== 'swap') {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + market['type'] + ' type of markets');
        }
        const request: Dict = {
            'symbol': market['id'],
            'marginCoin': market['settleId'],
            'leverage': leverage,
        };
        let side: Str = undefined;
        [ side, params ] = this.handleOptionAndParams (params, methodName, 'side');
        if (side !== undefined) {
            request['holdSide'] = side;
        }
        const response = await this.privatePostApiMixV1AccountSetLeverage (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1726680486657,
        //         "data": {
        //             "symbol": "ETHUSD_DMCBL",
        //             "marginCoin": "ETH",
        //             "longLeverage": 2,
        //             "shortLeverage": 2,
        //             "crossMarginLeverage": 2,
        //             "marginMode": "crossed"
        //         }
        //     }
        //
        const data = this.safeDict (response, 'data', {});
        return this.parseLeverage (data, market);
    }

    parseLeverage (leverage: Dict, market: Market = undefined): Leverage {
        //
        // fetchLeverage
        //     {
        //         "marginCoin": "ETH",
        //         "locked": "0",
        //         "available": "0.01",
        //         "crossMaxAvailable": "0.01",
        //         "fixedMaxAvailable": "0.01",
        //         "maxTransferOut": "0.01",
        //         "equity": "0.01",
        //         "usdtEquity": "22.97657025",
        //         "btcEquity": "0.000386195288",
        //         "crossRiskRate": "0",
        //         "crossMarginLeverage": 100,
        //         "fixedLongLeverage": 100,
        //         "fixedShortLeverage": 100,
        //         "marginMode": "crossed",
        //         "holdMode": "double_hold",
        //         "unrealizedPL": "0",
        //         "bonus": "0",
        //         "crossedUnrealizedPL": "0",
        //         "isolatedUnrealizedPL": ""
        //     }
        //
        // setLeverage
        //     {
        //         "symbol": "ETHUSD_DMCBL",
        //         "marginCoin": "ETH",
        //         "longLeverage": 2,
        //         "shortLeverage": 2,
        //         "crossMarginLeverage": 2,
        //         "marginMode": "crossed"
        //     }
        //
        const marketId = this.safeString (leverage, 'symbol');
        market = this.safeMarketCustom (marketId, market);
        const marginMode = this.parseMarginModeType (this.safeStringLower (leverage, 'marginMode'));
        let longLeverage = this.safeInteger2 (leverage, 'fixedLongLeverage', 'longLeverage');
        let shortLeverage = this.safeInteger2 (leverage, 'fixedShortLeverage', 'shortLeverage');
        const crossMarginLeverage = this.safeInteger (leverage, 'crossMarginLeverage');
        if (marginMode === 'cross') {
            longLeverage = crossMarginLeverage;
            shortLeverage = crossMarginLeverage;
        }
        return {
            'info': leverage,
            'symbol': market['symbol'],
            'marginMode': marginMode,
            'longLeverage': longLeverage,
            'shortLeverage': shortLeverage,
        } as Leverage;
    }

    async modifyMarginHelper (symbol: string, amount, type, params = {}): Promise<MarginModification> {
        let methodName = 'modifyMarginHelper';
        [ methodName, params ] = this.handleParamString (params, 'methodName', methodName);
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (market['type'] !== 'swap') {
            throw new NotSupported (this.id + ' ' + methodName + '() is not supported for ' + market['type'] + ' type of markets');
        }
        amount = this.amountToPrecision (symbol, amount);
        const request: Dict = {
            'symbol': market['id'],
            'marginCoin': market['settleId'],
            'amount': amount, // positive value for adding margin, negative for reducing
        };
        let side: Str = undefined;
        [ side, params ] = this.handleOptionAndParams (params, methodName, 'side');
        if (side !== undefined) {
            request['holdSide'] = side;
        }
        const response = await this.privatePostApiMixV1AccountSetMargin (this.extend (request, params));
        // todo check response
        // always returns error
        // addMargin - "code":"45006","msg":"Insufficient position","requestTime":1729162281543,"data":null
        // reduceMargin - "code":"40800","msg":"Insufficient amount of margin","requestTime":1729162362718,"data":null
        if (type === 'reduce') {
            amount = Precise.stringAbs (amount);
        }
        return this.extend (this.parseMarginModification (response, market), {
            'amount': this.parseNumber (amount),
            'type': type,
        });
    }

    parseMarginModification (data: Dict, market: Market = undefined): MarginModification {
        //
        //
        const msg = this.safeString (data, 'msg');
        const status = (msg === 'success') ? 'ok' : 'failed';
        return {
            'info': data,
            'symbol': market['symbol'],
            'type': undefined,
            'marginMode': undefined,
            'amount': undefined,
            'total': undefined,
            'code': market['quote'],
            'status': status,
            'timestamp': undefined,
            'datetime': undefined,
        };
    }

    async reduceMargin (symbol: string, amount: number, params = {}): Promise<MarginModification> {
        /**
         * @method
         * @name coincatch#reduceMargin
         * @description remove margin from a position
         * @see https://coincatch.github.io/github.io/en/mix/#change-margin
         * @param {string} symbol unified market symbol
         * @param {float} amount the amount of margin to remove
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.side] *for isolated margin mode with hedged position mode only* 'long' or 'short'
         * @returns {object} a [margin structure]{@link https://docs.ccxt.com/#/?id=reduce-margin-structure}
         */
        params['methodName'] = 'reduceMargin';
        return await this.modifyMarginHelper (symbol, -amount, 'reduce', params);
    }

    async addMargin (symbol: string, amount: number, params = {}): Promise<MarginModification> {
        /**
         * @method
         * @name coincatch#addMargin
         * @description add margin
         * @see https://coincatch.github.io/github.io/en/mix/#change-margin
         * @param {string} symbol unified market symbol
         * @param {float} amount amount of margin to add
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.side] *for isolated margin mode with hedged position mode only* 'long' or 'short'
         * @returns {object} a [margin structure]{@link https://docs.ccxt.com/#/?id=add-margin-structure}
         */
        params['methodName'] = 'addMargin';
        return await this.modifyMarginHelper (symbol, amount, 'add', params);
    }

    async fetchPosition (symbol: string, params = {}) {
        /**
         * @method
         * @name coincatch#fetchPosition
         * @description fetch data on a single open contract trade position
         * @see https://coincatch.github.io/github.io/en/mix/#get-symbol-position
         * @param {string} symbol unified market symbol of the market the position is held in, default is undefined
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string}  [parmas.side] 'long' or 'short' *for non-hedged position mode only* (default 'long')
         * @returns {object} a [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
         */
        const methodName = 'fetchPosition';
        let side = 'long';
        [ side, params ] = this.handleOptionAndParams (params, methodName, 'side');
        const positions = await this.fetchPositionsForSymbol (symbol, params);
        const arrayLength = positions.length;
        if (arrayLength > 1) {
            for (let i = 0; i < positions.length; i++) {
                const position = positions[i];
                if (position['side'] === side) {
                    return position as Position;
                }
            }
        }
        return positions[0] as Position;
    }

    async fetchPositionsForSymbol (symbol: string, params = {}): Promise<Position[]> {
        /**
         * @method
         * @description fetch open positions for a single market
         * @name coincatch#fetchPositionsForSymbol
         * @see https://coincatch.github.io/github.io/en/mix/#get-symbol-position
         * @description fetch all open positions for specific symbol
         * @param {string} symbol unified market symbol
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
            'marginCoin': market['settleId'],
        };
        const response = await this.privateGetApiMixV1PositionSinglePositionV2 (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1726926959041,
        //         "data": [
        //             {
        //                 "marginCoin": "USDT",
        //                 "symbol": "ETHUSDT_UMCBL",
        //                 "holdSide": "long",
        //                 "openDelegateCount": "0",
        //                 "margin": "2.55512",
        //                 "available": "0.01",
        //                 "locked": "0",
        //                 "total": "0.01",
        //                 "leverage": 10,
        //                 "achievedProfits": "0",
        //                 "averageOpenPrice": "2555.12",
        //                 "marginMode": "crossed",
        //                 "holdMode": "double_hold",
        //                 "unrealizedPL": "0.1371",
        //                 "liquidationPrice": "-3433.328491",
        //                 "keepMarginRate": "0.0033",
        //                 "marketPrice": "2568.83",
        //                 "marginRatio": "0.001666357648",
        //                 "autoMargin": "off",
        //                 "cTime": "1726919819686"
        //             }
        //         ]
        //     }
        //
        const data = this.safeList (response, 'data', []);
        return this.parsePositions (data, [ symbol ]);
    }

    async fetchPositions (symbols: Strings = undefined, params = {}): Promise<Position[]> {
        /**
         * @method
         * @name coincatch#fetchPositions
         * @description fetch all open positions
         * @see https://coincatch.github.io/github.io/en/mix/#get-all-position
         * @param {string[]} [symbols] list of unified market symbols (all symbols must belong to the same product type)
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.productType] 'umcbl' or 'dmcbl' (default 'umcbl' if symbols are not provided)
         * @param {string} [params.marginCoin] the settle currency of the positions, needs to match the productType
         * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
         */
        const methodName = 'fetchPositions';
        await this.loadMarkets ();
        let productType = 'umcbl';
        if (symbols !== undefined) {
            const marketIds = this.marketIds (symbols);
            let productTypes = [];
            for (let i = 0; i < marketIds.length; i++) {
                const marketId = marketIds[i];
                const parts = marketId.split ('_');
                const marketProductType = this.safeString (parts, 1);
                productTypes.push (marketProductType);
            }
            productTypes = this.unique (productTypes);
            const arrayLength = productTypes.length;
            if (arrayLength > 1) {
                throw new BadSymbol (this.id + ' ' + methodName + '() requires all symbols to belong to the same product type (umcbl or dmcbl)');
            } else {
                productType = productTypes[0];
            }
        } else {
            [ productType, params ] = this.handleOptionAndParams (params, methodName, 'productType', productType);
        }
        const request: Dict = {
            'productType': productType,
        };
        if (productType === 'dmcbl') {
            let marginCoin: Str = undefined;
            [ marginCoin, params ] = this.handleOptionAndParams (params, methodName, 'marginCoin');
            if (marginCoin !== undefined) {
                const currency = this.currency (marginCoin);
                request['marginCoin'] = currency['id'];
            }
        }
        const response = await this.privateGetApiMixV1PositionAllPositionV2 (this.extend (request, params));
        //
        //     {
        //         "code": "00000",
        //         "msg": "success",
        //         "requestTime": 1726933132054,
        //         "data": [
        //             {
        //                 "marginCoin": "USDT",
        //                 "symbol": "ETHUSDT_UMCBL",
        //                 "holdSide": "long",
        //                 "openDelegateCount": "0",
        //                 "margin": "2.55512",
        //                 "available": "0.01",
        //                 "locked": "0",
        //                 "total": "0.01",
        //                 "leverage": 10,
        //                 "achievedProfits": "0",
        //                 "averageOpenPrice": "2555.12",
        //                 "marginMode": "crossed",
        //                 "holdMode": "double_hold",
        //                 "unrealizedPL": "0.0093",
        //                 "liquidationPrice": "-3433.378333",
        //                 "keepMarginRate": "0.0033",
        //                 "marketPrice": "2556.05",
        //                 "marginRatio": "0.001661599511",
        //                 "autoMargin": "off",
        //                 "cTime": "1726919819686",
        //                 "uTime": "1726919819686"
        //             }
        //         ]
        //     }
        //
        const data = this.safeList (response, 'data', []);
        return this.parsePositions (data, symbols);
    }

    parsePosition (position: Dict, market: Market = undefined) {
        //
        //     {
        //         "marginCoin": "USDT",
        //         "symbol": "ETHUSDT_UMCBL",
        //         "holdSide": "long",
        //         "openDelegateCount": "0",
        //         "margin": "2.55512",
        //         "available": "0.01",
        //         "locked": "0",
        //         "total": "0.01",
        //         "leverage": 10,
        //         "achievedProfits": "0",
        //         "averageOpenPrice": "2555.12",
        //         "marginMode": "crossed",
        //         "holdMode": "double_hold",
        //         "unrealizedPL": "0.0093",
        //         "liquidationPrice": "-3433.378333",
        //         "keepMarginRate": "0.0033",
        //         "marketPrice": "2556.05",
        //         "marginRatio": "0.001661599511",
        //         "autoMargin": "off",
        //         "cTime": "1726919819686",
        //         "uTime": "1726919819686"
        //     }
        //
        const marketId = this.safeString (position, 'symbol');
        const settleId = this.safeString (position, 'marginCoin');
        market = this.safeMarketCustom (marketId, market, settleId);
        const timestamp = this.safeInteger (position, 'cTime');
        const marginMode = this.safeString (position, 'marginMode');
        let isHedged: Bool = undefined;
        const holdMode = this.safeString (position, 'holdMode');
        if (holdMode === 'double_hold') {
            isHedged = true;
        } else if (holdMode === 'single_hold') {
            isHedged = false;
        }
        const margin = this.safeNumber (position, 'margin');
        const keepMarginRate = this.safeString (position, 'keepMarginRate');
        return this.safePosition ({
            'symbol': market['symbol'],
            'id': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'contracts': this.safeNumber (position, 'total'), // todo check
            'contractSize': undefined,
            'side': this.safeStringLower (position, 'holdSide'),
            'notional': margin, // todo check
            'leverage': this.safeInteger (position, 'leverage'),
            'unrealizedPnl': this.safeNumber (position, 'unrealizedPL'),
            'realizedPnl': this.safeNumber (position, 'achievedProfits'),
            'collateral': undefined, // todo check
            'entryPrice': this.safeNumber (position, 'averageOpenPrice'),
            'markPrice': this.safeNumber (position, 'marketPrice'),
            'liquidationPrice': this.safeNumber (position, 'liquidationPrice'),
            'marginMode': this.parseMarginModeType (marginMode),
            'hedged': isHedged,
            'maintenanceMargin': undefined, // todo check
            'maintenanceMarginPercentage': this.parseNumber (Precise.stringMul (keepMarginRate, '100')), // todo check
            'initialMargin': margin, // todo check
            'initialMarginPercentage': undefined,
            'marginRatio': this.safeNumber (position, 'marginRatio'),
            'lastUpdateTimestamp': this.safeInteger (position, 'uTime'),
            'lastPrice': undefined,
            'stopLossPrice': undefined,
            'takeProfitPrice': undefined,
            'percentage': undefined,
            'info': position,
        });
    }

    safeMarketCustom (marketId: Str, market: Market = undefined, settleId: Str = undefined): Market {
        try {
            market = this.safeMarket (marketId, market);
        } catch (e) {
            // dmcbl markets have the same id and market type but different settleId
            // so we need to resolve the market by settleId
            const marketsWithCurrentId = this.safeList (this.markets_by_id, marketId, []);
            if (settleId === undefined) {
                market = marketsWithCurrentId[0]; // if settleId is not provided, return the first market with the current id
            } else {
                for (let i = 0; i < marketsWithCurrentId.length; i++) {
                    const marketWithCurrentId = marketsWithCurrentId[i];
                    if (marketWithCurrentId['settleId'] === settleId) {
                        market = marketWithCurrentId;
                        break;
                    }
                }
            }
        }
        return market;
    }

    async fetchLedger (code: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name coincatch#fetchLedger
         * @description fetch the history of changes, actions done by the user or operations that altered balance of the user
         * @see https://coincatch.github.io/github.io/en/spot/#get-bills
         * @see https://coincatch.github.io/github.io/en/mix/#get-business-account-bill
         * @param {string} [code] unified currency code
         * @param {int} [since] timestamp in ms of the earliest ledger entry, default is undefined
         * @param {int} [limit] max number of ledger entrys to return, default is undefined
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {int} [params.until] *swap only* the latest time in ms to fetch entries for
         * @param {string} [params.type] 'spot' or 'swap' (default 'spot')
         * @param {string} [params.after] *spot only* billId, return the data less than this billId
         * @param {string} [params.before] *spot only* billId, return the data greater than or equals to this billId
         * @param {string} [params.groupType] *spot only*
         * @param {string} [params.bizType] *spot only*
         * @param {string} [params.productType] *swap only* 'umcbl' or 'dmcbl' (default 'umcbl' or 'dmcbl' if code is provided and code is not equal to 'USDT')
         * @param {string} [params.business] *swap only*
         * @param {string} [params.lastEndId] *swap only*
         * @param {bool} [params.next] *swap only*
         * @returns {object} a [ledger structure]{@link https://docs.ccxt.com/#/?id=ledger-structure}
         */
        const methodName = 'fetchLedger';
        await this.loadMarkets ();
        const request: Dict = {};
        let marketType = 'spot';
        [ marketType, params ] = this.handleMarketTypeAndParams (methodName, undefined, params, marketType);
        let result = undefined;
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency (code);
        }
        if (marketType === 'spot') {
            if (currency !== undefined) {
                const numericId = this.safeString (currency, 'numericId');
                request['coinId'] = numericId;
            }
            if (limit !== undefined) {
                request['limit'] = limit;
            }
            const response = await this.privatePostApiSpotV1AccountBills (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1727964749515,
            //         "data": [
            //             {
            //                 "billId": "1220289012519190529",
            //                 "coinId": 2,
            //                 "coinName": "USDT",
            //                 "groupType": "transfer",
            //                 "bizType": "Transfer out",
            //                 "quantity": "-40.00000000",
            //                 "balance": "4.43878673",
            //                 "fees": "0.00000000",
            //                 "cTime": "1726665493092"
            //             },
            //             ...
            //         ]
            //     }
            //
            result = this.safeList (response, 'data', []);
        } else if (marketType === 'swap') {
            if (since !== undefined) {
                request['startTime'] = since;
            } else {
                request['startTime'] = 0; // is mandatory
            }
            let until: Int = undefined;
            [ until, params ] = this.handleOptionAndParams (params, methodName, 'until');
            if (until !== undefined) {
                request['endTime'] = until;
            } else {
                request['endTime'] = this.milliseconds (); // is mandatory
            }
            if (limit !== undefined) {
                request['pageSize'] = limit;
            }
            let productType = 'umcbl';
            if (code === undefined) {
                productType = this.handleOption (methodName, 'productType', productType);
            } else if (code === 'USDT') {
                productType = 'umcbl';
            } else {
                productType = 'dmcbl';
            }
            [ productType, params ] = this.handleParamString (params, 'productType', productType);
            request['productType'] = productType;
            const response = await this.privateGetApiMixV1AccountAccountBusinessBill (this.extend (request, params));
            //
            //     {
            //         "code": "00000",
            //         "msg": "success",
            //         "requestTime": 1727971607663,
            //         "data": {
            //             "result": [
            //                 {
            //                     "id": "1225766556446064640",
            //                     "symbol": null,
            //                     "marginCoin": "ETH",
            //                     "amount": "-0.0016",
            //                     "fee": "0",
            //                     "feeByCoupon": "",
            //                     "feeCoin": "ETH",
            //                     "business": "trans_to_exchange",
            //                     "cTime": "1727971441425"
            //                 },
            //                 {
            //                     "id": "1225467081664061441",
            //                     "symbol": "ETHUSD_DMCBL",
            //                     "marginCoin": "ETH",
            //                     "amount": "-0.00052885",
            //                     "fee": "0",
            //                     "feeByCoupon": "",
            //                     "feeCoin": "ETH",
            //                     "business": "risk_captital_user_transfer",
            //                     "cTime": "1727900041024"
            //                 },
            //                 {
            //                     "id": "1225467075440189441",
            //                     "symbol": "ETHUSD_DMCBL",
            //                     "marginCoin": "ETH",
            //                     "amount": "-0.0083359",
            //                     "fee": "-0.00005996",
            //                     "feeByCoupon": "",
            //                     "feeCoin": "ETH",
            //                     "business": "burst_long_loss_query",
            //                     "cTime": "1727900039576"
            //                 },
            //                 {
            //                     "id": "1221416895715303426",
            //                     "symbol": "ETHUSD_DMCBL",
            //                     "marginCoin": "ETH",
            //                     "amount": "0.00004756",
            //                     "fee": "0",
            //                     "feeByCoupon": "",
            //                     "feeCoin": "ETH",
            //                     "business": "contract_settle_fee",
            //                     "cTime": "1726934401444"
            //                 },
            //                 {
            //                     "id": "1221413703233871873",
            //                     "symbol": "ETHUSD_DMCBL",
            //                     "marginCoin": "ETH",
            //                     "amount": "0",
            //                     "fee": "-0.00005996",
            //                     "feeByCoupon": "",
            //                     "feeCoin": "ETH",
            //                     "business": "open_long",
            //                     "cTime": "1726933640336"
            //                 },
            //                 {
            //                     "id": "1220288640761122816",
            //                     "symbol": null,
            //                     "marginCoin": "ETH",
            //                     "amount": "0.01",
            //                     "fee": "0",
            //                     "feeByCoupon": "",
            //                     "feeCoin": "ETH",
            //                     "business": "trans_from_exchange",
            //                     "cTime": "1726665404563"
            //                 }
            //             ],
            //             "lastEndId": "1220288641021337600",
            //             "nextFlag": false,
            //             "preFlag": false
            //         }
            //     }
            //
            const data = this.safeDict (response, 'data', {});
            result = this.safeList (data, 'result', []);
        } else {
            throw new NotSupported (this.id + ' ' + methodName + '() does not support market type ' + marketType);
        }
        return this.parseLedger (result, currency, since, limit);
    }

    parseLedgerEntry (item: Dict, currency: Currency = undefined): LedgerEntry {
        //
        // spot
        //     {
        //         "billId": "1220289012519190529",
        //         "coinId": 2,
        //         "coinName": "USDT",
        //         "groupType": "transfer",
        //         "bizType": "Transfer out",
        //         "quantity": "-40.00000000",
        //         "balance": "4.43878673",
        //         "fees": "0.00000000",
        //         "cTime": "1726665493092"
        //     }
        //
        // swap
        //     {
        //         "id": "1220288640761122816",
        //         "symbol": null,
        //         "marginCoin": "ETH",
        //         "amount": "0.01",
        //         "fee": "0",
        //         "feeByCoupon": "",
        //         "feeCoin": "ETH",
        //         "business": "trans_from_exchange",
        //         "cTime": "1726665404563"
        //     }
        //
        const timestamp = this.safeInteger (item, 'cTime');
        const settleId = this.safeString2 (item, 'coinName', 'marginCoin');
        let market: Market = undefined;
        const marketId = this.safeString (item, 'symbol');
        market = this.safeMarketCustom (marketId, market, settleId);
        let amountString = this.safeString2 (item, 'quantity', 'amount');
        let direction = 'in';
        if (Precise.stringLt (amountString, '0')) {
            direction = 'out';
            amountString = Precise.stringMul (amountString, '-1');
        }
        const fee = {
            'cost': Precise.stringAbs (this.safeString2 (item, 'fee', 'fees')),
            'currency': this.safeString (item, 'feeCoin'),
        };
        return this.safeLedgerEntry ({
            'id': this.safeString2 (item, 'billId', 'id'),
            'info': item,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'account': undefined,
            'direction': direction,
            'referenceId': undefined,
            'referenceAccount': undefined,
            'type': this.parseLedgerEntryType (this.safeStringLower2 (item, 'bizType', 'business')),
            'currency': this.safeCurrencyCode (settleId, currency),
            'symbol': market['symbol'],
            'amount': amountString,
            'before': undefined,
            'after': this.safeString (item, 'balance'),
            'status': 'ok',
            'fee': fee,
        }, currency);
    }

    parseLedgerEntryType (type: string): string {
        const types = {
            'deposit': 'deposit',
            'withdraw': 'withdrawal',
            'buy': 'trade',
            'sell': 'trade',
            'deduction of handling fee': 'fee', // todo check
            'transfer-in': 'transfer',
            'transfer in': 'transfer',
            'transfer out': 'transfer',
            'rebate rewards': 'rebate', // todo check
            'airdrop rewards': 'rebate', // todo check
            'usdt contract rewards': 'rebate', // todo check
            'mix contract rewards': 'rebate', // todo check
            'system lock': 'system lock',
            'user lock': 'user lock',
            'open_long': 'trade',
            'open_short': 'trade',
            'close_long': 'trade',
            'close_short': 'trade',
            'trans_from_exchange': 'transfer',
            'trans_to_exchange': 'transfer',
            'contract_settle_fee': 'fee', // todo check sometimes it is positive, sometimes negative
            'burst_long_loss_query': 'trade', // todo check
            'burst_short_loss_query': 'trade', // todo check
        };
        return this.safeString (types, type, type);
    }

    handleErrors (code: int, reason: string, url: string, method: string, headers: Dict, body: string, response, requestHeaders, requestBody) {
        if (!response) {
            return undefined; // fallback to default error handler
        }
        let message = this.safeString (response, 'msg');
        const feedback = this.id + ' ' + body;
        let messageCode = this.safeString (response, 'code');
        let success = (message === 'success') || (message === undefined);
        if (url.indexOf ('batch') >= 0) { // createOrders, cancelOrders
            const data = this.safeDict (response, 'data', {});
            const failure = this.safeList2 (data, 'failure', 'fail_infos', []);
            if (!this.isEmpty (failure)) {
                success = false;
                const firstEntry = this.safeDict (failure, 0, {});
                messageCode = this.safeString (firstEntry, 'errorCode');
                message = this.safeString (firstEntry, 'errorMsg');
            }
        }
        if (!success) {
            this.throwExactlyMatchedException (this.exceptions['exact'], messageCode, feedback);
            this.throwBroadlyMatchedException (this.exceptions['broad'], message, feedback);
            throw new ExchangeError (feedback); // unknown message
        }
        return undefined;
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let endpoint = '/' + path;
        if (method === 'GET') {
            const query = this.urlencode (params);
            if (query.length !== 0) {
                endpoint += '?' + query;
            }
        }
        if (api === 'private') {
            this.checkRequiredCredentials ();
            const timestamp = this.numberToString (this.milliseconds ());
            let suffix = '';
            if (method !== 'GET') {
                body = this.json (params);
                suffix = body;
            }
            const payload = timestamp + method + endpoint + suffix;
            const signature = this.hmac (this.encode (payload), this.encode (this.secret), sha256, 'base64');
            headers = {
                'ACCESS-KEY': this.apiKey,
                'ACCESS-SIGN': signature,
                'ACCESS-TIMESTAMP': timestamp,
                'ACCESS-PASSPHRASE': this.password,
                'Content-Type': 'application/json',
                'X-CHANNEL-API-CODE': this.safeString (this.options, 'brokerId', '47cfy'),
            };
        }
        const url = this.urls['api'][api] + endpoint;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
}
