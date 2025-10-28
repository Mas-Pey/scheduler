import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import '@zach.codes/react-calendar/dist/calendar-tailwind-no-reset.css';
import {
  MonthlyCalendar,
  MonthlyNav,
  MonthlyBody,
  MonthlyDay,
  DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';

interface Employee {
  id: number;
  name: string;
}

interface Schedule {
  date: string;
  employees: string[];
  time_start: string;
  time_end: string;
}

interface EventType {
  name: string;
  date: Date;
  timeStart: string;
  timeEnd: string;
}

export const MyMonthlyNav = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [schedules, setSchedules] = useState<EventType[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [showList, setShowList] = useState(false)

  // GET employee data
  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:3000/employees',
      )
      const json = await response.json()
      setEmployees(json.employees)
      setShowList(true)
    } catch (error) {
      console.error(error)
      alert('Failed to fetch employees')
    }
  }

  // POST create schedule for employees
  const createSchedule = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:3000/create-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          month: 11,
          shift_per_day: 1,
          open_hour: 8,
          hour_shift: 8,
          employee_per_shift: 2,
          maximum_hour_per_week: 40
        })
      })
      const json = await response.json()
      const mappedSchedules: EventType[] = json.schedules.flatMap((list: Schedule) =>
        list.employees.map((emp: string) => ({
          name: emp,
          date: new Date(list.date),
          timeStart: list.time_start,
          timeEnd: list.time_end
        }))
      )
      console.log(mappedSchedules)
      setSchedules(mappedSchedules)
    } catch (error) {
      console.error(error)
      alert('Failed to create schedules')
    }
  }

  return (
    <div className='mx-auto max-w-5xl py-4'>
      {/* Get Data */}
      <div>
        <button onClick={fetchEmployees} className='p-2 bg-amber-600 text-white text-md rounded-md hover:bg-amber-700'>
          Load Employees
        </button>
        {showList && (
          <div className="mt-4">
            <h2 className="font-bold mb-2">Employee List:</h2>
            <ul className="list-disc pl-5">
              {employees.map(emp => (
                <li key={emp.id}>{emp.name}</li>
              ))}
            </ul>

            {/* Tombol untuk menutup list */}
            <button
              onClick={() => setShowList(false)}
              className='mt-2 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
            >
              Hide Employees
            </button>
          </div>
        )}
      </div>

      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={setCurrentMonth}
      >
        <MonthlyNav /> {/* default nav */}
        <div className='flex my-2 justify-center'>
          <button onClick={createSchedule} className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700'>
            Generate Schedule
          </button>
        </div>
        <MonthlyBody events={schedules}>
          <MonthlyDay<EventType>
            renderDay={(dayEvents) =>
              dayEvents.map((item, idx) => (
                <DefaultMonthlyEventItem
                  key={idx}
                  title={item.name}
                  date={`${item.timeStart} - ${item.timeEnd}`}
                />
              ))
            }
          />
        </MonthlyBody>
      </MonthlyCalendar>
    </div>

  );
}