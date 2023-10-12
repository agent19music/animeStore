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

          function displayMerchandise(animeId) {
            let url = `http://localhost:3000/animes/${animeId}`;
            fetch(url)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(anime => {
                    let merchDisplay = document.querySelector('#mainDisplay');
                    merchDisplay.innerHTML = ''; // Clear previous content
                    if (anime.merchandise && anime.merchandise.length > 0) {
                        anime.merchandise.forEach(item => {
                            let merchElement = document.createElement('ul');
                            merchElement.innerHTML = `<div class="tiles">
                                <h2>${item.product_name}</h2>
                                <img src="${item.image}" alt="${item.product_name}">
                                <p>Description: ${item.product_description}</p>
                                <p>Category: ${item.product_type}</p>
                                <p>Price: $${item.price}</p>
                                <p>In stock: ${item.inStock}</p>
          
                                <button class='buy-button' data-item-id="${item.id}">Buy</button>
                                </div>
                            `;
          
                             merchDisplay.appendChild(merchElement);
          
                             // Add event listener to the buy-button
                             const buyButton = merchElement.querySelector('.buy-button');
                             buyButton.addEventListener('click', () => {
                                 console.log('click!'); // Log a click
                                 alert('Thanks for your purchase :D !')
                              
                             });
                        });
                    } else {
                        merchDisplay.innerHTML = '<p>No merchandise available for this anime.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
          
          }          

// Initial load of animes
displayAnimes();          
