import { useState } from "react"
import type { Employee } from "../types"

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [showList, setShowList] = useState(false)

    const fetchEmployees = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:3000/employees',
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to fetch employees")
            }

            const json = await response.json()
            setEmployees(json.employees)
            setShowList(true)

        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert('Failed to fetch employees')
            }
        }
    }

    return {
        employees,
        showList,
        fetchEmployees,
        setShowList
    }
}