import { csrfFetch } from "./csrf";

const UPDATE_IMAGE = 'images/UPDATE_IMAGE';
const GET_IMAGE = 'images/GET_IMAGE';
const DELETE_IMAGE = 'images/DELETE_IMAGE';

// Action Creator
const replaceUrl = (image) => {
    return {
        type: UPDATE_IMAGE,
        image
    }
}

const getImage = (imageId) => {
    return {
        type: GET_IMAGE,
        imageId
    }
}

const removeImage = (imageId) => {
    return {
        type: DELETE_IMAGE,
        imageId
    }
}


// Thunks
export const updateImage = (image) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/images/${image.id}`, {
            method: 'PUT',
            body: JSON.stringify(image)
        })
    
        if (response.ok) {
            const updatedImage = await response.json();
            dispatch(replaceUrl(updatedImage));
            return updatedImage
        }
    } catch(error) {
        console.error("Failed to fetch image:", error);
        throw error;
    }
} 

export const getCurrentImage = (imageId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/images/${imageId}`);

        if (response.ok) {
            const image = await response.json();
            dispatch(getImage(image));
        } else {
            const errors = await response.json();
            throw new Error(errors);
        }
    } catch(error) {
        console.error("Failed to fetch image:", error);
        throw error;
    }
}

export const deleteImage = (imageId) =>  async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/images/${imageId}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            dispatch(removeImage(imageId))
        }
    } catch(error) {
        console.error("Failed to delete image:", error);
        throw error;
    }
}

// Reducer
const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_IMAGE : {
            return { ...state, [action.image.id]: action.image}
        }
        case GET_IMAGE: {
            return { ...state, [action.image]: action.image }
        }
        case DELETE_IMAGE: {
            const newState = { ...state };
            delete newState[action.imageId];
            return newState;
        }
        default:
            return state;
    }
};

export default imagesReducer;