import React from 'react'
import { Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer style={footerStyle}>
      <div className="container">
        {/* Main Footer Content */}
        <div style={contentGridStyle}>
          <div style={brandStyle}>
            <div style={logoStyle}>CD</div>
            <p style={brandDescriptionStyle}>
              Ingeniero electrónico apasionado por la tecnología. Creando soluciones innovadoras.
            </p>
          </div>

          <div style={linksColumnStyle}>
            <h4 style={columnTitleStyle}>Navegación</h4>
            {['Inicio', 'Sobre mí', 'Proyectos', 'Habilidades'].map(item => (
              <a key={item} href="#" style={linkStyle} onClick={(e) => { e.preventDefault() }}>
                {item}
              </a>
            ))}
          </div>

          <div style={linksColumnStyle}>
            <h4 style={columnTitleStyle}>Recursos</h4>
            {['GitHub', 'LinkedIn', 'Email'].map(item => (
              <a key={item} href="#" style={linkStyle} onClick={(e) => { e.preventDefault() }}>
                {item}
              </a>
            ))}
          </div>

          <div style={socialStyle}>
            <h4 style={columnTitleStyle}>Sígueme</h4>
            <div style={socialLinksStyle}>
              <a href="https://github.com/ChrisDuran19" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="GitHub">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="mailto:cristian@example.com" style={socialLinkStyle} title="Email">
                <Mail size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} title="Twitter">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={dividerStyle}></div>

        {/* Bottom Footer */}
        <div style={bottomStyle}>
          <p style={copyrightStyle}>
            © {currentYear} Cristian David Durán Grimaldo. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            style={scrollToTopStyle}
            aria-label="Volver al inicio"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}

const footerStyle = {
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  border: '1px solid rgba(14, 165, 233, 0.1)',
  padding: '4rem 0 2rem',
  marginTop: '4rem',
}

const contentGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  marginBottom: '2rem',
}

const brandStyle = {
  animation: 'fadeInUp 0.8s ease-out',
}

const logoStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '1rem',
}

const brandDescriptionStyle = {
  color: '#94a3b8',
  fontSize: '0.95rem',
  lineHeight: '1.6',
}

const linksColumnStyle = {
  animation: 'fadeInUp 0.8s ease-out',
}

const columnTitleStyle = {
  color: '#f1f5f9',
  fontSize: '1rem',
  fontWeight: '700',
  marginBottom: '1rem',
}

const linkStyle = {
  display: 'block',
  color: '#94a3b8',
  fontSize: '0.95rem',
  marginBottom: '0.75rem',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}

const socialStyle = {
  animation: 'fadeInUp 0.8s ease-out',
}

const socialLinksStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
}

const socialLinkStyle = {
  width: '44px',
  height: '44px',
  background: 'rgba(14, 165, 233, 0.1)',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#0ea5e9',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}

const dividerStyle = {
  width: '100%',
  height: '1px',
  background: 'linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.2) 50%, transparent 100%)',
  margin: '2rem 0',
}

const bottomStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'center',
  },
}

const copyrightStyle = {
  color: '#94a3b8',
  fontSize: '0.9rem',
}

const scrollToTopStyle = {
  width: '40px',
  height: '40px',
  background: 'rgba(14, 165, 233, 0.1)',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#0ea5e9',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
}