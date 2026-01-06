export default async function handler(req, res) {
  const { secret } = req.query;

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "Missing SANITY_API_WRITE_TOKEN" });
  }

  const query = '*[_type == "news"] | order(_createdAt desc)';
  const url =
    "https://hun2hrsa.api.sanity.io/v2021-10-21/data/query/production?perspective=drafts&query=" +
    encodeURIComponent(query);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ error: "Sanity query failed", data });
  }

  return res.status(200).json(data);
}
