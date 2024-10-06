mapboxgl.accessToken = 'pk.eyJ1Ijoid2FuZ2JydGNkIiwiYSI6ImNtMXc0bW9xbzBpOTUycXIzN2syYzNqZW0ifQ.XsLZDXo-6NAqDYVU6_f1aQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',  // Dark background for better contrast
        center: [-8, 53],  // Center of Ireland
        zoom: 7.2,  // Initial zoom level
        minZoom: 7.2,
        maxZoom: 8, 
    });

    map.on('load', function () {
        // Add GeoJSON source for light pollution data in Ireland
        map.addSource('light-pollution-ireland', {
            'type': 'geojson',
            'data': '/Ireland_Light_Pollution_GeoJSON.geojson'  // Replace with your hosted GeoJSON file URL
        });

        
        map.addLayer({
            'id': 'light-pollution-heat',
            'type': 'heatmap',
            'source': 'light-pollution-ireland',
            'maxzoom': 9,
            'paint': {
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'avg_rad'],  // The property with light pollution intensity
                    0, 0,
                    1.5, 0.3,
                    3, 1
                ],
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(0, 0, 0, 0)',
                    0.2, 'rgba(0, 0, 0, 0.5)',
                    0.4, 'rgba(0, 255, 0, 0.7)',
                    0.6, 'rgba(255, 165, 0, 0.9)',
                    0.8, 'rgba(255, 69, 0, 1)',
                    1, 'rgba(255, 0, 0, 1)'
                ],
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0, 5,  // Small radius when zoomed out
                    9, 60  // Larger radius when zoomed in
                ],
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7, 0.7,
                    9, 0.9
                ]
            }
        });
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());