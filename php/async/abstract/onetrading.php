<?php

namespace ccxt\async\abstract;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


abstract class onetrading extends \ccxt\async\Exchange {
    public function public_get_currencies($params = array()) {
        return $this->request('currencies', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_candlesticks_instrument_code($params = array()) {
        return $this->request('candlesticks/{instrument_code}', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_fees($params = array()) {
        return $this->request('fees', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_instruments($params = array()) {
        return $this->request('instruments', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_order_book_instrument_code($params = array()) {
        return $this->request('order-book/{instrument_code}', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_market_ticker($params = array()) {
        return $this->request('market-ticker', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_market_ticker_instrument_code($params = array()) {
        return $this->request('market-ticker/{instrument_code}', 'public', 'GET', $params, null, null, array());
    }
    public function public_get_time($params = array()) {
        return $this->request('time', 'public', 'GET', $params, null, null, array());
    }
    public function private_get_account_balances($params = array()) {
        return $this->request('account/balances', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_deposit_crypto_currency_code($params = array()) {
        return $this->request('account/deposit/crypto/{currency_code}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_deposit_fiat_eur($params = array()) {
        return $this->request('account/deposit/fiat/EUR', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_deposits($params = array()) {
        return $this->request('account/deposits', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_deposits_bitpanda($params = array()) {
        return $this->request('account/deposits/bitpanda', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_withdrawals($params = array()) {
        return $this->request('account/withdrawals', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_withdrawals_bitpanda($params = array()) {
        return $this->request('account/withdrawals/bitpanda', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_fees($params = array()) {
        return $this->request('account/fees', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_orders($params = array()) {
        return $this->request('account/orders', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_orders_order_id($params = array()) {
        return $this->request('account/orders/{order_id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_orders_order_id_trades($params = array()) {
        return $this->request('account/orders/{order_id}/trades', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_trades($params = array()) {
        return $this->request('account/trades', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_trades_trade_id($params = array()) {
        return $this->request('account/trades/{trade_id}', 'private', 'GET', $params, null, null, array());
    }
    public function private_get_account_trading_volume($params = array()) {
        return $this->request('account/trading-volume', 'private', 'GET', $params, null, null, array());
    }
    public function private_post_account_deposit_crypto($params = array()) {
        return $this->request('account/deposit/crypto', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_account_withdraw_crypto($params = array()) {
        return $this->request('account/withdraw/crypto', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_account_withdraw_fiat($params = array()) {
        return $this->request('account/withdraw/fiat', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_account_fees($params = array()) {
        return $this->request('account/fees', 'private', 'POST', $params, null, null, array());
    }
    public function private_post_account_orders($params = array()) {
        return $this->request('account/orders', 'private', 'POST', $params, null, null, array());
    }
    public function private_delete_account_orders($params = array()) {
        return $this->request('account/orders', 'private', 'DELETE', $params, null, null, array());
    }
    public function private_delete_account_orders_order_id($params = array()) {
        return $this->request('account/orders/{order_id}', 'private', 'DELETE', $params, null, null, array());
    }
    public function private_delete_account_orders_client_client_id($params = array()) {
        return $this->request('account/orders/client/{client_id}', 'private', 'DELETE', $params, null, null, array());
    }
    public function publicGetCurrencies($params = array()) {
        return $this->request('currencies', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetCandlesticksInstrumentCode($params = array()) {
        return $this->request('candlesticks/{instrument_code}', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetFees($params = array()) {
        return $this->request('fees', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetInstruments($params = array()) {
        return $this->request('instruments', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetOrderBookInstrumentCode($params = array()) {
        return $this->request('order-book/{instrument_code}', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetMarketTicker($params = array()) {
        return $this->request('market-ticker', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetMarketTickerInstrumentCode($params = array()) {
        return $this->request('market-ticker/{instrument_code}', 'public', 'GET', $params, null, null, array());
    }
    public function publicGetTime($params = array()) {
        return $this->request('time', 'public', 'GET', $params, null, null, array());
    }
    public function privateGetAccountBalances($params = array()) {
        return $this->request('account/balances', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountDepositCryptoCurrencyCode($params = array()) {
        return $this->request('account/deposit/crypto/{currency_code}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountDepositFiatEUR($params = array()) {
        return $this->request('account/deposit/fiat/EUR', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountDeposits($params = array()) {
        return $this->request('account/deposits', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountDepositsBitpanda($params = array()) {
        return $this->request('account/deposits/bitpanda', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountWithdrawals($params = array()) {
        return $this->request('account/withdrawals', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountWithdrawalsBitpanda($params = array()) {
        return $this->request('account/withdrawals/bitpanda', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountFees($params = array()) {
        return $this->request('account/fees', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountOrders($params = array()) {
        return $this->request('account/orders', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountOrdersOrderId($params = array()) {
        return $this->request('account/orders/{order_id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountOrdersOrderIdTrades($params = array()) {
        return $this->request('account/orders/{order_id}/trades', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountTrades($params = array()) {
        return $this->request('account/trades', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountTradesTradeId($params = array()) {
        return $this->request('account/trades/{trade_id}', 'private', 'GET', $params, null, null, array());
    }
    public function privateGetAccountTradingVolume($params = array()) {
        return $this->request('account/trading-volume', 'private', 'GET', $params, null, null, array());
    }
    public function privatePostAccountDepositCrypto($params = array()) {
        return $this->request('account/deposit/crypto', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostAccountWithdrawCrypto($params = array()) {
        return $this->request('account/withdraw/crypto', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostAccountWithdrawFiat($params = array()) {
        return $this->request('account/withdraw/fiat', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostAccountFees($params = array()) {
        return $this->request('account/fees', 'private', 'POST', $params, null, null, array());
    }
    public function privatePostAccountOrders($params = array()) {
        return $this->request('account/orders', 'private', 'POST', $params, null, null, array());
    }
    public function privateDeleteAccountOrders($params = array()) {
        return $this->request('account/orders', 'private', 'DELETE', $params, null, null, array());
    }
    public function privateDeleteAccountOrdersOrderId($params = array()) {
        return $this->request('account/orders/{order_id}', 'private', 'DELETE', $params, null, null, array());
    }
    public function privateDeleteAccountOrdersClientClientId($params = array()) {
        return $this->request('account/orders/client/{client_id}', 'private', 'DELETE', $params, null, null, array());
    }
}
