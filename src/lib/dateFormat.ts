const ltDateFormat = new Intl.DateTimeFormat('lt', {
  dateStyle: 'short',
  timeZone: 'Europe/Vilnius',
});

const ltDateTimeFormat = new Intl.DateTimeFormat('lt', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Europe/Vilnius',
});

type LocalDate = {
  (date: null | undefined): null;
  (date: Date | string): string;
  (date: Date | string | null | undefined): string | null;
};

export const toLocalDate: LocalDate = (date?: Date | string | null) => {
  if (!date) {
    return null as any;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ltDateFormat.format(date);
};

export const toLocalDateTime: LocalDate = (date?: Date | string | null) => {
  if (!date) {
    return null as any;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ltDateTimeFormat.format(date);
};

export const formatTime = (text: string) => {
  const numbers = text.match(/\d+/g)?.join('');
  if (!numbers) {
    return '';
  }

  let time = numbers;

  if (time.length === 1) {
    time = time.padStart(2, '0');
  }

  if (time.length < 4) {
    time = time.padEnd(4, '0');
  }

  if (time.length === 4) {
    time = time.slice(0, 2) + ':' + time.slice(2);
  }

  if (time.length !== 5 || time[2] !== ':') {
    return '';
  }

  return time;
};
