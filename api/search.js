import fetch from 'node-fetch';

export default async function handler(req, res) {
  const query = req.query.q || "";
  if (!query) return res.status(400).json({ answer: "Brak zapytania." });

  const subscriptionKey = process.env.BING_API_KEY;
  const endpoint = "https://api.bing.microsoft.com/v7.0/search";

  const response = await fetch(`${endpoint}?q=${encodeURIComponent(query)}`, {
    headers: { "Ocp-Apim-Subscription-Key": subscriptionKey },
  });

  const data = await response.json();
  const snippet = data.webPages?.value?.[0]?.snippet || "Brak wyników.";

  res.status(200).json({ answer: snippet });
}
