"use client"

import type React from "react"

import { useState } from "react"
import { API_URL } from "../config"

interface User {
  id: string
  name: string
  email: string
  createdAt?: string
}

interface UserProfileProps {
  user: User
  onProfileUpdate: () => void
}

export default function UserProfile({ user, onProfileUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      setMessage("Profile updated successfully!")
      setIsEditing(false)
      onProfileUpdate()
    } catch (error) {
      setMessage("Error updating profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">My Profile</h2>
        <p className="text-gray-400">Manage your account information</p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
        {/* Profile Avatar */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-3xl font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{user.name}</h3>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg border-l-4 ${
              message.includes("successfully")
                ? "bg-green-600/20 border-green-600 text-green-400"
                : "bg-red-600/20 border-red-600 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {!isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <p className="text-white font-semibold text-lg">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <p className="text-white font-semibold text-lg">{user.email}</p>
              </div>
              {user.createdAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
                  <p className="text-white font-semibold text-lg">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 mt-6"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border-0 text-white rounded-lg placeholder-gray-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setName(user.name)
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
