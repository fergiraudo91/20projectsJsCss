const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;
populateUI();

function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMovidePrice', moviePrice);
}

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //Copy selected seats into Array
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    count.value = selectedSeats.length;
    count.textContent = selectedSeats.length;
    total.textContent = count.textContent * ticketPrice;
}

//Get data from local storage and polulate it
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
           if(selectedSeats.indexOf(index) > -1){
              seat.classList.add('selected');
           }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = movieSelect.value;
    }
    updateSelectedCount();


}

//movie Select
movieSelect.addEventListener('change', e =>{
   ticketPrice = +e.target.value;
   setMovieData(e.target.selectedIndex, e.target.value);
   updateSelectedCount();
});

container.addEventListener('click', e =>{
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
      e.target.classList.toggle('selected');
      updateSelectedCount();
  }
});

updateSelectedCount();