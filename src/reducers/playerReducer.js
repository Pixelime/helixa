import * as TYPES from '../actions/types';

const initialState = {
    items: [],
    item: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.FETCHED_PLAYERS:
            return {
                ...state,
                items: action.data
            }
        case TYPES.FETCHED_PLAYERS_NEXT_PAGE:
            return {
                ...state,
                items: [...state.items, ...action.data]
            };
        case TYPES.FETCHING_PLAYER_DETAILS:
            return {
                ...state,
                item: {}
            }
        case TYPES.FETCHED_PLAYER_DETAILS:
            return {
                ...state,
                item: Object.assign({}, state.item, action.data)
            };
        case TYPES.FETCHED_PLAYER_STATS:
            return {
                ...state,
                item: {...state.item, stats: action.data}
            };
        case TYPES.FETCHED_PLAYER_PICTURE:
            return {
                ...state,
                item: {...state.item, picture: action.data}
            };
        default:
            return state;
    }
}
