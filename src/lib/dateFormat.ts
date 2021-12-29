const ltDateFormat = new Intl.DateTimeFormat('lt', {
  dateStyle: 'short',
});

const ltDateTimeFormat = new Intl.DateTimeFormat('lt', {
  dateStyle: 'short',
  timeStyle: 'short',
});

export const toLocalDate = (date?: Date | string | null) => {
  if (!date) {
    return null;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ltDateFormat.format(date);
};

export const toLocalDateTime = (date?: Date | string | null) => {
  if (!date) {
    return null;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ltDateTimeFormat.format(date);
};
