import React, { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'

export default function Navbar() {
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

  const menuItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre mí', id: 'about' },
    { label: 'Proyectos', id: 'projects' },
    { label: 'Habilidades', id: 'skills' },
    { label: 'Contacto', id: 'contact' },
  ]

  return (
    <nav style={navbarStyle(isScrolled)}>
      <div className="container" style={navbarContentStyle}>
        {/* Logo */}
        <div style={logoStyle}>
          <span style={logoTextStyle}>CD</span>
        </div>

        {/* Desktop Menu */}
        <div style={menuDesktopStyle}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              style={menuLinkStyle}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={(e) => e.target.style.color = '#06b6d4'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Social Links Desktop */}
        <div style={socialDesktopStyle}>
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
          style={toggleButtonStyle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={mobileMenuStyle}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              style={mobileLinkStyle}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
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
    </nav>
  )
}

const navbarStyle = (isScrolled) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: '1rem 0',
  background: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
  backdropFilter: 'blur(10px)',
  zIndex: 1000,
  borderBottom: isScrolled ? '1px solid rgba(14, 165, 233, 0.1)' : 'none',
  transition: 'all 0.3s ease',
})

const navbarContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const logoTextStyle = {
  display: 'inline-block',
}

const menuDesktopStyle = {
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}

const menuLinkStyle = {
  background: 'none',
  border: 'none',
  color: '#cbd5e1',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  padding: '0.5rem',
}

const socialDesktopStyle = {
  display: 'flex',
  gap: '1.5rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}

const socialIconStyle = {
  color: '#cbd5e1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  padding: '0.5rem',
}

const toggleButtonStyle = {
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
  borderTop: '1px solid rgba(14, 165, 233, 0.1)',
  animation: 'slideInDown 0.3s ease',
}

const mobileLinkStyle = {
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
  borderTop: '1px solid rgba(14, 165, 233, 0.1)',
}