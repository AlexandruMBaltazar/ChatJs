const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameFrom = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener("submit", e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message).then(()=> newChatForm.reset());
});

newNameFrom.addEventListener("submit", e=>{
    e.preventDefault();
    const newName = newNameFrom.name.value.trim();
    chatroom.updateName(newName);
    newNameFrom.reset();
    updateMessage.innerText = `Your name was updated to ${newName}`;
    setTimeout(()=>{
        updateMessage.innerText = '';
    }, 3000)
})

//event delegation
rooms.addEventListener("click", e =>{
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(data =>{chatUI.render(data);})
    }
});


const username = localStorage.username ? localStorage.username : "anon";

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

chatroom.getChats(data =>{chatUI.render(data);})