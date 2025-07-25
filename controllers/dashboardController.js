const axios = require("axios");

class DashboardController {
  async getStockQuotes(req, res) {
    try {
      console.log(req.query, "cvascsacsacs");
      let symbols = req.query.symbols;
      const response = await axios.get(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes",
        {
          params: {
            region: "IND",
            symbols: symbols,
          },
          headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        }
      );

      const result = response.data?.quoteResponse?.result || [];
      console.log(result, "result");
      const formatted = result.map((stock) => ({
        symbol: stock.symbol,
        name: stock.shortName,
        cmp: stock.regularMarketPrice,
        peRatio: stock.trailingPE,
        earnings: stock.epsTrailingTwelveMonths,
        exchange: stock.fullExchangeName,
      }));

      return res.status(200).json({ success: true, data: formatted });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch stock data",
      });
    }
  }
}

module.exports = new DashboardController();
