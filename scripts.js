const userInput = document.querySelector('#userInput').value
const btn = document.querySelector('button')
const display = document.querySelector('div')

btn.addEventListener('click', () => {
    fetch('https://gateway.marvel.com:443/v1/public/characters?name=spiderman&apikey=9bad64c2d8770fdd00c260332a7cccb0')
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                display.textContent = response.status
            }
        })
        .then(data => {
            display.textContent = data.data.total
        })
        .catch(error => {
            display.textContent = error
        })
})