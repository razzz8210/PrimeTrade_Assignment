// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err)

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(403).json({ error: "Invalid token" })
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" })
  }

  // Validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  })
}

// Async error wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
