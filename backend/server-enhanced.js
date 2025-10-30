import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import helmet from "helmet"
import rateLimit from "express-rate-limit"

dotenv.config()

const app = express()

// Security Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10kb" }))

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
})
app.use("/api/", limiter)

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts",
})

// MongoDB Connection with error handling
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/scalable-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

// Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
})

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, maxlength: 1000 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)
const Task = mongoose.model("Task", taskSchema)

// JWT Middleware with error handling
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.status(401).json({ error: "Access token required" })

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" })
      }
      return res.status(403).json({ error: "Invalid token" })
    }
    req.user = user
    next()
  })
}

// Input validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Auth Routes with enhanced security
app.post("/api/auth/register", loginLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    })
    await user.save()

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Registration failed" })
  }
})

app.post("/api/auth/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Login failed" })
  }
})

// User Routes
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" })
  }
})

app.put("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: "Name is required" })
    }

    const user = await User.findByIdAndUpdate(req.user.id, { name: name.trim() }, { new: true }).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" })
  }
})

// Task Routes
app.get("/api/tasks", authenticateToken, async (req, res) => {
  try {
    const { search } = req.query
    const query = { userId: req.user.id }

    if (search && search.trim()) {
      query.title = { $regex: search.trim(), $options: "i" }
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 }).limit(100)
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

app.post("/api/tasks", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: "Title is required" })
    }

    const task = new Task({
      userId: req.user.id,
      title: title.trim(),
      description: description ? description.trim() : "",
    })

    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" })
  }
})

app.put("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const { title, description, completed } = req.body

    if (title && title.trim().length === 0) {
      return res.status(400).json({ error: "Title cannot be empty" })
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        title: title ? title.trim() : undefined,
        description: description ? description.trim() : undefined,
        completed,
      },
      { new: true },
    )

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" })
  }
})

app.delete("/api/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    })

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" })
  }
})

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err)
  res.status(500).json({ error: "Internal server error" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
