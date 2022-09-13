import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import TeamAdd from '@/Components/TeamAdd';
import TeamList from '@/Components/TeamList';

export default function Teams(props) {
    console.log('props', props);
  const [page, setPage] = useState('');

  useEffect(() => {
    setPage(props.action);
  },[]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.league.name}: Teams</h2>
                <Link href={"/dashboard/league/report?week=1&league_id="+props.league.id} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full mt-4" >Generate Weekly Report</Link>
              </div>
            }
        >
            <Head title="Teams" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TeamList teams={props.league.teams} />
                    </div>
                    <div className="mt-5">
                        <Link href={"/dashboard/league/report?week=1&league_id="+props.league.id}>Generate Weekly Report</Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
