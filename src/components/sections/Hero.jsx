import { motion } from 'framer-motion'
import { profile } from '../../data/content'
import Portrait from '../Portrait'

const up = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.13 + 0.4, ease: [0.2, 0.7, 0.2, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="max-w-[1080px] mx-auto px-6 min-h-[100svh] flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16 justify-center pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
        className="order-first lg:order-last shrink-0"
      >
        <Portrait />
      </motion.div>

      <div className="flex-1 min-w-0">
      <motion.h1
        variants={up}
        initial="hidden"
        animate="show"
        custom={0}
        className="font-bold tracking-tight max-w-[9.5em]"
        style={{ fontSize: 'clamp(46px, 8.4vw, 112px)', letterSpacing: '-0.03em' }}
      >
        {profile.name}
      </motion.h1>

      <motion.h2
        variants={up}
        initial="hidden"
        animate="show"
        custom={1}
        className="font-medium text-[var(--color-mute)] mt-5 max-w-[24em] leading-snug"
        style={{ fontSize: 'clamp(20px, 2.6vw, 30px)' }}
      >
        {profile.role}
      </motion.h2>

      <motion.p variants={up} initial="hidden" animate="show" custom={2} className="max-w-[34em] text-[var(--color-mute)] mt-5">
        {profile.summary}
      </motion.p>

      <motion.div variants={up} initial="hidden" animate="show" custom={3} className="flex gap-3.5 flex-wrap mt-8">
        <a href="#work" className="btn btn-primary">
          See my projects
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">
          GitHub
        </a>
        <a href="#contact" className="btn">
          Get in touch
        </a>
      </motion.div>
      </div>
    </section>
  )
}
