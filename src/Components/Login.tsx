import { useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";

interface UserSignIn {
  email: string;
  password: string;
}

export default function Login() {
  const auth = authContext();

  /** Define state variable for the user signin  */
  const [userSignIn, setUserSignin] = useState<UserSignIn>({
    email: "",
    password: "",
  });

  const [userSignInError, setUserSignInError] = useState<Error>();

  /** Updates the userSignin state with the new value of the input field by using its name as a key and value as its value.*/
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserSignin((prevstate) => ({ ...prevstate, [name]: value }));
  };

  /** Calls firebase's signInWithEmailAndPassword function to sign in the user with the provided email+password */
  const signIn = async () => {
    try {
      await auth?.signInUser(userSignIn);
    } catch (e: any) {
      setUserSignInError(e);
    }
  };

  return (
    <div>
      <input
        value={userSignIn?.email}
        name="email"
        onChange={handleUserChange}
        type="email"
        placeholder="Email"
      ></input>

      <input
        value={userSignIn?.password}
        name="password"
        onChange={handleUserChange}
        type="password"
        placeholder="Password"
      ></input>

      <button onClick={signIn}>Sign in</button>

      <Link to={"/signup"}>create an account</Link>

      <span>{userSignInError?.message}</span>
    </div>
  );
}
