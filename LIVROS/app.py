from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import google.generativeai as gemini

app = Flask(__name__)

CORS(app)

gemini.configure(api_key="AIzaSyBXv99VojkeqKASrRl_67TBHJhQdZecPMM")

model = gemini.GenerativeModel('gemini-1.5-flash')

#ROTA DA HOME
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/livro', methods=['POST'])
def make_livro():
    try:
        dados = request.json
        generos_autores = dados.get('books')

        prompt = f"""
Sugira uma lista de livros baseados nos seguintes gêneros ou autores: {generos_autores}.
Apresente as sugestões no formato HTML, padrão UTF-8, sem a sessão head, sem a tag body.
Para cada livro, inclua as seguintes informações formatadas de forma clara e organizada:
- Título do livro (em negrito e envolto por tags <h2>)
- Nome do autor (em itálico)
- Número de páginas (em um parágrafo precedido por um ícone de livro 📚)
- Gênero (em um parágrafo precedido por um ícone de categoria 🏷️)
- Sinopse (em um parágrafo detalhado)
"""
        resposta = model.generate_content(prompt)
        print(resposta)
        if resposta.parts:
            livros = resposta.parts[0].text.strip()
            return jsonify({"livros": livros}), 200
    
    except Exception as e:
        return jsonify({"Erro": str(e)}), 300
    
if __name__ == '__main__':
    app.run(debug=True)
