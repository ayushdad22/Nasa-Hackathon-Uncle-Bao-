    // Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXl1c2hkYWQiLCJhIjoiY20xdGI4YTdhMDBvODJqcGJqaDV3bzQ1MCJ9.djla3giXDBGAh6Ked3QBeg';

    // Initialize Mapbox map
    const map = new mapboxgl.Map({  
      container: 'map',  
      zoom: 11.53,  
      center: [-9.310, 53.957], 
      pitch: 116,  
      bearing: -177.2,  
      style: 'mapbox://styles/mapbox/satellite-v9',  
      antialias: true,
      interactive: false 
    });

    map.on('style.load', () => {
      map.setFog({});
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });

      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    });

    const movementSpeed = 500;
    const camera = map.getFreeCameraOptions();
    function updateCameraPosition(position, altitude, target) {
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);
      camera.lookAtPoint(target);
      map.setFreeCameraOptions(camera);
    }

    document.addEventListener('keydown', function(event) {
      const speed = 0.00001; 

      switch (event.key) {
        case "w":
          camera.position.y += speed;
          break;
        case "a":
          camera.position.x += speed;
          break;
        case "s":
          camera.position.y -= speed;
          break;
        case "d":
          camera.position.x -= speed;
          break;
      }

      map.setFreeCameraOptions(camera);
    });