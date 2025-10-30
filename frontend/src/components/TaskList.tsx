"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { API_URL } from "../config"
import TaskForm from "./TaskForm"
import TaskItem from "./TaskItem"

interface Task {
  _id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async (search?: string) => {
    try {
      const token = localStorage.getItem("token")
      const url = search ? `${API_URL}/tasks?search=${encodeURIComponent(search)}` : `${API_URL}/tasks`

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setLoading(true)
    fetchTasks(query)
  }

  const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks])
  }

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter((task) => task._id !== taskId))
  }

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400 animate-pulse">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">My Tasks</h2>
        <p className="text-gray-400">Manage and organize your tasks efficiently</p>
      </div>

      <TaskForm onTaskAdded={handleTaskAdded} />

      {/* Search Bar */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-3 pl-12 bg-gray-800 border-0 text-white rounded-lg placeholder-gray-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 flex-wrap">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === f
                ? "bg-red-600 text-white shadow-lg shadow-red-900/50"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}{" "}
            <span className="text-xs opacity-75">
              ({tasks.filter((t) => (f === "active" ? !t.completed : f === "completed" ? t.completed : true)).length})
            </span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/30 border border-gray-800 rounded-lg">
            <svg
              className="w-16 h-16 text-gray-700 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-400 text-lg">
              {searchQuery && "No tasks match your search."}
              {!searchQuery && filter === "all" && "No tasks yet. Create one to get started!"}
              {!searchQuery && filter === "active" && "No active tasks. Great job!"}
              {!searchQuery && filter === "completed" && "No completed tasks yet."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} onTaskDeleted={handleTaskDeleted} onTaskUpdated={handleTaskUpdated} />
          ))
        )}
      </div>
    </div>
  )
}
