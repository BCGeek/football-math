import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import TeamAdd from '@/Components/TeamAdd';
import TeamList from '@/Components/TeamList';
import ScoringGrid from '@/Components/ScoringGrid';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PlayerList from '@/Components/PlayerList';
import { Inertia } from '@inertiajs/inertia';

export default function Team(props) {
    console.log('props', props);
    const positions = ['Quarterbacks','Running Backs', 'Wide Receivers', 'Tight Ends', 'Kickers'];
    const qbs = props.team.players.filter(player => player.position === 'QB');
    const rbs = props.team.players.filter(player => player.position === 'RB');
    const wrs = props.team.players.filter(player => player.position === 'WR');
    const tes = props.team.players.filter(player => player.position === 'TE');
    const ks = props.team.players.filter(player => player.position === 'K');
    const nflteam = props.team.players.filter(player => player.position === 'T');

    const week= 1;

    const players = props.players;
    const kickers = props.kickers;

    const [filteredPlayers, setFilteredPlayers] = useState(players);
    const [playerFilter, setPlayerFilter]=useState('');

    const [filteredKickers, setFilteredKickers] = useState(kickers);
    const [kickerFilter, setKickerFilter]=useState('');

    useEffect(() =>{
        setFilteredPlayers(players.filter(player => {
            return player.Name.toLowerCase().includes(playerFilter.toLowerCase()) || playerFilter === ''
        }))
    }, [playerFilter]);

    useEffect(() =>{
        setFilteredKickers(kickers.filter(kicker => {
            return kicker.Name.toLowerCase().includes(kickerFilter.toLowerCase()) || kickerFilter === ''
        }))
    }, [kickerFilter]);

    
    const selectPlayer = (e) => {
        e.preventDefault();
        console.log('selectPlayer', e.target)
        let values = {
            team_id: props.team.id,
            player_id: parseInt(e.target.value)
        }

        // don't post if already on list.

        Inertia.post('/dashboard/team/', values);
    }

    const selectKicker = (e) => {
        e.preventDefault();
        console.log('selectKicker', e.target)
        let values = {
            team_id: props.team.id,
            player_id: parseInt(e.target.value)
        }

        Inertia.post('/dashboard/team/', values);
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.team.league.name}: {props.team.name}</h2>}
        >
            <Head title="Team" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-5 py-5">
                        <h2 className="text-xl font-bold">Players</h2>
                        <div className="flex flex-1">
                            <PlayerList players={props.team.players} kickers={props.team.kickers} nfl_teams={props.team.nfl_teams}/>
                            <div className="flex flex-col ml-10">
                                <p>Players <button className="cursor-pointer font-bold mx-4" onClick={e=>setPlayerFilter('')}>clear filter</button></p>
                                <input id="filter" type="text" value={playerFilter} onChange={(e)=>setPlayerFilter(e.target.value)} placeholder="type to filter"/>
                                
                                <select onChange={selectPlayer} size="12" >
                                   
                                    {
                                        filteredPlayers.map(player =>
                                            (<option key={player.PlayerID} value={player.PlayerID} >{player.Name}</option>)
                                        )
                                    }
                                </select>
                            </div>
                            <div className="flex flex-col ml-10">
                                <p>Kickers <button className="cursor-pointer font-bold mx-4" onClick={e=>setKickerFilter('')}>clear filter</button></p>
                                <input id="kfilter" type="text" value={kickerFilter} onChange={(e)=>setKickerFilter(e.target.value)} placeholder="type to filter" />
                                <select onChange={selectKicker} size="12">
                                    {
                                        filteredKickers.map(kicker =>
                                            (<option key={kicker.PlayerID} value={kicker.PlayerID} >{kicker.Name}</option>)
                                        )
                                    }
                                </select>
                            </div>                            

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
