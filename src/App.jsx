import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./auth/midleware"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages_auth/Dashboard"


export default function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to='/login' />} />

      </Routes>
    </BrowserRouter>
  )
}

