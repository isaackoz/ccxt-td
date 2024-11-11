<?php

namespace ccxt\async\abstract;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


abstract class alpaca extends \ccxt\async\Exchange {
    public function trader_private_get_v2_account($params = array()) {
        return $this->request('v2/account', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_orders($params = array()) {
        return $this->request('v2/orders', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_orders_order_id($params = array()) {
        return $this->request('v2/orders/{order_id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_positions($params = array()) {
        return $this->request('v2/positions', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_positions_symbol_or_asset_id($params = array()) {
        return $this->request('v2/positions/{symbol_or_asset_id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_account_portfolio_history($params = array()) {
        return $this->request('v2/account/portfolio/history', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_watchlists($params = array()) {
        return $this->request('v2/watchlists', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_watchlists_watchlist_id($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_watchlists_by_name($params = array()) {
        return $this->request('v2/watchlists:by_name', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_account_configurations($params = array()) {
        return $this->request('v2/account/configurations', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_account_activities($params = array()) {
        return $this->request('v2/account/activities', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_account_activities_activity_type($params = array()) {
        return $this->request('v2/account/activities/{activity_type}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_calendar($params = array()) {
        return $this->request('v2/calendar', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_clock($params = array()) {
        return $this->request('v2/clock', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_assets($params = array()) {
        return $this->request('v2/assets', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_assets_symbol_or_asset_id($params = array()) {
        return $this->request('v2/assets/{symbol_or_asset_id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_corporate_actions_announcements_id($params = array()) {
        return $this->request('v2/corporate_actions/announcements/{id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_corporate_actions_announcements($params = array()) {
        return $this->request('v2/corporate_actions/announcements', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_wallets($params = array()) {
        return $this->request('v2/wallets', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_get_v2_wallets_transfers($params = array()) {
        return $this->request('v2/wallets/transfers', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function trader_private_post_v2_orders($params = array()) {
        return $this->request('v2/orders', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function trader_private_post_v2_watchlists($params = array()) {
        return $this->request('v2/watchlists', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function trader_private_post_v2_watchlists_watchlist_id($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function trader_private_post_v2_watchlists_by_name($params = array()) {
        return $this->request('v2/watchlists:by_name', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function trader_private_post_v2_wallets_transfers($params = array()) {
        return $this->request('v2/wallets/transfers', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function trader_private_put_v2_orders_order_id($params = array()) {
        return $this->request('v2/orders/{order_id}', array('trader', 'private'), 'PUT', $params, null, null, array());
    }
    public function trader_private_put_v2_watchlists_watchlist_id($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}', array('trader', 'private'), 'PUT', $params, null, null, array());
    }
    public function trader_private_put_v2_watchlists_by_name($params = array()) {
        return $this->request('v2/watchlists:by_name', array('trader', 'private'), 'PUT', $params, null, null, array());
    }
    public function trader_private_patch_v2_orders_order_id($params = array()) {
        return $this->request('v2/orders/{order_id}', array('trader', 'private'), 'PATCH', $params, null, null, array());
    }
    public function trader_private_patch_v2_account_configurations($params = array()) {
        return $this->request('v2/account/configurations', array('trader', 'private'), 'PATCH', $params, null, null, array());
    }
    public function trader_private_delete_v2_orders($params = array()) {
        return $this->request('v2/orders', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function trader_private_delete_v2_orders_order_id($params = array()) {
        return $this->request('v2/orders/{order_id}', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function trader_private_delete_v2_positions($params = array()) {
        return $this->request('v2/positions', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function trader_private_delete_v2_positions_symbol_or_asset_id($params = array()) {
        return $this->request('v2/positions/{symbol_or_asset_id}', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function trader_private_delete_v2_watchlists_watchlist_id($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function trader_private_delete_v2_watchlists_by_name($params = array()) {
        return $this->request('v2/watchlists:by_name', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function trader_private_delete_v2_watchlists_watchlist_id_symbol($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}/{symbol}', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function market_public_get_v1beta3_crypto_loc_bars($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/bars', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function market_public_get_v1beta3_crypto_loc_latest_bars($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/latest/bars', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function market_public_get_v1beta3_crypto_loc_latest_orderbooks($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/latest/orderbooks', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function market_public_get_v1beta3_crypto_loc_latest_quotes($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/latest/quotes', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function market_public_get_v1beta3_crypto_loc_latest_trades($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/latest/trades', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function market_public_get_v1beta3_crypto_loc_quotes($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/quotes', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function market_public_get_v1beta3_crypto_loc_snapshots($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/snapshots', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function market_public_get_v1beta3_crypto_loc_trades($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/trades', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v1beta1_corporate_actions($params = array()) {
        return $this->request('v1beta1/corporate-actions', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v1beta1_forex_latest_rates($params = array()) {
        return $this->request('v1beta1/forex/latest/rates', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v1beta1_forex_rates($params = array()) {
        return $this->request('v1beta1/forex/rates', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v1beta1_logos_symbol($params = array()) {
        return $this->request('v1beta1/logos/{symbol}', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v1beta1_news($params = array()) {
        return $this->request('v1beta1/news', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v1beta1_screener_stocks_most_actives($params = array()) {
        return $this->request('v1beta1/screener/stocks/most-actives', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v1beta1_screener_market_type_movers($params = array()) {
        return $this->request('v1beta1/screener/{market_type}/movers', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_auctions($params = array()) {
        return $this->request('v2/stocks/auctions', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_bars($params = array()) {
        return $this->request('v2/stocks/bars', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_bars_latest($params = array()) {
        return $this->request('v2/stocks/bars/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_meta_conditions_ticktype($params = array()) {
        return $this->request('v2/stocks/meta/conditions/{ticktype}', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_meta_exchanges($params = array()) {
        return $this->request('v2/stocks/meta/exchanges', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_quotes($params = array()) {
        return $this->request('v2/stocks/quotes', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_quotes_latest($params = array()) {
        return $this->request('v2/stocks/quotes/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_snapshots($params = array()) {
        return $this->request('v2/stocks/snapshots', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_trades($params = array()) {
        return $this->request('v2/stocks/trades', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_trades_latest($params = array()) {
        return $this->request('v2/stocks/trades/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_symbol_auctions($params = array()) {
        return $this->request('v2/stocks/{symbol}/auctions', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_symbol_bars($params = array()) {
        return $this->request('v2/stocks/{symbol}/bars', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_symbol_bars_latest($params = array()) {
        return $this->request('v2/stocks/{symbol}/bars/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_symbol_quotes($params = array()) {
        return $this->request('v2/stocks/{symbol}/quotes', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_symbol_quotes_latest($params = array()) {
        return $this->request('v2/stocks/{symbol}/quotes/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_symbol_snapshot($params = array()) {
        return $this->request('v2/stocks/{symbol}/snapshot', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_symbol_trades($params = array()) {
        return $this->request('v2/stocks/{symbol}/trades', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function market_private_get_v2_stocks_symbol_trades_latest($params = array()) {
        return $this->request('v2/stocks/{symbol}/trades/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2Account($params = array()) {
        return $this->request('v2/account', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2Orders($params = array()) {
        return $this->request('v2/orders', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2OrdersOrderId($params = array()) {
        return $this->request('v2/orders/{order_id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2Positions($params = array()) {
        return $this->request('v2/positions', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2PositionsSymbolOrAssetId($params = array()) {
        return $this->request('v2/positions/{symbol_or_asset_id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2AccountPortfolioHistory($params = array()) {
        return $this->request('v2/account/portfolio/history', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2Watchlists($params = array()) {
        return $this->request('v2/watchlists', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2WatchlistsWatchlistId($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2WatchlistsByName($params = array()) {
        return $this->request('v2/watchlists:by_name', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2AccountConfigurations($params = array()) {
        return $this->request('v2/account/configurations', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2AccountActivities($params = array()) {
        return $this->request('v2/account/activities', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2AccountActivitiesActivityType($params = array()) {
        return $this->request('v2/account/activities/{activity_type}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2Calendar($params = array()) {
        return $this->request('v2/calendar', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2Clock($params = array()) {
        return $this->request('v2/clock', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2Assets($params = array()) {
        return $this->request('v2/assets', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2AssetsSymbolOrAssetId($params = array()) {
        return $this->request('v2/assets/{symbol_or_asset_id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2CorporateActionsAnnouncementsId($params = array()) {
        return $this->request('v2/corporate_actions/announcements/{id}', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2CorporateActionsAnnouncements($params = array()) {
        return $this->request('v2/corporate_actions/announcements', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2Wallets($params = array()) {
        return $this->request('v2/wallets', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivateGetV2WalletsTransfers($params = array()) {
        return $this->request('v2/wallets/transfers', array('trader', 'private'), 'GET', $params, null, null, array());
    }
    public function traderPrivatePostV2Orders($params = array()) {
        return $this->request('v2/orders', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function traderPrivatePostV2Watchlists($params = array()) {
        return $this->request('v2/watchlists', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function traderPrivatePostV2WatchlistsWatchlistId($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function traderPrivatePostV2WatchlistsByName($params = array()) {
        return $this->request('v2/watchlists:by_name', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function traderPrivatePostV2WalletsTransfers($params = array()) {
        return $this->request('v2/wallets/transfers', array('trader', 'private'), 'POST', $params, null, null, array());
    }
    public function traderPrivatePutV2OrdersOrderId($params = array()) {
        return $this->request('v2/orders/{order_id}', array('trader', 'private'), 'PUT', $params, null, null, array());
    }
    public function traderPrivatePutV2WatchlistsWatchlistId($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}', array('trader', 'private'), 'PUT', $params, null, null, array());
    }
    public function traderPrivatePutV2WatchlistsByName($params = array()) {
        return $this->request('v2/watchlists:by_name', array('trader', 'private'), 'PUT', $params, null, null, array());
    }
    public function traderPrivatePatchV2OrdersOrderId($params = array()) {
        return $this->request('v2/orders/{order_id}', array('trader', 'private'), 'PATCH', $params, null, null, array());
    }
    public function traderPrivatePatchV2AccountConfigurations($params = array()) {
        return $this->request('v2/account/configurations', array('trader', 'private'), 'PATCH', $params, null, null, array());
    }
    public function traderPrivateDeleteV2Orders($params = array()) {
        return $this->request('v2/orders', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function traderPrivateDeleteV2OrdersOrderId($params = array()) {
        return $this->request('v2/orders/{order_id}', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function traderPrivateDeleteV2Positions($params = array()) {
        return $this->request('v2/positions', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function traderPrivateDeleteV2PositionsSymbolOrAssetId($params = array()) {
        return $this->request('v2/positions/{symbol_or_asset_id}', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function traderPrivateDeleteV2WatchlistsWatchlistId($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function traderPrivateDeleteV2WatchlistsByName($params = array()) {
        return $this->request('v2/watchlists:by_name', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function traderPrivateDeleteV2WatchlistsWatchlistIdSymbol($params = array()) {
        return $this->request('v2/watchlists/{watchlist_id}/{symbol}', array('trader', 'private'), 'DELETE', $params, null, null, array());
    }
    public function marketPublicGetV1beta3CryptoLocBars($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/bars', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function marketPublicGetV1beta3CryptoLocLatestBars($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/latest/bars', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function marketPublicGetV1beta3CryptoLocLatestOrderbooks($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/latest/orderbooks', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function marketPublicGetV1beta3CryptoLocLatestQuotes($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/latest/quotes', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function marketPublicGetV1beta3CryptoLocLatestTrades($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/latest/trades', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function marketPublicGetV1beta3CryptoLocQuotes($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/quotes', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function marketPublicGetV1beta3CryptoLocSnapshots($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/snapshots', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function marketPublicGetV1beta3CryptoLocTrades($params = array()) {
        return $this->request('v1beta3/crypto/{loc}/trades', array('market', 'public'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV1beta1CorporateActions($params = array()) {
        return $this->request('v1beta1/corporate-actions', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV1beta1ForexLatestRates($params = array()) {
        return $this->request('v1beta1/forex/latest/rates', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV1beta1ForexRates($params = array()) {
        return $this->request('v1beta1/forex/rates', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV1beta1LogosSymbol($params = array()) {
        return $this->request('v1beta1/logos/{symbol}', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV1beta1News($params = array()) {
        return $this->request('v1beta1/news', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV1beta1ScreenerStocksMostActives($params = array()) {
        return $this->request('v1beta1/screener/stocks/most-actives', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV1beta1ScreenerMarketTypeMovers($params = array()) {
        return $this->request('v1beta1/screener/{market_type}/movers', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksAuctions($params = array()) {
        return $this->request('v2/stocks/auctions', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksBars($params = array()) {
        return $this->request('v2/stocks/bars', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksBarsLatest($params = array()) {
        return $this->request('v2/stocks/bars/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksMetaConditionsTicktype($params = array()) {
        return $this->request('v2/stocks/meta/conditions/{ticktype}', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksMetaExchanges($params = array()) {
        return $this->request('v2/stocks/meta/exchanges', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksQuotes($params = array()) {
        return $this->request('v2/stocks/quotes', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksQuotesLatest($params = array()) {
        return $this->request('v2/stocks/quotes/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSnapshots($params = array()) {
        return $this->request('v2/stocks/snapshots', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksTrades($params = array()) {
        return $this->request('v2/stocks/trades', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksTradesLatest($params = array()) {
        return $this->request('v2/stocks/trades/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSymbolAuctions($params = array()) {
        return $this->request('v2/stocks/{symbol}/auctions', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSymbolBars($params = array()) {
        return $this->request('v2/stocks/{symbol}/bars', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSymbolBarsLatest($params = array()) {
        return $this->request('v2/stocks/{symbol}/bars/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSymbolQuotes($params = array()) {
        return $this->request('v2/stocks/{symbol}/quotes', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSymbolQuotesLatest($params = array()) {
        return $this->request('v2/stocks/{symbol}/quotes/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSymbolSnapshot($params = array()) {
        return $this->request('v2/stocks/{symbol}/snapshot', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSymbolTrades($params = array()) {
        return $this->request('v2/stocks/{symbol}/trades', array('market', 'private'), 'GET', $params, null, null, array());
    }
    public function marketPrivateGetV2StocksSymbolTradesLatest($params = array()) {
        return $this->request('v2/stocks/{symbol}/trades/latest', array('market', 'private'), 'GET', $params, null, null, array());
    }
}
