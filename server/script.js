const formEl = document.querySelector("#form")
const inputEl = document.querySelector("#input")
const roomEl = document.querySelector("#room")
const ulEl = document.querySelector("#messages")

const socket = io("http://localhost:5500")
const addNewMesseger = msg => {
  if(!msg) return ;

  const liEl = document.createElement('li');
  liEl.textContent = msg;
  ulEl.appendChild(liEl);
}

const submitForm = (e) => {
  e.preventDefault();
  if(inputEl.value){
    socket.emit('chat message',inputEl.value);
    console.log(inputEl.value);
    inputEl.value = '';
  }
}

socket.on('connect', () => {
    addNewMesseger(`${socket.id}`);

    formEl.addEventListener('submit',submitForm);
    socket.on('chat message', message => {
        addNewMesseger(message);
    })
})
