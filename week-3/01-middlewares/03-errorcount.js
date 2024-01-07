const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();
let errorCount = 0;

app.get('/user', function(req, res) {
  throw new Error("User not found");
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});
// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

//Error handling middleware......
// at the end of our file
//Through this express will not send the common 500 status code ,but only what we want to send as error code
function errorfinder(err, req, res, next) {
  errorCount = errorCount + 1;
  const statusCo = err.statusCode;
  if (statusCo != 200) {
    res.sendStatus(404);
  }
  else
    next(err);
}
app.use(errorfinder);
module.exports = app;