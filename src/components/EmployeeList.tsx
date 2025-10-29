import { useState } from "react"
import type { Employee } from "../types"

interface EmployeeListProps {
    employees: Employee[]
    show: boolean
    onHide: () => void
    updatingId: number | null
    onUpdate: (id: number, name: string) => Promise<void>
}

export const EmployeeList = ({
    employees,
    show,
    onHide,
    updatingId,
    onUpdate
}: EmployeeListProps) => {
    const [editingId, setEditingId] = useState<number | null>(null)
    const [nameInput, setNameInput] = useState("")

    if (!show) return null

    return (
        <div className="mt-4">
            <h2 className="font-bold mb-2">Employee List:</h2>
            <ul className="space-y-3">
                {employees.map(emp => (
                    <li key={emp.id} className="flex items-center space-x-3 max-w-3xs">
                        {editingId === emp.id ? (
                            <>
                                <input
                                    onChange={(e) => setNameInput(e.target.value)}
                                    value={nameInput}
                                    className="border rounded p-1">
                                </input>
                                <button
                                    onClick={async () => {
                                        const trimmed = nameInput.trim()
                                        if (!trimmed) {
                                            alert('Name cannot be empty')
                                            return
                                        }
                                        try {
                                            await onUpdate(emp.id, trimmed)
                                            setEditingId(null)
                                        } catch (error) {
                                            console.error(error)
                                            alert("Failed to edit employee")
                                        }
                                    }}
                                    disabled={updatingId === emp.id}
                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                >
                                    {updatingId === emp.id ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="flex-1 truncate">
                                    {emp.name}
                                </span>
                                <button
                                    onClick={() => {
                                        setEditingId(emp.id);
                                        setNameInput(emp.name);
                                    }}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </li>
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