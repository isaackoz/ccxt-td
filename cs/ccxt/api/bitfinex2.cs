// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

namespace ccxt;

public partial class bitfinex2 : Exchange
{
    public bitfinex2 (object args = null): base(args) {}

    public async Task<object> publicGetConfConfig (object parameters = null)
    {
        return await this.callAsync ("publicGetConfConfig",parameters);
    }

    public async Task<object> publicGetConfPubActionObject (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubActionObject",parameters);
    }

    public async Task<object> publicGetConfPubActionObjectDetail (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubActionObjectDetail",parameters);
    }

    public async Task<object> publicGetConfPubMapObject (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapObject",parameters);
    }

    public async Task<object> publicGetConfPubMapObjectDetail (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapObjectDetail",parameters);
    }

    public async Task<object> publicGetConfPubMapCurrencyDetail (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapCurrencyDetail",parameters);
    }

    public async Task<object> publicGetConfPubMapCurrencySym (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapCurrencySym",parameters);
    }

    public async Task<object> publicGetConfPubMapCurrencyLabel (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapCurrencyLabel",parameters);
    }

    public async Task<object> publicGetConfPubMapCurrencyUnit (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapCurrencyUnit",parameters);
    }

    public async Task<object> publicGetConfPubMapCurrencyUndl (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapCurrencyUndl",parameters);
    }

    public async Task<object> publicGetConfPubMapCurrencyPool (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapCurrencyPool",parameters);
    }

    public async Task<object> publicGetConfPubMapCurrencyExplorer (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapCurrencyExplorer",parameters);
    }

    public async Task<object> publicGetConfPubMapCurrencyTxFee (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapCurrencyTxFee",parameters);
    }

    public async Task<object> publicGetConfPubMapTxMethod (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubMapTxMethod",parameters);
    }

    public async Task<object> publicGetConfPubListObject (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubListObject",parameters);
    }

    public async Task<object> publicGetConfPubListObjectDetail (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubListObjectDetail",parameters);
    }

    public async Task<object> publicGetConfPubListCurrency (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubListCurrency",parameters);
    }

    public async Task<object> publicGetConfPubListPairExchange (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubListPairExchange",parameters);
    }

    public async Task<object> publicGetConfPubListPairMargin (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubListPairMargin",parameters);
    }

    public async Task<object> publicGetConfPubListPairFutures (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubListPairFutures",parameters);
    }

    public async Task<object> publicGetConfPubListCompetitions (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubListCompetitions",parameters);
    }

    public async Task<object> publicGetConfPubInfoObject (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubInfoObject",parameters);
    }

    public async Task<object> publicGetConfPubInfoObjectDetail (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubInfoObjectDetail",parameters);
    }

    public async Task<object> publicGetConfPubInfoPair (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubInfoPair",parameters);
    }

    public async Task<object> publicGetConfPubInfoPairFutures (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubInfoPairFutures",parameters);
    }

    public async Task<object> publicGetConfPubInfoTxStatus (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubInfoTxStatus",parameters);
    }

    public async Task<object> publicGetConfPubFees (object parameters = null)
    {
        return await this.callAsync ("publicGetConfPubFees",parameters);
    }

    public async Task<object> publicGetPlatformStatus (object parameters = null)
    {
        return await this.callAsync ("publicGetPlatformStatus",parameters);
    }

    public async Task<object> publicGetTickers (object parameters = null)
    {
        return await this.callAsync ("publicGetTickers",parameters);
    }

    public async Task<object> publicGetTickerSymbol (object parameters = null)
    {
        return await this.callAsync ("publicGetTickerSymbol",parameters);
    }

    public async Task<object> publicGetTickersHist (object parameters = null)
    {
        return await this.callAsync ("publicGetTickersHist",parameters);
    }

    public async Task<object> publicGetTradesSymbolHist (object parameters = null)
    {
        return await this.callAsync ("publicGetTradesSymbolHist",parameters);
    }

    public async Task<object> publicGetBookSymbolPrecision (object parameters = null)
    {
        return await this.callAsync ("publicGetBookSymbolPrecision",parameters);
    }

    public async Task<object> publicGetBookSymbolP0 (object parameters = null)
    {
        return await this.callAsync ("publicGetBookSymbolP0",parameters);
    }

    public async Task<object> publicGetBookSymbolP1 (object parameters = null)
    {
        return await this.callAsync ("publicGetBookSymbolP1",parameters);
    }

    public async Task<object> publicGetBookSymbolP2 (object parameters = null)
    {
        return await this.callAsync ("publicGetBookSymbolP2",parameters);
    }

    public async Task<object> publicGetBookSymbolP3 (object parameters = null)
    {
        return await this.callAsync ("publicGetBookSymbolP3",parameters);
    }

    public async Task<object> publicGetBookSymbolR0 (object parameters = null)
    {
        return await this.callAsync ("publicGetBookSymbolR0",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolSideSection (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolSideSection",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolSideLast (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolSideLast",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolSideHist (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolSideHist",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolSection (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolSection",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolLast (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolLast",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolHist (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolHist",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolLongLast (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolLongLast",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolLongHist (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolLongHist",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolShortLast (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolShortLast",parameters);
    }

    public async Task<object> publicGetStats1KeySizeSymbolShortHist (object parameters = null)
    {
        return await this.callAsync ("publicGetStats1KeySizeSymbolShortHist",parameters);
    }

    public async Task<object> publicGetCandlesTradeTimeframeSymbolPeriodSection (object parameters = null)
    {
        return await this.callAsync ("publicGetCandlesTradeTimeframeSymbolPeriodSection",parameters);
    }

    public async Task<object> publicGetCandlesTradeTimeframeSymbolSection (object parameters = null)
    {
        return await this.callAsync ("publicGetCandlesTradeTimeframeSymbolSection",parameters);
    }

    public async Task<object> publicGetCandlesTradeTimeframeSymbolLast (object parameters = null)
    {
        return await this.callAsync ("publicGetCandlesTradeTimeframeSymbolLast",parameters);
    }

    public async Task<object> publicGetCandlesTradeTimeframeSymbolHist (object parameters = null)
    {
        return await this.callAsync ("publicGetCandlesTradeTimeframeSymbolHist",parameters);
    }

    public async Task<object> publicGetStatusType (object parameters = null)
    {
        return await this.callAsync ("publicGetStatusType",parameters);
    }

    public async Task<object> publicGetStatusDeriv (object parameters = null)
    {
        return await this.callAsync ("publicGetStatusDeriv",parameters);
    }

    public async Task<object> publicGetStatusDerivSymbolHist (object parameters = null)
    {
        return await this.callAsync ("publicGetStatusDerivSymbolHist",parameters);
    }

    public async Task<object> publicGetLiquidationsHist (object parameters = null)
    {
        return await this.callAsync ("publicGetLiquidationsHist",parameters);
    }

    public async Task<object> publicGetRankingsKeyTimeframeSymbolSection (object parameters = null)
    {
        return await this.callAsync ("publicGetRankingsKeyTimeframeSymbolSection",parameters);
    }

    public async Task<object> publicGetRankingsKeyTimeframeSymbolHist (object parameters = null)
    {
        return await this.callAsync ("publicGetRankingsKeyTimeframeSymbolHist",parameters);
    }

    public async Task<object> publicGetPulseHist (object parameters = null)
    {
        return await this.callAsync ("publicGetPulseHist",parameters);
    }

    public async Task<object> publicGetPulseProfileNickname (object parameters = null)
    {
        return await this.callAsync ("publicGetPulseProfileNickname",parameters);
    }

    public async Task<object> publicGetFundingStatsSymbolHist (object parameters = null)
    {
        return await this.callAsync ("publicGetFundingStatsSymbolHist",parameters);
    }

    public async Task<object> publicGetExtVasps (object parameters = null)
    {
        return await this.callAsync ("publicGetExtVasps",parameters);
    }

    public async Task<object> publicPostCalcTradeAvg (object parameters = null)
    {
        return await this.callAsync ("publicPostCalcTradeAvg",parameters);
    }

    public async Task<object> publicPostCalcFx (object parameters = null)
    {
        return await this.callAsync ("publicPostCalcFx",parameters);
    }

    public async Task<object> privatePostAuthRWallets (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRWallets",parameters);
    }

    public async Task<object> privatePostAuthRWalletsHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRWalletsHist",parameters);
    }

    public async Task<object> privatePostAuthROrders (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthROrders",parameters);
    }

    public async Task<object> privatePostAuthROrdersSymbol (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthROrdersSymbol",parameters);
    }

    public async Task<object> privatePostAuthWOrderSubmit (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWOrderSubmit",parameters);
    }

    public async Task<object> privatePostAuthWOrderUpdate (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWOrderUpdate",parameters);
    }

    public async Task<object> privatePostAuthWOrderCancel (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWOrderCancel",parameters);
    }

    public async Task<object> privatePostAuthWOrderMulti (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWOrderMulti",parameters);
    }

    public async Task<object> privatePostAuthWOrderCancelMulti (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWOrderCancelMulti",parameters);
    }

    public async Task<object> privatePostAuthROrdersSymbolHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthROrdersSymbolHist",parameters);
    }

    public async Task<object> privatePostAuthROrdersHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthROrdersHist",parameters);
    }

    public async Task<object> privatePostAuthROrderSymbolIdTrades (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthROrderSymbolIdTrades",parameters);
    }

    public async Task<object> privatePostAuthRTradesSymbolHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRTradesSymbolHist",parameters);
    }

    public async Task<object> privatePostAuthRTradesHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRTradesHist",parameters);
    }

    public async Task<object> privatePostAuthRLedgersCurrencyHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRLedgersCurrencyHist",parameters);
    }

    public async Task<object> privatePostAuthRLedgersHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRLedgersHist",parameters);
    }

    public async Task<object> privatePostAuthRInfoMarginKey (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRInfoMarginKey",parameters);
    }

    public async Task<object> privatePostAuthRInfoMarginBase (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRInfoMarginBase",parameters);
    }

    public async Task<object> privatePostAuthRInfoMarginSymAll (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRInfoMarginSymAll",parameters);
    }

    public async Task<object> privatePostAuthRPositions (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRPositions",parameters);
    }

    public async Task<object> privatePostAuthWPositionClaim (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWPositionClaim",parameters);
    }

    public async Task<object> privatePostAuthWPositionIncrease (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWPositionIncrease",parameters);
    }

    public async Task<object> privatePostAuthRPositionIncreaseInfo (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRPositionIncreaseInfo",parameters);
    }

    public async Task<object> privatePostAuthRPositionsHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRPositionsHist",parameters);
    }

    public async Task<object> privatePostAuthRPositionsAudit (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRPositionsAudit",parameters);
    }

    public async Task<object> privatePostAuthRPositionsSnap (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRPositionsSnap",parameters);
    }

    public async Task<object> privatePostAuthWDerivCollateralSet (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWDerivCollateralSet",parameters);
    }

    public async Task<object> privatePostAuthWDerivCollateralLimits (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWDerivCollateralLimits",parameters);
    }

    public async Task<object> privatePostAuthRFundingOffers (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingOffers",parameters);
    }

    public async Task<object> privatePostAuthRFundingOffersSymbol (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingOffersSymbol",parameters);
    }

    public async Task<object> privatePostAuthWFundingOfferSubmit (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWFundingOfferSubmit",parameters);
    }

    public async Task<object> privatePostAuthWFundingOfferCancel (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWFundingOfferCancel",parameters);
    }

    public async Task<object> privatePostAuthWFundingOfferCancelAll (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWFundingOfferCancelAll",parameters);
    }

    public async Task<object> privatePostAuthWFundingClose (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWFundingClose",parameters);
    }

    public async Task<object> privatePostAuthWFundingAuto (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWFundingAuto",parameters);
    }

    public async Task<object> privatePostAuthWFundingKeep (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWFundingKeep",parameters);
    }

    public async Task<object> privatePostAuthRFundingOffersSymbolHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingOffersSymbolHist",parameters);
    }

    public async Task<object> privatePostAuthRFundingOffersHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingOffersHist",parameters);
    }

    public async Task<object> privatePostAuthRFundingLoans (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingLoans",parameters);
    }

    public async Task<object> privatePostAuthRFundingLoansHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingLoansHist",parameters);
    }

    public async Task<object> privatePostAuthRFundingLoansSymbol (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingLoansSymbol",parameters);
    }

    public async Task<object> privatePostAuthRFundingLoansSymbolHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingLoansSymbolHist",parameters);
    }

    public async Task<object> privatePostAuthRFundingCredits (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingCredits",parameters);
    }

    public async Task<object> privatePostAuthRFundingCreditsHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingCreditsHist",parameters);
    }

    public async Task<object> privatePostAuthRFundingCreditsSymbol (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingCreditsSymbol",parameters);
    }

    public async Task<object> privatePostAuthRFundingCreditsSymbolHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingCreditsSymbolHist",parameters);
    }

    public async Task<object> privatePostAuthRFundingTradesSymbolHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingTradesSymbolHist",parameters);
    }

    public async Task<object> privatePostAuthRFundingTradesHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRFundingTradesHist",parameters);
    }

    public async Task<object> privatePostAuthRInfoFundingKey (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRInfoFundingKey",parameters);
    }

    public async Task<object> privatePostAuthRInfoUser (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRInfoUser",parameters);
    }

    public async Task<object> privatePostAuthRSummary (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRSummary",parameters);
    }

    public async Task<object> privatePostAuthRLoginsHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRLoginsHist",parameters);
    }

    public async Task<object> privatePostAuthRPermissions (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRPermissions",parameters);
    }

    public async Task<object> privatePostAuthWToken (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWToken",parameters);
    }

    public async Task<object> privatePostAuthRAuditHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRAuditHist",parameters);
    }

    public async Task<object> privatePostAuthWTransfer (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWTransfer",parameters);
    }

    public async Task<object> privatePostAuthWDepositAddress (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWDepositAddress",parameters);
    }

    public async Task<object> privatePostAuthWDepositInvoice (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWDepositInvoice",parameters);
    }

    public async Task<object> privatePostAuthWWithdraw (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWWithdraw",parameters);
    }

    public async Task<object> privatePostAuthRMovementsCurrencyHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRMovementsCurrencyHist",parameters);
    }

    public async Task<object> privatePostAuthRMovementsHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRMovementsHist",parameters);
    }

    public async Task<object> privatePostAuthRAlerts (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRAlerts",parameters);
    }

    public async Task<object> privatePostAuthWAlertSet (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWAlertSet",parameters);
    }

    public async Task<object> privatePostAuthWAlertPriceSymbolPriceDel (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWAlertPriceSymbolPriceDel",parameters);
    }

    public async Task<object> privatePostAuthWAlertTypeSymbolPriceDel (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWAlertTypeSymbolPriceDel",parameters);
    }

    public async Task<object> privatePostAuthCalcOrderAvail (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthCalcOrderAvail",parameters);
    }

    public async Task<object> privatePostAuthWSettingsSet (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWSettingsSet",parameters);
    }

    public async Task<object> privatePostAuthRSettings (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRSettings",parameters);
    }

    public async Task<object> privatePostAuthWSettingsDel (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWSettingsDel",parameters);
    }

    public async Task<object> privatePostAuthRPulseHist (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthRPulseHist",parameters);
    }

    public async Task<object> privatePostAuthWPulseAdd (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWPulseAdd",parameters);
    }

    public async Task<object> privatePostAuthWPulseDel (object parameters = null)
    {
        return await this.callAsync ("privatePostAuthWPulseDel",parameters);
    }

}