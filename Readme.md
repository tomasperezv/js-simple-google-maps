js-simple-google-maps
=============
Interface for the Google Maps API V3.

Author
----------
Tomas Perez - tom@0x101.com

http://www.tomasperez.com

Examples
----------

```javascript
// Create a new map and render in the HTML element specified by param
var map = new SimpleGoogleMaps.Map({
  div: document.getElementById('map'),
  zoom: 5
});

// Center the map in a specific address
map.center('Madrid');

// Place a label with the text 'My home' in the position of the address
// returned by 'Stockholm'
map.searchByAddress('Stockholm', function(position) {
  map.addLabel(position, 'My home');
});

// Place a label, using lat and lng
var position = map.getPosition(lat, lng),
  label = map.addLabel(position, 'Custom label');

// Add a marker
var position = map.getPosition(lat, lng),
  label = map.addMarker(position);
```

License
-----------
Public Domain.

No warranty expressed or implied. Use at your own risk.
