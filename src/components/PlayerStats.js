import React from "react";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";


const stats_labels = {
    ast: 'AST',
    blk: 'BLK',
    dreb: 'DREB',
    fg3_pct: 'FG3PCT',
    fg3a: 'FG3M',
    fg3m: 'FG3A',
    fg_pct: 'FGPCT',
    fga: 'FGA',
    fgm: 'FGM',
    ft_pct: 'FTPCT',
    fta: 'FTA',
    ftm: 'FTM',
    games_played: 'GP',
    min: 'MIN',
    oreb: 'OREB',
    pf: 'PF',
    pts: 'PTS',
    reb: 'REB',
    stl: 'STL',
    turnover: 'TO',
};

export default function PlayerStats(props) {
    const stats = props.stats;

    let statsTableHeaders = [],
        statsTableCells = [];

    for (let [key, value] of Object.entries(stats)) {
        const statLabel = stats_labels[key];
        if (!statLabel) {
            continue;
        }
        statsTableHeaders.push(<TableCell key={key}>{statLabel}</TableCell>);
        statsTableCells.push(<TableCell key={key}>{value}</TableCell>);
    }

    return (
        statsTableHeaders.length > 0 ?
            <TableContainer component={Paper}>
                <Table className="Player-stats" size="small" aria-label="Player Stats">
                    <TableHead key="headers-head">
                        <TableRow key="headers">
                            {statsTableHeaders}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key="stats">
                            {statsTableCells}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            :
            <Typography variant="body2" color="textSecondary" component="span">No Player Stats Found</Typography>
    );
}


// import React, {Component} from 'react';
//
// class PlayerStats extends Component {
//
//     stats_labels = {
//         ast: 'AST',
//         blk: 'BLK',
//         dreb: 'DREB',
//         fg3_pct: 'FG3PCT',
//         fg3a: 'FG3M',
//         fg3m: 'FG3A',
//         fg_pct: 'FGPCT',
//         fga: 'FGA',
//         fgm: 'FGM',
//         ft_pct: 'FTPCT',
//         fta: 'FTA',
//         ftm: 'FTM',
//         games_played: 'GP',
//         min: 'MIN',
//         oreb: 'OREB',
//         pf: 'PF',
//         pts: 'PTS',
//         reb: 'REB',
//         stl: 'STL',
//         turnover: 'TO',
//     };
//
//     render() {
//         let stats = [];
//         for (let [key, value] of Object.entries(this.props.stats)) {
//
//             const statLabel = this.stats_labels[key];
//             if (!statLabel) {
//                 continue;
//             }
//
//             stats.push(
//                 <div className="Player-stat" key={key}>
//                     <h5>{statLabel}</h5><h6>{value}</h6>
//                 </div>
//             );
//         }
//
//         return (
//             <div className="Player-stats">{stats}</div>
//         );
//     }
// }
//
// export default PlayerStats;
