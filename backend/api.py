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
                "alumnos_ids": [2]
                
            },
            {
                "id": 2,
                "nombre": "Fisica",
                "codigo": "PGY0001",
                "seccion": "015V",
                "alumnos_ids": [2]
            },
            {
                "id": 3,
                "nombre": "Quimica",
                "codigo": "PGY0002",
                "seccion": "018V",
                "alumnos_ids": [2]
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
    
    alumnos_ids = curso["alumnos_ids"]
    alumnos = [u for u in usuarios if u["id"] in alumnos_ids and u["perfil"] == 2]

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
                if alumno_id in curso["alumnos_ids"]:
                    # Actualizar el estado del alumno en la lista de usuarios
                    alumno = next((u for u in usuarios if u["id"] == alumno_id and u["perfil"] == 2), None)
                    if alumno:
                        alumno["status"] = 1  # 1 significa que está presente
                        socketio.emit('asistencia_actualizada', {"alumno_id": alumno_id, "status": 1}, broadcast=True)
                        return jsonify({"message": "Asistencia registrada"}), 200

    return jsonify({"message": "No se pudo registrar la asistencia"}), 400


if __name__ == '__main__':
    app.run(debug=True)
