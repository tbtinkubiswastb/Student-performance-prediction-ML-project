document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Fetch input values
    const name = document.getElementById('studentName').value.trim();
    const age = document.getElementById('age').value;
    
    const studyHours = parseFloat(document.getElementById('studyHours').value);
    const sleepHours = parseFloat(document.getElementById('sleepHours').value);
    const phoneUsage = parseFloat(document.getElementById('phoneUsage').value);
    
    const attendance = parseFloat(document.getElementById('attendance').value);
    const focusScore = parseFloat(document.getElementById('focusScore').value);
    const stressLevel = parseFloat(document.getElementById('stressLevel').value);
    const modelType = document.getElementById('modelSelect').value;

    // Validation: Total hours cannot exceed 24
    const totalHours = studyHours + sleepHours + phoneUsage;
    if (totalHours > 24) {
        alert("Warning: Total hours (Study + Sleep + Phone) cannot exceed 24. Your total is " + totalHours + " hours.");
        return;
    }

    // Retrieve weights and bias for the selected model
    const selectedModel = modelWeights[modelType];
    const w = selectedModel.weights;
    const bias = selectedModel.bias;

    // Calculate prediction based on the 6 parameters trained in Python
    let prediction = (studyHours * w[0]) + 
                     (sleepHours * w[1]) + 
                     (phoneUsage * w[2]) + 
                     (attendance * w[3]) + 
                     (focusScore * w[4]) + 
                     (stressLevel * w[5]) + 
                     bias;

    // Ensure the prediction stays within realistic bounds (0 to 100)
    if (prediction > 100) prediction = 100.0;
    if (prediction < 0) prediction = 0.0;

    // Format the output exactly as requested
    // Example: "John(25), your score is 89.50."
    const finalText = `${name}(${age}), your score is ${prediction.toFixed(2)}.`;

    // Display the result box below the form
    const resultBox = document.getElementById('resultBox');
    resultBox.classList.remove('d-none');
    document.getElementById('resultText').innerText = finalText;
});