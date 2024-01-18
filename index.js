
const perPage = 10;
let currentPage = 1;

function getRepositories() {
  const username = document.getElementById('username').value;
  const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`;

  //  add loading indicators here

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        displayRepositories(data);
        displayPagination(data.length);
      } else {
        throw new Error('Invalid response from GitHub API');
      }
    })
    .catch(error => console.error(error));
}

function displayRepositories(repositories) {
  const repositoriesContainer = document.getElementById('repositories');
  repositoriesContainer.innerHTML = '';

  repositories.forEach(repo => {
    const repoCard = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
          </div>
        </div>
      </div>
    `;
    repositoriesContainer.innerHTML += repoCard;
  });
}

function displayPagination(totalRepositories) {
  const totalPages = Math.ceil(totalRepositories / perPage);
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.classList.add('page-item');
    const a = document.createElement('a');
    a.classList.add('page-link');
    a.href = '#';
    a.textContent = i;
    a.addEventListener('click', () => {
      currentPage = i;
      getRepositories();
    });

    li.appendChild(a);
    paginationContainer.appendChild(li);
  }
}
