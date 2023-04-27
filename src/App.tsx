import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/Signup";
import { AuthContextProivder } from "./context/AuthContext";
import Login from "./Components/Login";
import Account from "./Components/Account";
import ProtectedRoute from "./Components/ProtectedRoute";
import Recovery from "./Components/Recovery";

function App() {
  return (
    <>
      <AuthContextProivder>
        <Routes>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/recovery" element={<Recovery></Recovery>}></Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account></Account>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthContextProivder>
    </>
  );
}

export default App;
