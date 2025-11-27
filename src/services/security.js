import React from "react";
import { data } from "../data.js";

// Async helper to install/enable motion sensors; replace with real fetch/API later
export async function installMotionSensors() {
  // TODO: replace with API call (e.g., POST /api/security/motion)
  data.security.motionSensorStatus = "active";
  return Promise.resolve();
}

// Async helper to add a security camera; replace with real fetch/API later
export async function addSecurityCamera(name) {
  // TODO: replace with API call (e.g., POST /api/security/cameras)
  const nextId = `cam-${(data.security.securityCameras.length + 1).toString().padStart(2, "0")}`;
  data.security.securityCameras.push({ cameraId: nextId, cameraName: name || `Camera ${nextId}` });
  data.security.addNewCamera = false;
  return Promise.resolve();
}

// Hook to manage watching a camera when a list item is clicked.
// Returns current camera and a handler you can attach to onClick/onChevronClick.
export function useWatchCamera(initialCamera = null) {
  const [activeCamera, setActiveCamera] = React.useState(initialCamera);

  const watchCamera = React.useCallback((camera) => {
    setActiveCamera(camera || null);
  }, []);

  return { activeCamera, watchCamera, setActiveCamera };
}
