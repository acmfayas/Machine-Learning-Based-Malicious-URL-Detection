chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.url) {
        const formData = new FormData();
        formData.append('url', message.url);

        // Send the URL to your Flask web app for prediction
        fetch("http://127.0.0.1:5000/", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            sendResponse(data);
        })
        .catch((error) => {
            console.error("Error: " + error);
        });
        return true; // Indicates that the response will be sent asynchronously
    }
});
