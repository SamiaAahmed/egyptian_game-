import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import Divider from '../../Assets/Images/Line divider.svg';

const menuItems = [
  { id: 'begin',    label: 'Begin the Journey', path: '/game',     description: 'Step onto the river of time' },
  { id: 'levels',   label: 'Levels',             path: '/levels',   description: 'Choose your chapter' },
  { id: 'settings', label: 'Settings',           path: '/settings', description: 'Adjust your experience' },
  { id: 'quit',     label: 'Quit',               path: null,        description: 'Return to the waking world' },
];

const GLYPHS = ['𓂀', '𓃭', '𓆣', '𓇯', '𓈖', '𓉐', '𓋴', '𓌀', '𓍯', '𓎛', '𓏏', '𓀭', '𓁹', '𓂋'];

// Generated ONCE at module load — never changes on re-render, so
// hovering a menu item cannot reset or reshuffle the particles.
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  i,
  left:     2  + Math.random() * 96,
  duration: 14 + Math.random() * 12,
  delay:    Math.random() * 14,
  size:     26 + Math.random() * 32,
  opacity:  0.35 + Math.random() * 0.35,
  glyph:    GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
}));

// Pure display component — receives stable PARTICLES, never re-renders
const Particles = React.memo(() => (
  <div className="menu-particles" aria-hidden="true">
    {PARTICLES.map(p => (
      <span
        key={p.i}
        className="menu-particle"
        style={{
          left:              `${p.left}%`,
          fontSize:          `${p.size}px`,
          animationDuration: `${p.duration}s`,
          animationDelay:    `${p.delay}s`,
          '--p-opacity':     p.opacity,
        }}
      >
        {p.glyph}
      </span>
    ))}
  </div>
));

const Menu = () => {
  const navigate = useNavigate();
  const [activeItem,    setActiveItem]    = useState(null);
  const [hoveredItem,   setHoveredItem]   = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted,       setMounted]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = useCallback((item) => {
    setActiveItem(item.id);
    setTimeout(() => {
      if (item.path) navigate(item.path);
      else window.close();
      setActiveItem(null);
    }, 600);
  }, [navigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp')   setSelectedIndex(i => (i - 1 + menuItems.length) % menuItems.length);
      if (e.key === 'ArrowDown') setSelectedIndex(i => (i + 1) % menuItems.length);
      if (e.key === 'Enter')     handleSelect(menuItems[selectedIndex]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, handleSelect]);

  return (
    <>
      {/* Particles are outside the menu wrapper and wrapped in React.memo
          so menu hover state changes never cause them to re-render */}
      <Particles />

      <div className={`menu-wrapper ${mounted ? 'menu-wrapper--visible' : ''}`}>
        <nav className="menu-nav" aria-label="Main menu">
          <ul className="menu-list">
            {menuItems.map((item, index) => {
              const isHovered     = hoveredItem === item.id;
              const isActive      = activeItem  === item.id;
              const isKeySelected = selectedIndex === index && hoveredItem === null;

              return (
                <li
                  key={item.id}
                  className={[
                    'menu-item',
                    isHovered || isKeySelected ? 'menu-item--hover' : '',
                    isActive                   ? 'menu-item--active' : '',
                    item.id === 'quit'         ? 'menu-item--quit'   : '',
                  ].join(' ')}
                  style={{ animationDelay: `${0.3 + index * 0.12}s` }}
                  onMouseEnter={() => { setHoveredItem(item.id); setSelectedIndex(index); }}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleSelect(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleSelect(item)}
                  aria-label={item.label}
                >
                  {/* Left ornament */}
                  <span className="menu-item-ornament menu-item-ornament--left" aria-hidden="true">
                    <span className="ornament-line" />
                    <span className="ornament-diamond" />
                  </span>

                  {/* Label & description */}
                  <span className="menu-item-content">
                    <span className="menu-item-label">{item.label}</span>
                    <span className="menu-item-desc">{item.description}</span>
                  </span>

                  {/* Right ornament */}
                  <span className="menu-item-ornament menu-item-ornament--right" aria-hidden="true">
                    <span className="ornament-diamond" />
                    <span className="ornament-line" />
                  </span>

                  {/* Sweep shimmer */}
                  <span className="menu-item-sweep" aria-hidden="true" />

                  {/* Active flash */}
                  {isActive && <span className="menu-item-flash" aria-hidden="true" />}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Menu;