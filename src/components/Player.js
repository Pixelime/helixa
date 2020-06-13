import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PlayerStats from './PlayerStats';
import PlayerPicture from './PlayerPicture';

import {fetchPlayerDetails} from "../actions/playerActions";



class Player extends Component {

    componentDidMount() {
        const match = this.props.match,
            playerId = match.isExact ? match.params.id : null;

        this.props.fetchPlayerDetails(playerId);
    }

    render() {
        const player = this.props.player,
            team = player.team || {},
            stats = player.stats || [],
            fullName = `${player.first_name || "---"} ${player.last_name || "---"}`,
            picture = player.picture;

        return (
            <Card className="Player-details">
                <CardActionArea>
                    <PlayerPicture picture={picture} fullName={fullName} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h5">
                            {fullName}
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="h6">
                            {team.full_name || "No Team"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Position: {player.position || "-"} <br/>
                            Height (ft/in): {player.height_feet || "-"}/{player.height_inches || "-"} <br/>
                            Weight (lb): {player.weight_pounds || "-"}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography component="h4">
                            Player Stats:
                        </Typography>
                        <PlayerStats stats={stats} />
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

Player.propTypes = {
    fetchPlayerDetails: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
    return {
        player: state.player.item
    };
};

export default connect(mapStateToProps, {fetchPlayerDetails})(Player);
