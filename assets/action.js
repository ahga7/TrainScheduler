

// Initialize Firebase
   var config = {
    apiKey: "AIzaSyANsmAbDL9GZfs1F2yWgDgXrZJenlGOC0k",
    authDomain: "train-schedule-8a736.firebaseapp.com",
    databaseURL: "https://train-schedule-8a736.firebaseio.com",
    projectId: "train-schedule-8a736",
    storageBucket: "train-schedule-8a736.appspot.com",
    messagingSenderId: "754210105641"
  };
    firebase.initializeApp(config);

    //creating a variable to reference the database
    var database = firebase.database();

    
    //set html to the values from the database
    database.ref().on('value', function(snap){
      console.log(snap.val());
    })

    //this is triggered for each item in the database on load
    database.ref().on('child_added', function(snap){
      newRow(snap.val().name, snap.val().destination, snap.val().freq)

    });

    

    // function to create the new row from input form
    function addRow(name, destination, firstTrain, freq) {
      console.log(name);

      var diff = moment().diff(moment(firstTrain, "HH:mm"), "minutes");
      var minsAway = (diff%freq); //gives you time till next train

      var nextTrain = moment().add(minsAway, "minutes");
    
      var newRow = $("<tr>").append( $("<td>").text(name) )
                            .append( $("<td>").text(destination) )
                            .append( $("<td>").text(freq) )
                            .append( $("<td>").text(nextTrain.format("HH:mm")))
                            .append( $("<td>").text(minsAway) )
                            
      $("tbody").append(newRow);

 

    };



 // submit button to push the data up to the train schedule table
$("#submit-button").on("click", function(event){
	 event.preventDefault();

	var name = $("#name").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrain = $("#firstTrain").val();   
	var freq = $("#freq").val();
  
  

  // console.log(name);
  // console.log(destination);
  // console.log(firstTrain);
  // console.log(freq);

    //pushing the form data up to firebase
        database.ref().push({
          "TrainName": name,
          "Destination" : destination,
          "FirstTrain": firstTrain,
          "Frequency": freq
        })
    

	addRow(name, destination, firstTrain, freq);
	

});