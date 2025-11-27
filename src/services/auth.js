import React from "react";
import { data } from "../data.js";

// Async helper to update password; replace with real fetch/API later
export async function updateProfilePassword(pwd) {
  // TODO: replace with API call (e.g., POST /api/password)
  data.profile.password = pwd;
  return Promise.resolve();
}

// Hook to manage login/main menu visibility and validation
export function useLoginFlow(profile, remoteAccessMode = false) {
  const [loginModal, setLoginModal] = React.useState(!remoteAccessMode);
  const [mainMenu, setMainMenu] = React.useState(!!remoteAccessMode);

  const handleConfirm = React.useCallback(
    async ({ host, password }) => {
      const usernameOk = host === profile?.username;
      const passwordOk = password === profile?.password;
      if (!usernameOk || !passwordOk) {
        throw new Error("Invalid username or password");
      }
      setLoginModal(false);
      setMainMenu(true);
    },
    [profile?.username, profile?.password]
  );

  const closeLogin = React.useCallback(() => setLoginModal(false), []);

  return {
    loginModal,
    mainMenu,
    handleConfirm,
    closeLogin,
    setLoginModal,
    setMainMenu,
  };
}
