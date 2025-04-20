"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Text } from "@react-three/drei"

interface FlowerProps {
  position: [number, number, number]
  growth?: number
  color?: string
  name?: string
}

function Flower({ position, growth = 0.5, color = "pink", name = "Habit" }: FlowerProps) {
  const flowerHeight = 0.5 + growth * 1.5

  return (
    <group position={position}>
      {/* Stem */}
      <mesh position={[0, flowerHeight / 2 - 0.25, 0]}>
        <cylinderGeometry args={[0.05, 0.05, flowerHeight, 8]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Flower head */}
      <mesh position={[0, flowerHeight, 0]}>
        <sphereGeometry args={[0.2 * (0.5 + growth / 2), 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}

interface LandPatchProps {
  position: [number, number, number]
  size?: [number, number, number]
  color?: string
  children: React.ReactNode
}

function LandPatch({ position, size = [2, 0.2, 2], color = "brown", children }: LandPatchProps) {
  return (
    <group position={position}>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      {children}
    </group>
  )
}

function Scene() {
  const controlsRef = useRef<any>(null)
  const { camera, gl } = useThree()

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update()
    }
  })

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.minPolarAngle = Math.PI / 6
      controlsRef.current.maxPolarAngle = Math.PI / 2
      controlsRef.current.minDistance = 3
      controlsRef.current.maxDistance = 10
    }
  }, [])

  return (
    <>
      <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.05} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Environment preset="park" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8eb240" />
      </mesh>

      {/* Meditation Goal */}
      <LandPatch position={[-3, 0, -2]} color="#a67c52">
        <Text
          position={[0, 0.2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Meditation
        </Text>
        <Flower position={[-0.5, 0, 0.5]} growth={0.8} color="#ff69b4" name="10 min daily" />
        <Flower position={[0.5, 0, -0.5]} growth={0.4} color="#ba55d3" name="Evening" />
      </LandPatch>

      {/* Reading Goal */}
      <LandPatch position={[3, 0, 1]} color="#a67c52">
        <Text
          position={[0, 0.2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Reading
        </Text>
        <Flower position={[-0.5, 0, 0.5]} growth={1.0} color="#4169e1" name="30 min daily" />
        <Flower position={[0.5, 0, -0.5]} growth={0.6} color="#1e90ff" name="Books" />
      </LandPatch>

      {/* Exercise Goal */}
      <LandPatch position={[0, 0, -4]} color="#a67c52">
        <Text
          position={[0, 0.2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Exercise
        </Text>
        <Flower position={[-0.7, 0, 0]} growth={0.3} color="#ff4500" name="Running" />
        <Flower position={[0, 0, 0]} growth={0.5} color="#ff8c00" name="Yoga" />
        <Flower position={[0.7, 0, 0]} growth={0.2} color="#ffa500" name="Weights" />
      </LandPatch>
    </>
  )
}

export function ZenGarden() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <Scene />
    </Canvas>
  )
}
