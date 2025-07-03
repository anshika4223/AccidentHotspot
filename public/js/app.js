let pickupCoords = null;
let dropCoords = null;

const pickupGeocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: 'Enter pickup location',
  marker: false
});

pickupGeocoder.addTo('#pickup-geocoder');
pickupGeocoder.on('result', e => {
  pickupCoords = e.result.geometry.coordinates;
});

const dropGeocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: 'Enter drop location',
  marker: false
});

dropGeocoder.addTo('#drop-geocoder');
dropGeocoder.on('result', e => {
  dropCoords = e.result.geometry.coordinates;
});


function plotRoute() {
    if (!pickupCoords || !dropCoords) {
      alert("Please select both pickup and drop locations.");
      return;
    }
  
    new mapboxgl.Marker({ color: 'green' }).setLngLat(pickupCoords).addTo(map);
    new mapboxgl.Marker({ color: 'blue' }).setLngLat(dropCoords).addTo(map);
  
    map.flyTo({ center: pickupCoords, zoom: 13 });
  
    // Remove old route layer if exists
    if (map.getLayer('route')) map.removeLayer('route');
    if (map.getSource('route')) map.removeSource('route');
  
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [pickupCoords, dropCoords]
        }
      }
    });
  
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': '#ff7e5f', 'line-width': 5 }
    });
  }
  