function loadCommits() {
    
    const ul = document.getElementById('commits');
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;

    ul.textContent = '';

	let url = `https://api.github.com/repos/${username}/${repo}/commits`;
	
	fetch(url)
		.then(check)
		.then(transformData)
		.catch((err)=> {
			const li = document.createElement('li');
			li.textContent = `There was an error! ${err}`;
			ul.appendChild(li);
		});

	function check(res) {
		if (res.status !== 200) {
            const li = document.createElement('li');
            li.textContent = `Error: ${res.status} (Not Found)`;
			return li;
		}
		return res.json();
	}
	function transformData(data) {
        console.log(data);
		data.forEach(repo => {
			const li = document.createElement('li');
			li.textContent = `${repo.commit.author.name}: ${repo.commit.message}`;
			ul.appendChild(li);
		});
	}
    
}