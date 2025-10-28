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
            const json = await response.json()
            setEmployees(json.employees)
            setShowList(true)
        } catch (error) {
            console.error(error)
            alert('Failed to fetch employees')
        }
    }

    return {
        employees,
        showList,
        fetchEmployees,
        setShowList
    }
}