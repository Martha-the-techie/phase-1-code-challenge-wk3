const baseUrl = `http://localhost:3000/films/`

fetch(baseUrl)
.then((res) => res.json())
.then((data) => {
   movieItems(data);
})
.catch((err) => console.log('error', err))

let nowShowing = document.getElementById('nowShowing');

function renderMovieDetails(mov) {
    console.log(nowShowing);

    let poster = document.createElement('img');
    poster.src = mov.poster

    let title = document.createElement('h2');
    title.textContent = mov.title

    let description = document.createElement('p');
    description.textContent = mov.description

    let remainingTickets = mov.capacity - mov.tickets_sold;

    let tickets = document.createElement('button');

    tickets.textContent = 50
    console.log(tickets);
    tickets.addEventListener('click', function(){
        remainingTickets--
        if(remainingTickets < 0) {
            tickets.disable = true;
            return tickets.textContent= "Sold out"
        }
        console.log(remainingTickets);

    })

    nowShowing.innerHTML = '';
    nowShowing.appendChild(poster);
    nowShowing.appendChild(title);
    nowShowing.appendChild(description);
    //nowShowing.appendChild(tickets);

}


function movieItems(movies){
    let movieList = document.getElementById('films'); 
    movieList.innerHTML = '';

    movies.forEach((mov) => {
        const div = document.createElement('div');
        div.classList.add('movie');
        div.innerHTML = `
            <img src="${mov.poster}" alt="${mov.title}">
            <h2>${mov.title}</h2>
            <p>${mov.description}</p>
            <p class="tickets"> Remaining tickets: ${mov.capacity - mov.tickets_sold} </p>
            <button id="${mov.id}" onclick = "purchaseTicket(event)"> Buy Ticket </button>
        `;

        div.addEventListener('click', function(){
            renderMovieDetails(mov);
        });

        movieList.appendChild(div);
    });
    return movies
}
function purchaseTicket(event){
    event.preventDefault();
    const movieId = event.target.id
    const movieUrl = `http://localhost:3000/films/${movieId}`
    fetch(movieUrl)
      .then(resp => resp.json())
      .then(movie => {
        let body = {
            id: movieId,
            tickets_sold: movie.tickets_sold += 1
        }
        let options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
            
        fetch(movieUrl, options)
          .then(resp => console.log(resp.status))
        alert("Ticket successfully booked")
 
      })
    
    

}














