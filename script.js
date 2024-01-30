console.log("Script loaded!");

$(document).ready(function () {
    // Carousel Section
    const $carouselContainer = $('#carousel-container');
    const $carouselItems = $('.carousel-item');
    const totalItems = $carouselItems.length;
    const resultContainer = $('#resultContainer');

    let currentIndex = 0;

    function showCarouselItem(index) {
        $carouselItems.hide();
        $carouselItems.eq(index).show();
    }

    function updateArrows() {
        $('.left-arrow').toggle(currentIndex > 0);
        $('.right-arrow').toggle(currentIndex < totalItems - 1);
    }

    function moveCarousel(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalItems;
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        }
        showCarouselItem(currentIndex);
        updateArrows();
    }

    showCarouselItem(currentIndex);

    setInterval(function () {
        moveCarousel('next');
    }, 5000);

    $('.left-arrow').click(function () {
        moveCarousel('prev');
    });

    $('.right-arrow').click(function () {
        moveCarousel('next');
    });

    // Subscription Form Section
    // Contact Form Section
$(document).ready(function() {
  $('#contactForm').submit(function(event) {
    event.preventDefault();
    
    const emailInput = $('#emailInput');
    const firstNameInput = $('#firstName');
    const lastNameInput = $('#lastName');
    const contentInput = $('#contactInput');

    const email = emailInput.val();
    const firstName = firstNameInput.val();
    const lastName = lastNameInput.val();
    const content = contentInput.val();

    // Simple validation (you might want to add more validation)
    if (!email || !isValidEmail(email) || !firstName || !lastName || !content ) {
      alert('Please fill in all fields with valid information');
      return;
    }

    // Send data to the server
    $.ajax({
      url: '/submit',  // Change the URL endpoint to '/submit'
      method: 'POST',
      data: { email, firstName, lastName, content },
      success: function(response) {
          Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.message,
              confirmButtonText: 'OK'
          }).then(() => {
              emailInput.val('');
              firstNameInput.val('');
              lastNameInput.val('');
              contentInput.val('');
              console.log('Email:', email);
              console.log('First Name:', firstName);
              console.log('Last Name:', lastName);
              console.log('Content:', content);
          });
},
      error: function(error) {
          console.error(error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred. Please try again later.',
              confirmButtonText: 'OK'
          });
      }

    });
  });

  function isValidEmail(email) {
    // Simple email validation, you might want to use a more sophisticated approach
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  console.log()
  console.log('Form validation script loaded.'); // Log a message
});
});
