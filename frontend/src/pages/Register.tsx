"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { API_URL } from "../config"

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void
}

export default function Register({ setIsAuthenticated }: RegisterProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        return
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      setIsAuthenticated(true)
      navigate("/dashboard")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Netflix-style background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
      
      <div className="relative z-10 bg-black/70 backdrop-blur-sm border border-red-600/30 rounded-md p-16 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-2">Sign Up</h1>
        <p className="text-gray-400 mb-8 text-sm">Create your account to get started</p>

        {error && (
          <div className="bg-red-600/20 border-l-4 border-red-600 text-red-400 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-4 bg-gray-800/90 border-0 text-white rounded placeholder-gray-500 focus:bg-gray-700/90 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              placeholder="Full Name"
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-4 bg-gray-800/90 border-0 text-white rounded placeholder-gray-500 focus:bg-gray-700/90 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              placeholder="Email address"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-4 bg-gray-800/90 border-0 text-white rounded placeholder-gray-500 focus:bg-gray-700/90 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              placeholder="Password"
            />
          </div>

          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-4 bg-gray-800/90 border-0 text-white rounded placeholder-gray-500 focus:bg-gray-700/90 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mt-6"
          >
            {loading ? "Creating account..." : "Get Started"}
          </button>
        </form>

        <div className="mt-16 text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline font-medium">
            Sign in
          </Link>
          .
        </div>
      </div>
    </div>
  )
}
