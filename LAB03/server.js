// Import the required modules
const connect = require('connect');
const url = require('url');

// Create a new Connect server
const app = connect();

// Define the calculate function
function calculate(req, res) {
    // Parse the URL and extract query parameters
    const query = url.parse(req.url, true).query;
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);
    let result;

    // Check the method and perform the corresponding operation
    if (isNaN(x) || isNaN(y)) {
        res.end('Invalid numbers provided');
        return;
    }

    switch (method) {
        case 'add':
            result = `${x} + ${y} = ${x + y}`;
            break;
        case 'subtract':
            result = `${x} - ${y} = ${x - y}`;
            break;
        case 'multiply':
            result = `${x} * ${y} = ${x * y}`;
            break;
        case 'divide':
            result = `${x} / ${y} = ${x / y}`;
            break;
        default:
            result = 'Invalid method. Use add, subtract, multiply, or divide.';
    }

    // Send the result as the response
    res.end(result);
}

// Use the calculate function as middleware
app.use('/lab2', calculate);

// Start the server on port 3000
app.listen(3001, function() {
    console.log('Server is running on http://localhost:3001');
});
