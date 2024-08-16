function updateRemoveButtons(){
    const removeButtons = document.querySelectorAll('.book-row .btn-danger')
    if (document.querySelectorAll('.book-row').length <= 3){
        removeButtons.forEach(button => button.disabled = true)
    } else {
        removeButtons.forEach(button => button.disabled = false)
    }
}

function addBook() {
    const booksDiv = document.getElementById('books')
    const bookRow = document.createElement('div')
    bookRow.className = 'book-row'

    const newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.className = 'book form-control book-input'
    newInput.placeholder = 'Informe um gênero ou autor literário...'

    const removeButton = document.createElement('button')
    removeButton.className = 'btn-danger'
    removeButton.innerText = 'Excluir'
    removeButton.onclick = () => removeBook(removeButton)

    bookRow.appendChild(newInput)
    bookRow.appendChild(removeButton)
    booksDiv.appendChild(bookRow)

    updateRemoveButtons()
}

function removeBook(button){
    const bookRow = button.parentElement;
    bookRow.remove()
    updateRemoveButtons()
}

async function submitForm() {
    const bookInputs = document.getElementsByClassName('book')
    const books = [];
    for (let i = 0; i < bookInputs.length; i++) {
        if (bookInputs[i].value) {
            books.push(bookInputs[i].value)
        }
    }

    if (books.length < 3){
        alert('Por favor, preencha pelo menos três campos!')
        return
    }

    const data = {
        books: books
    }

    try{
        const response = await fetch('/livro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        const responseDiv = document.getElementById('response')
        if (result) {
            responseDiv.innerHTML = result.livros
        } else {
            responseDiv.innerHTML = `<p>Erro: ${result.Erro}</p>`
        }
        responseDiv.style.display = 'block'
    } catch (error) {
        const responseDiv = document.getElementById('response')
        responseDiv.innerHTML = `<p>Erro: ${error.message}</p>`
        responseDiv.style.display = 'block'
    }
}

document.addEventListener('DOMContentLoaded', updateRemoveButtons)
