import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import NeuralNetwork from './NeuralNetwork'

export default function SceneCanvas() {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [supportsWebGL, setSupportsWebGL] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(query.matches)
    const listener = (e) => setReduceMotion(e.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setSupportsWebGL(false)
    } catch {
      setSupportsWebGL(false)
    }
  }, [])

  if (!supportsWebGL) return null

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <NeuralNetwork reduceMotion={reduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
