import { csrfFetch } from "./csrf";

const GET_ALL_PROJECTS = 'projects/GET_ALL_PROJECTS';
const GET_PROJECT_DETAILS = 'projects/GET_PROJECT_DETAILS';

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
        default:
            return state;
    }
};

export default projectsReducer;