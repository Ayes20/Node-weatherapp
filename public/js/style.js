console.log("Client side javascript is loaded !")

// fetch('http://puzzle.mead.io/puzzle').then((resposne)=>{
//     resposne.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Loss').then((resposne)=>{
//     resposne.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else {
//             console.log(data.Location)
//             console.log(data.Forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchedLoc = document.querySelector('input')
const mes1 = document.querySelector('#msg1')
const mes2 = document.querySelector('#msg2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    mes1.textContent = "Loading..."
    mes2.textContent= ""

    fetch('/weather?address='+searchedLoc.value).then((resposne)=>{
        resposne.json().then((data)=>{
            if(data.error){
                mes1.textContent =data.error
            }
            else {
                mes1.textContent = data.Location
                mes2.textContent= data.Forecast
            }
        })
    })
})