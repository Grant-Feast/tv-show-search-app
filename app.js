const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');

// // Listen for the user to press the search button.
form.addEventListener('submit', async function (e) {
  // Prevents the page from reloading once a search is being made.
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: {q: searchTerm} };
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`, config);
  container.innerHTML = '';
  displayData(res.data);
  // Clear the search input.
  form.elements.query.value = '';
})

// Create new elements for data if the search item has an image, if not move onto the next item in the search.
const displayData = (shows) => {
  for(let result of shows) {
    if(result.show.image) {
      const div = document.createElement('DIV');
      const img = document.createElement('IMG');
      img.src = result.show.image.medium;
      const h2 = document.createElement('H2');
      h2.append(`${result.show.name}`);
      const p = document.createElement('P');
      p.append(`Rating: ${result.show.rating.average}`);
      if(result.show.rating.average === null) {
        p.innerHTML = '';
      }
      div.appendChild(img);
      div.appendChild(h2);
      div.appendChild(p);
      container.appendChild(div);   
    }
  }
}

















