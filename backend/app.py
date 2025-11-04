# -*- coding: utf-8 -*-
import sys
import io
from flask import Flask, jsonify
from flask_cors import CORS
from routes.projects import projects_bp
from routes.contact import contact_bp

# Configurar encoding UTF-8 para Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Crear app
app = Flask(__name__)

# Habilitar CORS
CORS(app)

# Registrar blueprints
app.register_blueprint(projects_bp)
app.register_blueprint(contact_bp)

# Ruta raíz
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'ok',
        'message': 'Backend funcionando correctamente',
        'version': '1.0.0'
    }), 200

# Ruta de prueba
@app.route('/api/v1/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'message': 'Backend is running!'
    }), 200

if __name__ == '__main__':
    print("🚀 Backend ejecutándose en http://localhost:5000")
    print("📱 Frontend en http://localhost:3000")
    print("\nEndpoints disponibles:")
    print("  GET  http://localhost:5000/")
    print("  GET  http://localhost:5000/api/v1/health")
    print("  GET  http://localhost:5000/api/v1/projects")
    print("  POST http://localhost:5000/api/v1/contact/send")
    app.run(debug=True, port=5000, host='0.0.0.0')