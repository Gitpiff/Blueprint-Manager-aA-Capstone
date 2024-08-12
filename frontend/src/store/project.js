import { csrfFetch } from "./csrf";

const GET_ALL_PROJECTS = 'projects/GET_ALL_PROJECTS';

// Action Creator
const getAllProjects = (projects) => {
    return {
        type: GET_ALL_PROJECTS, 
        projects
    };
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
        default:
            return state;
    }
};

export default projectsReducer;