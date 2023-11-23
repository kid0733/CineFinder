//api key 08fc902898da637a2db39227ea80b6cf
const global={
    currentPage : window.location.pathname,
};

//
async function displayPopularMovies(){
    const {results}=await fetchAPIData('movie/popular')
    console.log(results);
    results.forEach(movie=>{
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
            <a href="movie-details.html?id=${movie.id}">
            ${
            movie.poster_path
            //if movie poster path present show movie poster
                ?`
                <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
            />`
            //else show null poster
                : `
                <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
            />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
            </div>
            
            `;
        document.querySelector('#popular-movies').appendChild(div)

    })
}


//Fetch Data From API
async function fetchAPIData(endpoint){
    const API_KEY='08fc902898da637a2db39227ea80b6cf';
    const API_URL='https://api.themoviedb.org/3/';
    const response=await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data=await response.json();
    return data;
}

//Highlight Active Link
function highlightActiveLink(){
    const links=document.querySelectorAll('.nav-link')
    links.forEach((link)=>{
        console.log(link.getAttribute('href'));
        console.log(global.currentPage);
        if('/'+link.getAttribute('href')==global.currentPage){
            link.classList.add('active')
        }
    })
}

//init app
function init(){
    switch (global.currentPage){
        case'/':            
        case'/index.html':
            displayPopularMovies();
            break
        case'/shows.html':
            console.log('shows');
            break
        case'/movie-details.html':
            console.log('movie-details');
            break
        case'/tv-details.html':
            console.log('tv-details');
            break
        case'/search.html':
            console.log('search');
            break
    }
    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded',init)