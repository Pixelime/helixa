import React, {Component} from 'react';
import {fetchPlayers} from "../actions/playerActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";


export class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({query: this.props.query || ""});
    }

    onChange(e) {
        const query = e.target.value;
        this.setState({query: query});
        this.props.fetchPlayers(query);
    }

    render() {
        return (
            <Paper component="form" className="Player-search">
                <SearchIcon className="Player-search-icon" />
                <InputBase id="searchInput" className="Player-search-input"
                    placeholder="Search NBA Players"
                    inputProps={{ 'aria-label': 'search nba players' }}
                    onChange={this.onChange}
                    value={this.state.query}
                />
            </Paper>
        );
    }
}

Search.propTypes = {
    fetchPlayers: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
};

const mapStateToProps = function (state) {
    return {
        query: state.meta.query
    };
};

export default connect(mapStateToProps, {fetchPlayers})(Search);
