import { URL } from "url";



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

weatherForm.addEventListener('submit', (e) => {

    //not refresh de page, just execute this script
    e.preventDefault()

    let location =  encodeURIComponent(search.value);

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {

        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data.location)
                console.log(data.forecast)
            }
        })


    })

    console.log(location)

})