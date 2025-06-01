"use client"

import { useEffect, useRef } from "react"

export default function LineGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for sharper rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    // Data points (Mon to Fri)
    const data = [25, 45, 30, 45, 35]
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"]

    // Canvas dimensions
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const padding = { top: 10, right: 10, bottom: 20, left: 10 }
    const graphWidth = width - padding.left - padding.right
    const graphHeight = height - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height)
    gradient.addColorStop(0, "rgba(34, 197, 94, 0.2)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

    // Calculate points
    const points = data.map((value, index) => {
      const x = padding.left + index * (graphWidth / (data.length - 1))
      // Invert the y value since canvas y is top-down
      const y = padding.top + graphHeight - (value / 100) * graphHeight
      return { x, y }
    })

    // Draw filled area
    ctx.beginPath()
    ctx.moveTo(padding.left, height - padding.bottom)
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw points
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#22c55e"
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.fillStyle = "#9ca3af"
    ctx.font = "10px sans-serif"
    labels.forEach((label, index) => {
      const x = padding.left + index * (graphWidth / (labels.length - 1))
      ctx.fillText(label, x, height - 5)
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full h-24" />
}
