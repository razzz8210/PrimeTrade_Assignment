import type React from "react"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

export default function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
  return isAuthenticated ? children : <Navigate to="/login" />
}
