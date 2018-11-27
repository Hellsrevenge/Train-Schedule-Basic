$(document).ready(function(){

var config = {
    apiKey: "AIzaSyBq4bWA3EG5hlHATGOGCbbu532at9EBhYo",
    authDomain: "abcd-bda3b.firebaseapp.com",
    databaseURL: "https://abcd-bda3b.firebaseio.com",
    projectId: "abcd-bda3b",
    storageBucket: "abcd-bda3b.appspot.com",
    messagingSenderId: "383510881230"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

    var tName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    tName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
    name: tName,
    destination: destination,
    first_train: firstTrain,
    frequency: frequency
    });

  });
  database.ref().on("child_added", function(train) {
    var nt = train.val();

    var tFrequency = nt.frequency;
    var firstTime = nt.first_train;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('LT');

    var row = $("<tr>");
    row.append(
        $("<td>").html(nt.name),
        $("<td>").html(nt.destination),
        $("<td>").html(nt.frequency),
        $("<td>").html(nextTrain),
        $("<td>").html(tMinutesTillTrain),
    );
    $("#train-table").append(row);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

});

 