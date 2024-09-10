import { csrfFetch } from "./csrf";

const GET_ALL_PROJECTS = 'projects/GET_ALL_PROJECTS';
const GET_PROJECT_DETAILS = 'projects/GET_PROJECT_DETAILS';
const CREATE_PROJECT = 'projects/CREATE_PROJECT';
const DELETE_PROJECT = 'projects/DELETE_PROJECT';
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT';
const ADD_PROJECT_IMAGE = 'project/ADD_PROJECT_IMAGE';
const CREATE_EMPLOYEE = 'project/CREATE_EMPLOYEE';
const UPDATE_EMPLOYEE = 'project/UPDATE_EMPLOYEE';
const GET_EMPLOYEE_DETAILS = 'employees/GET_EMPLOYEE_DETAILS';
//const DELETE_EMPLOYEE = 'project/DELETE_EMPLOYEE';


// Action Creator
const updateEmployee = (employee) => {
    return {
        type: UPDATE_EMPLOYEE,
        employee
    }
};

// const deleteEmployee = (projectId, employeeId) => {
//     return {
//         type: DELETE_EMPLOYEE,
//         projectId,
//         employeeId
//     };
// };


const getAllProjects = (projects) => {
    return {
        type: GET_ALL_PROJECTS, 
        projects
    };
};

const getSingleProject = (project) => {
    return {
        type: GET_PROJECT_DETAILS,
        project
    }
};

const addProject = (project) => {
    return {
        type: CREATE_PROJECT,
        project
    }
};

const removeProject = (projectId) => {
    return {
        type: DELETE_PROJECT,
        projectId
    }
};

const updateProject = (project) => {
    return {
        type: UPDATE_PROJECT,
        project
    }
};

const addProjectImage = (projectId, image) => {
    return {
        type: ADD_PROJECT_IMAGE,
        projectId,
        image
    }
};

const getSingleEmployee = (employee) => {
    return {
        type: GET_EMPLOYEE_DETAILS,
        employee
    }
};

const addEmployee = (projectId, employee) => {
    return {
        type: CREATE_EMPLOYEE,
        projectId,
        employee
    }
};


// Thunks
export const getProjects = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/projects');
        if (response.ok) {
            const projects = await response.json();
            dispatch(getAllProjects(projects));
        }
    } catch (error) {
        console.error("Failed to fetch projects:", error);
    }
};

export const getProject = (projectId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/projects/${projectId}`);

        if (response.ok) {
            const project = await response.json();
            dispatch(getSingleProject(project));
        } else {
            const errors = await response.json();
            throw new Error(errors);
        }
    } catch (error) {
        console.error("Failed to fetch project:", error);
        throw error; 
    }
};

export const createProject = (projectData) => async (dispatch) => {
    const response = await csrfFetch('/api/projects/new', {
        method: 'POST',
        body: JSON.stringify(projectData)
    });

    console.log(response)
    if (response.ok) {
        const newProject = await response.json();
        dispatch(addProject(newProject));
        return newProject;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteProject = (projectId) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeProject(projectId))
    }
};

export const projectUpdate = (project) => async (dispatch) => {
    console.log("Store Product ID: ", typeof project.id)
    const response = await csrfFetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project)
    })

    console.log("Response: ", response)

    if (response.ok) {
        const updatedProject = await response.json();
        dispatch(updateProject(updatedProject));
        return updatedProject;
    }
};

export const addImageToProject = (projectId, imageUrl) => async (dispatch) => {
    console.log(projectId, imageUrl);
    try {
        const response = await csrfFetch(`/api/projects/${projectId}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: imageUrl }),
        });

        if (response.ok) {
            const image = await response.json();
            dispatch(addProjectImage(projectId, image));
            return image;
        } else {
            const errors = await response.json();
            throw new Error(errors);
        }
    } catch (error) {
        console.error("Failed to fetch project:", error);
        throw error; 
    }
};

export const createEmployee = (projectId, employeeData) => async (dispatch) => {
    console.log("Employee Data ", employeeData)
    const response = await csrfFetch(`/api/projects/${projectId}/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData)
    });

    if (response.ok) {
        const newEmployee = await response.json();
        dispatch(addEmployee(projectId, newEmployee));
        return newEmployee;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const employeeUpdate = (employee) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/employees/${employee.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });

        if (response.ok) {
            const updatedEmployee = await response.json();
            dispatch(updateEmployee(updatedEmployee));
            return updatedEmployee;
        } else {
            const errors = await response.json();
            throw new Error(errors);
        }
    } catch (error) {
        console.error("Failed to update employee:", error);
        throw error;
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

// Reducer
const projectsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS: {
            const projectState = {};
            action.projects.forEach((project) => {
                projectState[project.id] = project;
            });
            return projectState;
        }
        
        case GET_PROJECT_DETAILS: {
            return { ...state, [action.project.id]: action.project}
        }

        case CREATE_PROJECT: {
            return { ...state, [action.project.id]: action.project}
        }

        case UPDATE_PROJECT: {
            return { ...state, [action.project.id]: action.project}
        }

        case DELETE_PROJECT: {
            const newState = {...state};
            delete newState[action.projectId];
            return newState;
        }  

        case CREATE_EMPLOYEE: {
            // return { ...state, [action.employee.id]: action.employee}
            const { projectId, employee } = action;
            const project = state[projectId];
        
            if (project) {
                return {
                    ...state,
                    [projectId]: {
                        ...project,
                        employees: [...project.employees, employee]
                    }
                };
            }
        
            return state;
        }  

        case UPDATE_EMPLOYEE: {
            const { id: employeeId, projectId } = action.employee;
            const project = state[projectId];

            if (project) {
                const updatedEmployees = project.employees.map(emp =>
                    emp.id === employeeId ? action.employee : emp
                );

                return {
                    ...state,
                    [projectId]: {
                        ...project,
                        employees: updatedEmployees
                    }
                };
            }

            return state;
        }

        case GET_EMPLOYEE_DETAILS: {
            return { ...state, [action.employee.id]: action.employee}
        }
        case ADD_PROJECT_IMAGE: {
            const { projectId, image } = action;
            const project = state[projectId];
        
            if (project) {
                return {
                    ...state,
                    [projectId]: {
                        ...project,
                        projectImages: [...project.projectImages, image],
                    },
                };
            }
        
            return state;
        }        
        default:
            return state;
    }
};

export default projectsReducer;