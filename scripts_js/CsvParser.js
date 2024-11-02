let xTrain = [];
let yTrain = [];

export function parseCSV(file, algorithm) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const csvData = e.target.result;
        const lines = csvData.split('\n');
        xTrain = [];
        yTrain = [];

        lines.forEach(line => {
            const [x, y] = line.split(',').map(Number);
            if (!isNaN(x) && !isNaN(y)) {
                xTrain.push(x);
                yTrain.push(y);
            }
        });

        console.log(`Parsed Data for ${algorithm}:`, xTrain, yTrain);
    };

    reader.readAsText(file);
}

export function getXTrain() {
    return xTrain;
}

export function getYTrain() {
    return yTrain;
}
