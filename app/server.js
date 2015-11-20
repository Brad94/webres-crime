(function() {
    module.exports = {
      startServer: function() {
        app.listen(3000, function() {
          console.log('Server started at http://localhost:3000');
        });
      }
    }
})();
