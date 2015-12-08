(function() {
  var map = ''; // Global Map Object
  var events = {
    // Events Object - This contains all needed functionality for the front end
    init: function() {
      // Setup event listeners and functionality
      var builder = document.getElementById('builder');
      var modelSelect = document.getElementById('model');
      if(builder) {
        // On model builder page - Run events
        this.setupBuilder();
      } else {
        // On a model display page initialize leaflet and set up model dropdown
        this.loadMap();
        modelSelect.addEventListener('change', function(e) {
          events.loadModel(e.target.value);
        });
      }
    },

    loadMap: function() {
      // Initialize a clean leaflet map with no plotted data
      // Map defaults to UK
      map = L.map('map').setView([51.505, -0.09], 5);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 30,
        id: 'trecoolz.o7bh8139',
        accessToken: 'pk.eyJ1IjoidHJlY29vbHoiLCJhIjoiY2loN3BtdXVtMDAxdnY1bTNvZGprdzF5NSJ9.XtEzyHcd1_GLu-hizFkEsQ'
      }).addTo(map);

    },

    loadModel: function(model) {
      map.remove(); // Clean up any previous model and load a fresh map
      this.loadMap();
      // AJAX request to read file data
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function() {
        if(xhr.status === 200) {
          // Data received - Plot data
          var json = JSON.parse(xhr.responseText);
          events.plotData(json);
        }
      });

      xhr.open('GET', '/models/read/' + model);
      xhr.send();

    },

    plotData: function(data) {
      for(var i=0; i<data.cities.length; i++) {
        // Loop through each city in the model
        var coords = data.cities[i].coords; // Get city coords for leaflet JS
        var parsedCoords = []; // Array for new parsed coordinates
        for(var j=0; j<coords.length; j++) {
          // Loop through array of coords for a given city
            var coord = coords[j];
            parsedCoords.push(parseFloat(coord)); // Convert from String to Float and push to new array
        }
        var circle = L.circle(parsedCoords, 20000, {
          // Create a highlighted circle at the given coordinates
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(map);
        var crimes = data.cities[i].crimes; // Get each crime array for a given city
        var popUpString = "City: " + data.cities[i].city + "<br /> Crimes: <br /> "; // Create the pop up string

        for(var j=0; j<crimes.length; j++) {
          // Loop through each crime and add to the pop up string
          var crime = crimes[j];
          popUpString = popUpString + crime.crimeName + ": " + crime.crimeCount + "<br /> ";
        }

        circle.bindPopup(popUpString); // Bind the popup to the created Circle
      }
    },

    setupBuilder: function() {
      // Sets up events for builder
      var addCrime = document.getElementById('addCrime');
      var saveModel = document.getElementById('saveModel');
      var buildModel = document.getElementById('buildModel');
      addCrime.addEventListener('click', function() {
        events.addCrimeUI();
      });

      saveModel.addEventListener('click', function() {
        events.saveModel();
      });

      buildModel.addEventListener('click', function() {
        events.buildModel();
      })
    },

    addCrimeUI: function() {
      // Adds another Crime Control with correct elements. Done on click of add city
      var formGroup = document.createElement('div');
      var formGroup2 = document.createElement('div');
      var crimeLabel = document.createElement('label');
      var crimeLabelText = document.createTextNode('Crime');
      var crimeInput = document.createElement('input');
      var crimeCountLabel = document.createElement('label');
      var crimeCountLabelText = document.createTextNode('Crime Count');
      var crimeCountInput = document.createElement('input');
      var button = document.getElementById('addCrime');
      var builder = document.getElementById('builder');
      formGroup.setAttribute('class', "form-group");
      formGroup2.setAttribute('class', "form-group");
      crimeInput.setAttribute('class', 'form-control crimeName');
      crimeCountInput.setAttribute('class', 'form-control crimeCount');
      crimeLabel.appendChild(crimeLabelText);
      crimeCountLabel.appendChild(crimeCountLabelText);
      formGroup.appendChild(crimeLabel);
      formGroup.appendChild(crimeInput);
      formGroup2.appendChild(crimeCountLabel);
      formGroup2.appendChild(crimeCountInput);
      builder.insertBefore(formGroup, button);
      builder.insertBefore(formGroup2, button);
    },

    saveModel: function() {
      // Saves current model to session
      // Model Values
      var modelName = document.getElementById('name').value.toLowerCase();
      var modelCity = document.getElementById('city').value;
      var modelLong = document.getElementById('long').value;
      var modelLat = document.getElementById('lat').value;
      var crimes = document.getElementsByClassName('crimeName');
      var counts = document.getElementsByClassName('crimeCount');
      var modelCrimes = [];
      for(var i=0; i<crimes.length; i++) {
        var crime = {};
        crime.crimeName = crimes[i].value;
        crime.crimeCount = counts[i].value;
        modelCrimes.push(crime);
      }
      var model = {
        // Build a new city object with crimes
        city: modelCity,
        coords: [modelLat, modelLong],
        crimes: modelCrimes
      };

      if(sessionStorage.getItem(modelName) === null) {
        // Store new model in session storage if model with given key does not exist
        var mainModel = {
          cities: [model]
        };
        sessionStorage.setItem(modelName, JSON.stringify(mainModel));
      } else {
        // Add to existing model within session storage
        var savedModel = sessionStorage.getItem(modelName);
        savedModel = JSON.parse(savedModel);
        savedModel.cities.push(model);
        sessionStorage.setItem(modelName, JSON.stringify(savedModel));
      }

      builder.reset(); // Reset the form
      var modelInput = document.getElementById('name');
      modelInput.value = modelName.toLowerCase();
      modelInput.setAttribute('disabled', 'disabled'); // Disable modelName so it works on one model
      window.scroll(0, 0);
    },

    buildModel: function() {
      // Retreives a now completed model from session storage and posts to server
      // side write endpoint as AJAX request
      var modelName = document.getElementById('name').value.toLowerCase();
      var newModel = sessionStorage.getItem(modelName);
      var json = JSON.parse(newModel);
      var data = {
        fileName: modelName + ".json",
        data: json
      };
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function() {
        if(xhr.status === 200) {
          window.location.href = '/';
          sessionStorage.removeItem(modelName);
        } else {
          alert('Model could not be saved.');
        }
      });
      data = JSON.stringify(data);
      xhr.open("POST", '/build/write');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(data);
    }
  }

  events.init(); // Initialize front end application

})();
