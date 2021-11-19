const userInput = document.querySelector('#userInput')
const btn = document.querySelector('button')
const description = document.querySelector('.description')
const pubKey = '9bad64c2d8770fdd00c260332a7cccb0'
const attribution = document.querySelector('.attribution')
const err = document.querySelector('.err')
const comics = document.querySelector('.comics')
const introList = document.querySelector('.introList')
const charInfo = document.querySelector('.charInfo')

// Empties the content of the description paragraph and the list of comics
const emptyRes = () => {
    description.textContent = ''
    comics.textContent = ''
    introList.textContent = ''
}

// Fetch request triggered when button is clicked
// Displays the description of the character and a list of 10 comics that character is in
// Handles errors
btn.addEventListener('click', () => {
    charInfo.style.display = 'none'
    attribution.style.display = 'none'
    attribution.textContent = ''
    fetch(`https://gateway.marvel.com/v1/public/characters?name=${userInput.value}&apikey=${pubKey}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                err.textContent = 'Sorry, something went wrong.'
            }
        })
        .then(response => {
            if (response.data.results[0].description !== '') {
                description.textContent = response.data.results[0].description
                comics.textContent = ''

                let comicsList = response.data.results[0].comics.items
                let characterName = response.data.results[0].name
                introList.textContent = `Here is a list of 10 comics ${characterName} appeared in:`
                for (let i = 0; i < comicsList.length / 2; i++) {
                    let li = document.createElement('li')
                    let icon = document.createElement('img')
                    let span = document.createElement('span')
                    icon.setAttribute('src', 'icon.svg')
                    icon.setAttribute('alt', 'marker')
                    span.textContent = comicsList[i].name
                    li.append(icon)
                    li.append(span)
                    comics.append(li) 
                }

                charInfo.style.display = 'block'
                attribution.textContent = 'Data provided by Marvel. © 2014 Marvel'
                attribution.style.display = 'block'
                err.textContent = ''
            } else {
                err.textContent = 'Sorry, no description available for this character.'
                emptyRes()
            }  
        })
        .catch(error => {
            if (userInput.value === '') {
                error = 'A name needs to be entered in the field.'
                err.textContent = error
                emptyRes()
            } else {
                error = 'Sorry, no data found.'
                err.textContent = error
                emptyRes()
            }
        })
})