import Reveal from '../Reveal'
import { experience } from '../../data/content'

export default function Experience() {
  return (
    <section id="experience" className="max-w-[1080px] mx-auto px-6 py-20">
      <Reveal>
        <h2 className="font-bold tracking-tight mb-8" style={{ fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
          Experience
        </h2>
      </Reveal>

      <div className="grid gap-4.5 grid-cols-1 lg:grid-cols-2">
        {experience.map((job, i) => (
          <Reveal key={job.role} delay={i * 0.08}>
            <div className="panel">
              <h3 className="text-xl mb-2">
                {job.role}, {job.org}
              </h3>
              <div className="text-[var(--color-amber)] text-sm mb-3">
                {job.location} · {job.period}
              </div>
              <ul className="pl-4.5 mt-3 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="text-[var(--color-mute)] text-base">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
