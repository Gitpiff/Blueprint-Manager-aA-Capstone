import { csrfFetch } from "./csrf";

const GET_ALL_PROJECTS = 'projects/GET_ALL_PROJECTS';
const GET_PROJECT_DETAILS = 'projects/GET_PROJECT_DETAILS';
const CREATE_PROJECT = 'projects/CREATE_PROJECT';
const DELETE_PROJECT = 'projects/DELETE_PROJECT';
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT';
const ADD_PROJECT_IMAGE = 'project/ADD_PROJECT_IMAGE';

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

const updateProject = (project) => {
    return {
        type: UPDATE_PROJECT,
        project
    }
};

const addProjectImage = (projectId, image) => ({
    type: ADD_PROJECT_IMAGE,
    projectId,
    image,
});


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
    try {
        const response = await fetch(`/api/projects/${projectId}/images`, {
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
            const errorData = await response.json();
            return Promise.reject(errorData);
        }
    } catch (err) {
        return Promise.reject(err);
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