import { addDays, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const formatDateTZ = (date: string): Date | null => {
  if (typeof date === 'string') {
    const parsedDate = addDays(parseISO(date), 1);
    const utcDate = zonedTimeToUtc(parsedDate, 'UTC');
    return utcDate;
  }

  return null;
};

export default formatDateTZ;
