(function() {
  var map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'trecoolz.o7bh8139',
    accessToken: 'pk.eyJ1IjoidHJlY29vbHoiLCJhIjoiY2loN3BtdXVtMDAxdnY1bTNvZGprdzF5NSJ9.XtEzyHcd1_GLu-hizFkEsQ'
}).addTo(map);
})();
