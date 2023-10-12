function displayAnimes() {
  let url = 'http://localhost:3000/animes';
  fetch(url)
      .then(res => res.json())
      .then(animes => {
          let mainDisplay = document.querySelector('#mainDisplay');
          mainDisplay.innerHTML = ''; // Clear previous content
          for (let anime of animes) {
              let animeElement = document.createElement('ul');
              animeElement.innerHTML = `
                  <div class ='tiles' >
                  
                      <img src="${anime.poster}" alt="${anime.title}">
                      <h2>${anime.title}</h2>
                      <p>Released: ${anime.release_date}</p>
                      <p>Rating: ${anime.rating}</p>
                      <p>Episodes: ${anime.episodes}</p>
                      <div class="options-menu">
                        <div class="dropdown">
                            <div class="dropdown-content">
                            <button class="delete-anime" data-anime-id="${anime.id}">Delete</button>
                     <button class="update-anime" data-anime-id="${anime.id}" >Update</button>
                     <button class="shop" data-anime-id="${anime.id}">Shop</button>

                             </div>
                         </div>
                      </div>
                      <div id="updateContainer"></div>

                  </div>
              `;
              mainDisplay.appendChild(animeElement);
              let deleteButtons = document.querySelectorAll('.delete-anime');
              deleteButtons.forEach(button => {
                button.addEventListener('click', function (e) {
                  e.preventDefault();
                  let animeId = button.getAttribute('data-anime-id');
                  console.log('click!')
                  deleteAnime(animeId);
                });
              });

               // Add event listener for shop button
          let shop = document.querySelectorAll('.shop');
          shop.forEach(button => {
              button.addEventListener('click', function (e) {
                  e.preventDefault();
                  let animeId = button.getAttribute('data-anime-id');
                  displayMerchandise(animeId); }); 
                }); 
           
           // Add event listener for shop button
           let update = document.querySelectorAll('.update-anime');
           update.forEach(button => {
               button.addEventListener('click', function (e) {
                   e.preventDefault();
                   console.log('click!')
                   let animeId = button.getAttribute('data-anime-id');
                   updateAnime(animeId); }); 
                 });   
            }
          });
          }