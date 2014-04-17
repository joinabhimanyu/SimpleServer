var async = require('async');

var square = function (num, doneCallback) {
  console.log(num * num);
  // Nothing went wrong, so callback with a null error.
  return doneCallback(null);
};

// Square each number in the array [1, 2, 3, 4]
async.each([1, 2, 3, 4], square, function (err) {
  // Square has been called on each of the numbers
  // so we're now done!
  console.log("Finished!");
});