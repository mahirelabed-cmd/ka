import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Karte', symbol: '۞' },
  { to: '/perlen', label: 'Buch der Perlen', symbol: '◉' },
  { to: '/statistik', label: 'Statistik', symbol: '✦' },
  { to: '/einstellungen', label: 'Einstellungen', symbol: '⚙' },
];

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line bg-surface-soft px-4 py-3">
        <h1 className="font-display text-display-md text-sand-gold">
          Nur as-Sira <span aria-hidden="true">۞</span>
          <span className="ml-2 font-body text-ui-md text-text-dim">
            Das Quiz-Adventure
          </span>
        </h1>
      </header>

      <main className="flex-1 pb-24">
        <Outlet />
      </main>

      <nav
        aria-label="Hauptnavigation"
        className="fixed bottom-0 left-0 right-0 border-t border-line bg-surface-soft"
      >
        <ul className="mx-auto flex max-w-xl justify-around">
          {navItems.map((item) => (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex min-h-touch flex-col items-center justify-center gap-0.5 px-2 py-2 font-ui text-ui-sm ${
                    isActive
                      ? 'text-sand-gold'
                      : 'text-text-dim hover:text-text-main'
                  }`
                }
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  {item.symbol}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
