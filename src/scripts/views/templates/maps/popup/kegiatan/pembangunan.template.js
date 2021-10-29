const pembangunanPopupTemplate = (properties) => `<p class="mb-0"><b>${properties.nama_paket}</b></p>
    <table class="table">
    <tr>
    <td>Lokasi</td>
    <td>:</td>
    <td>${properties.lokasi_pekerjaan}</td>
    </tr>
    <tr>
    <td>Target Panjang</td>
    <td>:</td>
    <td>${properties.target_panjang} M</td>
    </tr>
    <tr>
    <td>KM</td>
    <td>:</td>
    <td>${properties.km_bdg1}</td>
    </tr>
    <tr>
    <td>UPTD</td>
    <td>:</td>
    <td>${properties.nama_kantor}</td>
    </tr>
    <tr>
    <td>SUP</td>
    <td>:</td>
    <td>${properties.nama_sup}</td>
    </tr>
    </table>
      `;

export default pembangunanPopupTemplate;
