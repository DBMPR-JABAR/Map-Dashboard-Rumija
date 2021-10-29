const pemeliharaanPopupTemplate = (properties) => `<p class="mb-0"><b>${properties.paket}</b></p>
    <table class="table">
    <tr>
    <td>Ruas Jalan</td>
    <td>:</td>
    <td>${properties.ruas_jalan}</td>
    </tr>
    <tr>
    <td>Panjang</td>
    <td>:</td>
    <td>${properties.panjang} M</td>
    </tr>
    <tr>
    <td>Lokasi</td>
    <td>:</td>
    <td>${properties.lokasi}</td>
    </tr>
    <tr>
    <td>Jumlah Pekerja</td>
    <td>:</td>
    <td>${properties.jumlah_pekerja} Orang</td>
    </tr>
    <tr>
    <td>SPPJJ</td>
    <td>:</td>
    <td>${properties.sup}</td>
    </tr>
    <tr>
    <td>Tanggal</td>
    <td>:</td>
    <td>${new Date(properties.tanggal).toLocaleDateString() || '-'}</td>
    </tr>
    <tr>
    <tr>
    <td colspan="3">
    <img class="mx-auto" src="http://124.81.122.131/temanjabar/public/storage/pekerjaan/${properties.foto_awal}" alt="Pekerjaan" width="100%" style="max-height:300px"/>
    </td>
    </tr>
    </table>
      `;

export default pemeliharaanPopupTemplate;
