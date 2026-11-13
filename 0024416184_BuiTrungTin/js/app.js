const API_URL = 'http://localhost:4000';

// Hàm có sẵn: đổi giờ UTC sang giờ Việt Nam, vd "08:00 12/09/2026"
const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit', minute: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

const eventList = document.querySelector('#event-list');
const statusEl = document.querySelector('#status');
const searchForm = document.querySelector('#search-form');
const keywordInput = document.querySelector('#keyword');

// Câu 2a
const formatSeats = (event) =>
  event.registeredCount >= event.capacity
    ? 'Hết chỗ'
    : `Còn ${event.capacity - event.registeredCount}/${event.capacity} chỗ`;

// Câu 2b
const renderEvents = (events) => {
  const cards = events.map((event) => {
    const card = document.createElement('article');
    card.className = 'card';

    const img = document.createElement('img');
    img.setAttribute('src', 'img/event.svg');
    img.setAttribute('alt', `Ảnh minh hoạ ${event.name}`);

    const title = document.createElement('h2');
    const link = document.createElement('a');
    link.setAttribute('href', `event-detail.html?id=${encodeURIComponent(event.id)}`);
    link.textContent = event.name;
    title.append(link);

    const timeP = document.createElement('p');
    const time = document.createElement('time');
    time.setAttribute('datetime', event.startTime);
    time.textContent = formatDateTime(event.startTime);
    timeP.append(time);

    const locationP = document.createElement('p');
    locationP.textContent = event.location;

    const seatsP = document.createElement('p');
    seatsP.className = 'seats';
    if (event.registeredCount >= event.capacity) {
      const badge = document.createElement('span');
      badge.className = 'badge-full';
      badge.textContent = formatSeats(event);
      seatsP.append(badge);
    } else {
      seatsP.textContent = formatSeats(event);
    }

    card.append(img, title, timeP, locationP, seatsP);
    return card;
  });

  eventList.replaceChildren(...cards);
};

// Câu 2c
const loadEvents = async (keyword = '') => {
  const params = new URLSearchParams({ pageSize: '50' });
  if (keyword !== '') {
    params.set('q', keyword);
  }

  statusEl.textContent = 'Đang tải…';

  try {
    const response = await fetch(`${API_URL}/api/events?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();

    renderEvents(data.items);
    statusEl.textContent =
      data.items.length === 0
        ? 'Không có sự kiện nào khớp từ khoá.'
        : `Tìm thấy ${data.items.length} sự kiện`;
  } catch (error) {
    console.error(error);
    eventList.replaceChildren();
    statusEl.textContent = 'Không tải được dữ liệu, vui lòng thử lại.';
  }
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loadEvents(keywordInput.value.trim());
});

loadEvents();