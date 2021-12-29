const ltDateFormat = new Intl.DateTimeFormat('lt', {
  dateStyle: 'short',
});

const ltDateTimeFormat = new Intl.DateTimeFormat('lt', {
  dateStyle: 'short',
  timeStyle: 'short',
});

type LocalDate = {
  (date: null | undefined): null;
  (date: Date | string): Date;
  (date: Date | string | null | undefined): Date | null;
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
