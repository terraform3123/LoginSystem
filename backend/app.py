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
    return usuarios_cadastrados


@app.route("/cadastro", methods=["POST"])
def fazer_cadastro():
    dados = request.json
    condicao, mensagem = validar_cadastro(dados["email"], dados["senha"])
    if condicao == True:
        usuarios_cadastrados.append(dados)
        return mensagem
    else:
        return mensagem

def validar_cadastro(email, senha):
    if " " in email:
        return False, "Email não pode haver espaço vázio."
    if not "@" in email:
        return False, "Email inválido."
    arroba = email.index("@")
    parte = email[arroba:]
    if not "." in parte:
        return False, "Email inválido."
    if email.strip() == "":
        return False, "Email inválido."
    for usuario in usuarios_cadastrados:
        if email == usuario["email"]:
            return False, "Email já cadastrado."
    if senha.strip() == "":
        return False, "Senha inválida."
    if " " in senha:
        return False, "Senha não pode haver espaço vázio."
    if len(senha) < 8:
        return False, "A senha deve ter ao menos oito caracteres."
    return True, "Cadastro realizado com sucesso."
    


@app.route("/login", methods=["POST"])
def fazer_login():
    dados = request.json
    condicao, mensagem = validar_login(dados["email"], dados["senha"])
    if condicao == True:
        return mensagem
    else:
        return mensagem


def validar_login(email, senha):
    for usuario in usuarios_cadastrados:
        if email == usuario["email"]:
            if senha == usuario["senha"]:
                return True, "Login realizado."
    return False, "Email/Senha inválido."

if __name__ == "__main__":
    app.run(debug=True)