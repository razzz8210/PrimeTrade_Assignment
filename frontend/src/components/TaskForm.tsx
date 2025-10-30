"use client"

import type React from "react"

import { useState } from "react"
import { API_URL } from "../config"

interface Task {
  _id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
}

interface TaskFormProps {
  onTaskAdded: (task: Task) => void
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      const newTask = await response.json()
      onTaskAdded(newTask)
      setTitle("")
      setDescription("")
    } catch (err) {
      setError("Error creating task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create New Task
      </h2>

      {error && (
        <div className="bg-red-600/20 border-l-4 border-red-600 text-red-400 px-4 py-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full px-4 py-3 bg-gray-800 border-0 text-white rounded-lg placeholder-gray-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="w-full px-4 py-3 bg-gray-800 border-0 text-white rounded-lg placeholder-gray-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-red-900/30"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  )
}
