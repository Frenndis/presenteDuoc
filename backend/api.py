from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")


# Simulación de base de datos de profesores y usuarios
profesores = [
    {
        "id": 1,
        "nombre": "Juan Pérez",
        "cursos": [
            {
                "id": 1,
                "nombre": "Matemáticas",
                "codigo": "PGY0000",
                "seccion": "013V",
                "alumnos": [
                    {"id": 2, "status": 0},
                    {"id": 3, "status": 0}
                ]
            },
            {
                "id": 2,
                "nombre": "Fisica",
                "codigo": "PGY0001",
                "seccion": "015V",
                "alumnos": [
                    {"id": 2, "status": 0}
                ]
            },
            {
                "id": 3,
                "nombre": "Quimica",
                "codigo": "PGY0002",
                "seccion": "018V",
                "alumnos": [
                    {"id": 2, "status": 0}
                ]
            },
            {
                "id": 4,
                "nombre": "App Movil",
                "codigo": "MDY002",
                "seccion": "011V",
                "alumnos": [
                    {"id": 2, "status": 0},
                    {"id": 3, "status": 0}
                ]
            }
        ]
    }
]

usuarios = [
    {
        "id": 1,
        "user": "docente",
        "password": "password1",
        "nombre": "Juan Perez",
        "perfil": 1,
        "correo": "docente@gmail.com"
    },
    {
        "id": 2,
        "user": "alumno",
        "password": "password2",
        "nombre": "Luis Gonzalez",
        "perfil": 2,
        "correo": "alumno@gmail.com"
    },
    {
        "id": 3,
        "user": "alumno2",
        "password": "password3",
        "nombre": "Eros Gonzalez",
        "perfil": 2,
        "correo": "alumno@gmail.com"
    }
]

@app.route('/login', methods=['POST'])
def login():
    print(request.json)  # Para verificar qué se está recibiendo en el request
    username = request.json.get('user')
    password = request.json.get('password')
    
    usuario = next((u for u in usuarios if u["user"] == username and u["password"] == password), None)
    
    if usuario:
        return jsonify({
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "user": usuario["user"],
            "correo": usuario["correo"],
            "tipoPerfil": usuario["perfil"]
        }), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401

@app.route('/profesores', methods=['GET'])
def obtener_profesores():
    return jsonify(profesores), 200

@app.route('/profesores/<int:profesor_id>/cursos', methods=['GET'])
def obtener_cursos_profesor(profesor_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    return jsonify(profesor["cursos"]), 200

@app.route('/profesores/<int:profesor_id>/cursos/<int:curso_id>/alumnos', methods=['GET'])
def obtener_alumnos_curso(profesor_id, curso_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404

    curso = next((c for c in profesor["cursos"] if c["id"] == curso_id), None)
    if not curso:
        return jsonify({"message": "Curso no encontrado"}), 404

    # Obtener la lista de alumnos para el curso especificado
    alumnos = [
        {
            "id": alumno["id"],
            "nombre": next((u["nombre"] for u in usuarios if u["id"] == alumno["id"]), "Desconocido"),
            "status": alumno["status"]
        }
        for alumno in curso["alumnos"]
    ]

    return jsonify(alumnos), 200



@app.route('/registrar_asistencia', methods=['POST'])
def registrar_asistencia():
    alumno_id = request.json.get('alumno_id')
    codigo = request.json.get('codigo')
    seccion = request.json.get('seccion')

    # Buscar el curso correspondiente
    for profesor in profesores:
        for curso in profesor["cursos"]:
            if curso["codigo"] == codigo and curso["seccion"] == seccion:
                # Buscar al alumno en la lista de alumnos del curso
                alumno = next((a for a in curso["alumnos"] if a["id"] == alumno_id), None)
                if alumno:
                    # Actualizar el estado del alumno a presente
                    alumno["status"] = 1  # 1 significa que está presente
                    # Emitir evento de asistencia actualizada para el curso específico y alumno específico
                    socketio.emit('asistencia_actualizada', {"alumno_id": alumno_id, "status": 1, "curso_codigo": codigo, "seccion": seccion}, namespace='/')
                    return jsonify({"message": "Asistencia registrada"}), 200

    return jsonify({"message": "No se pudo registrar la asistencia"}), 400




@app.route('/alumnos/<int:alumno_id>/cursos', methods=['GET'])
def obtener_cursos_alumno(alumno_id):
    cursos_asignados = []
    for profesor in profesores:
        for curso in profesor["cursos"]:
            # Verificar si el alumno está en la lista de alumnos del curso
            if any(alumno["id"] == alumno_id for alumno in curso["alumnos"]):
                cursos_asignados.append({
                    "id": curso["id"],
                    "nombre": curso["nombre"],
                    "codigo": curso["codigo"],
                    "seccion": curso["seccion"]
                })
    return jsonify(cursos_asignados), 200




if __name__ == '__main__':
    socketio.run(app, debug=True)
