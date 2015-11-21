(function() {
  var events = {
    init: function() {
      this.loadMap();
    },

    loadMap: function() {
      var map = L.map('map').setView([51.505, -0.09], 5);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 30,
        id: 'trecoolz.o7bh8139',
        accessToken: 'pk.eyJ1IjoidHJlY29vbHoiLCJhIjoiY2loN3BtdXVtMDAxdnY1bTNvZGprdzF5NSJ9.XtEzyHcd1_GLu-hizFkEsQ'
      }).addTo(map);
      this.loadModel(map);
    },

    loadModel: function(map) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function() {
        if(xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          events.plotData(json, map);
        }
      });

      xhr.open('GET', '/data');
      xhr.send();
    },

    plotData: function(data, map) {
      for(var i=0; i<data.cities.length; i++) {
        var coords = data.cities[i].coords;
        var parsedCoords = [];
        for(var j=0; j<coords.length; j++) {
            var coord = coords[j];
            parsedCoords.push(parseFloat(coord));
        }
        var circle = L.circle(coords, 20000, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).addTo(map);
        var crimes = data.cities[i].crimes;
        var popUpString = "Crimes: <br /> ";

        for(var j=0; j<crimes.length; j++) {
          var crime = crimes[j];
          popUpString = popUpString + crime.crimeType + ": " + crime.crimeCount + "<br /> ";
        }

        circle.bindPopup(popUpString)
      }
    }
  }
  events.init();

})();
