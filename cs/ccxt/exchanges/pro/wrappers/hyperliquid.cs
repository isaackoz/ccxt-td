namespace ccxt.pro;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

public class  Hyperliquid: hyperliquid { public Hyperliquid(object args = null) : base(args) { } }
public partial class hyperliquid
{
    /// <summary>
    /// create a list of trade orders using WebSocket post request
    /// </summary>
    /// <remarks>
    /// See <see href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint#place-an-order"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Order>> CreateOrdersWs(List<OrderRequest> orders, Dictionary<string, object> parameters = null)
    {
        var res = await this.createOrdersWs(orders, parameters);
        return ((IList<object>)res).Select(item => new Order(item)).ToList<Order>();
    }
    public async Task<Order> CreateOrderWs(string symbol, string type, string side, double amount, double? price2 = 0, Dictionary<string, object> parameters = null)
    {
        var price = price2 == 0 ? null : (object)price2;
        var res = await this.createOrderWs(symbol, type, side, amount, price, parameters);
        return new Order(res);
    }
    public async Task<Order> EditOrderWs(string id, string symbol, string type, string side, double? amount2 = 0, double? price2 = 0, Dictionary<string, object> parameters = null)
    {
        var amount = amount2 == 0 ? null : (object)amount2;
        var price = price2 == 0 ? null : (object)price2;
        var res = await this.editOrderWs(id, symbol, type, side, amount, price, parameters);
        return new Order(res);
    }
    /// <summary>
    /// watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
    /// </summary>
    /// <remarks>
    /// See <see href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket/subscriptions"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of order book entries to return
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols.</returns>
    public async Task<ccxt.pro.IOrderBook> WatchOrderBook(string symbol, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.watchOrderBook(symbol, limit, parameters);
        return ((ccxt.pro.IOrderBook) res).Copy();
    }
    /// <summary>
    /// watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
    /// </summary>
    /// <remarks>
    /// See <see href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket/subscriptions"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}.</returns>
    public async Task<Ticker> WatchTicker(string symbol, Dictionary<string, object> parameters = null)
    {
        var res = await this.watchTicker(symbol, parameters);
        return new Ticker(res);
    }
    /// <summary>
    /// watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for all markets of a specific list
    /// </summary>
    /// <remarks>
    /// See <see href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket/subscriptions"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object</term> a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}.</returns>
    public async Task<Tickers> WatchTickers(List<String> symbols = null, Dictionary<string, object> parameters = null)
    {
        var res = await this.watchTickers(symbols, parameters);
        return new Tickers(res);
    }
    /// <summary>
    /// watches information on multiple trades made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket/subscriptions"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch orders for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of order structures to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.user</term>
    /// <description>
    /// string : user address, will default to this.walletAddress if not provided
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Trade>> WatchMyTrades(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.watchMyTrades(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Trade(item)).ToList<Trade>();
    }
    /// <summary>
    /// undefined
    /// </summary>
    /// <remarks>
    /// <list type="table">
    /// </list>
    /// </remarks>
    /// <returns> <term>undefined</term> undefined.</returns>
    public async Task<List<Trade>> WatchTrades(string symbol, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.watchTrades(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Trade(item)).ToList<Trade>();
    }
    /// <summary>
    /// watches historical candlestick data containing the open, high, low, close price, and the volume of a market
    /// </summary>
    /// <remarks>
    /// See <see href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket/subscriptions"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : timestamp in ms of the earliest candle to fetch
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum amount of candles to fetch
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>int[][]</term> A list of candles ordered as timestamp, open, high, low, close, volume.</returns>
    public async Task<List<OHLCV>> WatchOHLCV(string symbol, string timeframe = "1m", Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.watchOHLCV(symbol, timeframe, since, limit, parameters);
        return ((IList<object>)res).Select(item => new OHLCV(item)).ToList<OHLCV>();
    }
    /// <summary>
    /// watches information on multiple orders made by the user
    /// </summary>
    /// <remarks>
    /// See <see href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket/subscriptions"/>  <br/>
    /// <list type="table">
    /// <item>
    /// <term>since</term>
    /// <description>
    /// int : the earliest time in ms to fetch orders for
    /// </description>
    /// </item>
    /// <item>
    /// <term>limit</term>
    /// <description>
    /// int : the maximum number of order structures to retrieve
    /// </description>
    /// </item>
    /// <item>
    /// <term>params</term>
    /// <description>
    /// object : extra parameters specific to the exchange API endpoint
    /// </description>
    /// </item>
    /// <item>
    /// <term>params.user</term>
    /// <description>
    /// string : user address, will default to this.walletAddress if not provided
    /// </description>
    /// </item>
    /// </list>
    /// </remarks>
    /// <returns> <term>object[]</term> a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}.</returns>
    public async Task<List<Order>> WatchOrders(string symbol = null, Int64? since2 = 0, Int64? limit2 = 0, Dictionary<string, object> parameters = null)
    {
        var since = since2 == 0 ? null : (object)since2;
        var limit = limit2 == 0 ? null : (object)limit2;
        var res = await this.watchOrders(symbol, since, limit, parameters);
        return ((IList<object>)res).Select(item => new Order(item)).ToList<Order>();
    }
}
