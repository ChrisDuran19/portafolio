"""
Model: Project
Modelo de datos para proyectos en la base de datos
"""

from datetime import datetime


class Project:
    """
    Modelo de Proyecto para el portafolio
    
    Atributos:
        id: Identificador único del proyecto
        title: Título del proyecto
        description: Descripción del proyecto
        technologies: Lista de tecnologías usadas
        link: Enlace al repositorio o demo
        category: Categoría del proyecto
        featured: Si es un proyecto destacado
        date: Fecha de creación
        image: URL de la imagen del proyecto
        stats: Estadísticas (stars, forks, issues)
    """
    
    def __init__(self, id=None, title="", description="", technologies=None, 
                 link="", category="", featured=False, date=None, image="", stats=None):
        """
        Inicializa un nuevo proyecto
        
        Args:
            id: ID del proyecto
            title: Título del proyecto
            description: Descripción
            technologies: Lista de tecnologías
            link: URL del proyecto
            category: Categoría
            featured: Es destacado
            date: Fecha del proyecto
            image: URL de imagen
            stats: Diccionario de estadísticas
        """
        self.id = id
        self.title = title
        self.description = description
        self.technologies = technologies or []
        self.link = link
        self.category = category
        self.featured = featured
        self.date = date or datetime.now().strftime("%Y-%m-%d")
        self.image = image
        self.stats = stats or {}
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
    
    def to_dict(self):
        """
        Convierte el proyecto a diccionario
        
        Returns:
            dict: Proyecto en formato diccionario
        """
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'technologies': self.technologies,
            'link': self.link,
            'category': self.category,
            'featured': self.featured,
            'date': self.date,
            'image': self.image,
            'stats': self.stats,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }
    
    def to_json(self):
        """
        Convierte el proyecto a JSON
        
        Returns:
            str: Proyecto en formato JSON
        """
        import json
        return json.dumps(self.to_dict(), ensure_ascii=False, indent=2)
    
    @classmethod
    def from_dict(cls, data):
        """
        Crea un proyecto desde un diccionario
        
        Args:
            data: Diccionario con datos del proyecto
            
        Returns:
            Project: Nueva instancia de Project
        """
        project = cls(
            id=data.get('id'),
            title=data.get('title', ''),
            description=data.get('description', ''),
            technologies=data.get('technologies', []),
            link=data.get('link', ''),
            category=data.get('category', ''),
            featured=data.get('featured', False),
            date=data.get('date'),
            image=data.get('image', ''),
            stats=data.get('stats', {}),
        )
        return project
    
    def validate(self):
        """
        Valida que el proyecto tenga datos válidos
        
        Returns:
            tuple: (es_válido, lista_de_errores)
        """
        errors = []
        
        if not self.title or len(self.title.strip()) == 0:
            errors.append("El título es obligatorio")
        
        if not self.description or len(self.description.strip()) == 0:
            errors.append("La descripción es obligatoria")
        
        if not self.category or len(self.category.strip()) == 0:
            errors.append("La categoría es obligatoria")
        
        if not self.link or len(self.link.strip()) == 0:
            errors.append("El enlace es obligatorio")
        
        if not isinstance(self.technologies, list):
            errors.append("Las tecnologías deben ser una lista")
        
        if len(self.technologies) == 0:
            errors.append("Debe haber al menos una tecnología")
        
        valid_categories = [
            'Mobile', 'IA', 'FullStack', 'DevOps', 
            'Seguridad', 'Hardware', 'Embebidos'
        ]
        if self.category not in valid_categories:
            errors.append(f"Categoría inválida. Válidas: {', '.join(valid_categories)}")
        
        return (len(errors) == 0, errors)
    
    def update(self, **kwargs):
        """
        Actualiza los atributos del proyecto
        
        Args:
            **kwargs: Atributos a actualizar
        """
        allowed_fields = [
            'title', 'description', 'technologies', 'link', 
            'category', 'featured', 'date', 'image', 'stats'
        ]
        
        for key, value in kwargs.items():
            if key in allowed_fields:
                setattr(self, key, value)
        
        self.updated_at = datetime.now()
    
    def __repr__(self):
        """Representación en texto del proyecto"""
        return f"<Project id={self.id} title='{self.title}' category='{self.category}'>"
    
    def __str__(self):
        """String del proyecto"""
        return f"{self.title} ({self.category}) - {self.date}"


class ProjectManager:
    """
    Gestor de proyectos
    Permite CRUD operations en proyectos
    """
    
    def __init__(self):
        """Inicializa el gestor de proyectos"""
        self.projects = []
        self.id_counter = 0
    
    def create(self, **kwargs):
        """
        Crea un nuevo proyecto
        
        Args:
            **kwargs: Datos del proyecto
            
        Returns:
            Project: Proyecto creado o None si hay errores
        """
        self.id_counter += 1
        kwargs['id'] = self.id_counter
        
        project = Project(**kwargs)
        is_valid, errors = project.validate()
        
        if not is_valid:
            print(f"Errores de validación: {errors}")
            return None
        
        self.projects.append(project)
        return project
    
    def read(self, project_id):
        """
        Lee un proyecto por ID
        
        Args:
            project_id: ID del proyecto
            
        Returns:
            Project: Proyecto encontrado o None
        """
        for project in self.projects:
            if project.id == project_id:
                return project
        return None
    
    def update(self, project_id, **kwargs):
        """
        Actualiza un proyecto
        
        Args:
            project_id: ID del proyecto
            **kwargs: Datos a actualizar
            
        Returns:
            Project: Proyecto actualizado o None
        """
        project = self.read(project_id)
        if project:
            project.update(**kwargs)
            return project
        return None
    
    def delete(self, project_id):
        """
        Elimina un proyecto
        
        Args:
            project_id: ID del proyecto
            
        Returns:
            bool: True si se eliminó, False si no existe
        """
        for i, project in enumerate(self.projects):
            if project.id == project_id:
                self.projects.pop(i)
                return True
        return False
    
    def get_all(self):
        """
        Obtiene todos los proyectos
        
        Returns:
            list: Lista de todos los proyectos
        """
        return self.projects
    
    def get_by_category(self, category):
        """
        Obtiene proyectos por categoría
        
        Args:
            category: Categoría a buscar
            
        Returns:
            list: Proyectos de esa categoría
        """
        return [p for p in self.projects if p.category == category]
    
    def get_featured(self):
        """
        Obtiene proyectos destacados
        
        Returns:
            list: Proyectos featured=True
        """
        return [p for p in self.projects if p.featured]
    
    def to_dict_list(self):
        """
        Convierte todos los proyectos a lista de diccionarios
        
        Returns:
            list: Lista de diccionarios
        """
        return [p.to_dict() for p in self.projects]