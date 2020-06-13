import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link className="App-logo" to="/">
                    <Typography>NBA Players</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
