import { csrfFetch } from './csrf';

const GET_ALL_EMPLOYEES = 'employees/GET_ALL_EMPLOYEES';
const GET_EMPLOYEE_DETAILS = 'employees/GET_EMPLOYEE_DETAILS';
const UPDATE_EMPLOYEE = 'employees/UPDATE_EMPLOYEE';
const DELETE_EMPLOYEE = 'employees/DELETE_EMPLOYEE';
const CREATE_EMPLOYEE = 'employees/CREATE_EMPLOYEE';

// Action Creator
const getAllEmployees = (employees) => {
    return {
        type: GET_ALL_EMPLOYEES, 
        employees
    };
};

const getSingleEmployee = (employee) => {
    return {
        type: GET_EMPLOYEE_DETAILS,
        employee
    }
};

const updateEmployee = (employee) => {
    return {
        type: UPDATE_EMPLOYEE,
        employee
    }
};

const removeEmployee = (employee) => {
    return {
        type: DELETE_EMPLOYEE,
        employee
    }
};

const addEmployee = (employee) => {
    return {
        type: CREATE_EMPLOYEE,
        employee
    }
};

// Thunks
export const getEmployees = () => async (dispatch) => {
    const response = await csrfFetch('/api/employees');
    //console.log(`Thunk response ${response}`)
    if (response.ok) {
        const employees = await response.json();
        dispatch(getAllEmployees(employees));
    }
};

export const getEmployee = (employeeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/employees/${employeeId}`)
    //console.log(`get employee ${response}`)

    if (response.ok) {
        const employee = await response.json();
        //console.log(`store ${employee}`)
        dispatch(getSingleEmployee(employee))
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const employeeUpdate = (employee) => async (dispatch) => {
    const response = await csrfFetch(`/api/employees/${employee.id}`, {
        method: 'PUT',
        body: JSON.stringify(employee)
    })

    if (response.ok) {
        const updatedEmployee = await response.json();
        dispatch(updateEmployee(updatedEmployee));
        return updatedEmployee;
    }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/employees/${employeeId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeEmployee(employeeId))
    }
};

export const createEmployee = (employeeData) => async (dispatch) => {
    const response = await csrfFetch('/api/employees/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData)
    });

    if (response.ok) {
        const newEmployee = await response.json();
        dispatch(addEmployee(newEmployee));
        return newEmployee;
    } else {
        const errors = await response.json();
        return errors;
    }
};

// Reducer
const employeeReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEES: {
            const employeeState = {};
            action.employees.forEach((employee) => {
                employeeState[employee.id] = employee;
            });
            return employeeState; 
        }
        case GET_EMPLOYEE_DETAILS: {
            return { ...state, [action.employee.id]: action.employee}
        }
        case UPDATE_EMPLOYEE: {
            return { ...state, [action.employee.id]: action.employee}
        }
        case DELETE_EMPLOYEE: {
            const newState = {...state};
            delete newState[action.employee.id];
            return newState;
        }
        case CREATE_EMPLOYEE: {
            return { ...state, [action.employee.id]: action.employee}
        }
        default:
            return state;
    }
};

export default employeeReducer;
