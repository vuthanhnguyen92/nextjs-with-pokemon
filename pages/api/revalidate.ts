import type { NextApiRequest, NextApiResponse } from "next";

type RevalidationType = {
  revalidated?: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RevalidationType>
) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  try {
    await res.unstable_revalidate("/pokemon-details/ivysaur");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ message: "Revalidation error" });
  }
}
