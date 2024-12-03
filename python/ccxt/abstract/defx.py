from ccxt.base.types import Entry


class ImplicitAPI:
    v1_public_get_healthcheck_ping = v1PublicGetHealthcheckPing = Entry('healthcheck/ping', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_symbols_symbol_ohlc = v1PublicGetSymbolsSymbolOhlc = Entry('symbols/{symbol}/ohlc', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_symbols_symbol_trades = v1PublicGetSymbolsSymbolTrades = Entry('symbols/{symbol}/trades', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_symbols_symbol_prices = v1PublicGetSymbolsSymbolPrices = Entry('symbols/{symbol}/prices', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_symbols_symbol_ticker_24hr = v1PublicGetSymbolsSymbolTicker24hr = Entry('symbols/{symbol}/ticker/24hr', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_symbols_symbol_depth_level_slab = v1PublicGetSymbolsSymbolDepthLevelSlab = Entry('symbols/{symbol}/depth/{level}/{slab}', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_ticker_24hragg = v1PublicGetTicker24HrAgg = Entry('ticker/24HrAgg', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_c_markets = v1PublicGetCMarkets = Entry('c/markets', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_c_markets_metadata = v1PublicGetCMarketsMetadata = Entry('c/markets/metadata', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_newusers = v1PublicGetAnalyticsMarketStatsNewUsers = Entry('analytics/market/stats/newUsers', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_tvl = v1PublicGetAnalyticsMarketStatsTvl = Entry('analytics/market/stats/tvl', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_volumebyinstrument = v1PublicGetAnalyticsMarketStatsVolumeByInstrument = Entry('analytics/market/stats/volumeByInstrument', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_liquidation = v1PublicGetAnalyticsMarketStatsLiquidation = Entry('analytics/market/stats/liquidation', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_totalvolume = v1PublicGetAnalyticsMarketStatsTotalVolume = Entry('analytics/market/stats/totalVolume', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_openinterest = v1PublicGetAnalyticsMarketStatsOpenInterest = Entry('analytics/market/stats/openInterest', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_totaltrades = v1PublicGetAnalyticsMarketStatsTotalTrades = Entry('analytics/market/stats/totalTrades', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_basis = v1PublicGetAnalyticsMarketStatsBasis = Entry('analytics/market/stats/basis', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_insurancefund = v1PublicGetAnalyticsMarketStatsInsuranceFund = Entry('analytics/market/stats/insuranceFund', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_longandshortratio = v1PublicGetAnalyticsMarketStatsLongAndShortRatio = Entry('analytics/market/stats/longAndShortRatio', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_stats_fundingrate = v1PublicGetAnalyticsMarketStatsFundingRate = Entry('analytics/market/stats/fundingRate', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_analytics_market_overview = v1PublicGetAnalyticsMarketOverview = Entry('analytics/market/overview', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_explorer_search = v1PublicGetExplorerSearch = Entry('explorer/search', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_explorer_transactions = v1PublicGetExplorerTransactions = Entry('explorer/transactions', ['v1', 'public'], 'GET', {'cost': 1})
    v1_public_get_explorer_blocks = v1PublicGetExplorerBlocks = Entry('explorer/blocks', ['v1', 'public'], 'GET', {'cost': 1})
    v1_private_get_api_order_orderid = v1PrivateGetApiOrderOrderId = Entry('api/order/{orderId}', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_orders = v1PrivateGetApiOrders = Entry('api/orders', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_orders_oco_parentorderid = v1PrivateGetApiOrdersOcoParentOrderId = Entry('api/orders/oco/{parentOrderId}', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_trades = v1PrivateGetApiTrades = Entry('api/trades', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_position_active = v1PrivateGetApiPositionActive = Entry('api/position/active', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_users_metadata_leverage = v1PrivateGetApiUsersMetadataLeverage = Entry('api/users/metadata/leverage', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_users_metadata_feemultiplier = v1PrivateGetApiUsersMetadataFeeMultiplier = Entry('api/users/metadata/feeMultiplier', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_users_metadata_slippage = v1PrivateGetApiUsersMetadataSlippage = Entry('api/users/metadata/slippage', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_users_referral = v1PrivateGetApiUsersReferral = Entry('api/users/referral', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_users_apikeys = v1PrivateGetApiUsersApikeys = Entry('api/users/apikeys', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_connection_signature_message_evm = v1PrivateGetConnectionSignatureMessageEvm = Entry('connection-signature-message/evm', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_users_profile_wallets = v1PrivateGetApiUsersProfileWallets = Entry('api/users/profile/wallets', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_notifications = v1PrivateGetApiNotifications = Entry('api/notifications', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_wallet_balance = v1PrivateGetApiWalletBalance = Entry('api/wallet/balance', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_wallet_transactions = v1PrivateGetApiWalletTransactions = Entry('api/wallet/transactions', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_analytics_user_overview = v1PrivateGetApiAnalyticsUserOverview = Entry('api/analytics/user/overview', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_analytics_user_pnl = v1PrivateGetApiAnalyticsUserPnl = Entry('api/analytics/user/pnl', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_analytics_points_overview = v1PrivateGetApiAnalyticsPointsOverview = Entry('api/analytics/points/overview', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_get_api_analytics_points_history = v1PrivateGetApiAnalyticsPointsHistory = Entry('api/analytics/points/history', ['v1', 'private'], 'GET', {'cost': 1})
    v1_private_post_api_order = v1PrivatePostApiOrder = Entry('api/order', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_position_oco = v1PrivatePostApiPositionOco = Entry('api/position/oco', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_users_socket_listenkeys = v1PrivatePostApiUsersSocketListenKeys = Entry('api/users/socket/listenKeys', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_users_metadata_leverage = v1PrivatePostApiUsersMetadataLeverage = Entry('api/users/metadata/leverage', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_users_metadata_feemultiplier = v1PrivatePostApiUsersMetadataFeeMultiplier = Entry('api/users/metadata/feeMultiplier', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_users_metadata_slippage = v1PrivatePostApiUsersMetadataSlippage = Entry('api/users/metadata/slippage', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_users_referral_recordreferralsignup = v1PrivatePostApiUsersReferralRecordReferralSignup = Entry('api/users/referral/recordReferralSignup', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_users_apikeys = v1PrivatePostApiUsersApikeys = Entry('api/users/apikeys', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_users_profile_wallets = v1PrivatePostApiUsersProfileWallets = Entry('api/users/profile/wallets', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_transfers_withdrawal = v1PrivatePostApiTransfersWithdrawal = Entry('api/transfers/withdrawal', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_post_api_transfers_bridge_withdrawal = v1PrivatePostApiTransfersBridgeWithdrawal = Entry('api/transfers/bridge/withdrawal', ['v1', 'private'], 'POST', {'cost': 1})
    v1_private_put_api_position_updatepositionmargin = v1PrivatePutApiPositionUpdatePositionMargin = Entry('api/position/updatePositionMargin', ['v1', 'private'], 'PUT', {'cost': 1})
    v1_private_put_api_users_socket_listenkeys_listenkey = v1PrivatePutApiUsersSocketListenKeysListenKey = Entry('api/users/socket/listenKeys/{listenKey}', ['v1', 'private'], 'PUT', {'cost': 1})
    v1_private_put_api_users_apikeys_accesskey_status = v1PrivatePutApiUsersApikeysAccessKeyStatus = Entry('api/users/apikeys/{accessKey}/status', ['v1', 'private'], 'PUT', {'cost': 1})
    v1_private_put_api_users_referral = v1PrivatePutApiUsersReferral = Entry('api/users/referral', ['v1', 'private'], 'PUT', {'cost': 1})
    v1_private_patch_api_users_apikeys_accesskey = v1PrivatePatchApiUsersApikeysAccessKey = Entry('api/users/apikeys/{accessKey}', ['v1', 'private'], 'PATCH', {'cost': 1})
    v1_private_delete_api_orders_allopen = v1PrivateDeleteApiOrdersAllOpen = Entry('api/orders/allOpen', ['v1', 'private'], 'DELETE', {'cost': 1})
    v1_private_delete_api_order_orderid = v1PrivateDeleteApiOrderOrderId = Entry('api/order/{orderId}', ['v1', 'private'], 'DELETE', {'cost': 1})
    v1_private_delete_api_position_positionid = v1PrivateDeleteApiPositionPositionId = Entry('api/position/{positionId}', ['v1', 'private'], 'DELETE', {'cost': 1})
    v1_private_delete_api_position_all = v1PrivateDeleteApiPositionAll = Entry('api/position/all', ['v1', 'private'], 'DELETE', {'cost': 1})
    v1_private_delete_api_users_socket_listenkeys_listenkey = v1PrivateDeleteApiUsersSocketListenKeysListenKey = Entry('api/users/socket/listenKeys/{listenKey}', ['v1', 'private'], 'DELETE', {'cost': 1})
    v1_private_delete_api_users_apikeys_accesskey = v1PrivateDeleteApiUsersApikeysAccessKey = Entry('api/users/apikeys/{accessKey}', ['v1', 'private'], 'DELETE', {'cost': 1})
