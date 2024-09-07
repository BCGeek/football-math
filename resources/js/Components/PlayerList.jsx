import React from "react";

function PlayerList({ players, removePlayer }) {
    const qbs = players.filter((player) => {
        return player.Position === "QB";
    });
    const rbs = players.filter((player) => {
        return player.Position === "RB";
    });
    const wrs = players.filter((player) => {
        return player.Position === "WR";
    });
    const tes = players.filter((player) => {
        return player.Position === "TE";
    });
    const team = players.filter((player) => {
        return player.Position === "DST";
    });
    const kickers = players.filter((player) => {
        return player.Position === "K";
    });

    return (
        <ul className="flex-1">
            <li className="text-lg font-bold text-red-600">Quarterbacks</li>
            {qbs.map((qb) => {
                return (
                    <li
                        key={qb.PlayerID}
                        className="pl-3 cursor-pointer hover:font-bold"
                        onClick={(e) => removePlayer(qb.PlayerID)}
                    >
                        {qb.Name}
                    </li>
                );
            })}
            <li className="text-lg font-bold text-red-600">Running Backs</li>
            {rbs.map((rb) => {
                return (
                    <li
                        key={rb.PlayerID}
                        className="pl-3 cursor-pointer hover:font-bold"
                        onClick={(e) => removePlayer(rb.PlayerID)}
                    >
                        {rb.Name}
                    </li>
                );
            })}
            <li className="text-lg font-bold text-red-600">Wide Receivers</li>
            {wrs.map((wr) => {
                return (
                    <li
                        key={wr.PlayerID}
                        className="pl-3 cursor-pointer hover:font-bold"
                        onClick={(e) => removePlayer(wr.PlayerID)}
                    >
                        {wr.Name}
                    </li>
                );
            })}
            <li className="text-lg font-bold text-red-600">Tight Ends</li>
            {tes.map((te) => {
                return (
                    <li
                        key={te.PlayerID}
                        className="pl-3 cursor-pointer hover:font-bold"
                        onClick={(e) => removePlayer(te.PlayerID)}
                    >
                        {te.Name}
                    </li>
                );
            })}
            <li className="text-lg font-bold text-red-600">Kickers</li>
            {kickers.map((k) => {
                return (
                    <li
                        key={k.PlayerID}
                        className="pl-3 cursor-pointer hover:font-bold"
                        onClick={(e) => removePlayer(k.PlayerID)}
                    >
                        {k.Name}
                    </li>
                );
            })}
            {/* <li className="text-lg font-bold text-red-600">Defense</li>
            {team.map((team) => {
                return (
                    <li
                        key={team.PlayerID}
                        className="pl-3 cursor-pointer hover:font-bold"
                        onClick={(e) => removePlayer(team.PlayerID)}
                    >
                        {team.Name}
                    </li>
                );
            })} */}
        </ul>
    );
}

export default PlayerList;
