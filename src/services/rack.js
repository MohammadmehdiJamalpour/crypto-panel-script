import { data } from "../data.js";

// Async helper to add a rack; replace with real fetch/API later
export async function addRack({ type, name }) {
  // TODO: replace with API call (e.g., POST /api/racks)
  const nextId = `rack-${(data.rackSection.racks.length + 1)
    .toString()
    .padStart(2, "0")}`;
  data.rackSection.racks.push({
    rackId: nextId,
    rackName: name || `Rack ${nextId}`,
    rackStatus: "online",
    yield: 0,
    overallMinersHealth: "good",
    removeRack: false,
    rackPosition: { row: null, column: null },
    type: type || "custom",
    miners: [],
  });
  data.rackSection.addRackModal = false;
  data.rackSection.selectedRackType = null;
  return Promise.resolve();
}

// Async helper to request a miner repair; replace with real fetch/API later
export async function requestMinerRepair({ rackId, minerId }) {
  // TODO: replace with API call (e.g., POST /api/miners/repair)
  data.lastMinerRepairRequest = { rackId, minerId, requestedAt: Date.now() };
  return Promise.resolve();
}

// Async helper to change rack position; replace with real fetch/API later
export async function changeRackPosition({ rackId, row, column }) {
  // TODO: replace with API call (e.g., POST /api/racks/position)
  const rack = data.rackSection.racks.find((r) => r.rackId === rackId);
  if (rack) {
    rack.rackPosition = {
      row: row ?? rack.rackPosition?.row ?? null,
      column: column ?? rack.rackPosition?.column ?? null,
    };
  }
  return Promise.resolve();
}

// Async helper to remove a rack; replace with real fetch/API later
export async function removeRackById(rackId) {
  // TODO: replace with API call (e.g., DELETE /api/racks/:id)
  data.rackSection.racks = data.rackSection.racks.filter(
    (r) => r.rackId !== rackId
  );
  return Promise.resolve();
}
