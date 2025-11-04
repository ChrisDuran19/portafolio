import React, { useState, useEffect } from 'react'
import skillsData from '../data/skills.json'

export default function Skills() {
  const [visibleSkills, setVisibleSkills] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisibleSkills(prev => ({ ...prev, [entry.target.id]: true }))
          }, 100)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.skill-item').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const renderSkillCategory = (title, skills) => (
    <div key={title} style={categoryStyle}>
      <h3 style={categoryTitleStyle}>{title}</h3>
      <div style={skillsGridStyle}>
        {skills.map((skill, i) => (
          <div key={i} id={`skill-${title}-${i}`} className="skill-item" style={skillCardStyle(visibleSkills[`skill-${title}-${i}`])}>
            <div style={skillHeaderStyle}>
              <span style={skillIconStyle}>{skill.icon}</span>
              <div style={skillNameStyle}>{skill.name}</div>
            </div>
            <div style={progressBarContainerStyle}>
              <div
                style={{
                  ...progressBarStyle,
                  width: visibleSkills[`skill-${title}-${i}`] ? `${skill.level}%` : '0%',
                }}
              ></div>
            </div>
            <div style={levelLabelStyle}>{skill.level}%</div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="skills" style={sectionStyle}>
      <div className="container">
        <div style={headerStyle}>
          <h2 style={titleStyle}>Habilidades & Tecnologías</h2>
          <p style={subtitleStyle}>Dominio en múltiples tecnologías y frameworks</p>
        </div>

        <div style={tabsContainerStyle}>
          {Object.entries(skillsData).map(([category, skills]) => (
            renderSkillCategory(
              category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' '),
              skills
            )
          ))}
        </div>
      </div>
    </section>
  )
}

const sectionStyle = {
  padding: '100px 0',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '4rem',
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

const tabsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '3rem',
}

const categoryStyle = {
  animation: 'fadeInUp 0.8s ease-out',
}

const categoryTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '1.5rem',
  color: '#f1f5f9',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
}

const skillsGridStyle = {
  display: 'grid',
  gap: '1.25rem',
}

const skillCardStyle = (isVisible) => ({
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  borderRadius: '8px',
  padding: '1rem',
  transition: 'all 0.3s ease',
  opacity: isVisible ? 1 : 0.5,
  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
})

const skillHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '0.75rem',
}

const skillIconStyle = {
  fontSize: '1.5rem',
}

const skillNameStyle = {
  fontSize: '0.95rem',
  fontWeight: '600',
  color: '#f1f5f9',
  flex: 1,
}

const progressBarContainerStyle = {
  width: '100%',
  height: '6px',
  background: 'rgba(14, 165, 233, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
  marginBottom: '0.5rem',
}

const progressBarStyle = {
  height: '100%',
  background: 'linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%)',
  transition: 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  borderRadius: '3px',
}

const levelLabelStyle = {
  textAlign: 'right',
  fontSize: '0.85rem',
  color: '#0ea5e9',
  fontWeight: '700',
}