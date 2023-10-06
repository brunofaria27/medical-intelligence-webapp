import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { ImagePage } from "../pages/ImagePage";
import { AccessDeniedPage } from "../pages/AccessDeniedPage";
import { InsideAppPage } from "../pages/InsideAppPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/diagnostic" element={<ImagePage />} />
        <Route path="/home" element={<InsideAppPage />} />

        {/* Interceptor Section */}
        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Routes>
    </>
  );
}

export default App;
