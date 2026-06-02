"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface AtmosphericGlobeProps {
  width?: number;
  height?: number;
  className?: string;
  opacity?: number;
  scrollProgress?: number | any;
}

export default function AtmosphericGlobe({
  width = 800,
  height = 800,
  className = "",
  opacity = 1,
  scrollProgress = 0,
}: AtmosphericGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [landData, setLandData] = useState<any>(null);

  useEffect(() => {
    // Fetch data once
    fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json")
      .then(res => res.json())
      .then(data => setLandData(data))
      .catch(err => console.error("Globe data failed:", err));
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !landData) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const containerWidth = width;
    const containerHeight = height;
    const radius = Math.min(containerWidth, containerHeight) / 2.2;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // Helpers for dots
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        return pointInPolygon(point, geometry.coordinates[0]);
      } else if (geometry.type === "MultiPolygon") {
        return geometry.coordinates.some((poly: any) => pointInPolygon(point, poly[0]));
      }
      return false;
    };

    // Pre-calculate dots for performance
    const allDots: { lng: number; lat: number }[] = [];
    const dotSpacing = 16;
    const stepSize = dotSpacing * 0.12; // Adjusted for density

    landData.features.forEach((feature: any) => {
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          if (pointInFeature([lng, lat], feature)) {
            allDots.push({ lng, lat });
          }
        }
      }
    });

    // Styling Tokens - High-End Gold / Brass (Refined)
    const COLORS = {
      goldBase: "rgba(184, 151, 90, 0.4)",
      goldHighlight: "rgba(230, 194, 128, 0.6)",
      goldMuted: "rgba(184, 151, 90, 0.08)",
      outline: "rgba(184, 151, 90, 0.05)",
      rimLight: "rgba(184, 151, 90, 0.12)",
    };

    const render = (elapsed: number, currentScroll: number) => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      
      // Dynamic scale based on scroll (Zoom-in effect like the model)
      const dynamicRadius = radius * (0.9 + currentScroll * 0.4);
      projection.scale(dynamicRadius);

      // 1. Core Sphere Depth
      const sphereGradient = context.createRadialGradient(
        containerWidth / 2 - dynamicRadius * 0.3, containerHeight / 2 - dynamicRadius * 0.3, 0,
        containerWidth / 2, containerHeight / 2, dynamicRadius
      );
      sphereGradient.addColorStop(0, "rgba(20, 20, 20, 1)");
      sphereGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, dynamicRadius, 0, 2 * Math.PI);
      context.fillStyle = sphereGradient;
      context.fill();

      // 2. Graticule (Subtle grid)
      const graticule = d3.geoGraticule()();
      context.beginPath();
      path(graticule);
      context.strokeStyle = COLORS.goldMuted;
      context.lineWidth = 0.5;
      context.stroke();

      // 3. Dot Visualization (Cinematic points)
      allDots.forEach((dot, i) => {
        const projected = projection([dot.lng, dot.lat]);
        if (projected) {
          // Calculate lighting based on point position
          const dx = projected[0] - containerWidth / 2;
          const dy = projected[1] - containerHeight / 2;
          const dist = Math.sqrt(dx*dx + dy*dy) / dynamicRadius;
          
          // Fade points near the edges for spherical feel
          const sphereAlpha = Math.pow(Math.max(0, 1 - dist), 1.5);
          
          // Subtle shimmer effect based on time
          const shimmer = Math.sin(elapsed * 0.001 + i) * 0.1 + 0.9;
          
          context.beginPath();
          context.arc(projected[0], projected[1], 0.7 * (dynamicRadius / radius), 0, 2 * Math.PI);
          context.fillStyle = `rgba(184, 151, 90, ${0.35 * sphereAlpha * shimmer})`;
          context.fill();
          
          // Occasional "glint" dots
          if (i % 150 === 0) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.2 * (dynamicRadius / radius), 0, 2 * Math.PI);
            context.fillStyle = `rgba(184, 151, 90, ${0.1 * sphereAlpha})`;
            context.fill();
          }
        }
      });

      // 4. Atmospheric Rim Light (The "Cinematic" part)
      const rimGradient = context.createRadialGradient(
        containerWidth / 2, containerHeight / 2, dynamicRadius * 0.9,
        containerWidth / 2, containerHeight / 2, dynamicRadius * 1.02
      );
      rimGradient.addColorStop(0, "rgba(184, 151, 90, 0)");
      rimGradient.addColorStop(0.8, "rgba(184, 151, 90, 0.05)");
      rimGradient.addColorStop(1, "rgba(184, 151, 90, 0)");

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, dynamicRadius * 1.02, 0, 2 * Math.PI);
      context.fillStyle = rimGradient;
      context.fill();

      // 5. Light Sweep (Moving reflection)
      const sweepPos = (elapsed * 0.0001) % 2 - 1; // move from -1 to 1
      const sweepGradient = context.createLinearGradient(
        containerWidth / 2 + sweepPos * dynamicRadius * 2, 0,
        containerWidth / 2 + sweepPos * dynamicRadius * 2 + dynamicRadius, 0
      );
      sweepGradient.addColorStop(0, "rgba(184, 151, 90, 0)");
      sweepGradient.addColorStop(0.5, "rgba(184, 151, 90, 0.03)");
      sweepGradient.addColorStop(1, "rgba(184, 151, 90, 0)");

      context.globalCompositeOperation = "lighter";
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, dynamicRadius, 0, 2 * Math.PI);
      context.fillStyle = sweepGradient;
      context.fill();
      context.globalCompositeOperation = "source-over";
    };

    let baseRotation = [0, -20];
    const rotationSpeed = 0.003; 

    const timer = d3.timer((elapsed) => {
      // Auto rotation + Scroll-based rotation for "interactivity"
      const currentScroll = typeof scrollProgress === "number" ? scrollProgress : scrollProgress.get();
      const autoRot = elapsed * rotationSpeed;
      const scrollRot = currentScroll * 180; // half turn across the section
      projection.rotate([autoRot + scrollRot, baseRotation[1]]);
      render(elapsed, currentScroll);
    });

    return () => {
      timer.stop();
    };
  }, [width, height, landData]);

  return (
    <div 
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, transition: "opacity 2s ease-in-out" }}
    >
      <canvas
        ref={canvasRef}
        style={{ 
          filter: "drop-shadow(0 0 30px rgba(184, 151, 90, 0.05))",
        }}
      />
    </div>
  );
}
