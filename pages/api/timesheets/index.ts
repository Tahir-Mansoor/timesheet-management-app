import type { NextApiRequest, NextApiResponse } from "next";

let data = [
  { id: 1, week: 10, date: "2026-04-01", status: "Pending" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  // GET
  if (req.method === "GET") {
    return res.status(200).json(data);
  }

  // POST
  if (req.method === "POST") {
    const body = req.body;

    const newItem = {
      id: Date.now(),
      ...body,
    };

    data.push(newItem);

    return res.status(200).json(newItem);
  }

  // PUT (EDIT)
  if (req.method === "PUT") {
    const { id, week, date, status } = req.body;

    data = data.map((item) =>
      item.id === id ? { id, week, date, status } : item
    );

    return res.status(200).json({ success: true });
  }

  // DELETE (FIXED PLACE)
  if (req.method === "DELETE") {
    const { id } = req.body;

    data = data.filter((item) => item.id !== id);

    return res.status(200).json({ success: true });
  }

  // fallback
  return res.status(405).json({ message: "Method not allowed" });
}