import {
    $query,
    $update,
    Record,
    StableBTreeMap,
    Vec,
    match,
    Result,
    nat64,
    ic,
    Opt,
} from 'azle';
import { v4 as uuidv4 } from 'uuid';

type Employee = Record<{
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    department: string;
    salary: number;
    isEmployed: boolean;
    updatedAt: Opt<nat64>;
}>;
const employeeStorage = new StableBTreeMap<string, Employee>(0, 44, 1024);

// $query
export function searchEmployees(query: string): Result<Vec<Employee>, string> {
    try {
        const lowerCaseQuery = query.toLowerCase();
        const filteredEmployees = employeeStorage.values().filter(
            (employee) =>
                employee.firstName.toLowerCase().includes(lowerCaseQuery) ||
                employee.lastName.toLowerCase().includes(lowerCaseQuery) ||
                employee.position.toLowerCase().includes(lowerCaseQuery) ||
                employee.department.toLowerCase().includes(lowerCaseQuery)
        );
        return Result.Ok(filteredEmployees);
    } catch (error) {
        return Result.Err(`Error searching for an employee: ${error}`);
    }
}

// $update
export function hireEmployee(employee: Employee): Result<Employee, string> {
    try {
        // Generate a unique ID for the employee
        employee.id = uuidv4();
        // Initialize isEmployed to true when hiring a new employee
        employee.isEmployed = true;

        // Validate the employee object
        if (!employee.firstName.trim() || !employee.lastName.trim() || !employee.position.trim() || !employee.department.trim() || !employee.salary) {
            return Result.Err('Missing required fields in the employee object');
        }

        // Update the updatedAt field with the current timestamp
        employee.updatedAt = Opt.Some(ic.time());

        // Add the employee to employeeStorage
        employeeStorage.insert(employee.id, employee);

        return Result.Ok(employee);
    } catch (error) {
        return Result.Err(`Error hiring employee: ${error}`);
    }
}

// $update
export function fireEmployee(id: string): Result<Employee, string> {
    return match(employeeStorage.get(id), {
        Some: (employee) => {
            if (!employee.isEmployed) {
                return Result.Err<Employee, string>(`Employee with id=${id} is already terminated`);
            }

            const terminatedEmployee: Employee = { ...employee, isEmployed: false };
            employeeStorage.insert(id, terminatedEmployee);

            return Result.Ok(terminatedEmployee);
        },
        None: () => Result.Err<Employee, string>(`Employee with id=${id} not found`),
    }) as Result<Employee, string>;
}

// $update
export function updateEmployee(id: string, employee: Employee): Result<Employee, string> {
    return match(employeeStorage.get(id), {
        Some: (existingEmployee) => {
            // Validate the updated employee object
            if (!employee.firstName.trim() || !employee.lastName.trim() || !employee.position.trim() || !employee.department.trim() || !employee.salary) {
                return Result.Err('Missing required fields in the employee object');
            }

            // Create a new employee object with the updated fields
            const updatedEmployee: Employee = {
                ...existingEmployee,
                ...employee,
                updatedAt: Opt.Some(ic.time()),
            };

            // Update the employee in employeeStorage
            employeeStorage.insert(id, updatedEmployee);

            return Result.Ok(updatedEmployee);
        },
        None: () => Result.Err<Employee, string>(`Employee with id=${id} does not exist`),
    }) as Result<Employee, string>;
}

// $query
export function getEmployees(): Result<Vec<Employee>, string> {
    try {
        const employees = employeeStorage.values();
        return Result.Ok(employees);
    } catch (error) {
        return Result.Err(`Error getting employees: ${error}`);
    }
}

// $query
export function getEmployee(id: string): Result<Employee, string> {
    return match(employeeStorage.get(id), {
        Some: (employee) => Result.Ok<Employee, string>(employee),
        None: () => Result.Err<Employee, string>(`Employee with id=${id} not found`),
    }) as Result<Employee, string>;
}

// $update
export function deleteEmployee(id: string): Result<Opt<Employee>, string> {
    try {
        // Validate the id parameter
        if (!isValidUUID(id)) {
            return Result.Err('Invalid employee ID');
        }

        // Delete the employee from employeeStorage
        const deletedEmployee = employeeStorage.remove(id);
        if (!deletedEmployee) {
            return Result.Err(`Employee with ID ${id} does not exist`);
        }

        return Result.Ok(deletedEmployee);
    } catch (error) {
        return Result.Err(`Error deleting employee: ${error}`);
    }
}

// $update
export function promoteEmployee(id: string): Result<Employee, string> {
    return match(employeeStorage.get(id), {
        Some: (employee) => {
            if (employee.position.startsWith("Senior ")) {
                return Result.Err<Employee, string>(`Employee with id=${id} is already promoted`);
            }

            // Assuming a simple promotion by adding "Senior " to the position
            const promotedEmployee: Employee = { ...employee, position: `Senior ${employee.position}` };
            employeeStorage.insert(id, promotedEmployee);

            return Result.Ok(promotedEmployee);
        },
        None: () => Result.Err<Employee, string>(`Employee with id=${id} not found`),
    }) as Result<Employee, string>;
}

// $update
export function demoteEmployee(id: string): Result<Employee, string> {
    return match(employeeStorage.get(id), {
        Some: (employee) => {
            if (!employee.position.startsWith("Senior ")) {
                return Result.Err<Employee, string>(`Employee with id=${id} is not promoted`);
            }

            // Assuming a simple demotion by removing "Senior " from the position
            const demotedEmployee: Employee = { ...employee, position: employee.position.replace(/^Senior /, '') };
            employeeStorage.insert(id, demotedEmployee);

            return Result.Ok(demotedEmployee);
        },
        None: () => Result.Err<Employee, string>(`Employee with id=${id} not found`),
    }) as Result<Employee, string>;
}

// $update
export function increaseSalary(id: string, amount: number): Result<Employee, string> {
    return match(employeeStorage.get(id), {
        Some: (employee) => {
            // Increase the salary by the specified amount
            const increasedSalaryEmployee: Employee = { ...employee, salary: employee.salary + amount };
            employeeStorage.insert(id, increasedSalaryEmployee);

            return Result.Ok(increasedSalaryEmployee);
        },
        None: () => Result.Err<Employee, string>(`Employee with id=${id} not found`),
    }) as Result<Employee, string>;
}

export function isValidUUID(id: string): boolean {
    return /^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/i.test(id);
}

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    },
};
