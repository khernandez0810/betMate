import axios from "axios";

const SPORT_MAP = {
  nfl: "americanfootball_nfl",
  ncaa: "americanfootball_ncaaf",
  epl: "soccer_epl",
  mlb: "baseball_mlb",
  mma: "mma_mixed_martial_arts",
};

export default async function handler(req, res) {
  const { sport } = req.query;

  const sportKey = SPORT_MAP[sport];
  if (!sportKey) return res.status(400).json({ error: "Invalid sport" });

  try {
    const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds`;

    const response = await axios.get(url, {
      params: {
        apiKey: process.env.ODDS_API_KEY,
        regions: "us",
        markets: "h2h,spreads,totals",
        oddsFormat: "american",
        bookmakers: "draftkings",
      },
    });

    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
    return res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    return res.status(status).json({
      error: "Failed to fetch odds",
      details: err.response?.data || err.message,
    });
  }
}
