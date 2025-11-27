import React from "react";
import AppShell from "./layout/AppShell.jsx";
import Body from "./layout/Body.jsx";
import { data } from "./data.js";
import LoginModal from "./components/LoginModal.jsx";

export default function App() {
  const [loginModal, setLoginModal] = React.useState(!data.remoteAccessMode);
  const [mainMenu, setMainMenu] = React.useState(!!data.remoteAccessMode);
  const [infoTrigger, setInfoTrigger] = React.useState(0);

  const handleConfirm = async ({ host, password }) => {
    const usernameOk = host === data.profile.username;
    const passwordOk = password === data.profile.password;
    if (!usernameOk || !passwordOk) {
      throw new Error("Invalid username or password");
    }
    setLoginModal(false);
    setMainMenu(true);
  };

  return (
    <>
      {mainMenu ? (
        <AppShell
        profile={data.profile}
        onClose={() => setMainMenu(false)}
        onInfo={() => setInfoTrigger((v) => v + 1)}
      >
          <Body infoTrigger={infoTrigger} isRemote={data.remoteAccessMode} />
        </AppShell>
      ) : null}

      <LoginModal
        open={loginModal}
        onClose={() => setLoginModal(false)}
        onConfirm={handleConfirm}
        title="Login Required"
        hostLabel="Username"
        hostHelp="Enter your username"
        passwordLabel="Password"
        passwordHelp="Enter your password"
        confirmText="LOGIN"
        cancelText="CANCEL"
        initialHost={data.profile.username}
        initialPassword=""
      />
    </>
  );
}
