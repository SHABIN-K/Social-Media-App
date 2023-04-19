import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, Login } from "./pages";
import { fetchUser } from "./lib/fetchUser";

function App() {

  useEffect(() => {
    const User = fetchUser()

    if (!User) navigate('/login');
  }, []);
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
