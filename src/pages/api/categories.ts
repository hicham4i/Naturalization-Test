import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch the JSON file from the public directory
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL!}/categories.json`
  );

  // If the fetch was successful
  if (response.ok) {
    // Parse the response to JSON
    const data = await response.json();

    // Use the data...
    res.status(200).json(data);
  } else {
    // Handle the error
    res.status(500).json({ message: "Error fetching JSON" });
  }
}
