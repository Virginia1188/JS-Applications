function loadRepos() {

	const username = document.getElementById('username').value;
	const ulRepos = document.getElementById('repos');
	ulRepos.textContent = '';

	let url = `https://api.github.com/users/${username}/repos`;
	
	fetch(url)
		.then(check)
		.then(transformData)
		.catch((err)=> {
			const li = document.createElement('li');
			li.textContent = `There was an error! ${err}`;
			ulRepos.appendChild(li);
		});

	function check(res) {
		if (res.status !== 200) {
			return Promise.reject(res.status);
		}
		return res.json();
	}
	function transformData(data) {

		data.forEach(repo => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.textContent = repo.full_name;
			a.href = repo.html_url;
			li.appendChild(a);
			ulRepos.appendChild(li);
		});
	}

}