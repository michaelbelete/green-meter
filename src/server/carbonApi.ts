import axios from "axios";

import { env } from "@/env.mjs";

export const carbonClient = axios.create({
  baseURL: env.CARBON_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.CARBON_API_KEY}`,
  },
});
