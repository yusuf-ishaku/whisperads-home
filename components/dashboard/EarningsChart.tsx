"use client"

import { useEffect, useRef } from "react"

export default function EarningsChart() {
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

    // Canvas dimensions
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const padding = { top: 10, right: 10, bottom: 30, left: 40 }
    const graphWidth = width - padding.left - padding.right
    const graphHeight = height - padding.top - padding.bottom

    // Data points (Apr to Oct)
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
    const data = [20000, 60000, 30000, 40000, 90000, 70000, 80000]
    const peakMonth = "Aug"
    const peakIndex = months.indexOf(peakMonth)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw y-axis labels (months)
    ctx.textAlign = "left"
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    months.forEach((month, index) => {
      const y = padding.top + (graphHeight / (months.length - 1)) * index
      ctx.fillText(month, 5, y + 3)
    })

    // Draw x-axis labels (values)
    const xValues = ["20,000", "6,000", "4000", "30,000", "90,000", "70,000", "80,000"]
    ctx.textAlign = "center"
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    xValues.forEach((value, index) => {
      const x = padding.left + (graphWidth / (xValues.length - 1)) * index
      ctx.fillText(value, x, height - 5)
    })

    // Draw (₦) label
    ctx.textAlign = "left"
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    ctx.fillText("(₦)", 5, height - 5)

    // Calculate points
    const points = data.map((value, index) => {
      const x = padding.left + (index / (data.length - 1)) * graphWidth
      // Invert the y value since canvas y is top-down
      const y = padding.top + graphHeight - ((value - 20000) / 70000) * graphHeight
      return { x, y }
    })

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    gradient.addColorStop(0, "rgba(0, 176, 80, 0.2)")
    gradient.addColorStop(1, "rgba(0, 176, 80, 0.05)")

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom)
    ctx.lineTo(points[0].x, height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach((point, i) => {
      if (i !== 0) {
        const xc = (points[i - 1].x + point.x) / 2
        const yc = (points[i - 1].y + point.y) / 2
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc)
      }
    })
    ctx.quadraticCurveTo(
      points[points.length - 2].x,
      points[points.length - 2].y,
      points[points.length - 1].x,
      points[points.length - 1].y,
    )
    ctx.strokeStyle = "#00b050"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw peak point
    const peakPoint = points[peakIndex]
    ctx.beginPath()
    ctx.arc(peakPoint.x, peakPoint.y, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#00b050"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw vertical dotted line at peak
    ctx.beginPath()
    ctx.setLineDash([5, 3])
    ctx.moveTo(peakPoint.x, peakPoint.y)
    ctx.lineTo(peakPoint.x, height - padding.bottom)
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.setLineDash([])

    // Draw "Peak Earn" label
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(peakPoint.x - 35, peakPoint.y - 30, 70, 20)
    ctx.strokeStyle = "#00b050"
    ctx.lineWidth = 1
    ctx.strokeRect(peakPoint.x - 35, peakPoint.y - 30, 70, 20)
    ctx.fillStyle = "#00b050"
    ctx.textAlign = "center"
    ctx.font = "10px sans-serif"
    ctx.fillText("Peak Earn", peakPoint.x, peakPoint.y - 17)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
