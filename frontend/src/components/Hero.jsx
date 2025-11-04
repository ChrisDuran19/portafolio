import React, { useEffect, useState } from 'react'
import { ArrowRight, Download, Code2 } from 'lucide-react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" style={sectionStyle}>
      <div className="container">
        <div style={contentStyle}>
          {/* Contenido principal */}
          <div style={textContentStyle}>
            <div style={badgeStyle}>
              <span style={badgeIconStyle}>✨</span>
              <span>Bienvenido a mi portafolio</span>
            </div>

            <h1 style={titleStyle}>
              Cristian David <span style={gradientTextStyle}>Durán Grimaldo</span>
            </h1>

            <p style={subtitleStyle}>
              Ingeniero Electrónico | Full Stack Developer | IA & ML Specialist
            </p>

            <p style={descriptionStyle}>
              Creo soluciones innovadoras con tecnología de punta. Especializado en desarrollo
              web, mobile, inteligencia artificial y sistemas embebidos. Transformo ideas en
              código funcional y escalable.
            </p>

            <div style={statsStyle}>
              <div style={statItemStyle}>
                <div style={statNumberStyle}>13+</div>
                <div style={statLabelStyle}>Proyectos</div>
              </div>
              <div style={statItemStyle}>
                <div style={statNumberStyle}>5+</div>
                <div style={statLabelStyle}>Años Exp.</div>
              </div>
              <div style={statItemStyle}>
                <div style={statNumberStyle}>∞</div>
                <div style={statLabelStyle}>Pasión</div>
              </div>
            </div>

            <div style={buttonsStyle}>
              <button style={buttonPrimaryStyle}>
                Ver mis proyectos
                <ArrowRight size={20} />
              </button>
              <button style={buttonSecondaryStyle}>
                <Download size={20} />
                Descargar CV
              </button>
            </div>
          </div>

          {/* Elemento visual floating */}
          <div style={{ ...floatingElementStyle, transform: `translateY(${scrollY * 0.5}px)` }}>
            <div style={codeBlockStyle}>
              <div style={codeHeaderStyle}>
                <span style={codeTabStyle}>code.js</span>
              </div>
              <pre style={codeStyle}>{`const developer = {
  name: "Cristian Durán",
  skills: ["React", "Python", "IA"],
  passion: "∞"
}`}</pre>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div style={decorativeElements}>
          <div style={glowCircle1}></div>
          <div style={glowCircle2}></div>
          <div style={glowCircle3}></div>
        </div>
      </div>
    </section>
  )
}

const sectionStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: '120px 0 60px',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
}

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '4rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}

const textContentStyle = {
  zIndex: 10,
  animation: 'fadeInUp 1s ease-out',
}

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  background: 'rgba(14, 165, 233, 0.1)',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  borderRadius: '50px',
  color: '#0ea5e9',
  fontSize: '0.9rem',
  fontWeight: '600',
  marginBottom: '1.5rem',
  animation: 'slideInTop 0.8s ease-out',
}

const badgeIconStyle = {
  fontSize: '1.2rem',
  animation: 'float 2s ease-in-out infinite',
}

const titleStyle = {
  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
  fontFamily: "'Jost', sans-serif",
  fontWeight: 800,
  lineHeight: 1.1,
  marginBottom: '1rem',
  color: '#f1f5f9',
  animation: 'fadeInUp 1s ease-out 0.2s backwards',
}

const gradientTextStyle = {
  background: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #ec4899 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
}

const subtitleStyle = {
  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
  color: '#06b6d4',
  fontWeight: '600',
  marginBottom: '1rem',
  animation: 'fadeInUp 1s ease-out 0.3s backwards',
}

const descriptionStyle = {
  fontSize: '1.1rem',
  color: '#cbd5e1',
  lineHeight: '1.8',
  maxWidth: '500px',
  marginBottom: '2rem',
  animation: 'fadeInUp 1s ease-out 0.4s backwards',
}

const statsStyle = {
  display: 'flex',
  gap: '3rem',
  marginBottom: '2.5rem',
  '@media (max-width: 768px)': {
    gap: '1.5rem',
  },
}

const statItemStyle = {
  animation: 'fadeInUp 1s ease-out 0.5s backwards',
}

const statNumberStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '0.25rem',
}

const statLabelStyle = {
  fontSize: '0.9rem',
  color: '#94a3b8',
}

const buttonsStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  animation: 'fadeInUp 1s ease-out 0.6s backwards',
}

const buttonPrimaryStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '14px 32px',
  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)',
}

const buttonSecondaryStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '14px 32px',
  background: 'transparent',
  color: '#0ea5e9',
  border: '2px solid #0ea5e9',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
}

const floatingElementStyle = {
  animation: 'float 3s ease-in-out infinite',
}

const codeBlockStyle = {
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 20px 50px rgba(14, 165, 233, 0.15)',
  animation: 'scaleIn 1s ease-out',
}

const codeHeaderStyle = {
  background: 'rgba(14, 165, 233, 0.1)',
  padding: '1rem',
  borderBottom: '1px solid rgba(14, 165, 233, 0.2)',
  display: 'flex',
  gap: '0.5rem',
}

const codeTabStyle = {
  background: 'rgba(14, 165, 233, 0.2)',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  fontSize: '0.85rem',
  color: '#0ea5e9',
}

const codeStyle = {
  padding: '1.5rem',
  color: '#0ea5e9',
  fontSize: '0.9rem',
  fontFamily: "'Fira Code', monospace",
  margin: 0,
  lineHeight: '1.6',
  overflow: 'auto',
}

const decorativeElements = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 0,
  pointerEvents: 'none',
}

const glowCircle1 = {
  position: 'absolute',
  width: '500px',
  height: '500px',
  background: 'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%)',
  borderRadius: '50%',
  top: '-200px',
  right: '-200px',
  animation: 'rotate-slow 20s linear infinite',
}

const glowCircle2 = {
  position: 'absolute',
  width: '400px',
  height: '400px',
  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
  borderRadius: '50%',
  bottom: '-100px',
  left: '-100px',
}

const glowCircle3 = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
  borderRadius: '50%',
  top: '50%',
  left: '50%',
  animation: 'pulse-glow 3s ease-in-out infinite',
}