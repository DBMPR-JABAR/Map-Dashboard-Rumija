import moment from 'moment';

const panelFilterRuasBodyTemplate = () => {
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
</div
<p class="mt-3 mb-0"><b>Kegiatan :</b></p>
<div id="results_filter_ruas"></div>`;
};

export default panelFilterRuasBodyTemplate;
