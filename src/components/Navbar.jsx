import { nav } from '../data/content'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pb-3.5"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 14px)', background: 'linear-gradient(var(--color-bg), transparent)' }}
    >
      <b className="font-[var(--font-display)] text-lg hidden sm:block">MHB</b>
      <div className="flex gap-4 sm:gap-5 text-sm">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className="text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors no-underline">
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
