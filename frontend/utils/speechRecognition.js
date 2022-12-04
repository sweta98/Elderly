//Reference: https://www.section.io/engineering-education/speech-recognition-in-javascript/
if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();
  
    // String for the Final Transcript
    let final_transcript = "";
  
    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;

    speechRecognition.lang = 'English';
  
    speechRecognition.onresult = (event) => {
      // Create the interim transcript string locally because we don't want it to persist like final transcript
      let interim_transcript = "";
      final_transcript = "";
  
      // Loop through the results from the speech recognition object.
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      // Set the Final transcript and Interim transcript.
      document.querySelector("#final").innerHTML = final_transcript;
      document.querySelector("#interim").innerHTML = interim_transcript;
      final_transcript = interim_transcript.length===0 ? final_transcript : interim_transcript;
    };
  
    // Set the onClick property of the start button
    document.querySelector("#microphone-container").onclick = () => {
      // Start the Speech Recognition
      speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#finish-recording-btn").onclick = () => {
      // Stop the Speech Recognition
      speechRecognition.stop();
      console.log(final_transcript)
      document.querySelector("#final").innerHTML = '';
      document.querySelector("#wish-input").value = final_transcript;
    };
  } else {
    console.log("Speech Recognition Not Available");
  }