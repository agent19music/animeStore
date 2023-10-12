function displayAnimes() {
  let url = 'https://animestore.onrender.com/animes';
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
            let url = `https://animestore.onrender.com/animes/${animeId}`;
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

function deleteAnime(animeId) {
  console.log('Deleting anime with ID: ' + animeId);
    let url = `https://animestore.onrender.com/animes/${animeId}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => {
        alert('Anime deleted successfully');
        // Reload the anime list after deletion
        displayAnimes();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }  

  function updateAnime(animeId) {
    fetch('https://animestore.onrender.com/animes/' + animeId)
      .then((response) => response.json())
      .then((res) => {
        const updateContainer = document.getElementById('updateContainer');
        updateContainer.innerHTML = `
          <h4>Update Form</h4>
          <form id="updateForm">
            <input type="text" id="title" placeholder="Enter Anime Title" value="${res.title}">
            <input type="text" id="description" placeholder="Enter description" value="${res.description}">
            <input type="text" id="poster" placeholder="Enter poster url" value="${res.poster}">
            <input type="text" id="release-date" placeholder="Enter anime release date" value="${res.release_date}">
            <input type="text" id="episodes" placeholder="Enter number of episodes aired" value="${res.episodes}">
            <input type="text" id="rating" placeholder="Enter viewer rating" value="${res.rating}">
            <button type="submit">Update</button>
          </form>
        `;
  
        // Add a submit event listener for the update form
        const updateForm = document.getElementById('updateForm');
        updateForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const updatedAnime = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            poster: document.getElementById('poster').value,
            release_date: document.getElementById('release-date').value,
            episodes: document.getElementById('episodes').value,
            rating: document.getElementById('rating').value,
          };
  
          // Send a PATCH request to update the anime
          fetch('https://animestore.onrender.com/animes/' + animeId, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAnime),
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              throw new Error('Network response was not ok.');
            })
            .then(() => {
              alert('Anime updated successfully');
              // Reload the anime list after updating
              displayAnimes();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        });
      });
  }  

// Add an event listener to the "Add new anime" link
document.getElementById('newAnime').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default behavior of the link

  // Create the form and its elements
  const formContainer = document.createElement('div');
  formContainer.id = 'newAnimeForm';
  formContainer.innerHTML = `
      <h2>Add New Anime</h2>
      <form id="anime-details-form">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required>

          <label for="releaseDate">Release Date:</label>
          <input type="number" id="release_date" name="releaseDate" required>

          <label for="description">Description:</label>
          <textarea id="description" name="description" rows="4" required></textarea>

          <label for="posterUrl">Poster URL:</label>
          <input type="url" id="poster" name="posterUrl" required>

          <label for="episodeCount">Episode Count:</label>
          <input type="number" id="episodes" name="episodeCount" required>

          <label for="viewerRating">Viewer Rating:</label>
          <input type="number" id="rating" name="viewerRating" required step="0.01">

          
          <button type="submit">Add Anime</button>
      </form>
  `;

  // Append the form to the mainDisplay div
  const mainDisplay = document.getElementById('mainDisplay');
  mainDisplay.innerHTML = ''; // Clear previous content
  mainDisplay.appendChild(formContainer);

  // Add an event listener to handle the form submission
  document.getElementById('anime-details-form').addEventListener('submit', function (e) {
      e.preventDefault();

      // Retrieve the entered details from the form
      const animeDetails = {
          title: document.getElementById('title').value,
          release_date: document.getElementById('release_date').value,
          description: document.getElementById('description').value,
          poster: document.getElementById('poster').value,
          episodes: parseInt(document.getElementById('episodes').value),
          rating: parseFloat(document.getElementById('rating').value)
      };

      // Handle the data
      console.log('New Anime Details:', animeDetails);

      // Clear the form
      document.getElementById('anime-details-form').reset();

      addAnime(animeDetails)
  });
});

// Function to add a new anime
function addAnime(animeDetails) {
  // Send a POST request to add the new anime on the backend
  fetch('hhttps://animestore.onrender.com/animes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(animeDetails),
  })
  .then((res) => {
      if (res.ok) {
          return res.json();
      }
      throw new Error('Network response was not ok.');
  })
  .then((newAnime) => {
     console.log('New Anime Added:', newAnime);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}  

document.addEventListener("DOMContentLoaded", function() {
  console.log('Ready to go !')
});