// const fetch = require("node-fetch");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     //'response.json().then' this line will run when data gets loaded from the above url
//     console.log(data);
//   });
// });


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-one')
const messageTwo=document.querySelector('#message-two')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading.....'
    messageTwo.textContent=''
    fetch("/weather?address="+location).then((response) => {
    response.json().then((data) => {
    if (data.error) {
      messageTwo.textContent=data.error
      messageOne.textContent=''
    } else {
      messageTwo.textContent=''
      messageOne.textContent=data.location +'  '+data.forecast 
    }
  });
});
  search.value=null;
})  
