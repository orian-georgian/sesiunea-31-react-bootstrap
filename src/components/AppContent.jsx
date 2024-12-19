import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Products from "../components/Products";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Admin from "./Admin";

import { ModeContext } from "../contexts/ModeContext";

import { useContext } from "react";

function AppContent() {
  const { mode } = useContext(ModeContext);

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
