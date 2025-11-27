import { data } from "../data.js";

// Async helper to request a withdraw; replace with real fetch/API later
export async function submitWithdrawRequest({ coin, address }) {
  // TODO: replace with API call (e.g., POST /api/withdraw)
  data.lastWithdrawRequest = { coin, address, requestedAt: Date.now() };
  return Promise.resolve();
}
