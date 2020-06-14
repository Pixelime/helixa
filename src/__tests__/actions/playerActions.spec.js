import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';
import * as actions from '../../actions/playerActions';
import * as TYPES from "../../actions/types";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Player Actions', function () {
    afterEach(() => {
        fetchMock.restore();
    })

    it('should fetch players list', function () {
        fetchMock.getOnce('https://www.balldontlie.io/api/v1/players?search=&page=1', {
            body: {data: ['NBA Players'], meta: {pagination: 'pagination'}},
            headers: {'content-type': 'application/json'}
        });

        const store = mockStore({player: {}, meta: {}});

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

    it('should fetch players list with passed query and page parameters', function () {
        fetchMock.getOnce('https://www.balldontlie.io/api/v1/players?search=jordan&page=99', {
            body: {data: ['MJ'], meta: {pagination: 'pagination'}},
            headers: {'content-type': 'application/json'}
        });

        const store = mockStore({player: {}, meta: {}});

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
});


// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import * as actions from '../../actions/TodoActions'
// import * as types from '../../constants/ActionTypes'
// import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
//
// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)
//
// describe('async actions', () => {
//   afterEach(() => {
//     fetchMock.restore()
//   })
//
//   it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
//     fetchMock.getOnce('/todos', {
//       body: { todos: ['do something'] },
//       headers: { 'content-type': 'application/json' }
//     })
//
//     const expectedActions = [
//       { type: types.FETCH_TODOS_REQUEST },
//       { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
//     ]
//     const store = mockStore({ todos: [] })
//
//     return store.dispatch(actions.fetchTodos()).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions)
//     })
//   })
// })
