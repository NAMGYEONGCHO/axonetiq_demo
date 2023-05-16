document.addEventListener('DOMContentLoaded', function(){

    const allSeats = document.querySelectorAll('.seat');
  
    for (var i = 0; i < allSeats.length; i++) {
      allSeats[i].addEventListener('click', function() {
        // If the seat is available
        if (this.classList.contains('available')) {
          // Mark the seat as occupied
          this.classList.remove('available');
          this.classList.add('occupied');
          this.textContent = 'Occupied';
          // TODO: Add your booking logic here
        } else if (this.classList.contains('occupied')) {
          // Mark the seat as available
          this.classList.remove('occupied');
          this.classList.add('available');
          this.textContent = 'Available';
          // TODO: Add your logic here for when a seat is made available again
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
    /* for (var i = 0; i < allUsers.length; i++) {
      allUsers[i].addEventListener('click', function() {
        const userId = this.dataset.id;  // Get user id
        switchUser(userId);
      });
    } */

});

function switchUser(id) {
  // Get the current user
  const current = document.querySelector('.current');

  // If the clicked user is already the current user, do nothing
  if (current && current.id === `user-status-${id}`) {
      return;
  }

  // Otherwise, remove 'current' class from the current user
  if (current) {
      current.classList.remove('current');
      current.classList.add('hidden');
  }

  // And add 'current' class to the clicked user
  const userCurrent = document.getElementById(`user-status-${id}`);
  userCurrent.classList.remove('hidden');
  userCurrent.classList.add('current');
}
