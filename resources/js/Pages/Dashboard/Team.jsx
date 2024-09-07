import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import * as router from "react-dom";
import { Head } from "@inertiajs/inertia-react";
import TeamAdd from "@/Components/TeamAdd";
import TeamList from "@/Components/TeamList";
import ScoringGrid from "@/Components/ScoringGrid";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import PlayerList from "@/Components/PlayerList";
import { Inertia } from "@inertiajs/inertia";

export default function Team(props) {
    console.log("x", props);
    const positions = [
        "Quarterbacks",
        "Running Backs",
        "Wide Receivers",
        "Tight Ends",
        "Kickers",
        "Defense",
    ];

    const week = 1;

    const allPlayers = props.players;
    const kickers = props.kickers;

    const [filteredPlayers, setFilteredPlayers] = useState(allPlayers);
    const [playerFilter, setPlayerFilter] = useState("");
    const [positionFilter, setPositionFilter] = useState("All");
    const [changes, setChanges] = useState(false);
    const [updates, setUpdates] = useState([]);
    const [activePlayers, setActivePlayers] = useState(props.team.players);

    const [qbs, setQbs] = useState([]);
    const [rbs, setRbs] = useState([]);
    const [wrs, setWrs] = useState([]);
    const [tes, setTes] = useState([]);
    const [ks, setKs] = useState([]);
    const [nflteam, setNflteam] = useState([]);

    const loadTeamPlayers = () => {
        setQbs(activePlayers.filter((player) => player.position === "QB"));
        setRbs(activePlayers.filter((player) => player.position === "RB"));
        setWrs(activePlayers.filter((player) => player.position === "WR"));
        setTes(activePlayers.filter((player) => player.position === "TE"));
        setKs(activePlayers.filter((player) => player.position === "K"));
        setNflteam(activePlayers.filter((player) => player.position === "DST"));
    };

    useEffect(() => {
        // console.log("loading team players");
        loadTeamPlayers();
    }, []);

    useEffect(() => {
        // console.log("useEffect for active players", allPlayers, activePlayers);
        loadTeamPlayers();
    }, [activePlayers]);

    useEffect(() => {
        setFilteredPlayers(
            filteredPlayers.filter((player) => {
                return (
                    player.Name.toLowerCase().includes(
                        playerFilter.toLowerCase()
                    ) || playerFilter === ""
                );
            })
        );
    }, [playerFilter]);

    useEffect(() => {
        console.log("updates ", updates);
    }, [updates]);

    const selectPlayer = (e) => {
        e.preventDefault();
        let values = {
            action: "add",
            team_id: props.team.id,
            player_id: parseInt(e.target.value),
        };

        let selectedPlayer = props.players.filter((player) => {
            return player.PlayerID === values.player_id;
        });

        let doesAlreadyExist = activePlayers.findIndex(
            (item) => item.PlayerID === values.player_id
        );

        if (doesAlreadyExist !== -1) return;

        setUpdates([...updates, values]);

        // add to list of selected players...
        setActivePlayers([...activePlayers, selectedPlayer[0]]);

        setChanges(true);
    };

    const removePlayer = (playerID) => {
        // e.preventDefault();
        let values = {
            action: "remove",
            team_id: props.team.id,
            player_id: parseInt(playerID),
        };

        setUpdates([...updates, values]);
        setActivePlayers(
            activePlayers.filter((player) => {
                return player.PlayerID !== values.player_id;
            })
        );
        setChanges(true);
    };

    const cancelChanges = () => {
        setChanges([]);
        console.log("cancelChanges");
        window.open("/dashboard/league", "_self");
    };

    const saveChanges = () => {
        console.log("saveChanges", updates);
        Inertia.post("/dashboard/team/update", [updates]);
        window.open("/dashboard/league", "_self");
    };

    useEffect(() => {
        console.log("position filter", positionFilter, allPlayers);
        setPlayerFilter("");
        setFilteredPlayers(
            positionFilter === "All"
                ? allPlayers
                : allPlayers.filter((player) => {
                      return player.Position === positionFilter;
                  })
        );
    }, [positionFilter]);

    useEffect(() => {
        console.log("Filtered Players", positionFilter, filteredPlayers);
    }, [filteredPlayers]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.team.league.name}
                </h2>
            }
        >
            <Head title="Team" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-5 py-5 w-full">
                        <h2 className="text-xl font-bold text-purple-800">
                            Team: {props.team.name}
                        </h2>
                        <div className="flex ">
                            <PlayerList
                                players={activePlayers}
                                removePlayer={removePlayer}
                            />

                            <div className="flex flex-auto flex-col ml-10">
                                <div className="flex justify">
                                    <p className=" font-bold">Players </p>
                                    <button
                                        className="cursor-pointer font-bold mx-4 text-red-500"
                                        onClick={(e) => setPlayerFilter("")}
                                    >
                                        clear filter
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    <div className="inline-flex rounded-lg shadow-sm">
                                        <button
                                            type="button"
                                            className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={(e) =>
                                                setPositionFilter("QB")
                                            }
                                        >
                                            QB
                                        </button>
                                        <button
                                            type="button"
                                            className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={(e) =>
                                                setPositionFilter("RB")
                                            }
                                        >
                                            RB
                                        </button>
                                        <button
                                            type="button"
                                            className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={(e) =>
                                                setPositionFilter("WR")
                                            }
                                        >
                                            WR
                                        </button>
                                        <button
                                            type="button"
                                            className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={(e) =>
                                                setPositionFilter("TE")
                                            }
                                        >
                                            TE
                                        </button>
                                        {/* <button
                                            type="button"
                                            className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={(e) =>
                                                setPositionFilter("DST")
                                            }
                                        >
                                            DEF
                                        </button> */}
                                        <button
                                            type="button"
                                            className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={(e) =>
                                                setPositionFilter("K")
                                            }
                                        >
                                            K
                                        </button>
                                        <button
                                            type="button"
                                            className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={(e) =>
                                                setPositionFilter("All")
                                            }
                                        >
                                            All
                                        </button>
                                    </div>
                                </div>
                                <input
                                    id="filter"
                                    type="text"
                                    value={playerFilter}
                                    onChange={(e) =>
                                        setPlayerFilter(e.target.value)
                                    }
                                    placeholder="type to filter"
                                />

                                <select onChange={selectPlayer} size="12">
                                    {filteredPlayers.map((player) => (
                                        <option
                                            key={player.PlayerID}
                                            value={player.PlayerID}
                                            data-position={player.Position}
                                            className="hover:font-bold cursor-pointer"
                                        >
                                            {player.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    {changes && (
                        <div className="bg-red-100 w-full p-4 flex flex-auto justify-end">
                            <button
                                type="button"
                                className="mr-4 py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 rounded text-sm text-white  focus:z-10 border border-green-600 bg-green-700 shadow-sm hover:bg-green-100 hover:text-black focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none font-bold"
                                onClick={saveChanges}
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 rounded text-sm font-bold focus:z-10 border border-red-600 bg-red-700 text-white shadow-sm hover:bg-red-100 hover:text-black focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                                onClick={cancelChanges}
                            >
                                Cancel Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
