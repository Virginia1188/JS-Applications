function attachEvents() {
    
    const btnSend = document.getElementById('submit');
    const btnRefresh = document.getElementById('refresh');
    const name = document.querySelector('[name="author"]');
    const msg = document.querySelector('[name="content"]');
    const textArea = document.getElementById('messages');

    btnSend.addEventListener('click',send);
    btnRefresh.addEventListener('click',refresh);

    function send(){
        if(name.value == '' && msg.value == ''){
            return;
        }
       
        fetch('http://localhost:3030/jsonstore/messenger',{
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({author: `${name.value}`, content: `${msg.value}`}),
        });

        name.value = '';
        msg.value = '';
    }

    function refresh(){
        textArea.textContent = '';
        fetch('http://localhost:3030/jsonstore/messenger')
        .then(res=>res.json())
        .then((data)=>{
         
            let allMsg = [];
            Object.entries(data).forEach(e=>{
                allMsg.push(`${e[1].author}: ${e[1].content}`);
            });
            textArea.textContent = allMsg.join('\n');
        });
    }

}

attachEvents();