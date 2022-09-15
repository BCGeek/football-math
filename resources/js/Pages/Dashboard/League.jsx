import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import TeamAdd from '@/Components/TeamAdd';
import TeamList from '@/Components/TeamList';

export default function Teams(props) {
    console.log('props', props);
  const [page, setPage] = useState('');
  const [week, setWeek] = useState(1);

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

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
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <form>
                  <label className=" text-black font-bold py-2 px-4  mt-4" htmlFor="week">Week</label>
                  <input className="ml-1 mr-2 w-12" type="text" id="week" value={week} onChange={handleWeekChange}/>
                </form>
                <Link href={"/dashboard/league/report?week="+week+"&league_id="+props.league.id} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full" >Generate Weekly Report</Link>
                </div>
              </div>
            }
        >
            <Head title="Teams" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TeamList teams={props.league.teams} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
