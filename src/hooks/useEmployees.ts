import { useState } from "react"
import type { Employee } from "../types"

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [showList, setShowList] = useState(false)
    const [updatingId, setUpdating] = useState<number | null>(null)

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

    const updateEmployee = async (id: number, name: string) => {
        try {
            setUpdating(id)
            const response = await fetch(
                `http://127.0.0.1:3000/employee/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to edit employee')
            }

            const json = await response.json()
            const updated = json.employee

            setEmployees(prev =>
                prev.map(e => (e.id) === updated.id ? updated : e)
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert('Failed to edit employee')
            }
            throw error
        } finally {
            setUpdating(null)
        }
    }

    return {
        employees,
        showList,
        updatingId,
        fetchEmployees,
        setShowList,
        updateEmployee
    }
}