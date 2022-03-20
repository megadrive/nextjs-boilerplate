import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export const nc = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err: any, req, res) => {
    res.status(500);
    res.json({ error: err.message });
    return res;
  },
  onNoMatch: (req, res) => {
    res.status(404);
    res.json({ message: "Not found" });
  },
});
