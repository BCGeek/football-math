import React from 'react'
import ScoringRow from './ScoringRow';
import ScoringRowKickers from './ScoringRowKickers';

const ScoringGrid = ({report}) => {
  console.log('report', report);

  const qbs = report.data.filter(player => player.position === 'QB');
  const rbs = report.data.filter(player => player.position === 'RB');
  const wrs = report.data.filter(player => player.position === 'WR');
  const tes = report.data.filter(player => player.position === 'TE');

  return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <table className="table-auto border-collapse border-2 border-gray-500 text-xs">
                    <thead>
                    <tr >
                      <th className="px-2 py-2 border border-gray-400">Player</th>
                      <th className="px-2 py-2 border border-gray-400">Passing Yards</th>
                      <th className="px-2 py-2 border border-gray-400">Rushing Yards</th>
                      <th className="px-2 py-2 border border-gray-400">Passing Touchdowns</th>
                      <th className="px-2 py-2 border border-gray-400">Rushing Touchdowns</th>
                      <th className="px-2 py-2 border border-gray-400">Receiving Yards</th>
                      <th className="px-2 py-2 border border-gray-400">Receiving Touchdowns</th>
                      <th className="px-2 py-2 border border-gray-400">Total (Across)</th>
                    </tr>
                    </thead>
                    <tbody>
                      { qbs.map((data,idx) => (<ScoringRow key={idx} pos="QB" data={data}/>)) }
                      { rbs.map((data,idx) => (<ScoringRow key={idx} pos="RB" data={data}/>)) }
                      { wrs.map((data,idx) => (<ScoringRow key={idx} pos="WR" data={data}/>)) }
                      { tes.map((data,idx) => (<ScoringRow key={idx} pos="TE" data={data}/>)) }
                      <tr>
                        <th className="px-2 py-2 border border-gray-400" colSpan="2">K</th>
                        <th className="px-2 py-2 border border-gray-400" colSpan="2">Field Goals</th>
                        <th className="px-2 py-2 border border-gray-400" colSpan="2">Point After Touchdown (P.A.T)</th>
                        <th className="px-2 py-2 border border-gray-400" colSpan="2">Total (Across)</th>
                      </tr>
                        { report.kickers.map((data,idx) => (<ScoringRowKickers key={idx} pos="K" data={data}/>)) }
                      <tr>
                        <th className="px-4 py-2 border border-gray-400" colSpan="2">Team</th>
                        <th className="px-4 py-2 border border-gray-400" colSpan="2">Win</th>
                        <th className="px-4 py-2 border border-gray-400" colSpan="2">Tie</th>
                        <th className="px-4 py-2 border border-gray-400" colSpan="2">Total (Across)</th>
                      </tr>
                      <tr>
                        {/* { report.teams.map((data,idx) => (<ScoringRow key={idx} pos="team" data={data}/>)) } */}
                      </tr>
                      </tbody>
                  </table>
            </div>
  )
}

export default ScoringGrid;