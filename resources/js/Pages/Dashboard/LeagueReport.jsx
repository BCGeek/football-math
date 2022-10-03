import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import TeamAdd from '@/Components/TeamAdd';
import TeamList from '@/Components/TeamList';
import ScoringGrid from '@/Components/ScoringGrid';
import ScoringGridWithScores from '@/Components/ScoringGridWithScores';

export default function LeagueReport(props) {
    console.log('League Report props', props);
  const [page, setPage] = useState('');
  const [showTotals, setShowTotals] = useState(false)

  useEffect(() => {
    setPage(props.action);
    setShowTotals(props.params.show_totals === 'true' ? true: false)
  },[]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.league.name}: Teams</h2>
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-200"  onClick={()=>window.print()}>Print</button>
              </div>

            }
        >
            <Head title="Teams" />

            {
              props.reports.map((report,idx) => {return (
                <div className="report break-before-page" key={idx} >
                  <h2>Fantasy Football Math Weekly Scoring Grid </h2>
                  <h3>Team Name: {report.team}</h3>
                  <h3>NFL Week Number: {report.sub}</h3>
                  {!showTotals && <ScoringGrid report={report} />}
                  {showTotals && <ScoringGridWithScores report={report} />}
                </div>

              )})
            }
        </AuthenticatedLayout>
    );
}
