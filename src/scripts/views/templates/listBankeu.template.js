const listBankeuTemplate = (data) => {
  if (data.length === 0) return '<p class="text-center">Tidak ada kegiatan</p>';
  let html = '<div class="accordion" id="accordionBankeu">';
  data.forEach((bankeu, key) => {
    html += `<div class="accordion-item mt-3">
    <h2 class="accordion-header" id="bankeu_${bankeu.id}">
      <button class="accordion-button btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_bankeu_${bankeu.id}" aria-expanded="${key === 0 ? 'true' : 'false'}" aria-controls="bankeu_${bankeu.id}">
    ${bankeu.nama_kegiatan}
      </button>
    </h2>
    <div id="collapse_bankeu_${bankeu.id}" class="accordion-collapse collapse ${key === 0 ? 'show' : ''}" aria-labelledby="heading_bankeu_${bankeu.id}" data-bs-parent="#accordionBankeu">
      <div class="accordion-body">
    <table class="table table-sm">
    <tr>
    <td>Jenis</td>
    <td>:</td>
    <td>Bantuan Keuangan</td>
    </tr>
    <tr>
    <td>Kategori</td>
    <td>:</td>
    <td>${bankeu.kategori}</td>
    </tr>
    <tr>
    <td>Pemda</td>
    <td>:</td>
    <td>${bankeu.pemda}</td>
    </tr>
    <tr>
    <td>OPD</td>
    <td>:</td>
    <td>${bankeu.opd} M</td>
    </tr>
    <tr>
    <td>No. Kontrak</td>
    <td>:</td>
    <td>${bankeu.no_kontrak}</td>
    </tr>
    <tr>
    <td>Progres</td>
    <td>:</td>
    <td>${bankeu.progress} %</td>
    </tr>
    </table>`;
    if (bankeu.foto) {
      html += `<img class="mx-auto rounded img-thumbnail d-block" src="http://124.81.122.131/temanjabar/public/storage/${bankeu.foto}" alt="Ruas Jalan" width="100%" style="max-height:300px"/>`;
    }
    if (bankeu.foto_1) {
      html += `<img class="mx-auto rounded img-thumbnail d-block mt-3" src="http://124.81.122.131/temanjabar/public/storage/${bankeu.foto_1}" alt="Ruas Jalan" width="100%" style="max-height:300px"/>`;
    }
    if (bankeu.foto_2) {
      html += `<img class="mx-auto rounded img-thumbnail d-block mt-3" src="http://124.81.122.131/temanjabar/public/storage/${bankeu.foto_2}" alt="Ruas Jalan" width="100%" style="max-height:300px"/>`;
    }
    if (bankeu.video) {
      html += `<video class="mx-auto rounded mt-3"
                                    src="http://124.81.122.131/temanjabar/public/storage/${bankeu.video}" alt="Ruas Jalan" controls width="100%" style="max-height:300px">`;
    }
  });
  html += `
      </div>
    </div>
  </div></div>`;
  return html;
};

export default listBankeuTemplate;
