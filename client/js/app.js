const $ = require('jquery');
const Backbone = require('backbone');
const Router = require('./router');

// Set jQuery in the window
window.$ = window.jQuery = $;

const router = new Router();
Backbone.history.start();
