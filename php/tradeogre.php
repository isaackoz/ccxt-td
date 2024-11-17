<?php

namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

use Exception; // a common import
use ccxt\abstract\tradeogre as Exchange;

class tradeogre extends Exchange {

    public function describe() {
        return $this->deep_extend(parent::describe(), array(
            'id' => 'tradeogre',
            'name' => 'tradeogre',
            'countries' => [ ],
            'rateLimit' => 100,
            'version' => 'v2',
            'pro' => false,
            'has' => array(
                'CORS' => null,
                'spot' => true,
                'margin' => false,
                'swap' => false,
                'future' => false,
                'option' => false,
                'addMargin' => false,
                'cancelAllOrders' => true,
                'cancelOrder' => true,
                'cancelOrders' => false,
                'closeAllPositions' => false,
                'closePosition' => false,
                'createDepositAddress' => false,
                'createMarketOrder' => false,
                'createOrder' => true,
                'createOrders' => false,
                'createPostOnlyOrder' => false,
                'createReduceOnlyOrder' => false,
                'createStopLimitOrder' => false,
                'createStopMarketOrder' => false,
                'createStopOrder' => false,
                'fetchAccounts' => false,
                'fetchBalance' => true,
                'fetchBorrowInterest' => false,
                'fetchBorrowRateHistory' => false,
                'fetchClosedOrders' => false,
                'fetchCrossBorrowRate' => false,
                'fetchCrossBorrowRates' => false,
                'fetchDeposit' => false,
                'fetchDepositAddress' => false,
                'fetchDepositAddresses' => false,
                'fetchDepositAddressesByNetwork' => false,
                'fetchDeposits' => false,
                'fetchDepositsWithdrawals' => false,
                'fetchFundingHistory' => false,
                'fetchFundingRate' => false,
                'fetchFundingRateHistory' => false,
                'fetchFundingRates' => false,
                'fetchIndexOHLCV' => false,
                'fetchIsolatedBorrowRate' => false,
                'fetchIsolatedBorrowRates' => false,
                'fetchLedger' => false,
                'fetchLedgerEntry' => false,
                'fetchLeverageTiers' => false,
                'fetchMarketLeverageTiers' => false,
                'fetchMarkets' => true,
                'fetchMarkOHLCV' => false,
                'fetchMyTrades' => false,
                'fetchOHLCV' => false,
                'fetchOpenInterest' => false,
                'fetchOpenInterestHistory' => false,
                'fetchOpenOrders' => true,
                'fetchOrder' => true,
                'fetchOrderBook' => true,
                'fetchOrderBooks' => false,
                'fetchOrders' => false,
                'fetchOrderTrades' => false,
                'fetchPosition' => false,
                'fetchPositionHistory' => false,
                'fetchPositionMode' => false,
                'fetchPositions' => false,
                'fetchPositionsForSymbol' => false,
                'fetchPositionsHistory' => false,
                'fetchPositionsRisk' => false,
                'fetchPremiumIndexOHLCV' => false,
                'fetchTicker' => true,
                'fetchTickers' => false,
                'fetchTrades' => true,
                'fetchTradingLimits' => false,
                'fetchTransactionFee' => false,
                'fetchTransactionFees' => false,
                'fetchTransactions' => false,
                'fetchTransfers' => false,
                'fetchWithdrawAddresses' => false,
                'fetchWithdrawal' => false,
                'fetchWithdrawals' => false,
                'reduceMargin' => false,
                'setLeverage' => false,
                'setMargin' => false,
                'setMarginMode' => false,
                'setPositionMode' => false,
                'signIn' => false,
                'transfer' => false,
                'withdraw' => false,
            ),
            'urls' => array(
                'referral' => '',
                'logo' => 'https://github.com/ccxt/ccxt/assets/43336371/3aa748b7-ea44-45e9-a9e7-b1d207a2578a',
                'api' => array(
                    'rest' => 'https://tradeogre.com/api/v1',
                ),
                'www' => 'https://tradeogre.com',
                'doc' => 'https://tradeogre.com/help/api',
                'fees' => 'https://tradeogre.com/help/fees',
            ),
            'fees' => array(
                'trading' => array(
                    'maker' => $this->parse_number('0.002'),
                    'taker' => $this->parse_number('0.002'),
                ),
            ),
            'api' => array(
                'public' => array(
                    'get' => array(
                        'markets' => 1,
                        'orders/{market}' => 1,
                        'ticker/{market}' => 1,
                        'history/{market}' => 1,
                    ),
                ),
                'private' => array(
                    'get' => array(
                        'account/balance' => 1,
                        'account/balances' => 1,
                        'account/order/{uuid}' => 1,
                    ),
                    'post' => array(
                        'order/buy' => 1,
                        'order/sell' => 1,
                        'order/cancel' => 1,
                        'orders' => 1,
                        'account/orders' => 1,
                    ),
                ),
            ),
            'commonCurrencies' => array(
            ),
            'precisionMode' => TICK_SIZE,
            'exceptions' => array(
                'exact' => array(
                    'Must be authorized' => '\\ccxt\\AuthenticationError',
                    'Market not found' => '\\ccxt\\BadRequest',
                    'Insufficient funds' => '\\ccxt\\InsufficientFunds',
                    'Order not found' => '\\ccxt\\BadRequest',
                ),
            ),
            'options' => array(
            ),
        ));
    }

    public function fetch_markets($params = array ()): array {
        /**
         * retrieves data on all markets for bigone
         *
         * @see https://github.com/P2B-team/p2b-api-docs/blob/master/api-doc.md#markets
         *
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {array[]} an array of objects representing $market data
         */
        $response = $this->publicGetMarkets ($params);
        //
        //   array(
        //       {
        //          "AEON-BTC" => {
        //             "initialprice" => "0.00022004",
        //             "price" => "0.00025992",
        //             "high" => "0.00025992",
        //             "low" => "0.00022003",
        //             "volume" => "0.00359066",
        //             "bid" => "0.00022456",
        //             "ask" => "0.00025993"
        //          }
        //       }
        //   )
        //
        $result = array();
        for ($i = 0; $i < count($response); $i++) {
            $rawMarket = $response[$i];
            $keys = is_array($rawMarket) ? array_keys($rawMarket) : array();
            $id = $this->safe_string($keys, 0);
            $keyParts = explode('-', $id);
            $baseId = $this->safe_string($keyParts, 0);
            $quoteId = $this->safe_string($keyParts, 1);
            $base = $this->safe_currency_code($baseId);
            $quote = $this->safe_currency_code($quoteId);
            $market = $this->safe_market_structure(array(
                'id' => $id,
                'symbol' => $base . '/' . $quote,
                'base' => $base,
                'quote' => $quote,
                'settle' => null,
                'baseId' => $baseId,
                'quoteId' => $quoteId,
                'settleId' => null,
                'type' => 'spot',
                'spot' => true,
                'margin' => false,
                'swap' => false,
                'future' => false,
                'option' => false,
                'active' => true,
                'contract' => false,
                'linear' => null,
                'inverse' => null,
                'contractSize' => null,
                'taker' => $this->fees['trading']['taker'],
                'maker' => $this->fees['trading']['maker'],
                'expiry' => null,
                'expiryDatetime' => null,
                'strike' => null,
                'optionType' => null,
                'precision' => array(
                    'amount' => $this->parse_number($this->parse_precision('8')),
                    'price' => $this->parse_number($this->parse_precision('8')), // they're not explicit about it
                ),
                'limits' => array(
                    'leverage' => array(
                        'min' => null,
                        'max' => null,
                    ),
                    'amount' => array(
                        'min' => null,
                        'max' => null,
                    ),
                    'price' => array(
                        'min' => null,
                        'max' => null,
                    ),
                    'cost' => array(
                        'min' => null,
                        'max' => null,
                    ),
                ),
                'created' => null,
                'info' => $rawMarket,
            ));
            $result[] = $market;
        }
        return $result;
    }

    public function fetch_ticker(string $symbol, $params = array ()): array {
        /**
         * fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific $market
         * @param {string} $symbol unified $symbol of the $market to fetch the ticker for
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {array} a ~@link https://docs.ccxt.com/#/?id=ticker-structure ticker structure~
         */
        $this->load_markets();
        $market = $this->market($symbol);
        $request = array(
            'market' => $market['id'],
        );
        $response = $this->publicGetTickerMarket ($this->extend($request, $params));
        //
        //   {
        //       "success":true,
        //       "initialprice":"0.02502002",
        //       "price":"0.02500000",
        //       "high":"0.03102001",
        //       "low":"0.02500000",
        //       "volume":"0.15549958",
        //       "bid":"0.02420000",
        //       "ask":"0.02625000"
        //   }
        //
        return $this->parse_ticker($response, $market);
    }

    public function parse_ticker($ticker, ?array $market = null) {
        //
        //  {
        //       "success":true,
        //       "initialprice":"0.02502002",
        //       "price":"0.02500000",
        //       "high":"0.03102001",
        //       "low":"0.02500000",
        //       "volume":"0.15549958",
        //       "bid":"0.02420000",
        //       "ask":"0.02625000"
        //   }
        //
        return $this->safe_ticker(array(
            'symbol' => $this->safe_string($market, 'symbol'),
            'timestamp' => null,
            'datetime' => null,
            'high' => $this->safe_string($ticker, 'high'),
            'low' => $this->safe_string($ticker, 'low'),
            'bid' => $this->safe_string($ticker, 'bid'),
            'bidVolume' => null,
            'ask' => $this->safe_string($ticker, 'ask'),
            'askVolume' => null,
            'vwap' => null,
            'open' => $this->safe_string($ticker, 'open'),
            'close' => null,
            'last' => null,
            'previousClose' => null,
            'change' => null,
            'percentage' => null,
            'average' => null,
            'baseVolume' => $this->safe_string($ticker, 'volume'),
            'quoteVolume' => null,
            'info' => $ticker,
        ), $market);
    }

    public function fetch_order_book(string $symbol, ?int $limit = null, $params = array ()) {
        /**
         * fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @param {string} $symbol unified $symbol of the $market to fetch the order book for
         * @param {int} [$limit] the maximum amount of order book entries to return
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {array} A dictionary of ~@link https://docs.ccxt.com/#/?id=order-book-structure order book structures~ indexed by $market symbols
         */
        $this->load_markets();
        $market = $this->market($symbol);
        $request = array(
            'market' => $market['id'],
        );
        $response = $this->publicGetOrdersMarket ($this->extend($request, $params));
        //
        // {
        //     "success" => true,
        //     "buy" => {
        //        "0.02425501" => "36.46986607",
        //        "0.02425502" => "93.64201137",
        //        "0.02425503" => "19.02000000",
        //        "0.02425515" => "115.49000000"
        // }
        //
        $rawBids = $this->safe_dict($response, 'buy', array());
        $rawAsks = $this->safe_dict($response, 'sell', array());
        $rawOrderbook = array(
            'bids' => $rawBids,
            'asks' => $rawAsks,
        );
        $orderbook = $this->parse_order_book($rawOrderbook, $symbol);
        return $orderbook;
    }

    public function parse_bids_asks($bidasks, int|string $priceKey = 0, int|string $amountKey = 1, int|string $countOrIdKey = 2) {
        $prices = is_array($bidasks) ? array_keys($bidasks) : array();
        $result = array();
        for ($i = 0; $i < count($prices); $i++) {
            $priceString = $this->safe_string($prices, $i);
            $price = $this->safe_number($prices, $i);
            $volume = $this->safe_number($bidasks, $priceString);
            $result[] = array( $price, $volume );
        }
        return $result;
    }

    public function fetch_trades(string $symbol, ?int $since = null, ?int $limit = null, $params = array ()) {
        /**
         * get the list of most recent trades for a particular $symbol
         * @param {string} $symbol unified $symbol of the $market to fetch trades for
         * @param {int} [$since] timestamp in ms of the earliest trade to fetch
         * @param {int} [$limit] the maximum number of trades to fetch
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @param {int} $params->lastId order id
         * @return {Trade[]} a list of ~@link https://docs.ccxt.com/#/?id=public-trades trade structures~
         */
        $this->load_markets();
        $market = $this->market($symbol);
        $request = array(
            'market' => $market['id'],
        );
        $response = $this->publicGetHistoryMarket ($this->extend($request, $params));
        return $this->parse_trades($response, $market, $since, $limit);
    }

    public function parse_trade(array $trade, ?array $market = null) {
        //
        //  {
        //      "date":1515128233,
        //      "type":"sell",
        //      "price":"0.02454320",
        //      "quantity":"0.17614230"
        //  }
        //
        $timestamp = $this->safe_integer_product($trade, 'date', 1000);
        return $this->safe_trade(array(
            'info' => $trade,
            'id' => null,
            'timestamp' => $timestamp,
            'datetime' => $this->iso8601($timestamp),
            'symbol' => $this->safe_string($market, 'symbol'),
            'order' => null,
            'type' => null,
            'side' => $this->safe_string($trade, 'type'),
            'takerOrMaker' => null,
            'price' => $this->safe_string($trade, 'price'),
            'amount' => $this->safe_string($trade, 'quantity'),
            'cost' => null,
            'fee' => array(
                'currency' => null,
                'cost' => null,
            ),
        ), $market);
    }

    public function fetch_balance($params = array ()) {
        /**
         * query for balance and get the amount of funds available for trading or funds locked in orders
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {array} a ~@link https://docs.ccxt.com/#/?id=balance-structure balance structure~
         */
        $this->load_markets();
        $response = $this->privateGetAccountBalances ($params);
        $result = $this->safe_dict($response, 'balances', array());
        return $this->parse_balance($result);
    }

    public function parse_balance($response) {
        //
        //    {
        //        "USDT" => "12"
        //    }
        //
        $result = array(
            'info' => $response,
        );
        $keys = is_array($response) ? array_keys($response) : array();
        for ($i = 0; $i < count($keys); $i++) {
            $currencyId = $keys[$i];
            $balance = $response[$currencyId];
            $code = $this->safe_currency_code($currencyId);
            $account = array(
                'total' => $balance,
            );
            $result[$code] = $account;
        }
        return $this->safe_balance($result);
    }

    public function create_order(string $symbol, string $type, string $side, float $amount, ?float $price = null, $params = array ()) {
        /**
         * create a trade order
         * @param {string} $symbol unified $symbol of the $market to create an order in
         * @param {string} $type must be 'limit'
         * @param {string} $side 'buy' or 'sell'
         * @param {float} $amount how much of currency you want to trade in units of base currency
         * @param {float} $price the $price at which the order is to be fulfilled, in units of the quote currency
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {array} an ~@link https://docs.ccxt.com/#/?id=order-structure order structure~
         */
        $this->load_markets();
        $market = $this->market($symbol);
        if ($type === 'market') {
            throw new BadRequest($this->id . ' createOrder does not support $market orders');
        }
        if ($price === null) {
            throw new ArgumentsRequired($this->id . ' createOrder requires a limit parameter');
        }
        $request = array(
            'market' => $market['id'],
            'quantity' => $this->parse_to_numeric($this->amount_to_precision($symbol, $amount)),
            'price' => $this->parse_to_numeric($this->price_to_precision($symbol, $price)),
        );
        $response = null;
        if ($side === 'buy') {
            $response = $this->privatePostOrderBuy ($this->extend($request, $params));
        } else {
            $response = $this->privatePostOrderSell ($this->extend($request, $params));
        }
        return $this->parse_order($response, $market);
    }

    public function cancel_order(string $id, ?string $symbol = null, $params = array ()) {
        /**
         * cancels an open order
         * @param {string} $id order $id
         * @param {string} $symbol unified $symbol of the market the order was made in
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {array} An ~@link https://docs.ccxt.com/#/?$id=order-structure order structure~
         */
        $this->load_markets();
        $request = array(
            'uuid' => $id,
        );
        $response = $this->privatePostOrderCancel ($this->extend($request, $params));
        return $this->parse_order($response);
    }

    public function cancel_all_orders(?string $symbol = null, $params = array ()) {
        /**
         * cancel all open orders
         * @param {string} $symbol alpaca cancelAllOrders cannot setting $symbol, it will cancel all open orders
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {array[]} a list of ~@link https://docs.ccxt.com/#/?id=order-structure order structures~
         */
        $this->load_markets();
        $response = $this->cancel_order('all', $symbol, $params);
        return array(
            $response,
        );
    }

    public function fetch_open_orders(?string $symbol = null, ?int $since = null, ?int $limit = null, $params = array ()) {
        /**
         * fetch all unfilled currently open orders
         * @param {string} $symbol unified $market $symbol of the $market orders were made in
         * @param {int} [$since] the earliest time in ms to fetch orders for
         * @param {int} [$limit] the maximum number of order structures to retrieve
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {Order[]} a list of ~@link https://docs.ccxt.com/#/?id=order-structure order structures~
         */
        $this->load_markets();
        $market = null;
        if ($symbol !== null) {
            $market = $this->market($symbol);
        }
        $request = array();
        if ($symbol !== null) {
            $request['market'] = $market['id'];
        }
        $response = $this->privatePostAccountOrders ($this->extend($request, $params));
        return $this->parse_orders($response, $market, $since, $limit);
    }

    public function fetch_order(string $id, ?string $symbol = null, $params = array ()) {
        /**
         * fetches information on an order made by the user
         *
         * @see https://github.com/ace-exchange/ace-official-api-docs/blob/master/api_v2.md#open-api---order-status
         *
         * @param {string} $id order $id
         * @param {string} $symbol unified $symbol of the market the order was made in
         * @param {array} [$params] extra parameters specific to the exchange API endpoint
         * @return {array} An ~@link https://docs.ccxt.com/#/?$id=order-structure order structure~
         */
        $this->load_markets();
        $request = array(
            'uuid' => $id,
        );
        $response = $this->privateGetAccountOrderUuid ($this->extend($request, $params));
        return $this->parse_order($response, null);
    }

    public function parse_order(array $order, ?array $market = null): array {
        //
        //
        // {
        //     "uuid" => "a40ac710-8dc5-b5a8-aa69-389715197b14",
        //     "date" => 1514876938,
        //     "type" => "sell",
        //     "price" => "0.02621960",
        //     "quantity" => "1.55772526",
        //     "market" => "XMR-BTC"
        // }
        //
        $timestamp = $this->safe_integer_product($order, 'date', 1000);
        $marketId = $this->safe_string($order, 'market');
        $market = $this->safe_market($marketId, $market);
        return $this->safe_order(array(
            'info' => $order,
            'id' => $this->safe_string($order, 'uuid'),
            'clientOrderId' => null,
            'timestamp' => $timestamp,
            'datetime' => $this->iso8601($timestamp),
            'lastTradeTimestamp' => null,
            'symbol' => $market['symbol'],
            'type' => null,
            'timeInForce' => null,
            'postOnly' => null,
            'side' => $this->safe_string($order, 'type'),
            'price' => $this->safe_string($order, 'price'),
            'stopPrice' => null,
            'amount' => $this->safe_string($order, 'quantity'),
            'cost' => null,
            'average' => null,
            'filled' => $this->safe_string($order, 'fulfilled'),
            'remaining' => null,
            'status' => null,
            'fee' => array(
                'currency' => null,
                'cost' => null,
            ),
            'trades' => null,
        ), $market);
    }

    public function sign($path, $api = 'public', $method = 'GET', $params = array (), $headers = null, $body = null) {
        $url = $this->urls['api']['rest'] . '/' . $this->implode_params($path, $params);
        $params = $this->omit($params, $this->extract_params($path));
        if ($method === 'GET') {
            if ($params) {
                $url .= '?' . $this->urlencode($params);
            }
        }
        if ($api === 'private') {
            $headers = array(
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Referer' => 'CCXT',
                'authorization' => 'Basic ' . base64_encode($this->apiKey . ':' . $this->secret),
            );
            if ($method !== 'GET') {
                $body = $this->urlencode($params);
            }
        }
        return array( 'url' => $url, 'method' => $method, 'body' => $body, 'headers' => $headers );
    }

    public function handle_errors(int $code, string $reason, string $url, string $method, array $headers, string $body, $response, $requestHeaders, $requestBody) {
        if ($response === null) {
            return null;
        }
        if (!(is_array($response) && array_key_exists('success', $response))) {
            return null;
        }
        //
        //  array("success":false,"error":"Must be authorized")
        //
        $success = $this->safe_bool($response, 'success');
        if ($success) {
            return null;
        }
        $successString = $this->safe_string($response, 'success');
        if ($successString === 'true') {
            return null;
        }
        $error = $this->safe_value($response, 'error');
        $errorCode = $this->safe_string($error, 'code');
        $feedback = $this->id . ' ' . $this->json($response);
        $this->throw_exactly_matched_exception($this->exceptions['exact'], $errorCode, $feedback);
        throw new ExchangeError($feedback);
    }
}
