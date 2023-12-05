# Employee Management System Documentation

## Overview

The Employee Management System is a JavaScript implementation using the Azle library for efficient data storage and management. This system allows users to perform various operations related to employee management, including hiring, firing, updating, searching, and promoting/demoting employees. It is designed to handle employee records with details such as name, position, department, salary, and employment status.

## Features

### 1. Search Employees

- **Function:** `searchEmployees(query: string)`
- **Description:** Search for employees based on a query in their first name, last name, position, or department.
- **Parameters:**
  - `query` (string): The keyword to search for.
- **Return Type:** `Result<Vec<Employee>, string>`

### 2. Hire Employee

- **Function:** `hireEmployee(employee: Employee)`
- **Description:** Add a new employee to the system with a unique ID, initialized employment status, and current timestamp for the "updatedAt" field.
- **Parameters:**
  - `employee` (Employee): Object containing employee details.
- **Return Type:** `Result<Employee, string>`

### 3. Fire Employee

- **Function:** `fireEmployee(id: string)`
- **Description:** Terminate employment for a specific employee based on their ID.
- **Parameters:**
  - `id` (string): The unique identifier of the employee to be terminated.
- **Return Type:** `Result<Employee, string>`

### 4. Update Employee

- **Function:** `updateEmployee(id: string, employee: Employee)`
- **Description:** Update details of an existing employee based on their ID.
- **Parameters:**
  - `id` (string): The unique identifier of the employee to be updated.
  - `employee` (Employee): Object containing updated employee details.
- **Return Type:** `Result<Employee, string>`

### 5. Get All Employees

- **Function:** `getEmployees()`
- **Description:** Retrieve a list of all employees.
- **Return Type:** `Result<Vec<Employee>, string>`

### 6. Get Employee by ID

- **Function:** `getEmployee(id: string)`
- **Description:** Retrieve a specific employee by providing their ID.
- **Parameters:**
  - `id` (string): The unique identifier of the employee.
- **Return Type:** `Result<Employee, string>`

### 7. Delete Employee

- **Function:** `deleteEmployee(id: string)`
- **Description:** Delete a specific employee by providing their ID.
- **Parameters:**
  - `id` (string): The unique identifier of the employee to be deleted.
- **Return Type:** `Result<Opt<Employee>, string>`

### 8. Promote Employee

- **Function:** `promoteEmployee(id: string)`
- **Description:** Promote an employee by adding "Senior " to their position.
- **Parameters:**
  - `id` (string): The unique identifier of the employee to be promoted.
- **Return Type:** `Result<Employee, string>`

### 9. Demote Employee

- **Function:** `demoteEmployee(id: string)`
- **Description:** Demote an employee by removing "Senior " from their position.
- **Parameters:**
  - `id` (string): The unique identifier of the employee to be demoted.
- **Return Type:** `Result<Employee, string>`

### 10. Increase Salary

- **Function:** `increaseSalary(id: string, amount: number)`
- **Description:** Increase an employee's salary by the specified amount.
- **Parameters:**
  - `id` (string): The unique identifier of the employee.
  - `amount` (number): The amount by which to increase the salary.
- **Return Type:** `Result<Employee, string>`

### 11. Validate UUID

- **Function:** `isValidUUID(id: string)`
- **Description:** Validate whether a given string is a valid UUID.
- **Parameters:**
  - `id` (string): The string to be validated.
- **Return Type:** `boolean`

## Deployment

### Prerequisites

- Node.js installed on the server.

### Steps

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/miriam001/Employee-Management-System.git
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```
4. Deploy the application:

   ```bash
   npm deploy
   ```
