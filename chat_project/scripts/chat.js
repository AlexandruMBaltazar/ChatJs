class Chatroom{

    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message){
        //create a chat object
        const now = new Date();
        
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        //save chat in database
        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback){
        this.unsub = this.chats.where('room', '==', this.room).orderBy('created_at').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    //update ui
                    callback(change.doc.data())
                }
            });
        })
    }

    updateName(username){
        this.username = username;
        localStorage.setItem("username", username);
    }

    updateRoom(room){
        this.room = room;
        console.log("Room updated");
        if(this.unsub){
            this.unsub();
        }

    }

}


