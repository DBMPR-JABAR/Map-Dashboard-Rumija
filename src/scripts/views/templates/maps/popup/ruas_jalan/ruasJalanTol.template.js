const ruasJalanTolTemplate = ({ properties, type }) => {
  let html = `<div style="max-height:80vh;overflow:auto;">
    <p class="mb-0"><b>${properties.nama_ruas_jalan}</b></p>
    <table class="table">
    <tr>
    <td>Status Jalan</td>
    <td>:</td>
    <td>${type}</td>
    </tr>
    <tr>
    <td>Kabupaten</td>
    <td>:</td>
    <td>${properties.kabupaten}</td>
    </tr>
    <tr>
    <td>Propinsi</td>
    <td>:</td>
    <td>${properties.propinsi}</td>
    </tr>
    <tr>
    <td>Pengelola</td>
    <td>:</td>
    <td>${properties.pengelola}</td>
    </tr>
    </table>
      `;
  html += '</div>';
  return html;
};

export default ruasJalanTolTemplate;
