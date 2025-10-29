import { useState } from "react"
import type { EventType, Schedule } from "../types"

export const useSchedule = () => {
    const [schedules, setSchedules] = useState<EventType[]>([])

    const createSchedule = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:3000/create-schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    month: 9,
                    shift_per_day: 2,
                    open_hour: 8,
                    hour_shift: 7,
                    employee_per_shift: 1,
                    maximum_hour_per_week: 40
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to create schedule")
            }

            const json = await response.json()
            const mappedSchedules: EventType[] = json.schedules.flatMap((list: Schedule) =>
                list.employees.map((emp: string) => ({
                    name: emp,
                    date: new Date(list.date),
                    timeStart: list.time_start,
                    timeEnd: list.time_end
                }))
            )
            setSchedules(mappedSchedules)

        } catch (error: unknown) {
            console.log(error)
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Failed to create schedules");
            }
        }
    }

    return {
        schedules,
        createSchedule
    }
}