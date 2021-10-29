import L from 'leaflet';

const legendRuasJalan = L.control({ position: 'bottomright' });

legendRuasJalan.onAdd = () => {
  const div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<h4>Ruas Jalan</h4>';
  div.innerHTML += '<i style="background: #22cfcd"></i><span>Jalan Propinsi</span><br>';
  div.innerHTML += '<i style="background: blue"></i><span>Jalan Kabupaten</span><br>';
  div.innerHTML += '<i style="background: #fc1513"></i><span>Jalan Nasional</span><br>';
  div.innerHTML += '<i style="background: #f79b16"></i><span>Jalan Tol</span><br>';
  // div.innerHTML += '<i style="background: purple"></i><span>Jalan Tol Konstruksi</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>Lainnya (Custom)</span><br>';

  return div;
};

export default legendRuasJalan;
