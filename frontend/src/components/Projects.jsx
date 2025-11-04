import React, { useState, useMemo } from 'react'
import ProjectCard from './ProjectCard'
import projectsData from '../data/projects.json'
import { Filter } from 'lucide-react'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const categories = useMemo(() => {
    const cats = ['Todos', ...new Set(projectsData.map(p => p.category))]
    return cats
  }, [])

  const filteredProjects = useMemo(() => {
    return selectedCategory === 'Todos'
      ? projectsData
      : projectsData.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section id="projects" style={sectionStyle}>
      <div className="container">
        <div style={headerStyle}>
          <h2 style={titleStyle}>Mis Proyectos</h2>
          <p style={subtitleStyle}>Explora mi portfolio de proyectos innovadores</p>
        </div>

        {/* Filtros */}
        <div style={filterContainerStyle}>
          <div style={filterLabelStyle}>
            <Filter size={20} />
            <span>Filtrar por categoría:</span>
          </div>
          <div style={filterButtonsStyle}>
            {categories.map(cat => (
              <button
                key={cat}
                style={filterButtonStyle(selectedCategory === cat)}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de proyectos */}
        <div style={gridStyle}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={emptyStateStyle}>
            <p>No hay proyectos en esta categoría</p>
          </div>
        )}
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
  marginBottom: '3rem',
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

const filterContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  animation: 'fadeInUp 0.8s ease-out',
}

const filterLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#cbd5e1',
  fontWeight: '600',
}

const filterButtonsStyle = {
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
}

const filterButtonStyle = (isActive) => ({
  padding: '0.75rem 1.25rem',
  background: isActive
    ? 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
    : 'rgba(14, 165, 233, 0.1)',
  color: isActive ? 'white' : '#cbd5e1',
  border: `1px solid ${isActive ? '#0ea5e9' : 'rgba(14, 165, 233, 0.2)'}`,
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontWeight: '600',
  fontSize: '0.9rem',
})

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
  gap: '2.5rem',
  marginBottom: '2rem',
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: '3rem',
  color: '#94a3b8',
}