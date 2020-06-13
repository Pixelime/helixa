import * as TYPES from '../actions/types';

const initialState = {
    query: '',
    page: 0,
    pagination: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.SET_REQUEST_PARAMS:
            return Object.assign({}, state, {
                query: action.data.query || '',
                page: action.data.page || 0
            })
        case TYPES.SET_RESPONSE_METADATA:
            return {
                ...state,
                pagination: Object.assign({}, state.pagination, action.data)
            }
        default:
            return state;
    }
}
