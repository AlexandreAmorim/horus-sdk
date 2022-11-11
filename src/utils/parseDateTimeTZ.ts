import { addHours, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const formatDateTimeTZ = (date: string): Date | null => {
  if (typeof date === 'string') {
    const parsedDate = addHours(parseISO(date), 3);
    const utcDate = zonedTimeToUtc(parsedDate, 'UTC');
    return utcDate;
  }

  return null;
};

export default formatDateTimeTZ;
