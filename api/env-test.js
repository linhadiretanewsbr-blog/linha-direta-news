export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    hasWriteToken: Boolean(process.env.SANITY_API_WRITE_TOKEN),
    writeTokenLen: (process.env.SANITY_API_WRITE_TOKEN || "").length,
    testFlag: process.env.SERVER_TEST_FLAG || null,
  });
}
