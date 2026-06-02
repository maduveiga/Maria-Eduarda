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

const CONTACT_MARKERS = [
  { lng: -140, lat: -15, label: "WhatsApp", value: "+55 (47) 98919-2263" },
  { lng: -35, lat: 25, label: "E-mail", value: "madu.oficial@outlook.com" },
  { lng: 75, lat: -15, label: "Instagram", value: "@m4du.oficial" },
];

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
    const radius = Math.min(containerWidth, containerHeight) / 2.8;

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

    // Styling Tokens
    const COLORS = {
      goldBase: "rgba(184, 151, 90, 0.6)",
      goldSoft: "rgba(184, 151, 90, 0.25)",
      goldVivid: "rgba(230, 194, 128, 0.9)",
      goldMuted: "rgba(184, 151, 90, 0.06)",
      text: "rgba(255, 255, 255, 0.8)",
      textMuted: "rgba(184, 151, 90, 0.5)",
    };

    const render = (elapsed: number, currentScroll: number) => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      
      const dynamicRadius = radius * (0.95 + currentScroll * 0.3);
      projection.scale(dynamicRadius);

      // 1. Core Sphere Depth
      const sphereGradient = context.createRadialGradient(
        containerWidth / 2, containerHeight / 2, dynamicRadius * 0.8,
        containerWidth / 2, containerHeight / 2, dynamicRadius
      );
      sphereGradient.addColorStop(0, "rgba(5, 5, 5, 1)");
      sphereGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, dynamicRadius, 0, 2 * Math.PI);
      context.fillStyle = sphereGradient;
      context.fill();

      // 2. Graticules (The Wireframe Look)
      context.beginPath();
      path(d3.geoGraticule()());
      context.strokeStyle = COLORS.goldMuted;
      context.lineWidth = 0.5;
      context.stroke();

      // 3. Land Outlines (The "Drawing" look)
      context.beginPath();
      path(landData);
      context.strokeStyle = "rgba(184, 151, 90, 0.35)";
      context.lineWidth = 1.2;
      context.stroke();

      // 4. Land Fill (Subtle dots/grain for depth)
      // We use the path again but with a dashed or patterned feel if needed, 
      // but for "just golden outline" we keep it clean.
      context.save();
      context.globalAlpha = 0.08;
      context.beginPath();
      path(landData);
      context.fillStyle = COLORS.goldBase;
      context.fill();
      context.restore();

      // 5. Contact Markers (Ocean Placement)
      CONTACT_MARKERS.forEach((marker) => {
        const coords = [marker.lng, marker.lat] as [number, number];
        const projected = projection(coords);
        
        if (projected) {
          // Visibility check (is it on the front?)
          const dx = projected[0] - containerWidth / 2;
          const dy = projected[1] - containerHeight / 2;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < dynamicRadius * 0.95) {
            // COLLISION AVOIDANCE: Hide markers if they are in the central area where the fixed text lives
            // dy is relative to center. If -120 < dy < 80, it's in the text territory.
            if (dy > -130 && dy < 100 && Math.abs(dx) < containerWidth * 0.35) {
               return; 
            }

            const opacity = Math.max(0, 1 - (dist / dynamicRadius));
            const shimmer = Math.sin(elapsed * 0.002 + marker.lng) * 0.2 + 0.8;
            
            // Point marker
            context.beginPath();
            context.arc(projected[0], projected[1], 4, 0, 2 * Math.PI);
            context.fillStyle = `rgba(230, 194, 128, ${1.0 * opacity * shimmer})`;
            context.fill();
            
            // Outer glow for point
            context.beginPath();
            context.arc(projected[0], projected[1], 8, 0, 2 * Math.PI);
            context.strokeStyle = `rgba(184, 151, 90, ${0.2 * opacity})`;
            context.lineWidth = 1;
            context.stroke();

            // Label text
            context.textAlign = "left";
            context.textBaseline = "middle";
            
            // Label Header
            context.font = "300 10px 'Inter', sans-serif";
            context.fillStyle = `rgba(184, 151, 90, ${0.6 * opacity})`;
            context.fillText(marker.label.toUpperCase(), projected[0] + 15, projected[1] - 8);
            
            // Label Value
            context.font = "300 18px 'Cormorant Garamond', serif";
            context.fillStyle = `rgba(255, 255, 255, ${0.95 * opacity})`;
            context.fillText(marker.value, projected[0] + 15, projected[1] + 8);
            
            // Connector line
            context.beginPath();
            context.moveTo(projected[0] + 5, projected[1]);
            context.lineTo(projected[0] + 12, projected[1]);
            context.strokeStyle = `rgba(184, 151, 90, ${0.3 * opacity})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      });

      // 6. Atmospheric Rim Light
      const rimGradient = context.createRadialGradient(
        containerWidth / 2, containerHeight / 2, dynamicRadius * 0.9,
        containerWidth / 2, containerHeight / 2, dynamicRadius * 1.05
      );
      rimGradient.addColorStop(0, "rgba(184, 151, 90, 0)");
      rimGradient.addColorStop(0.8, "rgba(184, 151, 90, 0.08)");
      rimGradient.addColorStop(1, "rgba(184, 151, 90, 0)");

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, dynamicRadius * 1.05, 0, 2 * Math.PI);
      context.fillStyle = rimGradient;
      context.fill();
    };

    let baseRotation = [0, -20];
    const rotationSpeed = 0.002; 

    const timer = d3.timer((elapsed) => {
      const currentScroll = typeof scrollProgress === "number" ? scrollProgress : scrollProgress.get();
      const autoRot = elapsed * rotationSpeed;
      const scrollRot = currentScroll * 120;
      projection.rotate([autoRot + scrollRot, -15]);
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
          filter: "drop-shadow(0 0 40px rgba(0,0,0,0.8))",
        }}
      />
    </div>
  );
}
