import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

interface UserRegistration {
  email: string;
  password: string;
}

export default function SignUp() {
  /** Get our authContext */
  const auth = authContext();

  /** Define state variable for the user registration  */
  const [userRegistration, setUserRegistration] = useState<UserRegistration>({
    email: "",
    password: "",
  });

  const [userRegistrationError, setUserRegistrationError] = useState<Error>();

  /** Updates the userRegistration state with the new value of the input field by using its name as a key and value as its value.*/
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserRegistration((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const navigate = useNavigate();

  /**  Calls firebase's createUserWithEmailAndPassword to create a new firebase user */
  const createUser = async () => {
    try {
      const user = await auth?.createUser(userRegistration);
      if (user) await auth?.sendEmailVerificationToUser(user?.user);
      navigate("/account");
    } catch (e: any) {
      setUserRegistrationError(e);
    }
  };

  return (
    <>
      <input
        value={userRegistration?.email}
        name="email"
        onChange={handleUserChange}
        type="email"
        placeholder="Email"
      ></input>

      <input
        value={userRegistration?.password}
        name="password"
        onChange={handleUserChange}
        type="password"
        placeholder="Password"
      ></input>

      <button onClick={createUser}>Sign up</button>

      <span>{userRegistrationError?.message}</span>
    </>
  );
}
