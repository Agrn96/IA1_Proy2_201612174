import { parseCSV, getXTrain, getYTrain } from './CsvParser.js';

document.getElementById('csvFile').addEventListener('change', (event) => {
    const algorithm = document.getElementById('algorithm').value;
    parseCSV(event.target.files[0], algorithm);
});

document.getElementById('trainModel').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    if (algorithm !== 'linear') return; 

    const xTrain = getXTrain();
    const yTrain = getYTrain();

    if (xTrain.length === 0 || yTrain.length === 0) {
        alert("Please upload a valid CSV file and try again.");
        return;
    }

    const model = new LinearRegression();
    model.fit(xTrain, yTrain);
    document.getElementById('results').innerText = `Linear Model trained with m = ${model.m} and b = ${model.b}`;
});

document.getElementById('makePredictions').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    if (algorithm !== 'linear') return; 

    const xTrain = getXTrain();
    const yTrain = getYTrain();

    if (xTrain.length === 0) {
        alert("Please train the model before making predictions.");
        return;
    }


    const model = new LinearRegression();
    model.fit(xTrain, yTrain); 
    const xTest = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
    const predictions = model.predict(xTest);

    document.getElementById('results').innerText += `\nPredictions:\n${predictions.map((value, index) => `${index + 1} --- ${value}`).join('\n')}`;

    const ctx = document.getElementById('predictionChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xTest,
            datasets: [
                {
                    label: `Linear Regression Predictions`,
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