const API_URL = 'http://localhost:4000';

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit', minute: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

const formatSeats = (event) => {
  if (event.registeredCount >= event.capacity) {
    return 'Hết chỗ';
  }
  const soConLai = event.capacity - event.registeredCount;
  return 'Còn ' + soConLai + '/' + event.capacity + ' chỗ';
};

const renderEvents = (events) => {
  const dsThe = [];

  for (let i = 0; i < events.length; i++) {
    const sp = events[i];

    const theCard = document.createElement('article');
    theCard.setAttribute('class', 'card');

    const theAnh = document.createElement('img');
    theAnh.setAttribute('src', 'img/event.svg');
    theAnh.setAttribute('alt', sp.name);

    const theTieuDe = document.createElement('h2');
    const theLienKet = document.createElement('a');
    theLienKet.setAttribute('href', 'event-detail.html?id=' + sp.id);
    theLienKet.textContent = sp.name;
    theTieuDe.appendChild(theLienKet);

    const theGio = document.createElement('p');
    const theThoiGian = document.createElement('time');
    theThoiGian.setAttribute('datetime', sp.startTime);
    theThoiGian.textContent = formatDateTime(sp.startTime);
    theGio.appendChild(theThoiGian);

    const theDiaDiem = document.createElement('p');
    theDiaDiem.textContent = sp.location;

    const theSoCho = document.createElement('p');
    theSoCho.setAttribute('class', 'so-cho');

    if (sp.registeredCount >= sp.capacity) {
      const theNhan = document.createElement('span');
      theNhan.setAttribute('class', 'het-cho');
      theNhan.textContent = formatSeats(sp);
      theSoCho.appendChild(theNhan);
    } else {
      theSoCho.textContent = formatSeats(sp);
    }

    theCard.appendChild(theAnh);
    theCard.appendChild(theTieuDe);
    theCard.appendChild(theGio);
    theCard.appendChild(theDiaDiem);
    theCard.appendChild(theSoCho);

    dsThe.push(theCard);
  }

  const khungDanhSach = document.querySelector('#event-list');
  khungDanhSach.replaceChildren(...dsThe);
};

const loadEvents = async (keyword = '') => {
  const theTrangThai = document.querySelector('#status');
  const khungDanhSach = document.querySelector('#event-list');

  theTrangThai.textContent = 'Đang tải…';

  const thamSo = new URLSearchParams();
  thamSo.set('pageSize', '50');

  if (keyword !== '') {
    thamSo.set('q', keyword);
  }

  try {
    const phanHoi = await fetch(API_URL + '/api/events?' + thamSo.toString());

    if (phanHoi.ok === false) {
      khungDanhSach.replaceChildren();
      theTrangThai.textContent = 'Không tải được dữ liệu, vui lòng thử lại.';
      return;
    }

    const duLieu = await phanHoi.json();
    const ds = duLieu.items;

    renderEvents(ds);

    if (ds.length === 0) {
      theTrangThai.textContent = 'Không có sự kiện nào khớp từ khoá.';
    } else {
      theTrangThai.textContent = 'Tìm thấy ' + ds.length + ' sự kiện';
    }
  } catch (loi) {
    khungDanhSach.replaceChildren();
    theTrangThai.textContent = 'Không tải được dữ liệu, vui lòng thử lại.';
  }
};

const formTimKiem = document.querySelector('#search-form');
const oNhap = document.querySelector('#keyword');

formTimKiem.addEventListener('submit', (e) => {
  e.preventDefault();
  const tuKhoa = oNhap.value.trim();
  loadEvents(tuKhoa);
});

document.addEventListener('DOMContentLoaded', () => {
  loadEvents();
});
