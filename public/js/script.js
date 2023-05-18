// Module for seat booking functionality
function setupSeatBooking() {
    const allSeats = document.querySelectorAll('.seat');
  
    for (let i = 0; i < allSeats.length; i++) {
      allSeats[i].addEventListener('click', handleSeatClick);
    }
  
    function handleSeatClick() {
      const currentUserId = document.querySelector('.current').id;
      const currentUserName = document.querySelector('.current').getAttribute('data-name');
      const seatId = this.dataset.id;
      const bookedBy = this.getAttribute('data-bookedBy');
  
      if (this.classList.contains('available')) {
        bookSeat(this, currentUserId);
      } else if (this.classList.contains('occupied')) {
        if (bookedBy === currentUserId) {
          if (confirm('Do you want to cancel your booking?')) {
            cancelBooking(this, seatId, currentUserId);
          }
        } else {
          displaySeatAlreadyBookedMessage();
        }
      }
    }
  
    function bookSeat(seatElement, currentUserId) {
      fetch('/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seatId: seatElement.dataset.id, userId: currentUserId, action: 'book' }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            updateSeatUI(seatElement, 'occupied', 'Occupied', currentUserId);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  
    function cancelBooking(seatElement, seatId, currentUserId) {
      fetch('/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seatId, userId: currentUserId, action: 'cancel' }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            updateSeatUI(seatElement, 'available', 'Available', 'none');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  
    function updateSeatUI(seatElement, className, textContent, bookedBy) {
      seatElement.classList.remove('available', 'occupied');
      seatElement.classList.add(className);
      seatElement.textContent = textContent;
      seatElement.setAttribute('data-bookedBy', bookedBy);
    }
  
    function displaySeatAlreadyBookedMessage() {
      alert("Sorry, this seat has already been booked by another user. Please choose a different seat.");
    }
  }
  
  // Module for user switching functionality
  function setupUserSwitching() {
    const allUsers = document.querySelectorAll('.user');
  
    for (let i = 0; i < allUsers.length; i++) {
      allUsers[i].addEventListener('click', handleUserClick);
    }
  
    function handleUserClick() {
      const userId = this.dataset.id;
      switchUser(userId);
    }
  
    function switchUser(id) {
      const current = document.querySelector('.current');
  
      if (current && current.id === `${id}`) {
        return;
      }
  
      if (current) {
        current.classList.remove('current');
        current.classList.add('hidden');
      }
  
      const userCurrent = document.getElementById(`${id}`);
      userCurrent.classList.remove('hidden');
      userCurrent.classList.add('current');
    }
  }
  
  // Entry point
  document.addEventListener('DOMContentLoaded', function () {
    setupSeatBooking();
    setupUserSwitching();
 });