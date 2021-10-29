const rumijaPopupTemplate = (properties) => {
  let html = `<div style="max-height:80vh;overflow:auto;">
<p class="mb-0"><b>${properties.jenis_penggunaan}</b></p>
    <table class="table">
    <tr>
    <td>Nama</td>
    <td>:</td>
    <td>${properties.nama}</td>
    </tr>
    <tr>
    <td>Alamat</td>
    <td>:</td>
    <td>${properties.alamat}</td>
    </tr>
    <tr>
    <td>Kabupaten Kota</td>
    <td>:</td>
    <td>${properties.kab_kota}</td>
    </tr>
    <tr>
    <td>UPTD</td>
    <td>:</td>
    <td>${properties.uptd}</td>
    </tr>
    <tr>
    <td>Luas</td>
    <td>:</td>
    <td>${properties.luas} M<sup>3</sup></td>
    </tr>
    <tr>
    <td>Uraian</td>
    <td>:</td>
    <td>${properties.uraian}</sup></td>
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

export default rumijaPopupTemplate;
