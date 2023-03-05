function solution() {
    const main = document.getElementById('main');

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(res => res.json())
        .then(render)
        .catch((err) => console.log('Error'));

    function render(data) {

        data.forEach(x => {
            
            const divMain = createEl('div', '', main, 'accordion');
            const divHead = createEl('div', '', divMain, 'head');
            const span = createEl('span',x.title,divHead);
            const divHidden = createEl('div','',divMain,'extra');
            const btn = createEl('button','More',divHead,'button');
            btn.id = x._id;
            btn.addEventListener('click',()=>{
                
                fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${btn.id}`)
                .then(res => res.json())
                .then((data)=>{
                    const p = createEl('p',data.content,divHidden);
                    
                    if(divHidden.style.display){
                        divHidden.style.display = '';
                        btn.textContent = 'More';
                    }else{
                        divHidden.style.display = 'block';
                        btn.textContent = 'Less';
                    }
                    
                });
            });
        });

    }

    function createEl(type, content, parent, classAtrbt) {
        const el = document.createElement(type);
        el.textContent = content;
        parent.appendChild(el);
        if (classAtrbt == undefined) {
            return el;
        }
        el.classList = classAtrbt;
        return el;
    }
}

solution();