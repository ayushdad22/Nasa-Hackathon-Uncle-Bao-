mapboxgl.accessToken = 'pk.eyJ1Ijoid2FuZ2JydGNkIiwiYSI6ImNtMXc0bW9xbzBpOTUycXIzN2syYzNqZW0ifQ.XsLZDXo-6NAqDYVU6_f1aQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-8.24389, 53.41291], // Coordinates for Ireland
    zoom: 5
});
    map.on('load', function () {
        map.addSource('lightPollution', {
            'type': 'image',
            'url': '/IrelandLightPollution.png',  // Path to your uploaded image
            'coordinates': [
                [-11.5, 55.5], // Top-left corner (longitude, latitude)
                [-6.5, 55.5],  // Top-right corner
                [-6.5, 51.0],  // Bottom-right corner
                [-10.5, 51.0]  // Bottom-left corner
            ]
        });
    
        map.addLayer({
            'id': 'lightPollutionLayer',
            'type': 'raster',
            'source': 'lightPollution',
            'paint': {
                'raster-opacity': 1.0
            }
        });
    });
    