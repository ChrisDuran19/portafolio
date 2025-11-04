import React, { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail, Code2 } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <header style={headerStyle(isScrolled)}>
      <div style={containerStyle}>
        {/* Logo */}
        <div style={logoStyle} onClick={() => scrollToSection('hero')}>
          <Code2 size={28} style={{ color: '#0ea5e9' }} />
          <span style={logoTextStyle}>Cristian Durán</span>
        </div>

        {/* Desktop Menu */}
        <nav style={navDesktopStyle}>
          {['hero', 'about', 'projects', 'skills', 'contact'].map(item => (
            <button
              key={item}
              style={navLinkStyle}
              onClick={() => scrollToSection(item)}
              onMouseEnter={(e) => e.target.style.color = '#06b6d4'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        {/* Social Links */}
        <div style={socialLinksStyle}>
          <a href="https://github.com/ChrisDuran19" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
            <Github size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
            <Linkedin size={20} />
          </a>
          <a href="mailto:cristian@example.com" style={socialIconStyle}>
            <Mail size={20} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={mobileMenuButtonStyle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={mobileMenuStyle}>
          {['hero', 'about', 'projects', 'skills', 'contact'].map(item => (
            <button
              key={item}
              style={mobileMenuItemStyle}
              onClick={() => scrollToSection(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
          <div style={mobileSocialStyle}>
            <a href="https://github.com/ChrisDuran19" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
              <Linkedin size={20} />
            </a>
            <a href="mailto:cristian@example.com" style={socialIconStyle}>
              <Mail size={20} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

// ESTILOS
const headerStyle = (isScrolled) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: '1rem 0',
  background: isScrolled
    ? 'rgba(15, 23, 42, 0.95)'
    : 'rgba(15, 23, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  borderBottom: isScrolled ? '1px solid rgba(14, 165, 233, 0.2)' : 'none',
  zIndex: 1000,
  transition: 'all 0.3s ease',
})

const containerStyle = {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontWeight: 'bold',
  fontSize: '1.3rem',
  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const logoTextStyle = {
  display: 'inline',
}

const navDesktopStyle = {
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}

const navLinkStyle = {
  background: 'none',
  border: 'none',
  color: '#cbd5e1',
  cursor: 'pointer',
  fontSize: '0.95rem',
  fontWeight: '500',
  transition: 'color 0.3s ease',
  padding: '0.5rem',
}

const socialLinksStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}

const socialIconStyle = {
  color: '#0ea5e9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  padding: '0.5rem',
}

const mobileMenuButtonStyle = {
  display: 'none',
  background: 'none',
  border: 'none',
  color: '#0ea5e9',
  cursor: 'pointer',
  '@media (max-width: 768px)': {
    display: 'block',
  },
}

const mobileMenuStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem',
  background: 'rgba(30, 41, 59, 0.95)',
  borderTop: '1px solid rgba(14, 165, 233, 0.2)',
  animation: 'slideInDown 0.3s ease',
}

const mobileMenuItemStyle = {
  background: 'none',
  border: 'none',
  color: '#cbd5e1',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '500',
  textAlign: 'left',
  transition: 'all 0.3s ease',
  padding: '0.75rem',
}

const mobileSocialStyle = {
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'flex-start',
  paddingTop: '1rem',
  borderTop: '1px solid rgba(14, 165, 233, 0.2)',
}