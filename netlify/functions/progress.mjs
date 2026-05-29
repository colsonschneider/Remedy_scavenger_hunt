import { getStore } from "@netlify/blobs";

// Cross-device team progress sync.
// GET  /.netlify/functions/progress?team=boilers  → { solved: [1,4,7], v: 1716923... }
// POST /.netlify/functions/progress?team=boilers  body { solved: [1,4,7,12] }  → echoes back stored state

export default async (req) => {
  const url = new URL(req.url);
  const team = url.searchParams.get("team");

  if (!team || !/^[a-z0-9_-]{1,32}$/.test(team)) {
    return new Response(JSON.stringify({ error: "invalid team id" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const store = getStore({ name: "remedy-hunt", consistency: "strong" });

  if (req.method === "GET") {
    const data = (await store.get(team, { type: "json" })) || { solved: [], v: 0 };
    return Response.json(data, { headers: { "cache-control": "no-store" } });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch (e) {
      return new Response(JSON.stringify({ error: "invalid json" }), { status: 400 });
    }
    const solved = Array.isArray(body.solved)
      ? [...new Set(body.solved.filter(n => Number.isInteger(n) && n >= 1 && n <= 60))]
      : [];
    const data = { solved, v: Date.now() };
    await store.setJSON(team, data);
    return Response.json(data, { headers: { "cache-control": "no-store" } });
  }

  return new Response("method not allowed", { status: 405 });
};
