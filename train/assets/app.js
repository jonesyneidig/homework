  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBGUTP5oATmuIoXnXzYDIgIBokfo42QQnk",
    authDomain: "traintime-a1d02.firebaseapp.com",
    databaseURL: "https://traintime-a1d02.firebaseio.com",
    projectId: "traintime-a1d02",
    storageBucket: "traintime-a1d02.appspot.com",
    messagingSenderId: "426057926406"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function() {

    //User input
    var trainName = $("#trainName").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = $("#trainFirstTime").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
    
    
    //data of new train to push to firebase
    var newTrain = {
        name: trainName,
        dest: trainDest,
        first: trainFirst,
        freq: trainFreq
      }

    // Uploads Train data to the database
    database.ref().push(newTrain);

    //log variable values

    console.log(newTrain);
   


    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination-input").val("");
    $("#trainFirstTime").val("");
    $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
    
  });

  // Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

  // Clean up  the Train freq
  var firstTimeConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFreq;
    var minutesTillTrain = trainFreq - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");

  // Add each train's data into the table
  $(".train-schedule").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrainFormatted + "</td><td>" + minutesTillTrain + "</td></tr>");

// Field validation hhmm
function validateHhMm(inputField) {
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField.value);

    if (isValid) {
        inputField.style.backgroundColor = '#bfa';
    } else {
        inputField.style.backgroundColor = '#fba';
    }

    return isValid;

};


});