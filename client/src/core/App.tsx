import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { ImagePage } from "../pages/ImagePage";
import { AccessDeniedPage } from "../pages/AccessDeniedPage";
import { HistoryPage } from "../pages/HistoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/diagnostic" element={<ImagePage />} />
        <Route path="/diagnostic/history" element={<HistoryPage />} />

        {/* Interceptor Section */}
        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Routes>
    </>
  );
}

export default App;
