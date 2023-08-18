const months = [
  'Січня',
  'Лютого',
  'Березня',
  'Квітня',
  'Травня',
  'Червня',
  'Липня',
  'Серпня',
  'Вересня',
  'Жовтня',
  'Листопада',
  'Грудня',
];

export default function dateBeautify(date) {
  const DATE = new Date(date);
  const day = DATE.getDate().toString().padStart(2, '0');
  const month = months[DATE.getMonth()];
  const year = DATE.getFullYear();
  const hour = DATE.getHours().toString().padStart(2, '0');
  const minute = DATE.getMinutes().toString().padStart(2, '0');

  return `${day} ${month}, ${year} | ${hour}:${minute}`;
}
