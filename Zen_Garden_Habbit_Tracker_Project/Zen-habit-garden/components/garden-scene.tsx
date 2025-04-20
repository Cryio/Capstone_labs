// components/garden-scene.tsx
"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sky, Text } from "@react-three/drei"
import type * as THREE from "three"
import type { Habit } from "@/lib/types"

/**
 * Garden Scene Component
 *
 * This component creates a 3D visualization of the user's habit garden using React Three Fiber.
 * Each habit is represented by a flower that grows based on the habit's completion and streak.
 *
 * Future Additions:
 * - Add more diverse plant types
 * - Implement weather effects
 * - Include interactive elements (e.g., watering plants, harvesting)
 */

interface GardenSceneProps {
  habits: Habit[]
}

export function GardenScene({ habits }: GardenSceneProps) {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Sky background */}
      <Sky sunPosition={[100, 10, 100]} />

      {/* Ground plane */}
      <Ground />

      {/* Habit flowers */}
      <HabitFlowers habits={habits} />

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={3}
        maxDistance={20}
      />
    </Canvas>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#4b9d3d" />
    </mesh>
  )
}

function HabitFlowers({ habits }: { habits: Habit[] }) {
  // Calculate positions for flowers in a circular pattern
  const positions = useMemo(() => {
    return habits.map((_, index) => {
      const angle = (index / habits.length) * Math.PI * 2
      const radius = Math.min(5, Math.max(2, habits.length * 0.5))
      return [Math.sin(angle) * radius, 0, Math.cos(angle) * radius]
    })
  }, [habits])

  return (
    <>
      {habits.map((habit, index) => (
        <Flower
          key={habit.id}
          position={positions[index]}
          color={habit.color}
          name={habit.name}
          isGrowing={habit.completedToday}
          growthFactor={habit.streak * 0.1 + 1}
        />
      ))}
    </>
  )
}

function Flower({
  position,
  color,
  name,
  isGrowing,
  growthFactor = 1,
}: {
  position: number[]
  color: string
  name: string
  isGrowing: boolean
  growthFactor?: number
}) {
  const flowerRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()

  // Convert color string to THREE.Color
  const flowerColor = useMemo(() => {
    const colorMap: Record<string, string> = {
      red: "#e74c3c",
      blue: "#3498db",
      green: "#2ecc71",
      yellow: "#f1c40f",
      purple: "#9b59b6",
      pink: "#e84393",
    }
    return colorMap[color] || colorMap.green
  }, [color])

  // Animation and interaction logic
  useFrame((_, delta) => {
    if (flowerRef.current) {
      // Gentle swaying motion
      flowerRef.current.rotation.y += delta * 0.2

      // Growth animation when completed
      if (isGrowing && flowerRef.current.scale.y < growthFactor) {
        flowerRef.current.scale.y += delta * 0.5
        flowerRef.current.scale.x += delta * 0.5
        flowerRef.current.scale.z += delta * 0.5
      }

      // Shrink if not completed and was previously grown
      if (!isGrowing && flowerRef.current.scale.y > 0.5) {
        flowerRef.current.scale.y -= delta * 0.2
        flowerRef.current.scale.x -= delta * 0.2
        flowerRef.current.scale.z -= delta * 0.2
      }
    }
  })

  return (
    <group position={[position[0], position[1], position[2]]}>
      {/* Flower stem */}
      <mesh castShadow position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
        <meshStandardMaterial color="#2ecc71" />
      </mesh>

      {/* Flower head */}
      <group
        ref={flowerRef}
        position={[0, 1.5, 0]}
        scale={isGrowing ? [1, 1, 1] : [0.5, 0.5, 0.5]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Petals */}
        <mesh castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={flowerColor} />
        </mesh>

        {/* Center */}
        <mesh castShadow position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#f39c12" />
        </mesh>
      </group>

      {/* Hover label */}
      {hovered && (
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
          backgroundColor="#ffffffcc"
          paddingX={0.2}
          paddingY={0.1}
          borderRadius={0.1}
        >
          {name}
        </Text>
      )}
    </group>
  )
}
