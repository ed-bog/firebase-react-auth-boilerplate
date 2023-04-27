import { useState } from "react";
import { authContext } from "../context/AuthContext";

export const Recovery = () => {
  const auth = authContext();

  const [email, setEmail] = useState("");
  const [recoveryError, setRecoveryError] = useState<Error>();

  const handleRecovery = async () => {
    try {
      await auth?.sendPasswordReset(email);
      console.warn("Recovery email sent!");
    } catch (e: any) {
      setRecoveryError(e);
    }
  };
  return (
    <>
      <h1>Recover your password.</h1>
      <input
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        type="email"
        placeholder="Email"
      ></input>
      <button onClick={async () => await handleRecovery()}>
        Request recovery link
      </button>
      <span> {recoveryError?.message}</span>
    </>
  );
};

export default Recovery;
