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
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [playerFilter, setPlayerFilter]=useState('');

    useEffect(() =>{
        setFilteredPlayers(players.filter(player => {
            return player.Name.includes(playerFilter) || playerFilter === ''
        }))
    }, [playerFilter]);

    const handleChange = () => {}
    const processing = false;
    const submit = () => {}
    const selectPlayer = (e) => {
        e.preventDefault();
        let values = {
            team_id: props.team.id,
            player_id: parseInt(e.target.value)
        }

        console.log('values', values);
        Inertia.post('/dashboard/team', values);
        window.location.href='/dashboard/team/'+values.team_id;
    }



    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.team.league.name}</h2>
                    <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full mt-4" >{props.team.name}</button>
                </div>

            }
        >

            <Head title="Team" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-5 py-5">
                        <h2 className="text-xl font-bold">Players</h2>
                        <div className="flex flex-1">
                            <PlayerList players={props.team.players} kickers={props.team.kickers} nfl_teams={props.team.nfl_teams}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
