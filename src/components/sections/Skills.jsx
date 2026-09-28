import Reveal from '../Reveal'
import { skills } from '../../data/content'

export default function Skills() {
  return (
    <section id="skills" className="max-w-[1080px] mx-auto px-6 py-20">
      <Reveal>
        <h2 className="font-bold tracking-tight mb-8" style={{ fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
          Skills
        </h2>
      </Reveal>

      <div className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <div className="panel">
              <h3 className="text-xl mb-2">{group.title}</h3>
              <p className="text-[var(--color-mute)] text-base m-0">{group.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
