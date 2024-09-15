(function () {
    let ws: WebSocket;

    const messages = <HTMLElement>document.getElementById('messages');
    const wsOpen = <HTMLButtonElement>document.getElementById('ws-open');
    const wsClose = <HTMLButtonElement>document.getElementById('ws-close');
    const wsSend = <HTMLButtonElement>document.getElementById('ws-send');
    const wsInput = <HTMLInputElement>document.getElementById('ws-input');

    function showMessage(message: string){
        if(!message){
            return;
        }
        messages.textContent += `\n${message}`;
        messages.scrollTop = messages?.scrollHeight;
    }

    function closeConnection() {
        if(!!ws) {
            ws.close();
        }
    }

    wsOpen.addEventListener('click', () => {
        closeConnection()
        ws = new WebSocket('ws://3.109.157.222:3000/');

        ws.addEventListener('error', () => {
            showMessage('Websocket error')
        })

        ws.addEventListener('open', () => {
            showMessage("Websockey connection established")
        })

        ws.addEventListener('close', () => {
            showMessage("Websockey connection closed")
        })
        ws.addEventListener('message', (msg: MessageEvent<string>) => {
            showMessage(`Received messgae: ${msg.data}`)
        })
    })

    wsClose.addEventListener('click', closeConnection);
    wsSend.addEventListener('click', () => {
        const val = wsInput?.value;
        console.log(val)
        if(!val){
            return;
        }
        else if(!ws) {
            showMessage("No websocket connection");
            return;
        }

        ws.send(val);
        showMessage(`Sent "${val}`);
        wsInput.value = '';
    })
})();