document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    // Call the insertCoin function
    insertCoin();
  }
});

function insertCoin() {
  // Check if the remaining time is zero
  if (remainingTimeInSeconds <= 0) {
    // Show message
    showMessage("PLEASE SELECT COINS");
    
    // Show coin selection after a brief delay
    setTimeout(showCoinSelection, 300); // Delay in milliseconds
  } else {
    // Display a message indicating that coins cannot be inserted while the timer is running
    showMessage("Coins cannot be inserted while the timer is running.");
  }
}

function showMessage(message) {
  var messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.classList.add("message");

  document.body.appendChild(messageDiv);

  setTimeout(function() {
      document.body.removeChild(messageDiv);
  }, 3000);
}

function showCoinSelection() {
  // Creating a div for coin selection
  var coinSelectionDiv = document.createElement("div");
  coinSelectionDiv.classList.add("coin-selection");
  
  // Coin values
  var coins = ["1", "5", "10", "20", "50", "450", "WEMB"];
  
  // Creating coin buttons
  coins.forEach(function(coinValue) {
      var button = document.createElement("button");
      button.textContent = coinValue + " peso/s";
      button.classList.add("coin-button");
      button.onclick = function() {
          selectCoin(coinValue);
      };
      coinSelectionDiv.appendChild(button);
  });
  
  // Creating a confirm button
  var confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm";
  confirmButton.classList.add("confirm-button");
  confirmButton.onclick = function() {
      confirmSelection();
  };
  
  // Adding coin selection div and confirm button to body
  document.body.appendChild(coinSelectionDiv);
  document.body.appendChild(confirmButton);
}

function selectCoin(coinValue) {
  if (coinValue === "1") {
      totalTimeInSeconds += 900;
  } else if (coinValue === "5") {
      totalTimeInSeconds += 3600;
  } else if (coinValue === "10") {
      totalTimeInSeconds += 14400;
  } else if (coinValue === "20") {
      totalTimeInSeconds += 86400;
  } else if (coinValue === "50") {
      totalTimeInSeconds += 529200;
  } else if (coinValue === "450") {
      totalTimeInSeconds += 2592000;
  } else if (coinValue === "WEMB") {
    totalTimeInSeconds += 999999999999999;
  }

  // Add selected coin to the array
  selectedCoins.push(coinValue);

  // Update selected coins display
  updateSelectedCoinsDisplay();
  
  // Update time display
  updateTimeDisplay();

  // Show selected coins
  showSelectedCoins();
}

// Function to show selected coins
function showSelectedCoins() {
  var selectedCoinsDiv = document.getElementById('selected-coins');
  selectedCoinsDiv.style.display = 'block';
}

// Variable to store the total time
var totalTimeInSeconds = 0; // Set the initial total time (in seconds)
var remainingTimeInSeconds = 0; // Initialize remaining time (in seconds)
var selectedCoins = []; // Array to store selected coins

function startTimer() {
  // Additional actions when the timer reaches zero
  function timerReachedZero() {
    // Reset remaining time to zero
    remainingTimeInSeconds = 0;

    // Hide the coin selection div and confirm button
    document.querySelector('.coin-selection').style.display = 'none';
    document.querySelector('.confirm-button').style.display = 'none';

    // Show the enter button
    document.getElementById('enter-button').style.display = 'block';

    // Hide the selected coins
    document.getElementById('selected-coins').style.display = 'none';

    // Update the status to "DISCONNECTED"
    document.getElementById('status-text').textContent = 'DISCONNECTED';
    document.getElementById('status-text').classList.remove('status-active');
    document.getElementById('status-text').classList.add('status-disconnected');
  }

  // Set remaining time equal to total time before starting the timer
  remainingTimeInSeconds = totalTimeInSeconds;

  // Hide the coin selection div
  document.querySelector('.coin-selection').style.display = 'none';

  // Show the timer display
  document.getElementById('time-left').style.display = 'block';

  // Update time display
  updateTimeDisplay(); // Added line

  // Update the status to "ACTIVE"
  document.getElementById('status-text').textContent = 'ACTIVE';
  document.getElementById('status-text').classList.remove('status-disconnected');
  document.getElementById('status-text').classList.add('status-active');

  // Update the remaining time every second
  var timerInterval = setInterval(function() {
    updateTimeDisplay();
    if (remainingTimeInSeconds <= 0) {
      clearInterval(timerInterval);
      timerReachedZero(); // Call additional actions when the timer reaches zero
    }
    remainingTimeInSeconds--; // Decrease remaining time by 1 second
  }, 1000); // Update every second
}




function updateTimeDisplay() {
  // Convert remaining time to days, hours, minutes, and seconds
  var days = Math.floor(remainingTimeInSeconds / (3600 * 24));
  var hours = Math.floor((remainingTimeInSeconds % (3600 * 24)) / 3600);
  var minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
  var seconds = remainingTimeInSeconds % 60;

  // Construct the time string based on remaining time
  var timeString = "";
  if (days > 0) {
    timeString += days + 'd ';
  }
  if (hours < 0) {
    timeString += '';
  }
  timeString += hours + 'hr ';
  if (minutes < 0) {
    timeString += '';
  }
  timeString += minutes + 'min ' + (seconds < 10 ? '' : '') + seconds + 'sec';

  // Display the formatted time
  var timeLeftDisplay = document.getElementById('time-left');
  timeLeftDisplay.textContent = 'Time Left: ' + timeString; // Always update the content
}

function confirmSelection() {
  // Start the timer after confirming coin selection
  startTimer();

  // Hide the confirm button
  document.querySelector('.confirm-button').style.display = 'none';
}

function updateVoucher() {
  var voucherInput = document.getElementById("voucher-input").value;
  document.getElementById("voucher-code").textContent = voucherInput;
}