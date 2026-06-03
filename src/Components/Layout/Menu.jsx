import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import Divider from '../../Assets/Images/Line divider.svg';

const menuItems = [
  { id: 'begin',    label: 'Begin the Journey', path: '/game',     description: 'Step onto the river of time' },
  { id: 'levels',   label: 'Levels',             path: '/levels',   description: 'Choose your chapter' },
  { id: 'settings', label: 'Settings',           path: '/settings', description: 'Adjust your experience' },
  { id: 'quit',     label: 'Quit',               path: null,        description: 'Return to the waking world' },
];

// Egyptian / ancient hieroglyph-style symbols for the floating particles
const GLYPHS = ['𓂀', '𓃭', '𓆣', '𓇯', '𓈖', '𓉐', '𓊪', '𓋴', '𓌀', '𓍯', '𓎛', '𓏏', '𓐍', '𓀭', '𓁹', '𓂋'];

const Particles = () => {
  const particles = Array.from({ length: 26 }, (_, i) => {
    const left     = 2 + Math.random() * 96;          // % across screen
    const duration = 14 + Math.random() * 12;         // slower: 14–26s
    const delay    = Math.random() * 14;              // stagger start
    const size     = 26 + Math.random() * 32;         // much bigger: 26–58px
    const opacity  = 0.35 + Math.random() * 0.35;     // much more visible: 0.35–0.70
    const glyph    = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    return { i, left, duration, delay, size, opacity, glyph };
  });

  return (
    <div className="menu-particles" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.i}
          className="menu-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--p-opacity': p.opacity,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
};

const Menu = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem]   = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted]         = useState(false);

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
      {/* Floating particles rendered at the page level so they cover the full screen */}
      <Particles />

      <div className={`menu-wrapper ${mounted ? 'menu-wrapper--visible' : ''}`}>

        {/* Menu Items */}
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

                  {/* Label & description — NO icon */}
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