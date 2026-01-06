export default async function handler(req, res) {
  // (Opcional) só permitir GET
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Evita cache (pra não ficar “preso” em respostas antigas)
  res.setHeader("Cache-Control", "no-store");

  const { secret } = req.query;

  // Proteção via CRON_SECRET
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Token do Sanity (tem que existir no runtime)
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "Missing SANITY_API_WRITE_TOKEN" });
  }

  try {
    const projectId = "hun2hrsa";
    const dataset = "production";
    const apiVersion = "2024-03-01";

    // drafts exigem auth; perspective=drafts retorna rascunhos quando existir
    const query = '*[_type == "news"] | order(_createdAt desc)';

    const url =
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}` +
      `?perspective=drafts&query=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Sanity query failed",
        status: response.status,
        statusText: response.statusText,
        data,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Internal error",
      message: err?.message || String(err),
    });
  }
}
