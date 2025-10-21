import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import '@zach.codes/react-calendar/dist/calendar-tailwind.css';
import {
  MonthlyCalendar,
  MonthlyNav,
  MonthlyBody,
  MonthlyDay,
  DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';

interface EventType {
  name: string;
  date: Date;
}

export const MyMonthlyNav = () => {
  // form inputs state
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventType[]>([
    { name: 'John', date: new Date() },
    { name: 'Jane', date: new Date() },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;

    const newEvent: EventType = {
      name, 
      date: new Date(date)
    }

    setEvents((prev => [...prev, newEvent]))
  }

  return (
    <div style={{ margin: '0 auto', maxWidth: '800px', padding: '1rem' }}>
      {/* Form Input */}
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit} className='max-w-sm mx auto'>
        <div className='mb-2'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Name of Employee:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='mb-2'>
          <label>Date:</label>
          <input type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
        <button type="submit" > Add Data </button>
      </form>

      {/* Monthly Calendar */}
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={setCurrentMonth}
      >
        <MonthlyNav /> {/* default nav */}
        <MonthlyBody events={events}>
          <MonthlyDay<EventType>
            renderDay={(dayEvents) =>
              dayEvents.map((item, idx) => (
                <DefaultMonthlyEventItem
                  key={idx}
                  title={item.name}
                  date={format(item.date, 'k:mm')}
                />
              ))
            }
          />
        </MonthlyBody>
      </MonthlyCalendar>
    </div>

  );
}