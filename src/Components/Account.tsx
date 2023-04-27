import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

export default function Account() {
  const auth = authContext();

  const navigate = useNavigate();

  const signOut = async () => {
    await auth?.signOut();
    navigate("/login");
  };
  return (
    <>
      {JSON.stringify(auth?.user)}
      <p>
        <button
          onClick={async () => {
            await signOut();
          }}
        >
          Sign Out
        </button>
      </p>
    </>
  );
}
