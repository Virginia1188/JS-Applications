const itemName = 'userData';

export function getUserData(){
    return JSON.parse(localStorage.getItem(itemName));
}

export function setUserData(data){
    return localStorage.setItem(itemName, JSON.stringify(data));
}

export function clearUserData(){
    localStorage.removeItem(itemName);
}

export function createSubmitHandler(callback){
    return function(e){
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        callback(data,form);
    };
}

export function alertMessage(message) {
    const notification = document.querySelector('.notification');
    const alertText = notification.querySelector('span');
    notification.style.display = 'block';
    alertText.textContent = message;
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}