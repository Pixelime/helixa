// import reducer from '../../structuring-reducers/todos'
// import * as types from '../../constants/ActionTypes'

import reducer from '../../reducers/playerReducer';
import * as TYPES from '../../actions/types';
import {mount} from "enzyme";
import {Search} from "../../components/Search";
import React from "react";

let initialState;

beforeEach(() => {
    initialState = {
        items: [],
        item: {}
    };
});

describe('Player Reducer', function () {
    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCHED_PLAYERS', function () {
        expect(
            reducer(initialState, {
                type: TYPES.FETCHED_PLAYERS,
                data: [{
                    "id": 123, "first_name": "Michael", "last_name": "Jordan"
                }, {
                    "id": 456, "first_name": "Larry", "last_name": "Bird"
                }],
            })
        ).toEqual({
            item: {},
            items: [{
                "id": 123, "first_name": "Michael", "last_name": "Jordan"
            }, {
                "id": 456, "first_name": "Larry", "last_name": "Bird"
            }]
        })
    });

    it('should handle FETCHED_PLAYERS_NEXT_PAGE', function () {
        initialState.items.push({"id": 123, "first_name": "Michael", "last_name": "Jordan"});
        expect(
            reducer(initialState, {
                type: TYPES.FETCHED_PLAYERS_NEXT_PAGE,
                data: [{
                    "id": 456, "first_name": "Larry", "last_name": "Bird"
                }],
            })
        ).toEqual({
            item: {},
            items: [{
                "id": 123, "first_name": "Michael", "last_name": "Jordan"
            }, {
                "id": 456, "first_name": "Larry", "last_name": "Bird"
            }]
        })
    });

    it('should handle FETCHED_PLAYER_DETAILS', function () {
        expect(
            reducer(initialState, {
                type: TYPES.FETCHED_PLAYER_DETAILS,
                data: {
                    "id": 123, "first_name": "Michael", "last_name": "Jordan"
                }
            })
        ).toEqual({
            items: [],
            item: {"id": 123, "first_name": "Michael", "last_name": "Jordan"}
        })
    });

    it('should handle FETCHED_PLAYER_STATS', function () {
        initialState.item = {"id": 123};
        expect(
            reducer(initialState, {
                type: TYPES.FETCHED_PLAYER_STATS,
                data: {"games_played": 99}
            })
        ).toEqual({
            items: [],
            item: {"id": 123, "stats": {"games_played": 99}}
        });

    });

    it('should FETCHED_PLAYER_PICTURE', function () {
        initialState.item = {"id": 123};
        expect(
            reducer(initialState, {
                type: TYPES.FETCHED_PLAYER_PICTURE,
                data: "michael_jordan.jpeg"
            })
        ).toEqual({
            items: [],
            item: {"id": 123, "picture": "michael_jordan.jpeg"}
        });
    });
});
