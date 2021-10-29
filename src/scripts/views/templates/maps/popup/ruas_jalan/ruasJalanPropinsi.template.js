const ruasJalanPropinsiTemplate = (properties) => {
    let html = `<div style="max-height:80vh;overflow:auto;">
    <p class="mb-0"><b>${properties.nama_ruas_jalan}</b></p>
    <table class="table">
    <tr>
    <td>Kode Ruas</td>
    <td>:</td>
    <td>${properties.id_ruas_jalan}</td>
    </tr>
    <tr>
    <td>Panjang</td>
    <td>:</td>
    <td>${properties.panjang} M</td>
    </tr>
    <tr>
    <td>Kabupaten Kota</td>
    <td>:</td>
    <td>${properties.kab_kota}</td>
    </tr>
    <tr>
    <td>UPTD</td>
    <td>:</td>
    <td>${properties.wil_uptd}</td>
    </tr>
    <tr>
    <td>SPPJJ</td>
    <td>:</td>
    <td>${properties.nm_sppjj}</td>
    </tr>
    <tr>
    <td>Kabupaten Kota</td>
    <td>:</td>
    <td>${properties.kab_kota}</td>
    </tr>
    <td>Status Jalan</td>
    <td>:</td>
    <td>Propinsi Jawa Barat</td>
    </tr>
    <td>Kegiatan</td>
    <td>:</td>
    <td>Tampilkan <i id="popup_${properties.id_ruas_jalan}" data-bs-toggle="tooltip" data-bs-placement="right" title="Tampilkan filter kegiatan" class="fa fa-window-maximize"></i></td>
    </tr>
    </table>
      `;
    if (properties.foto) {
      html += `<img class="mx-auto rounded img-thumbnail d-block" src="http://124.81.122.131/temanjabar/public/storage/${properties.foto}" alt="Ruas Jalan" width="100%" style="max-height:300px"/>`;
    }
    if (properties.foto_1) {
      html += `<img class="mx-auto rounded img-thumbnail d-block mt-3" src="http://124.81.122.131/temanjabar/public/storage/${properties.foto_1}" alt="Ruas Jalan" width="100%" style="max-height:300px"/>`;
    }
    if (properties.foto_2) {
      html += `<img class="mx-auto rounded img-thumbnail d-block mt-3" src="http://124.81.122.131/temanjabar/public/storage/${properties.foto_2}" alt="Ruas Jalan" width="100%" style="max-height:300px"/>`;
    }
    if (properties.video) {
      html += `<video class="mx-auto rounded mt-3"
                                    src="http://124.81.122.131/temanjabar/public/storage/${properties.video}" alt="Ruas Jalan" controls width="100%" style="max-height:300px">`;
    }
    html += '</div>';
    return html;
  };

  export default ruasJalanPropinsiTemplate