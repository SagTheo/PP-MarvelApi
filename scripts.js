const userInput = document.querySelector('#userInput')
const btn = document.querySelector('button')
const display = document.querySelector('div')
const pubKey = '9bad64c2d8770fdd00c260332a7cccb0'

btn.addEventListener('click', () => {
    fetch(`https://gateway.marvel.com/v1/public/characters?name=${userInput.value}&apikey=${pubKey}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                display.textContent = response.status
            }
        })
        .then(response => {
            display.textContent = response.data.results[0].description
        })
        .catch(error => {
            display.textContent = error
        })
})