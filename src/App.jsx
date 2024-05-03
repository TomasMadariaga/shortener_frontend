import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shorter } from "./pages/Shorter";
import { Redirect } from "./pages/Redirect";
import { AuthProvider } from "./context/AuthContext";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import { UrlProvider } from "./context/UrlContext";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <UrlProvider>
        <BrowserRouter>
          <div className="h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/shorter" element={<Shorter />}></Route>
              </Route>
              <Route path="/:id" element={<Redirect />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </UrlProvider>
    </AuthProvider>
  );
}

export default App;
