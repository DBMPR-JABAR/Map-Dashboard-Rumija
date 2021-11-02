import moment from 'moment';

const panelFilterBodyTemplate = (properties) => {
  const date = moment(moment.now());
  const now = date.format('YYYY-MM-DD');
  const lastMonth = moment(date)
    .subtract(1, 'months')
    .endOf('month')
    .format('YYYY-MM-DD');
  return `<div style="display:none">
    <label class="form-label">Jangka Waktu Kegiatan</label>
      <div class="input-group mb-3">
      <span class="input-group-text">Tanggal awal</span>
  <input id="start_date" type="date" value="${lastMonth}" class="form-control">
</div>
<div class="input-group mb-3">
      <span class="input-group-text">Tanggal akhir</span>
<input id="end_date" type="date" value="${now}" class="form-control">
</div>
<button type="button" class="btn btn-secondary" id="filter_sumbit_button">Tampilkan</button>
</div>
<p class="mt-3 mb-0 mt-0 pt-0"><b>Kegiatan :</b></p>
<table class="table">
<tr>
<td><img src="images/markers/rumija.png" height="20"></td>
<td>Pemanfaatan Rumija</td>
<td>:</td>
<td id="total_rumija">memuat data..</td>
</tr>

<tr>
<td><i class="fas fa-circle"></i></td>
<td colspan="1">Inventaris</td>
<td colspan="2">
<button class="btn btn-secondary btn-sm" id="inventarisRumijaButton" onclick="onClickInventarisRumija()" data-properties="${properties.id_ruas_jalan}" type="button" data-bs-toggle="offcanvas"
data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Tampilan Daftar</button>
</td>
</tr>
<tr>
<td colspan="4">
<div class="row gy-3">
<select class="col-12 form-control form-select" id="inventaris_rumija_select" multiple>
  <option value="1">JEMBATAN</option>
  <option value="2">GORONG-GORONG</option>
  <option value="3">TPT</option>
  <option value="4">POHON</option>
  <option value="5">PATOK PENGARAH/HM/KM</option>
  <option value="6">SALURAN</option>
  <option value="7">BAHU JALAN</option>
  </select>
  <button type="button" class="col-12 btn btn-success" id="inventaris_sumbit_button">Tampilkan</button>
</div>
</td>
</tr>
</table>
<div id="debug_test"></div>
`;
};

export default panelFilterBodyTemplate;
