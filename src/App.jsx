import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shorter } from "./pages/Shorter";
import { Redirect } from "./pages/Redirect";
import { AuthProvider } from "./context/AuthContext";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home } from "./pages/Home";
import { UrlProvider } from "./context/UrlContext";
import { Dashboard } from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UrlDetails } from "./pages/UrlDetails";
import { NotFound } from "./pages/NotFound";
import { Footer } from "./components/layouts/Footer";
import { Navbar } from "./components/layouts/Navbar";

function App() {
  return (
    <AuthProvider>
      <UrlProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-bg text-text">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="dark"
            />
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/:id" element={<Redirect />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/links/:id" element={<UrlDetails />} />
                  <Route path="/shorter" element={<Shorter />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </UrlProvider>
    </AuthProvider>
  );
}

export default App;