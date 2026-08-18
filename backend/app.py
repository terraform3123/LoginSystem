from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

usuarios_cadastrados = [
    {
    "id": 1,
    "email": "fernando@gmail.com",
    "senha": "12345678"
    },
    {
    "id": 2,
	"email": "lucas@gmail.com",
	"senha": "52122652"
    },
    {
    "id": 3,
    "email": "danilo@gmail.com",
    "senha": "09421725"
    }
]

@app.route("/", methods=["GET"])
def mostrar_cadastrados():
    return usuarios_cadastrados, 200


@app.route("/cadastro", methods=["POST"])
def fazer_cadastro():
    dados = request.json
    condicao, mensagem, codigo_status = validar_cadastro(dados["email"], dados["senha"])
    if (condicao == True):
        dados["id"] = len(usuarios_cadastrados) + 1
        usuarios_cadastrados.append(dados)
        return mensagem, codigo_status
    return mensagem, codigo_status

def validar_cadastro(email, senha):
    if (" " in email):
        return False, "Email não pode haver espaço vázio.", 400
    if (not "@" in email):
        return False, "Email inválido.", 400
    arroba = email.index("@")
    parte = email[arroba:]
    if (not "." in parte):
        return False, "Email inválido.", 400
    if (email.strip() == ""):
        return False, "Email inválido.", 400
    for usuario in usuarios_cadastrados:
        if (email == usuario["email"]):
            return False, "Email já cadastrado.", 400
    if (senha.strip() == ""):
        return False, "Senha inválida.", 400
    if (" " in senha):
        return False, "Senha não pode haver espaço vázio.", 400
    if (len(senha) < 8):
        return False, "A senha deve ter ao menos oito caracteres.", 400 
    return True, "Cadastro realizado com sucesso.", 200
    


@app.route("/login", methods=["POST"])
def fazer_login():
    dados = request.json
    condicao, mensagem, codigo_status = validar_login(dados["email"], dados["senha"])
    return mensagem, codigo_status


def validar_login(email, senha):
    for usuario in usuarios_cadastrados:
        if (email == usuario["email"]):
            if (senha == usuario["senha"]):
                return True, "Login realizado.", 200
    return False, "Email/Senha inválido.", 400

if (__name__ == "__main__"):
    app.run(debug=True)