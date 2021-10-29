import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const Tour = () => {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      classes: 'tours',
      scrollTo: true,
      cancelIcon: {
        enabled: true,
      },
    },
  });

  tour.addStep({
    title: 'Selamat Datang di Status Jalan',
    text: 'Dapatkan informasi ruas jalan dan kegiatan-kegiatan yang ada di bawah naungan DBMPR!',
    buttons: [
      {
        text: 'Lihat Panduan',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'zoom-in',
    title: 'Zoom In',
    text: 'Klik untuk tampilan peta yang lebih dekat.',
    attachTo: {
      element: '.leaflet-control-zoom-in',
      on: 'bottom',
    },
    buttons: [
      {
        text: 'Zoom Out',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'zoom-out',
    title: 'Zoom Out',
    text: 'Klik untuk tampilan peta yang lebih jauh.',
    attachTo: {
      element: '.leaflet-control-zoom-out',
      on: 'bottom',
    },
    buttons: [
      {
        text: 'Current Position',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'current_position',
    title: 'Current Location/Posisi Sekarang',
    text: 'Aktifkan current position untuk mengetahui posisi anda sekarang. Saat kali pertama di aktifkan maka system akan meminta ijin lokasi.',
    attachTo: {
      element: '.leaflet-control-locate',
      on: 'bottom',
    },
    buttons: [
      {
        text: 'Pencarian Ruas',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'search',
    title: 'Pencarian Ruas',
    text: 'Masukan nama ruas jalan yang anda cari para input pencarian, jika terdapat ruas yang anda cari maka akan ada daftar rekomendasi yang bisa anda klik untuk langsung menuju ke ruas jalan terpilih.',
    attachTo: {
      element: '.search-button',
      on: 'bottom',
    },
    buttons: [
      {
        text: 'Mode Peta',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    id: 'basemaps',
    title: 'Base Maps',
    text: 'Anda dapat merubah tampilan mode peta dengan memilih basemaps yang kami sediakan.',
    attachTo: {
      element: '#basemaps-wrapper',
      on: 'top',
    },
    buttons: [
      {
        text: 'Selanjutnya',
        action: tour.next,
      },
    ],
  });

  tour.addStep({
    title: 'Kegiatan',
    text: 'Secara otomatis kegiatan akan muncul ketika ruas jalan terpilih, anda dapat klik icon kegiatan untuk melihat detail kegiatannya.',
    buttons: [
      {
        text: 'Selesai',
        action: tour.next,
      },
    ],
  });

  tour.start();
};

export default Tour;
