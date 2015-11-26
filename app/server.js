(function() {
  // Server Module
    module.exports = {
      startServer: function() {
        app.listen(3000, function() {
          // Starts a Node Server on Port 3000
          console.log('Server started at http://localhost:3000');
        });
      }
    }
})();
