import React from "react";
import AppShell from "./layout/AppShell.jsx";
import Body from "./layout/Body.jsx";
import { data } from "./data.js";
import LoginModal from "./components/LoginModal.jsx";
import { useLoginFlow } from "./services/auth.js";

export default function App() {
  const [infoTrigger, setInfoTrigger] = React.useState(0);
  const {
    loginModal,
    mainMenu,
    handleConfirm,
    closeLogin,
    setMainMenu,
  } = useLoginFlow(data.profile, data.remoteAccessMode);

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
        onClose={closeLogin}
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
