import React, { useState } from 'react'
import { Github } from 'lucide-react'

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      style={cardStyle(isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen */}
      <div style={imageContainerStyle}>
        {imageError ? (
          <div 
            style={{ 
              ...placeholderImageStyle, 
              background: `linear-gradient(135deg, ${getGradient(project.category)})` 
            }}
          >
            <span style={categoryBadgeStyle}>{project.category}</span>
          </div>
        ) : (
          <div style={imageBadgeContainerStyle}>
            <img
              src={project.image}
              alt={project.title}
              style={imageStyle}
              onError={handleImageError}
            />
            <span style={categoryBadgeStyle}>{project.category}</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={contentStyle}>
        <h3 style={titleStyle}>{project.title}</h3>
        <p style={descriptionStyle}>{project.description}</p>

        {/* Tecnologías */}
        <div style={technologiesStyle}>
          {project.technologies.map((tech, i) => (
            <span key={i} style={techBadgeStyle}>{tech}</span>
          ))}
        </div>

        {/* Stats si existen */}
        {project.stats && (
          <div style={statsStyle}>
            <span style={statStyle}>⭐ {project.stats.stars}</span>
            <span style={statStyle}>🔀 {project.stats.forks}</span>
            <span style={statStyle}>🐛 {project.stats.issues}</span>
          </div>
        )}

        {/* Footer con links */}
        <div style={footerStyle}>
          <div style={linksContainerStyle}>
            {project.link !== '#' && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <Github size={16} />
                Código
              </a>
            )}
            {project.private && <span style={privateStyle}>🔒 Privado</span>}
          </div>
          <span style={dateStyle}>{project.date}</span>
        </div>
      </div>
    </div>
  )
}

// Función para obtener gradientes por categoría
const getGradient = (category) => {
  const gradients = {
    Mobile: '#0ea5e9, #06b6d4',
    IA: '#a855f7, #ec4899',
    FullStack: '#10b981, #06b6d4',
    DevOps: '#f59e0b, #ec4899',
    Seguridad: '#ef4444, #a855f7',
    Hardware: '#8b5cf6, #06b6d4',
    Embebidos: '#06b6d4, #10b981'
  }
  return gradients[category] || '#0ea5e9, #06b6d4'
}

// ===== ESTILOS =====

const cardStyle = (isHovered) => ({
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
  border: `1px solid rgba(14, 165, 233, ${isHovered ? 0.6 : 0.25})`,
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  transform: isHovered ? 'translateY(-16px)' : 'translateY(0)',
  boxShadow: isHovered 
    ? '0 30px 60px rgba(14, 165, 233, 0.25)' 
    : '0 10px 30px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backdropFilter: 'blur(10px)',
})

const imageContainerStyle = {
  width: '100%',
  height: '240px',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#0f172a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const imageBadgeContainerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'transform 0.4s ease',
}

const placeholderImageStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: '1.5rem',
  position: 'relative',
}

const categoryBadgeStyle = {
  background: 'rgba(0, 0, 0, 0.75)',
  color: '#f1f5f9',
  padding: '0.6rem 1.2rem',
  borderRadius: '24px',
  fontSize: '0.8rem',
  fontWeight: '700',
  letterSpacing: '0.5px',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  textTransform: 'uppercase',
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
  zIndex: 10,
}

const contentStyle = {
  padding: '28px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}

const titleStyle = {
  fontSize: '1.4rem',
  marginBottom: '12px',
  color: '#f1f5f9',
  fontWeight: '700',
  lineHeight: '1.3',
  letterSpacing: '-0.5px',
}

const descriptionStyle = {
  fontSize: '0.95rem',
  color: '#cbd5e1',
  lineHeight: '1.7',
  marginBottom: '16px',
  flex: 1,
}

const technologiesStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: '1px solid rgba(14, 165, 233, 0.15)',
}

const techBadgeStyle = {
  background: 'rgba(14, 165, 233, 0.12)',
  color: '#0ea5e9',
  padding: '6px 12px',
  borderRadius: '18px',
  fontSize: '0.75rem',
  fontWeight: '600',
  border: '1px solid rgba(14, 165, 233, 0.25)',
  transition: 'all 0.3s ease',
  whiteSpace: 'nowrap',
}

const statsStyle = {
  display: 'flex',
  gap: '16px',
  padding: '14px 0',
  marginBottom: '16px',
  borderBottom: '1px solid rgba(14, 165, 233, 0.15)',
}

const statStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.9rem',
  color: '#94a3b8',
  fontWeight: '600',
}

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  paddingTop: '14px',
  borderTop: '1px solid rgba(14, 165, 233, 0.15)',
}

const linksContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
}

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  color: '#0ea5e9',
  transition: 'all 0.3s ease',
  fontWeight: '600',
  fontSize: '0.9rem',
  textDecoration: 'none',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '6px',
}

const privateStyle = {
  fontSize: '0.8rem',
  color: '#f59e0b',
  fontWeight: '600',
}

const dateStyle = {
  fontSize: '0.8rem',
  color: '#94a3b8',
  fontWeight: '500',
  whiteSpace: 'nowrap',
}