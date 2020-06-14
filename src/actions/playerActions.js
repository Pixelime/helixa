import * as TYPES from './types';

const API_PLAYERS_URL = "https://www.balldontlie.io/api/v1/players";
const API_PLAYERS_SEASON_AVERAGES_URL = "https://www.balldontlie.io/api/v1/season_averages";
const API_PLAYER_PICTURE_URL = "https://nba-players.herokuapp.com/players";


export function fetchPlayers(query = '', page = 1) {
    return function (dispatch) {
        const params = new URLSearchParams({"search": query, "page": page}),
            url = `${(new URL(API_PLAYERS_URL)).href}?${params.toString()}`;

        dispatch({
            type: TYPES.SET_REQUEST_PARAMS,
            data: {query, page}
        });

        return fetch(url)
            .then(res => res.json())
            .then(function (payload) {
                dispatch({
                    type: (page === 1) ? TYPES.FETCHED_PLAYERS : TYPES.FETCHED_PLAYERS_NEXT_PAGE,
                    data: payload.data,
                });
                dispatch({
                    type: TYPES.SET_RESPONSE_METADATA,
                    data: payload.meta
                });
            });
    }
}

export function fetchPlayerDetails(playerId) {
    return function (dispatch, getState) {
        dispatch({
            type: TYPES.FETCHING_PLAYER_DETAILS,
            data: playerId
        });

        return fetch(`${API_PLAYERS_URL}/${playerId}`)
            .then(res => (res.status === 200 ? res.json() : {}))
            .then(function (payload) {
                dispatch({
                    type: TYPES.FETCHED_PLAYER_DETAILS,
                    data: payload,
                });

                const state = getState(),
                    player = state.player.item || {};

                dispatch(fetchPlayerStats(playerId));
                dispatch(fetchPlayerPicture(player.first_name, player.last_name));
            });
    }
}

export function fetchPlayerStats(playerId) {
    return function (dispatch) {
        return fetch(`${API_PLAYERS_SEASON_AVERAGES_URL}?player_ids[]=${playerId}`)
            .then(res => res.json())
            .then(payload => dispatch({
                type: TYPES.FETCHED_PLAYER_STATS,
                data: payload.data.length > 0 ? payload.data[0] : payload.data,
            }));
    }
}

export function fetchPlayerPicture(playerFirstName, playerLastName) {
    return function (dispatch) {
        return fetch(`${API_PLAYER_PICTURE_URL}/${playerLastName.toLowerCase()}/${playerFirstName.toLowerCase()}`)
            .then(res => res.blob())
            .then(image => {
                dispatch({
                    type: TYPES.FETCHED_PLAYER_PICTURE,
                    // NOTE: 'text/html' means nothing has been found...
                    data: (image.type === 'text/html') ? null : URL.createObjectURL(image),
                });
            })
    }
}
