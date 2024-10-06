mapboxgl.accessToken =
  "pk.eyJ1Ijoid2FuZ2JydGNkIiwiYSI6ImNtMXc0bW9xbzBpOTUycXIzN2syYzNqZW0ifQ.XsLZDXo-6NAqDYVU6_f1aQ";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-v9",
  center: [-50.6921, 53.1424],
  zoom: 1,
  projection: "globe",
});

map.addControl(new mapboxgl.NavigationControl());

map.on("style.load", () => {
  map.setFog({
    color: "rgb(186, 210, 235)", // Lower atmosphere
    "high-color": "rgb(36, 92, 223)", // Upper atmosphere
    "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
    "space-color": "rgb(11, 11, 25)", // Background color
    "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
  });
});
map.on("load", function () {
  map.flyTo({
    center: [-7.6921, 53.1424],
    zoom: 5,
    speed: 0.5,
    curve: 3,
    essential: true,
  });

  const dublinMarker = new mapboxgl.Marker()
    .setLngLat([-6.2603, 53.3498])
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("Dublin"))
    .addTo(map);

  const mayoMarker = new mapboxgl.Marker({ color: "green" })
    .setLngLat([-9.4795, 53.7597])
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("County Mayo"))
    .addTo(map);
});
