"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireWildcard(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _debug = _interopRequireDefault(require("debug"));

var _config = _interopRequireDefault(require("config"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _logger = require("./contollers/logger.js");

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(_bodyParser["default"].json());
app.use(_logger.log);
app.use(_logger.authenticate);
app.use((0, _helmet["default"])());
if (app.get('env') === "development") app.use((0, _morgan["default"])('tiny'));
app.get('/', function (req, res) {
  var user = getUser(1);
  res.render('home', {
    title: 'Express APP',
    messsage: {
      home: "welcome please navigate  to /cources"
    },
    item: {
      user: user
    }
  });
});

function getUser(id) {
  return {
    id: id,
    githubUser: "zain"
  };
}

app.use('/users', _users["default"]);
var port = process.env.PORT || 5000;
console.log(_config["default"].get("name"));
console.log(_config["default"].get("mail.host"));
console.log(_config["default"].get("mail.password")); // console.log(process.env.Express_API_password)

app.listen(port, function () {
  return console.log("Server is Running on http://localhost:".concat(port));
});