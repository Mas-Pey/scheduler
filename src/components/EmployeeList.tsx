import type { Employee } from "../types"

interface EmployeeListProps {
    employees: Employee[]
    show: boolean
    onHide: () => void
}

export const EmployeeList = ({ employees, show, onHide }: EmployeeListProps) => {
    if (!show) return null
    return (
        <div className="mt-4">
            <h2 className="font-bold mb-2">Employee List:</h2>
            <ul className="list-disc pl-5">
                {employees.map(emp => (
                    <li key={emp.id}>{emp.name}</li>
                ))}
            </ul>
            <button
                onClick={onHide}
                className='mt-2 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
            >
                Hide Employees
            </button>
        </div>
    )
}