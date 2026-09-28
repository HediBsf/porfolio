import Reveal from '../Reveal'
import { profile } from '../../data/content'

export default function Contact() {
  return (
    <section id="contact" className="max-w-[1080px] mx-auto px-6 pt-20 pb-32">
      <Reveal>
        <h2 className="font-bold tracking-tight mb-5" style={{ fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
          Let's work on something intelligent
        </h2>
        <p className="max-w-[32em] text-[var(--color-mute)]">
          I'm available for a 4–6 month research internship in AI and Machine Learning. I speak French fluently and English
          at a professional working level.
        </p>
        <div className="flex gap-3.5 flex-wrap mt-8">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
            LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  )
}
