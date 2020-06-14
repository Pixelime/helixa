import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';
import * as actions from '../../actions/playerActions';
import * as TYPES from "../../actions/types";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let store = null;

describe('Player Actions', function () {

    beforeEach(() => {
        store = mockStore({player: {}, meta: {}})
        global.URL.createObjectURL = jest.fn();
    });

    afterEach(() => {
        fetchMock.restore();
    })

    it('should fetch players list', function () {
        fetchMock.getOnce('https://www.balldontlie.io/api/v1/players?search=&page=1', {
            body: {data: ['NBA Players'], meta: {pagination: 'pagination'}},
            headers: {'content-type': 'application/json'}
        });

        const expectedActions = [{
            type: TYPES.SET_REQUEST_PARAMS,
            data: {query: '', page: 1}
        }, {
            type: TYPES.FETCHED_PLAYERS,
            data: ['NBA Players']
        }, {
            type: TYPES.SET_RESPONSE_METADATA,
            data: {pagination: 'pagination'}
        }];

        return store.dispatch(actions.fetchPlayers()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('should fetch players list with given query and page parameters', function () {
        fetchMock.getOnce('https://www.balldontlie.io/api/v1/players?search=jordan&page=99', {
            body: {data: ['MJ'], meta: {pagination: 'pagination'}},
            headers: {'content-type': 'application/json'}
        });

        const expectedActions = [{
            type: TYPES.SET_REQUEST_PARAMS,
            data: {query: 'jordan', page: 99}
        }, {
            type: TYPES.FETCHED_PLAYERS_NEXT_PAGE,
            data: ['MJ']
        }, {
            type: TYPES.SET_RESPONSE_METADATA,
            data: {pagination: 'pagination'}
        }];

        return store.dispatch(actions.fetchPlayers('jordan', 99)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('should fetch player details', function () {
        const mockedItem = {
            "id": 123,
            "first_name": "Michael",
            "last_name": "Jordan",
        };

        store = mockStore({player: {item: mockedItem}, meta: {}});

        fetchMock.getOnce('https://www.balldontlie.io/api/v1/players/123', {
            body: mockedItem,
            headers: {'content-type': 'application/json'}
        });
        fetchMock.getOnce('https://www.balldontlie.io/api/v1/season_averages?player_ids[]=123', {
            body: {"data": [{"games_played": 99,}]},
            headers: {'content-type': 'application/json'}
        });
        fetchMock.getOnce('https://nba-players.herokuapp.com/players/jordan/michael', {
            body: "I am the michael jordan picture",
            headers: {'content-type': 'image/png'}
        });

        const expectedActions = [{
            type: 'FETCHING_PLAYER_DETAILS', data: 123
        }, {
            type: 'FETCHED_PLAYER_DETAILS',
            data: {id: 123, first_name: 'Michael', last_name: 'Jordan'}
        }];

        return store.dispatch(actions.fetchPlayerDetails(123)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('should fetch player stats', function () {
        fetchMock.getOnce('https://www.balldontlie.io/api/v1/season_averages?player_ids[]=123', {
            body: {"data": [{"games_played": 99,}]},
            headers: {'content-type': 'application/json'}
        });

        const expectedAction = [{
            type: 'FETCHED_PLAYER_STATS', data: {games_played: 99}
        }];

        return store.dispatch(actions.fetchPlayerStats(123)).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
        });
    });

    it('should fetch player picture', function () {
        fetchMock.getOnce('https://nba-players.herokuapp.com/players/jordan/michael', {
            // body: new Blob(["I am the michael jordan picture"], {type: 'image/png'}),
            body: "I am the michael jordan picture",
            headers: {'content-type': 'image/png'}
        });



        const expectedAction = [{
            type: 'FETCHED_PLAYER_PICTURE', data: undefined
        }];

        return store.dispatch(actions.fetchPlayerPicture('michael', 'jordan')).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
            expect(global.URL.createObjectURL).toHaveBeenCalled();
        });
    });

    it('should return null if player picture not found', function () {
        fetchMock.getOnce('https://nba-players.herokuapp.com/players/joe/banana', {
            body: "Sorry, that player was not found. Please check the spelling.",
            headers: {'content-type': 'text/html'}
        });

        const expectedAction = [{
            type: 'FETCHED_PLAYER_PICTURE', data: null
        }];

        return store.dispatch(actions.fetchPlayerPicture('banana', 'joe')).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
            expect(global.URL.createObjectURL).not.toHaveBeenCalled();
        });
    });

});


