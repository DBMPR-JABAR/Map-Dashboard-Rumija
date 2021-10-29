const ruasJalanNasionalTemplate = (properties) => {
  let html = `<div style="max-height:80vh;overflow:auto;">
    <p class="mb-0"><b>${properties.nama_ruas_jalan}</b></p>
    <table class="table">
    <tr>
    <td>Status Jalan</td>
    <td>:</td>
    <td>Jalan Nasional</td>
    </tr>
    </table>
      `;
  html += '</div>';
  return html;
};

export default ruasJalanNasionalTemplate;
