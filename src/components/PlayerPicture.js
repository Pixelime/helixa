import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';

export default function PlayerPicture(props) {

    const picture = props.picture,
        fullName = props.fullName;

    return (picture === null) ?
        <div className="Player-picture-notfound">
            <Avatar>
                <SportsBasketballIcon />
            </Avatar>
            <Typography component="h5">No Picture Found</Typography>
        </div>
        :
        <CardMedia
            component="img"
            alt={fullName}
            height="240"
            image={picture}
            title={fullName}
        />;

}
