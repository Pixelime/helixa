import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Search} from "../../components/Search";
import InputBase from "@material-ui/core/InputBase";

Enzyme.configure({adapter: new Adapter()})

let setup = {};

beforeEach(() => {
    const props = {
        query: 'lebron james',
        fetchPlayers: jest.fn()
    };

    const searchWrapper = mount(<Search {...props} />);

    setup = {props, searchWrapper};
});

describe('Search Component', function () {

    it('should display a search input field', function () {
        expect(setup.searchWrapper.find(InputBase).length).toEqual(1);
    });

    it('should search for players as user types', function () {
        const {searchWrapper, props} = setup,
            searchField = searchWrapper.find(InputBase);

        searchField.props().onChange({target: {value: 'jordan'}});
        expect(props.fetchPlayers).toHaveBeenCalledWith('jordan');
        expect(searchWrapper.state('query')).toBe('jordan');
    });

    it('should show last searched words', function () {
        const {searchWrapper} = setup,
            searchField = searchWrapper.find(InputBase);

        expect(searchField.props().value).toBe('lebron james');
    });
});
