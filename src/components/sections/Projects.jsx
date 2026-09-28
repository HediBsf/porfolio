import Reveal from '../Reveal'
import TiltCard from '../TiltCard'
import { projects } from '../../data/content'

export default function Projects() {
  return (
    <section id="work" className="max-w-[1080px] mx-auto px-6 py-20">
      <Reveal>
        <h2 className="font-bold tracking-tight mb-8" style={{ fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
          Projects
        </h2>
      </Reveal>

      <div className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06}>
            <TiltCard>
              <h3 className="text-xl mb-2">{project.title}</h3>
              <div className="text-[var(--color-amber)] text-sm mb-3">{project.period}</div>
              <p className="text-[var(--color-mute)] text-base mb-3.5">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
