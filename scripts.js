const userInput = document.querySelector('#userInput')
const btn = document.querySelector('button')
const description = document.querySelector('.description')
const pubKey = '9bad64c2d8770fdd00c260332a7cccb0'
const attribution = document.querySelector('.attribution')
const err = document.querySelector('.err')

btn.addEventListener('click', () => {
    attribution.textContent = ''
    fetch(`https://gateway.marvel.com/v1/public/characters?name=${userInput.value}&apikey=${pubKey}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(response => {
            if (response.data.results[0].description !== '') {
                description.textContent = response.data.results[0].description
                attribution.textContent = 'Data provided by Marvel. © 2014 Marvel'
                err.textContent = ''
            } else {
                err.textContent = 'Sorry, no description available for this character.'
            }  
        })
        .catch(error => {
            if (userInput.value === '') {
                error = 'A name needs to be entered in the field.'
                err.textContent = error
                description.textContent = ''
            } else if (response.data.results === []) { //Issue here : response is not defined
                error = 'Sorry, no data available for this character.'
                err.textContent = error
                description.textContent = ''
            } else {
                error = 'Invalid entry.'
                err.textContent = error
                description.textContent = ''
            }
        })
})