// Module for seat booking functionality
function setupSeatBooking() {
    const allSeats = document.querySelectorAll('.seat');
  
    for (let i = 0; i < allSeats.length; i++) {
      allSeats[i].addEventListener('click', handleSeatClick);
    }
  
    // Event handler for seat click events
    function handleSeatClick() {
      const currentUserId = document.querySelector('.current').id;
      const currentUserName = document.querySelector('.current').getAttribute('data-name');
      const seatId = this.dataset.id;
      const bookedBy = this.getAttribute('data-bookedBy');
  
      if (this.classList.contains('available')) {
        // Book the seat
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
  
    // Function to book a seat
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
            updateBookingsList();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  
    // Function to cancel a booking
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
            updateBookingsList();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  
    // Function to update seat UI
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

  // Function to update the bookings list
  function updateBookingsList() {
    fetch('/bookings')
      .then(response => response.json())
      .then(data => {
        renderBookingsList(data.bookings);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Function to render the bookings list
  function renderBookingsList(bookings) {
    const bookingsTableBody = document.querySelector('.bookings-table tbody');
    bookingsTableBody.innerHTML = bookings.map(booking => `
      <tr>
        <td>${booking.flightID.flightNumber}</td>
        <td>${booking.flightID.origin}</td>
        <td>${booking.flightID.destination}</td>
        <td>${new Date(booking.flightID.departureTime).toLocaleDateString('en-US')} ${new Date(booking.flightID.departureTime).toLocaleTimeString('en-US')}</td>
        <td>${new Date(booking.flightID.arrivalTime).toLocaleDateString('en-US')} ${new Date(booking.flightID.arrivalTime).toLocaleTimeString('en-US')}</td>
        <td>${booking.seatID.number}</td>
        <td>${booking.userID.name}</td>
        <td>${new Date(booking.updatedAt).toLocaleDateString('en-US')} ${new Date(booking.updatedAt).toLocaleTimeString('en-US')}</td>
      </tr>
    `).join('');
  }
  
  // Module for user switching functionality
  function setupUserSwitching() {
    const allUsers = document.querySelectorAll('.user');
  
    for (let i = 0; i < allUsers.length; i++) {
      allUsers[i].addEventListener('click', handleUserClick);
    }
  
    // Event handler for user click events
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