import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';

export default function DateAndTimePicker({ selectedDate, setSelectedDate }) {
  return (
    <DateTimePicker
      format="yyyy-MM-dd HH:mm"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e)}
    />
  );
}
