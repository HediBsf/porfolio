import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import portraitSrc from '../assets/portrait.jpg'

/** A framed portrait that floats gently, tilts toward the cursor in 3D,
 * and sits inside a slow-spinning gradient ring that echoes the neural
 * network's blue-to-amber signal colors. */
export default function Portrait() {
  const frameRef = useRef(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(query.matches)
    const listener = (e) => setReduceMotion(e.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  const handleMove = (e) => {
    if (reduceMotion) return
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
  }

  const handleLeave = () => {
    if (frameRef.current) frameRef.current.style.transform = ''
  }

  return (
    <motion.div
      className="relative mx-auto lg:mx-0"
      style={{ width: 'min(58vw, 260px)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: reduceMotion ? 0 : [0, -12, 0] }}
      transition={{
        opacity: { duration: 0.9, delay: 0.5 },
        scale: { duration: 0.9, delay: 0.5 },
        y: { duration: 6, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut', delay: 1.3 },
      }}
    >
      <div className="portrait-shape portrait-ring" aria-hidden="true" />
      <div
        ref={frameRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="portrait-shape portrait-frame"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img src={portraitSrc} alt="Portrait of Mohamed Hedi Boussoffara" className="portrait-img" />
        <div className="portrait-tint" aria-hidden="true" />
      </div>
    </motion.div>
  )
}
