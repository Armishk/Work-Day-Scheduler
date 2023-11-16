
// Wrap all code that interacts with the DOM in a call to jQuery
$(function () {



  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    // Use the id in the containing time-block as a key to save the user input in local storage
    var blockId = $(this).parent().attr('id');
    var userDescription = $(this).siblings('.description').val();
    localStorage.setItem(blockId, userDescription);
  });

  // Add code to apply the past, present, or future class to each time block
  function updateHourlyBlocks() {
    var currentHour = dayjs().hour();

    $('.past present future').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      console.log('Current Hour:', currentHour);
    console.log('Block Hour:', blockHour);


    if ($(this).find('.hour').text().includes('PM') && blockHour !== 12) {
      blockHour += 12;
    }

      if (blockHour > currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  
  // Call the function to update time-blocks on page load
  updateHourlyBlocks();

  // Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  function loadSavedDescriptions() {
    $('.time-block').each(function () {
      var blockId = $(this).attr('id');
      var savedDescription = localStorage.getItem(blockId);

      if (savedDescription !== null) {
        $(this).find('.description').val(savedDescription);
      }
    });
  }

  // Call the function to load saved descriptions on page load
  loadSavedDescriptions();

  // Display the current date in the header
  var currentDate = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDate);
});


