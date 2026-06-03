import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import Divider from '../../Assets/Images/Line divider.svg';

const menuItems = [
  { id: 'begin', label: 'Begin the Journey', icon: '⟁', path: '/game', description: 'Step onto the river of time' },
  { id: 'levels', label: 'Levels', icon: '◈', path: '/levels', description: 'Choose your chapter' },
  { id: 'settings', label: 'Settings', icon: '⚙', path: '/settings', description: 'Adjust your experience' },
  { id: 'quit', label: 'Quit', icon: '⊗', path: null, description: 'Return to the waking world' },
];

const Menu = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') setSelectedIndex(i => (i - 1 + menuItems.length) % menuItems.length);
      if (e.key === 'ArrowDown') setSelectedIndex(i => (i + 1) % menuItems.length);
      if (e.key === 'Enter') handleSelect(menuItems[selectedIndex]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex]);

  const handleSelect = (item) => {
    setActiveItem(item.id);
    setTimeout(() => {
      if (item.path) navigate(item.path);
      else window.close();
      setActiveItem(null);
    }, 600);
  };

  return (
    <div className={`menu-wrapper ${mounted ? 'menu-wrapper--visible' : ''}`}>

      {/* Divider top */}
      <div className="menu-divider-row" aria-hidden="true">
        <img className="menu-divider-img" src={Divider} alt="" />
        <div className="menu-divider-center-glyph">𓂀</div>
        <img className="menu-divider-img menu-divider-img--flip" src={Divider} alt="" />
      </div>

      {/* Menu Items */}
      <nav className="menu-nav" aria-label="Main menu">
        <ul className="menu-list">
          {menuItems.map((item, index) => {
            const isHovered = hoveredItem === item.id;
            const isActive = activeItem === item.id;
            const isKeySelected = selectedIndex === index && hoveredItem === null;

            return (
              <li
                key={item.id}
                className={`menu-item
                  ${isHovered || isKeySelected ? 'menu-item--hover' : ''}
                  ${isActive ? 'menu-item--active' : ''}
                  ${item.id === 'quit' ? 'menu-item--quit' : ''}
                `}
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

                {/* Icon */}
                <span className="menu-item-icon" aria-hidden="true">{item.icon}</span>

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

                {/* Glow sweep on hover */}
                <span className="menu-item-sweep" aria-hidden="true" />

                {/* Active flash */}
                {isActive && <span className="menu-item-flash" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer hint */}
      <p className="menu-footer-hint">Use ↑ ↓ to navigate · Enter to select</p>
    </div>
  );
};

export default Menu;