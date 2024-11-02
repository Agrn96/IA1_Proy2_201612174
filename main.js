let xTrain = [];
let yTrain = [];

document.getElementById('csvFile').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const csvData = e.target.result;
        const lines = csvData.split('\n');
        xTrain = [];
        yTrain = [];

        lines.forEach(line => {
            const [x, y] = line.split(',').map(Number); // Use comma (',') for splitting
            if (!isNaN(x) && !isNaN(y)) { // Check for valid numbers
                xTrain.push(x);
                yTrain.push(y);
            }
        });

        console.log("Parsed Data: ", xTrain, yTrain); // Debugging: Check your parsed data
    };

    reader.readAsText(file);
});

document.getElementById('trainModel').addEventListener('click', () => {
    if (xTrain.length === 0 || yTrain.length === 0) {
        alert("Please upload a valid CSV file and try again.");
        return;
    }

    const model = new LinearRegression();
    model.fit(xTrain, yTrain);
    document.getElementById('results').innerText = `Model trained with m = ${model.m} and b = ${model.b}`;
});

document.getElementById('makePredictions').addEventListener('click', () => {
    if (xTrain.length === 0) {
        alert("Please train the model before making predictions.");
        return;
    }

    const xTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example test data
    const model = new LinearRegression();
    model.fit(xTrain, yTrain); // Make sure the model is trained with the CSV data
    const predictions = model.predict(xTest);

    document.getElementById('results').innerText += `\nPredictions:\n${predictions.map((value, index) => `${index + 1} --- ${value}`).join('\n')}`;

    // Plotting the graph
    const ctx = document.getElementById('predictionChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xTest,
            datasets: [
                {
                    label: 'Predicted Values',
                    data: predictions,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }
            ]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'X Values' } },
                y: { title: { display: true, text: 'Predicted Y Values' } }
            }
        }
    });
});
