import { csrfFetch } from "./csrf";

const GET_ALL_PROJECTS = 'projects/GET_ALL_PROJECTS';
const GET_PROJECT_DETAILS = 'projects/GET_PROJECT_DETAILS';
const CREATE_PROJECT = 'projects/CREATE_PROJECT';
const DELETE_PROJECT = 'projects/DELETE_PROJECT';

// Action Creator
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
        case DELETE_PROJECT: {
            const newState = {...state};
            delete newState[action.projectId];
            return newState;
        }
        default:
            return state;
    }
};

export default projectsReducer;