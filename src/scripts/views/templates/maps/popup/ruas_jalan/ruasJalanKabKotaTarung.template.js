const ruasJalanKabKotaTarungTemplate = (properties) => {
  let html = `<div style="max-height:80vh;overflow:auto;">
    <p class="mb-0"><b>${properties.nama_ruas_jalan}</b></p>
    <table class="table">
    <td>Status Jalan</td>
    <td>:</td>
    <td>Jalan Kabupaten</td>
    </tr>
    <td>Kegiatan</td>
    <td>:</td>
    <td>Tampilkan <i id="popup_${properties.id}" data-bs-toggle="tooltip" data-bs-placement="right" title="Tampilkan filter kegiatan" class="fa fa-window-maximize"></i></td>
    </tr>
    </table>
      `;
  html += '</div>';
  return html;
};

export default ruasJalanKabKotaTarungTemplate;
