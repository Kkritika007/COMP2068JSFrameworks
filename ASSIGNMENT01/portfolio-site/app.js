// Load required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

// Import the index router
var indexRouter = require('./routes/index');

var app = express();

// Use helmet for securing HTTP headers with a Content Security Policy
app.use(helmet());

// Custom Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], // Only allow resources from your own origin
        scriptSrc: [
            "'self'", // Allow scripts from your origin
            "https://code.jquery.com", // Allow jQuery
            "https://cdnjs.cloudflare.com", // Allow Popper.js
            "https://stackpath.bootstrapcdn.com" // Allow Bootstrap
        ],
        styleSrc: [
            "'self'", // Allow styles from your origin
            "https://stackpath.bootstrapcdn.com" // Allow Bootstrap CSS
        ],
    }
}));

app.use(helmet.noSniff()); // Sets the X-Content-Type-Options header

// View engine setup
app.set('views', path.join(__dirname, 'views')); // Set views directory
app.set('view engine', 'hbs'); // Set Handlebars as the templating engine

// Middleware setup
app.use(logger('dev')); // Log requests to the console
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Serve static files with cache-control headers
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
}));

// Use the index router for all main routes
app.use('/', indexRouter); // Route all requests to the indexRouter

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404)); // Pass a 404 error to the next middleware
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message; // Error message
    res.locals.error = req.app.get('env') === 'development' ? err : {}; // Show error details only in development

    // Render the error page
    res.status(err.status || 500); // Set the status code
    res.render('error'); // Render the error view
});

// Export the app module
module.exports = app;
