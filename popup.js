// Do when HTML is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get text input, filename input, submit button, and textbox elements
    const filenameInput = document.getElementById('filenameInput');
    const textInput = document.getElementById('textInput');
    const submitButton = document.getElementById('submitButton');
    const responseTextarea = document.getElementById('responseTextarea'); // Assuming you have a textbox for displaying the response
    
    // Function to adjust the height of the textarea dynamically
    function adjustTextareaHeight() {
        textInput.style.height = "auto";
        textInput.style.height = (textInput.scrollHeight) + "px";
    }
    
    // Event listener to adjust the textarea height when the user types
    textInput.addEventListener("input", adjustTextareaHeight);
    
    // Initially adjust the textarea height
    adjustTextareaHeight();
    
    submitButton.addEventListener('click', function() {
        // Get the text and filename input values
        const logstash_pipeline_id = filenameInput.value;
        const logstash_pipeline_config = textInput.value;
        
        // Send data to backend server
        fetch('http://127.0.0.1:5000/process-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ logstash_pipeline_id: logstash_pipeline_id, logstash_pipeline_config: logstash_pipeline_config })
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            // Update the response textarea with the string representation of the object
            if (responseTextarea) {
                responseTextarea.value = JSON.stringify(data); // Convert object to string
            } else {
                console.error('Response textarea not found');
            }
        })
        .catch(error => {
            console.error('Error sending/receiving data:', error);
        });
    });
});
