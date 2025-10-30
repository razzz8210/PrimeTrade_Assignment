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

interface TaskItemProps {
  task: Task
  onTaskDeleted: (taskId: string) => void
  onTaskUpdated: (task: Task) => void
}

export default function TaskItem({ task, onTaskDeleted, onTaskUpdated }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [loading, setLoading] = useState(false)

  const handleToggleComplete = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          completed: !task.completed,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update task")
      }

      const updatedTask = await response.json()
      onTaskUpdated(updatedTask)
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          completed: task.completed,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update task")
      }

      const updatedTask = await response.json()
      onTaskUpdated(updatedTask)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      onTaskDeleted(task._id)
    } catch (error) {
      console.error("Error deleting task:", error)
    } finally {
      setLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="bg-gray-900 border border-red-600/50 rounded-lg p-4">
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border-0 text-white rounded-lg placeholder-gray-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 bg-gray-800 border-0 text-white rounded-lg placeholder-gray-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all resize-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-all"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setTitle(task.title)
                setDescription(task.description)
              }}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div
      className={`bg-gray-900/70 border rounded-lg p-4 transition-all duration-200 hover:bg-gray-900 ${
        task.completed ? "border-green-600/50 opacity-60" : "border-gray-800 hover:border-gray-700"
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          disabled={loading}
          className="mt-1 w-5 h-5 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-red-600 cursor-pointer accent-red-600"
        />

        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${task.completed ? "line-through text-gray-500" : "text-white"}`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? "text-gray-600" : "text-gray-400"}`}>
              {task.description}
            </p>
          )}
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold text-sm rounded-lg transition-all border border-gray-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 disabled:bg-gray-800 text-red-500 hover:text-white disabled:text-gray-600 font-semibold text-sm rounded-lg transition-all border border-red-600/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
