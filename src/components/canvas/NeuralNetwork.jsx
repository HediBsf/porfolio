import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Layer sizes describe a small feed-forward net: input -> hidden -> hidden -> output.
const LAYER_SIZES = [5, 8, 8, 6, 3]
const LAYER_GAP = 2.7
const JITTER = 2.2

/** Builds a soft radial-gradient sprite used for every point, so nodes and
 * signal pulses render as glowing dots instead of hard squares. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])
}

/** Generates node positions per layer and the straight edges between
 * consecutive layers, once, deterministically enough for a stable layout. */
function useNetworkGeometry() {
  return useMemo(() => {
    const layers = LAYER_SIZES.map((count, layerIndex) =>
      Array.from({ length: count }, () => [
        (layerIndex - (LAYER_SIZES.length - 1) / 2) * LAYER_GAP,
        (Math.random() - 0.5) * JITTER * 2,
        (Math.random() - 0.5) * JITTER * 2,
      ])
    )

    const hidden = []
    const output = []
    layers.forEach((layer, i) => {
      const bucket = i === layers.length - 1 ? output : hidden
      layer.forEach((p) => bucket.push(...p))
    })

    const edges = []
    const edgePositions = []
    for (let i = 0; i < layers.length - 1; i++) {
      layers[i].forEach((a) => {
        layers[i + 1].forEach((b) => {
          edges.push([a, b])
          edgePositions.push(...a, ...b)
        })
      })
    }

    return {
      hidden: new Float32Array(hidden),
      output: new Float32Array(output),
      edges,
      edgePositions: new Float32Array(edgePositions),
    }
  }, [])
}

/** A handful of points that travel along random edges to suggest signals
 * propagating through the network. */
function SignalPulses({ edges, reduceMotion }) {
  const COUNT = 70
  const meshRef = useRef()
  const state = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        edge: edges[(Math.random() * edges.length) | 0],
        t: Math.random(),
        speed: 0.15 + Math.random() * 0.3,
      })),
    [edges]
  )
  const positions = useMemo(() => new Float32Array(COUNT * 3), [])
  const texture = useGlowTexture()

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const dt = reduceMotion ? 0 : delta
    state.forEach((s, i) => {
      s.t += s.speed * dt
      if (s.t > 1) {
        s.t = 0
        s.edge = edges[(Math.random() * edges.length) | 0]
      }
      const [a, b] = s.edge
      positions[i * 3] = a[0] + (b[0] - a[0]) * s.t
      positions[i * 3 + 1] = a[1] + (b[1] - a[1]) * s.t
      positions[i * 3 + 2] = a[2] + (b[2] - a[2]) * s.t
    })
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.4}
        color="#ffd9a8"
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** The whole network: edges, hidden-layer nodes, output nodes and pulses,
 * grouped so it can be scaled/rotated together as one assembling object. */
function Network({ reduceMotion }) {
  const groupRef = useRef()
  const { hidden, output, edges, edgePositions } = useNetworkGeometry()
  const texture = useGlowTexture()
  const start = useRef(performance.now())
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((frameState) => {
    const group = groupRef.current
    if (!group) return

    const t = reduceMotion ? 4 : (performance.now() - start.current) / 1000
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const scrollProgress = window.scrollY / scrollable

    const introEase = 1 - Math.pow(1 - Math.min(1, t / 2.6), 3)
    const isWide = window.innerWidth > 900
    const settleOut = 1 - Math.min(1, scrollProgress * 3)

    pointer.current.x = frameState.pointer.x * 0.5
    pointer.current.y = frameState.pointer.y * 0.5

    group.scale.setScalar(0.25 + 0.75 * introEase)
    group.rotation.y = t * 0.08 + scrollProgress * Math.PI * 2 + pointer.current.x * 0.6
    group.rotation.x = pointer.current.y * 0.35 + Math.sin(scrollProgress * Math.PI) * 0.4
    group.position.x = (isWide ? 3.4 : 0) * settleOut
    group.position.y = (isWide ? 0 : 2.4) * settleOut

    frameState.camera.position.z = 12 - Math.sin(scrollProgress * Math.PI) * 2.5
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#5b86ff" transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hidden, 3]} />
        </bufferGeometry>
        <pointsMaterial map={texture} size={0.55} color="#7d9fff" transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[output, 3]} />
        </bufferGeometry>
        <pointsMaterial map={texture} size={0.75} color="#ffb45a" transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <SignalPulses edges={edges} reduceMotion={reduceMotion} />
    </group>
  )
}

/** A faint sphere of dust particles surrounding the scene for depth. */
function Dust() {
  const texture = useGlowTexture()
  const groupRef = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3)
    for (let i = 0; i < 600; i++) {
      const r = 14 + Math.random() * 16
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.01
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={texture} size={0.09} color="#9aa7c7" transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}

export default function NeuralNetwork({ reduceMotion }) {
  return (
    <>
      <Network reduceMotion={reduceMotion} />
      <Dust />
    </>
  )
}
