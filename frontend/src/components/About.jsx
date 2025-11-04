import React from 'react'
import { Briefcase, Code2, Zap } from 'lucide-react'

export default function About() {
  return (
    <section id="about" style={sectionStyle}>
      <div className="container">
        <div style={headerStyle}>
          <h2 style={titleStyle}>Sobre Mí</h2>
          <p style={subtitleStyle}>Ingeniero innovador con pasión por la tecnología</p>
        </div>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={iconStyle}><Briefcase size={32} /></div>
            <h3 style={cardTitleStyle}>Experiencia</h3>
            <p style={cardTextStyle}>
              5+ años en desarrollo de software, especializado en arquitecturas escalables y soluciones empresariales.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}><Code2 size={32} /></div>
            <h3 style={cardTitleStyle}>Full Stack</h3>
            <p style={cardTextStyle}>
              Dominio completo del stack moderno: React, Node.js, Python, bases de datos y DevOps.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}><Zap size={32} /></div>
            <h3 style={cardTitleStyle}>Innovación</h3>
            <p style={cardTextStyle}>
              Especialista en IA, Machine Learning y tecnologías emergentes para soluciones del futuro.
            </p>
          </div>
        </div>

        <div style={bioStyle}>
          <div style={bioTextStyle}>
            <h3 style={bioTitleStyle}>Mi Historia</h3>
            <p style={biopStyle}>
              Soy un ingeniero electrónico apasionado por resolver problemas complejos mediante código. 
              Comencé mi carrera en electrónica digital y sistemas embebidos, pero pronto descubrí mi verdadera 
              pasión: crear experiencias digitales impactantes.
            </p>
            <p style={biopStyle}>
              Desde entonces, he trabajado en diversos proyectos: desde aplicaciones móviles innovadoras 
              hasta sistemas de IA complejos y plataformas web escalables. Mi objetivo es convertir ideas 
              en soluciones reales que generen valor.
            </p>
          </div>

          <div style={highlightsStyle}>
            <h3 style={bioTitleStyle}>Highlights</h3>
            {[
              '✨ Arquitecto de soluciones full stack',
              '🤖 Especialista en IA y Machine Learning',
              '📱 Desarrollo mobile nativo (Kotlin, Swift)',
              '☸️ DevOps y administración de infraestructura',
              '🔧 Sistemas embebidos y FPGA',
              '🐍 Expert en Python'
            ].map((item, i) => (
              <div key={i} style={highlightItemStyle}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const sectionStyle = {
  padding: '100px 0',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  position: 'relative',
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '4rem',
  animation: 'fadeInUp 0.8s ease-out',
}

const titleStyle = {
  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
  marginBottom: '1rem',
  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#94a3b8',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  marginBottom: '4rem',
}

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  borderRadius: '12px',
  padding: '2rem',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  animation: 'fadeInUp 0.8s ease-out',
}

const iconStyle = {
  width: '60px',
  height: '60px',
  background: 'rgba(14, 165, 233, 0.1)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#0ea5e9',
  marginBottom: '1rem',
}

const cardTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '0.5rem',
  color: '#f1f5f9',
}

const cardTextStyle = {
  color: '#cbd5e1',
  lineHeight: '1.6',
}

const bioStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}

const bioTextStyle = {
  animation: 'fadeInLeft 0.8s ease-out',
}

const bioTitleStyle = {
  fontSize: '1.8rem',
  marginBottom: '1.5rem',
  color: '#f1f5f9',
}

const biopStyle = {
  color: '#cbd5e1',
  lineHeight: '1.8',
  marginBottom: '1rem',
  fontSize: '1.05rem',
}

const highlightsStyle = {
  animation: 'fadeInRight 0.8s ease-out',
}

const highlightItemStyle = {
  padding: '0.75rem 1rem',
  background: 'rgba(14, 165, 233, 0.05)',
  border: '1px solid rgba(14, 165, 233, 0.1)',
  borderRadius: '8px',
  marginBottom: '0.75rem',
  color: '#cbd5e1',
  transition: 'all 0.3s ease',
}