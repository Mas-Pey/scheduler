import { 
    DefaultMonthlyEventItem, 
    MonthlyBody, 
    MonthlyCalendar, 
    MonthlyDay, 
    MonthlyNav 
} from "@zach.codes/react-calendar"
import type { EventType } from "../types"

interface ScheduleCalendarProps {
    currentMonth: Date
    setCurrentMonth: (date: Date) => void
    schedules: EventType[]
    onGenerate: () => void 
}

export const ScheduleCalendar = ({
    currentMonth,
    setCurrentMonth,
    schedules,
    onGenerate
}: ScheduleCalendarProps) => {
    return (
        <MonthlyCalendar
            currentMonth={currentMonth}
            onCurrentMonthChange={setCurrentMonth}
        >
            <MonthlyNav /> {/* default nav */}
            <div className='flex my-2 justify-center'>
                <button onClick={onGenerate} className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700'>
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
    )
}