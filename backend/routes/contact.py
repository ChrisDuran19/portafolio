"""
Routes: Contact
API endpoints para gestionar mensajes de contacto
"""

from flask import Blueprint, jsonify, request
from datetime import datetime

# Crear blueprint para contacto
contact_bp = Blueprint('contact', __name__, url_prefix='/api/v1/contact')

# Almacenamiento simple de mensajes (en producción usar BD)
messages = []


# ==========================================
# Modelo de mensaje
# ==========================================

class Message:
    """Modelo de mensaje de contacto"""
    
    def __init__(self, name, email, subject, message, phone=None):
        self.id = len(messages) + 1
        self.name = name
        self.email = email
        self.subject = subject
        self.message = message
        self.phone = phone
        self.created_at = datetime.now().isoformat()
        self.read = False
    
    def to_dict(self):
        """Convierte mensaje a diccionario"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'phone': self.phone,
            'created_at': self.created_at,
            'read': self.read
        }


# ==========================================
# POST - Crear mensaje
# ==========================================

@contact_bp.route('/send', methods=['POST'])
def send_message():
    """
    Envía un mensaje de contacto
    
    Body JSON:
        {
            "name": "Juan Pérez",
            "email": "juan@example.com",
            "subject": "Asunto del mensaje",
            "message": "Contenido del mensaje",
            "phone": "+57 300 000 0000" (opcional)
        }
    
    Returns:
        JSON con confirmación
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'Body JSON requerido'
            }), 400
        
        # Validar campos requeridos
        required_fields = ['name', 'email', 'subject', 'message']
        missing_fields = [f for f in required_fields if not data.get(f)]
        
        if missing_fields:
            return jsonify({
                'status': 'error',
                'message': f'Campos faltantes: {", ".join(missing_fields)}'
            }), 400
        
        # Validar email
        if '@' not in data['email']:
            return jsonify({
                'status': 'error',
                'message': 'Email inválido'
            }), 400
        
        # Validar longitudes
        if len(data['name'].strip()) < 2:
            return jsonify({
                'status': 'error',
                'message': 'Nombre debe tener al menos 2 caracteres'
            }), 400
        
        if len(data['message'].strip()) < 10:
            return jsonify({
                'status': 'error',
                'message': 'Mensaje debe tener al menos 10 caracteres'
            }), 400
        
        # Crear mensaje
        msg = Message(
            name=data['name'],
            email=data['email'],
            subject=data['subject'],
            message=data['message'],
            phone=data.get('phone')
        )
        
        messages.append(msg)
        
        return jsonify({
            'status': 'success',
            'message': 'Mensaje enviado exitosamente',
            'data': {
                'id': msg.id,
                'name': msg.name,
                'email': msg.email,
                'created_at': msg.created_at
            }
        }), 201
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al enviar mensaje: {str(e)}'
        }), 500


# ==========================================
# GET - Obtener mensajes
# ==========================================

@contact_bp.route('/messages', methods=['GET'])
def get_messages():
    """
    Obtiene todos los mensajes
    
    Query params:
        - read: 'true' o 'false' para filtrar leídos
    
    Returns:
        JSON con lista de mensajes
    """
    try:
        read_filter = request.args.get('read', None)
        
        # Filtrar por estado de lectura
        if read_filter:
            is_read = read_filter.lower() == 'true'
            filtered_messages = [m for m in messages if m.read == is_read]
        else:
            filtered_messages = messages
        
        return jsonify({
            'status': 'success',
            'count': len(filtered_messages),
            'total': len(messages),
            'unread': len([m for m in messages if not m.read]),
            'data': [m.to_dict() for m in filtered_messages]
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al obtener mensajes: {str(e)}'
        }), 500


@contact_bp.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    """
    Obtiene un mensaje específico
    
    Args:
        message_id: ID del mensaje
    
    Returns:
        JSON con datos del mensaje
    """
    try:
        msg = next((m for m in messages if m.id == message_id), None)
        
        if not msg:
            return jsonify({
                'status': 'error',
                'message': f'Mensaje {message_id} no encontrado'
            }), 404
        
        # Marcar como leído
        msg.read = True
        
        return jsonify({
            'status': 'success',
            'data': msg.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al obtener mensaje: {str(e)}'
        }), 500


# ==========================================
# PUT - Actualizar mensaje
# ==========================================

@contact_bp.route('/messages/<int:message_id>/read', methods=['PUT'])
def mark_as_read(message_id):
    """
    Marca un mensaje como leído
    
    Args:
        message_id: ID del mensaje
    
    Returns:
        JSON con confirmación
    """
    try:
        msg = next((m for m in messages if m.id == message_id), None)
        
        if not msg:
            return jsonify({
                'status': 'error',
                'message': f'Mensaje {message_id} no encontrado'
            }), 404
        
        msg.read = True
        
        return jsonify({
            'status': 'success',
            'message': 'Mensaje marcado como leído',
            'data': msg.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al actualizar mensaje: {str(e)}'
        }), 500


# ==========================================
# DELETE - Eliminar mensaje
# ==========================================

@contact_bp.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    """
    Elimina un mensaje
    
    Args:
        message_id: ID del mensaje
    
    Returns:
        JSON con confirmación
    """
    try:
        global messages
        
        msg = next((m for m in messages if m.id == message_id), None)
        
        if not msg:
            return jsonify({
                'status': 'error',
                'message': f'Mensaje {message_id} no encontrado'
            }), 404
        
        messages = [m for m in messages if m.id != message_id]
        
        return jsonify({
            'status': 'success',
            'message': f'Mensaje {message_id} eliminado exitosamente'
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al eliminar mensaje: {str(e)}'
        }), 500


# ==========================================
# Endpoints de estadísticas
# ==========================================

@contact_bp.route('/stats', methods=['GET'])
def get_stats():
    """
    Obtiene estadísticas de mensajes
    
    Returns:
        JSON con estadísticas
    """
    try:
        unread_count = len([m for m in messages if not m.read])
        read_count = len([m for m in messages if m.read])
        
        return jsonify({
            'status': 'success',
            'stats': {
                'total_messages': len(messages),
                'unread': unread_count,
                'read': read_count,
                'percentage_read': round((read_count / len(messages) * 100), 2) if messages else 0
            }
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al obtener estadísticas: {str(e)}'
        }), 500


# ==========================================
# Health check
# ==========================================

@contact_bp.route('/health', methods=['GET'])
def health():
    """
    Health check del endpoint de contacto
    
    Returns:
        JSON con estado
    """
    return jsonify({
        'status': 'healthy',
        'service': 'contact-api',
        'version': '1.0.0',
        'messages': len(messages)
    }), 200


# ==========================================
# Manejo de errores
# ==========================================

@contact_bp.errorhandler(404)
def not_found(error):
    """Manejo de errores 404"""
    return jsonify({
        'status': 'error',
        'message': 'Endpoint no encontrado'
    }), 404


@contact_bp.errorhandler(500)
def internal_error(error):
    """Manejo de errores 500"""
    return jsonify({
        'status': 'error',
        'message': 'Error interno del servidor'
    }), 500