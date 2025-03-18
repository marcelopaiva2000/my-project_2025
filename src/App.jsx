import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute, RedirectIfAuthenticated } from "./auth/midleware"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages_auth/Dashboard/Dashboard"
import { AuthProvider } from './context/AuthProvider'


export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="*" element={<Navigate to='/login' />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

