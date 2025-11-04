"""
Backend Configuration - Portafolio Cristian Durán
Configuración centralizada para la API
"""

import os
from pathlib import Path

# ==========================================
# RUTAS
# ==========================================
BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_DIR = BASE_DIR.parent

# ==========================================
# CONFIGURACIÓN DE DEBUG
# ==========================================
DEBUG = os.getenv('DEBUG', 'True') == 'True'
TESTING = os.getenv('TESTING', 'False') == 'True'

# ==========================================
# CONFIGURACIÓN DE APLICACIÓN
# ==========================================
APP_NAME = 'Portafolio API'
APP_VERSION = '1.0.0'
AUTHOR = 'Cristian David Durán Grimaldo'

# ==========================================
# CONFIGURACIÓN DE SERVIDOR
# ==========================================
HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 5000))
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# ==========================================
# CORS (Cross-Origin Resource Sharing)
# ==========================================
CORS_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000',
]

# Agregar origen de producción cuando esté disponible
if not DEBUG:
    CORS_ORIGINS.extend([
        'https://tudominio.com',
        'https://www.tudominio.com',
    ])

# ==========================================
# CONFIGURACIÓN DE BASE DE DATOS
# ==========================================
DATABASE = {
    'engine': os.getenv('DB_ENGINE', 'sqlite'),
    'name': os.getenv('DB_NAME', 'portafolio.db'),
    'user': os.getenv('DB_USER', 'usuario'),
    'password': os.getenv('DB_PASSWORD', 'contraseña'),
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': int(os.getenv('DB_PORT', 5432)),
}

# ==========================================
# CONFIGURACIÓN DE EMAIL
# ==========================================
EMAIL = {
    'provider': os.getenv('EMAIL_PROVIDER', 'smtp'),
    'host': os.getenv('EMAIL_HOST', 'smtp.gmail.com'),
    'port': int(os.getenv('EMAIL_PORT', 587)),
    'user': os.getenv('EMAIL_USER', 'tu@email.com'),
    'password': os.getenv('EMAIL_PASSWORD', 'tu-password'),
    'from': os.getenv('EMAIL_FROM', 'noreply@portafolio.com'),
}

# ==========================================
# CONFIGURACIÓN DE LOGGING
# ==========================================
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    'log_file': os.path.join(BASE_DIR, 'logs', 'app.log'),
}

# ==========================================
# RUTAS DE API
# ==========================================
API_PREFIX = '/api/v1'
API_ROUTES = {
    'projects': f'{API_PREFIX}/projects',
    'skills': f'{API_PREFIX}/skills',
    'contact': f'{API_PREFIX}/contact',
    'about': f'{API_PREFIX}/about',
}

# ==========================================
# SEGURIDAD
# ==========================================
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB

# ==========================================
# RATE LIMITING
# ==========================================
RATE_LIMIT = {
    'enabled': True,
    'calls': 100,
    'period': 3600,  # 1 hora
}

# ==========================================
# CACHEO
# ==========================================
CACHE = {
    'enabled': True,
    'type': 'redis',  # 'redis' o 'memory'
    'host': os.getenv('CACHE_HOST', 'localhost'),
    'port': int(os.getenv('CACHE_PORT', 6379)),
    'ttl': 3600,  # 1 hora en segundos
}

# ==========================================
# FEATURES FLAGS
# ==========================================
FEATURES = {
    'projects_api': True,
    'skills_api': True,
    'contact_form': True,
    'email_notifications': True,
    'analytics': True,
}

# ==========================================
# PARÁMETROS DE RESPUESTA API
# ==========================================
API_RESPONSE = {
    'version': '1.0',
    'content_type': 'application/json',
    'charset': 'utf-8',
    'pretty_print': DEBUG,
}

# ==========================================
# FUNCIONES DE UTILIDAD
# ==========================================

def get_config():
    """Retorna la configuración actual"""
    return {
        'app_name': APP_NAME,
        'version': APP_VERSION,
        'debug': DEBUG,
        'api_prefix': API_PREFIX,
        'cors_origins': CORS_ORIGINS,
    }


def is_production():
    """Verifica si está en producción"""
    return not DEBUG


def is_development():
    """Verifica si está en desarrollo"""
    return DEBUG