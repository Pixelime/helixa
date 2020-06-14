import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPlayers} from "../actions/playerActions";
import {Link} from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

import InfiniteScroll from "react-infinite-scroll-component";

import Search from "./Search";


class Players extends Component {

    componentDidMount() {
        this.props.fetchPlayers(this.props.query);
    }

    fetchPlayers() {
        // {"data":[],"meta":{"total_pages":131,"current_page":400,"next_page":null,"per_page":25,"total_count":3268}}
        const nextPage = this.props.pagination.next_page,
            query = this.props.query;

        if (nextPage !== null) {
            this.props.fetchPlayers(query, nextPage);
        }
    }

    render() {
        const players = this.props.players.map(player => {

            const url = `/${player.id}`,
                playerName = `${player.first_name} ${player.last_name} (Position: ${player.position})`,
                playerInitials = `${player.first_name.charAt(0).toUpperCase()}${player.last_name.charAt(0).toUpperCase()}`,
                playerTeam = `Team: ${player.team.full_name}`;

            return (
                <Fragment key={player.id}>
                    <ListItem className="Player-link" alignItems="flex-start" component={Link} to={url}>
                        <ListItemAvatar>
                            <Avatar className="Player-avatar">{playerInitials}</Avatar>
                        </ListItemAvatar>
                        <ListItemText className="Player-text" primary={playerName} secondary={playerTeam}/>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </Fragment>
            );
        });

        const pagination = this.props.pagination;

        return (
            <Fragment>
                <Search/>
                <List className="Players-list">
                    <ListSubheader className="Players-list-count">Total Players Found: <strong>{pagination.total_count || 0}</strong></ListSubheader>
                    <InfiniteScroll
                        dataLength={this.props.players.length} //This is important field to render the next data
                        next={this.fetchPlayers.bind(this)}
                        hasMore={this.props.pagination.next_page !== null}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <strong>No more players to show!</strong>
                            </p>
                        }
                    >{players}</InfiniteScroll>
                </List>
            </Fragment>
        );
    }
}

Players.propTypes = {
    fetchPlayers: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    pagination: PropTypes.object.isRequired
};


const mapStateToProps = function (state) {
    return {
        players: state.player.items,
        query: state.meta.query,
        pagination: state.meta.pagination
    };
};

export default connect(mapStateToProps, {fetchPlayers})(Players);
