from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

usuarios_cadastrados = [
    {
    "email": "fernando@gmail.com",
    "senha": "123456"
    },
    {
	"email": "lucas@gmail.com",
	"senha": "52122"
    },
    {
    "email": "danilo@gmail.com",
    "senha": "09421"
    }
]

@app.route("/", methods=["GET"])
def mostrar_cadastrados():
    return usuarios_cadastrados


@app.route("/cadastro", methods=["POST"])
def fazer_cadastro():
    dados = request.json
    validar_cadastro(dados["email"], dados["senha"])
    usuarios_cadastrados.append(dados)
    return "Cadastro realizado com sucesso."

def validar_cadastro(email, senha):
    for usuario in usuarios_cadastrados:
        print(email)
        print(usuario["email"])
        if email == usuario["email"]:
            return "Email cadastrado" 
    if len(senha) <= 5:
        return "Mínimo de cinco caracteres."
    


@app.route("/login", methods=["POST"])
def fazer_login():
    dados = request.json
    if validar_login(dados["email"], dados["senha"]):
        return "Login realizado."
    else:
        return "Email/Senha inválido."


def validar_login(email, senha):
    for usuario in usuarios_cadastrados:
        if email == usuario["email"]:
            if senha == usuario["senha"]:
                return True
    return False

if __name__ == "__main__":
    app.run(debug=True)