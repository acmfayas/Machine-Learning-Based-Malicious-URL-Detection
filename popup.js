document.addEventListener('DOMContentLoaded', function () {
    const detectButton = document.getElementById('detectButton');
    const urlInput = document.getElementById('urlInput');
    const predictionResult = document.getElementById('predictionResult');
  
    detectButton.addEventListener('click', function () {
      const url = urlInput.value;
      makePrediction(url);
    });
  
    function makePrediction(url) {
      fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'url=' + encodeURIComponent(url),
      })
        .then((response) => response.json())
        .then((data) => {
          const prediction = data.prediction;
          const nonPhishingProbability = data.non_phishing_probability;
          
          // Modify the result text based on the prediction
          let resultText;
          if (prediction.includes("safe")) {
            resultText = `Prediction: ${prediction}`;
            predictionResult.style.backgroundColor = '#66cc66';
          } else if (prediction.includes("unsafe")) {
            resultText = `Prediction: ${prediction}`;
            predictionResult.style.backgroundColor = '#ff2525';
          }
          predictionResult.innerText = resultText;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
});
