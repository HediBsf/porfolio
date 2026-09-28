import { motion } from 'framer-motion'

/** Fades and lifts children into place once, the first time they scroll
 * into view. Kept to a single subtle treatment used consistently across
 * sections, rather than a different effect per section. */
export default function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
