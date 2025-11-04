"""
Routes: Projects
API endpoints para gestionar proyectos
"""

from flask import Blueprint, jsonify, request
from models.project import ProjectManager, Project

# Crear blueprint para proyectos
projects_bp = Blueprint('projects', __name__, url_prefix='/api/v1/projects')

# Instancia global del manager
manager = ProjectManager()


# ==========================================
# GET - Obtener proyectos
# ==========================================

@projects_bp.route('', methods=['GET'])
def get_projects():
    """
    Obtiene todos los proyectos
    
    Query params:
        - category: Filtrar por categoría
        - featured: 'true' para solo destacados
    
    Returns:
        JSON con lista de proyectos
    """
    try:
        category = request.args.get('category', None)
        featured = request.args.get('featured', None)
        
        # Filtrar por categoría si se proporciona
        if category:
            projects = manager.get_by_category(category)
        # Obtener solo destacados si se proporciona
        elif featured and featured.lower() == 'true':
            projects = manager.get_featured()
        # Obtener todos
        else:
            projects = manager.get_all()
        
        return jsonify({
            'status': 'success',
            'count': len(projects),
            'data': [p.to_dict() for p in projects]
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al obtener proyectos: {str(e)}'
        }), 500


@projects_bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """
    Obtiene un proyecto específico por ID
    
    Args:
        project_id: ID del proyecto
    
    Returns:
        JSON con datos del proyecto
    """
    try:
        project = manager.read(project_id)
        
        if not project:
            return jsonify({
                'status': 'error',
                'message': f'Proyecto con ID {project_id} no encontrado'
            }), 404
        
        return jsonify({
            'status': 'success',
            'data': project.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al obtener proyecto: {str(e)}'
        }), 500


@projects_bp.route('/category/<string:category>', methods=['GET'])
def get_projects_by_category(category):
    """
    Obtiene proyectos por categoría
    
    Args:
        category: Categoría de proyectos
    
    Returns:
        JSON con lista de proyectos de esa categoría
    """
    try:
        projects = manager.get_by_category(category)
        
        if not projects:
            return jsonify({
                'status': 'success',
                'count': 0,
                'message': f'No hay proyectos en categoría: {category}',
                'data': []
            }), 200
        
        return jsonify({
            'status': 'success',
            'count': len(projects),
            'category': category,
            'data': [p.to_dict() for p in projects]
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al filtrar por categoría: {str(e)}'
        }), 500


@projects_bp.route('/featured', methods=['GET'])
def get_featured_projects():
    """
    Obtiene proyectos destacados
    
    Returns:
        JSON con lista de proyectos destacados
    """
    try:
        projects = manager.get_featured()
        
        return jsonify({
            'status': 'success',
            'count': len(projects),
            'data': [p.to_dict() for p in projects]
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al obtener proyectos destacados: {str(e)}'
        }), 500


# ==========================================
# POST - Crear proyecto
# ==========================================

@projects_bp.route('', methods=['POST'])
def create_project():
    """
    Crea un nuevo proyecto
    
    Body JSON:
        {
            "title": "Título del proyecto",
            "description": "Descripción",
            "technologies": ["React", "Node.js"],
            "link": "https://github.com/...",
            "category": "FullStack",
            "featured": false,
            "image": "url_imagen",
            "stats": {"stars": 10, "forks": 5}
        }
    
    Returns:
        JSON con proyecto creado
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'Body JSON requerido'
            }), 400
        
        # Crear proyecto
        project = manager.create(**data)
        
        if not project:
            return jsonify({
                'status': 'error',
                'message': 'Error al validar los datos del proyecto'
            }), 400
        
        return jsonify({
            'status': 'success',
            'message': 'Proyecto creado exitosamente',
            'data': project.to_dict()
        }), 201
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al crear proyecto: {str(e)}'
        }), 500


# ==========================================
# PUT - Actualizar proyecto
# ==========================================

@projects_bp.route('/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    """
    Actualiza un proyecto existente
    
    Args:
        project_id: ID del proyecto
    
    Body JSON:
        {
            "title": "Nuevo título",
            "description": "Nueva descripción",
            ...
        }
    
    Returns:
        JSON con proyecto actualizado
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'Body JSON requerido'
            }), 400
        
        # Actualizar proyecto
        project = manager.update(project_id, **data)
        
        if not project:
            return jsonify({
                'status': 'error',
                'message': f'Proyecto con ID {project_id} no encontrado'
            }), 404
        
        return jsonify({
            'status': 'success',
            'message': 'Proyecto actualizado exitosamente',
            'data': project.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al actualizar proyecto: {str(e)}'
        }), 500


# ==========================================
# DELETE - Eliminar proyecto
# ==========================================

@projects_bp.route('/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    """
    Elimina un proyecto
    
    Args:
        project_id: ID del proyecto
    
    Returns:
        JSON con confirmación de eliminación
    """
    try:
        success = manager.delete(project_id)
        
        if not success:
            return jsonify({
                'status': 'error',
                'message': f'Proyecto con ID {project_id} no encontrado'
            }), 404
        
        return jsonify({
            'status': 'success',
            'message': f'Proyecto {project_id} eliminado exitosamente'
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al eliminar proyecto: {str(e)}'
        }), 500


# ==========================================
# Endpoints adicionales
# ==========================================

@projects_bp.route('/stats', methods=['GET'])
def get_stats():
    """
    Obtiene estadísticas de los proyectos
    
    Returns:
        JSON con estadísticas
    """
    try:
        all_projects = manager.get_all()
        featured = manager.get_featured()
        
        categories = {}
        for project in all_projects:
            cat = project.category
            categories[cat] = categories.get(cat, 0) + 1
        
        return jsonify({
            'status': 'success',
            'stats': {
                'total_projects': len(all_projects),
                'featured_projects': len(featured),
                'categories': categories
            }
        }), 200
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al obtener estadísticas: {str(e)}'
        }), 500


@projects_bp.route('/health', methods=['GET'])
def health():
    """
    Health check del endpoint de proyectos
    
    Returns:
        JSON con estado
    """
    return jsonify({
        'status': 'healthy',
        'service': 'projects-api',
        'version': '1.0.0'
    }), 200


# ==========================================
# Manejo de errores
# ==========================================

@projects_bp.errorhandler(404)
def not_found(error):
    """Manejo de errores 404"""
    return jsonify({
        'status': 'error',
        'message': 'Endpoint no encontrado'
    }), 404


@projects_bp.errorhandler(500)
def internal_error(error):
    """Manejo de errores 500"""
    return jsonify({
        'status': 'error',
        'message': 'Error interno del servidor'
    }), 500