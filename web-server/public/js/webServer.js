


fetch('http://localhost:3000/weather?address=porto%20alegre').then((response) => {

    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })


})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = '';
weatherForm.addEventListener('submit', (e) => {

    
    //not refresh de page, just execute this script
    e.preventDefault()

    messageOne.textContent = 'Carregani...'
    messageTwo.textContent = ''
    let location =  encodeURIComponent(search.value);

    fetch(`/weather?address=${location}`).then((response) => {

        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })

    })

    console.log(location)

})