import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('enviando')
    // Simulamos envío
    setTimeout(() => {
      setStatus('enviado')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 1000)
  }

  return (
    <section id="contact" style={sectionStyle}>
      <div className="container">
        <div style={headerStyle}>
          <h2 style={titleStyle}>Ponte en Contacto</h2>
          <p style={subtitleStyle}>¿Tienes un proyecto en mente? ¡Hablemos!</p>
        </div>

        <div style={contentGridStyle}>
          {/* Información de contacto */}
          <div style={infoStyle}>
            <div style={contactItemStyle}>
              <div style={iconContainerStyle}>
                <Mail size={28} />
              </div>
              <div>
                <h3 style={contactTitleStyle}>Email</h3>
                <a href="mailto:dduran_desarrollador@gmail.com" style={contactValueStyle}>
                  dduran_desarrollador@gmail.com
                </a>
              </div>
            </div>

            <div style={contactItemStyle}>
              <div style={iconContainerStyle}>
                <MapPin size={28} />
              </div>
              <div>
                <h3 style={contactTitleStyle}>Ubicación</h3>
                <p style={contactValueStyle}>
                  Colombia
                </p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form style={formStyle} onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Tu nombre"
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="tu@email.com"
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Asunto</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Asunto del mensaje"
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Mensaje</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={textareaStyle}
                placeholder="Tu mensaje..."
                rows="5"
              ></textarea>
            </div>

            <button
              type="submit"
              style={submitButtonStyle(status)}
              disabled={status === 'enviando'}
            >
              <Send size={20} />
              {status === 'enviando' ? 'Enviando...' : status === 'enviado' ? '✓ Enviado' : 'Enviar Mensaje'}
            </button>
          </form>
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

const contentGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '4rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}

const infoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  animation: 'fadeInLeft 0.8s ease-out',
}

const contactItemStyle = {
  display: 'flex',
  gap: '1.5rem',
  padding: '1.5rem',
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
}

const iconContainerStyle = {
  width: '50px',
  height: '50px',
  background: 'rgba(14, 165, 233, 0.1)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#0ea5e9',
  flexShrink: 0,
}

const contactTitleStyle = {
  fontSize: '1rem',
  fontWeight: '700',
  color: '#f1f5f9',
  marginBottom: '0.25rem',
}

const contactValueStyle = {
  color: '#cbd5e1',
  fontSize: '0.95rem',
  textDecoration: 'none',
}

const formStyle = {
  animation: 'fadeInRight 0.8s ease-out',
}

const formGroupStyle = {
  marginBottom: '1.5rem',
}

const labelStyle = {
  display: 'block',
  fontSize: '0.95rem',
  fontWeight: '600',
  color: '#cbd5e1',
  marginBottom: '0.5rem',
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(30, 41, 59, 0.8)',
  border: '1px solid rgba(14, 165, 233, 0.2)',
  borderRadius: '6px',
  color: '#f1f5f9',
  fontSize: '0.95rem',
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
}

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  fontFamily: 'inherit',
}

const submitButtonStyle = (status) => ({
  width: '100%',
  padding: '1rem',
  background: status === 'enviado'
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    : 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  fontWeight: '700',
  cursor: status === 'enviando' ? 'not-allowed' : 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  opacity: status === 'enviando' ? 0.7 : 1,
})