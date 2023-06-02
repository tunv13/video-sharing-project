import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import HomeScreen from "./screens/HomeScreen";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { AuthProvider } from "./Auth/AuthContext";
import AddVideoScreen from "./screens/AddVideoScreen";
import ProtectedRoute from "./Auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddVideoScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
