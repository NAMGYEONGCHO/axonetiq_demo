document.addEventListener('DOMContentLoaded', function(){

    const allSeats = document.querySelectorAll('.seat');
  
    for (var i = 0; i < allSeats.length; i++) {
      allSeats[i].addEventListener('click', function() {
          // Get the current user ID
          const currentUserId = document.querySelector('.current').id;
          const currentUserName = document.querySelector('.current').getAttribute('data-name');
          // Get the seat ID
          const seatId = this.dataset.id;
          // Get seat owner ID
          const bookedBy = this.getAttribute('data-bookedBy');
          if (this.classList.contains('available')) {
              // Send a request to the server to book the seat
              fetch('/book', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ seatId, userId: currentUserId, action: 'book' }),
              })
              .then(response => response.json())
              .then(data => {
                  if (data.success) {
                      // The seat was successfully booked, update the UI
                      this.classList.remove('available');
                      this.classList.add('occupied');
                      //this.querySelector('.seat-status').textContent = 'Occupied';
                      this.textContent = 'Occupied';
                      this.setAttribute('data-bookedBy', currentUserId);
                  }
              })
              .catch((error) => {
                  console.error('Error:', error);
              });
          } else if (this.classList.contains('occupied')) {
              // Check if the seat was booked by the current user
              if (bookedBy === currentUserId) {
                  // Ask the user if they want to cancel their booking
                  if (confirm('Do you want to cancel your booking?')) {
                      // Send a request to the server to cancel the booking
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
                              // The booking was successfully cancelled, update the UI
                              this.classList.remove('occupied');
                              this.classList.add('available');
                              //this.querySelector('.seat-status').textContent = 'Available';
                              this.textContent = 'Available';
                              this.setAttribute('data-bookedBy', 'none');
                          }
                      })
                      .catch((error) => {
                          console.error('Error:', error);
                      });
                  }
              } else {
                alert("Sorry, this seat has already been booked by another user. Please choose a different seat.");
              }
          }
      });
    }

    const allUsers = document.querySelectorAll('.user');
  
    for (var i = 0; i < allUsers.length; i++) {
      allUsers[i].addEventListener('click', function() {
        const userId = this.dataset.id;  // Get user id
        switchUser(userId);
      });
    }
});

function switchUser(id) {
  // Get the current user
  const current = document.querySelector('.current');

  // If the clicked user is already the current user, do nothing
  if (current && current.id === `${id}`) {
      return;
  }

  // Otherwise, remove 'current' class from the current user
  if (current) {
      current.classList.remove('current');
      current.classList.add('hidden');
  }

  // And add 'current' class to the clicked user
  const userCurrent = document.getElementById(`${id}`);
  userCurrent.classList.remove('hidden');
  userCurrent.classList.add('current');
}
