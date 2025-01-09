import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import toastr from "toastr";

import Header from "../components/Header";
import Products from "../components/Products";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Admin from "./Admin";

import { useConnection } from "../hooks/useConnection";
import { useMode } from "../hooks/useMode";

import { useEffect } from "react";

function AppContent() {
  const { mode } = useMode();
  const online = useConnection();

  useEffect(() => {
    if (!online) {
      toastr.error("Oups, you're offline now!");
    }
  }, [online]);

  return (
    <BrowserRouter>
      <Container
        className={`p-0 h-100 ${
          mode === "light" ? "bg-body-tertiary" : "bg-black"
        }`}
        fluid
      >
        <Routes>
          <Route
            path="/:category?"
            element={
              <ProtectedRoute>
                <Header />
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Header />
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default AppContent;
