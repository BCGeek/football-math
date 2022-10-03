import React from 'react'
import ScoringRowWithScores from './ScoringRowWithScores';
import ScoringRowKickersWithScores from './ScoringRowKickersWithScores';
const ScoringGridWithScores = ({report}) => {
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
                      { qbs.map((data,idx) => (<ScoringRowWithScores key={idx} pos="QB" data={data}/>)) }
                      { rbs.map((data,idx) => (<ScoringRowWithScores key={idx} pos="RB" data={data}/>)) }
                      { wrs.map((data,idx) => (<ScoringRowWithScores key={idx} pos="WR" data={data}/>)) }
                      { tes.map((data,idx) => (<ScoringRowWithScores key={idx} pos="TE" data={data}/>)) }
                      <tr>
                        <th className="px-2 py-2 border border-gray-400" colSpan="3">K</th>
                        <th className="px-2 py-2 border border-gray-400" colSpan="2">Field Goals</th>
                        <th className="px-2 py-2 border border-gray-400" colSpan="2">Point After Touchdown (P.A.T)</th>
                        <th className="px-2 py-2 border border-gray-400 bg-gray-100" colSpan="1"></th>
                      </tr>
                        { report.kickers.map((data,idx) => (<ScoringRowKickersWithScores key={idx} pos="K" data={data}/>)) }
                      <tr>
                        <th className="px-4 py-2 border border-gray-400" colSpan="3">Team</th>
                        <th className="px-4 py-2 border border-gray-400" colSpan="2">Win</th>
                        <th className="px-4 py-2 border border-gray-400" colSpan="2">Tie</th>
                        <th className="px-4 py-2 border border-gray-400 bg-gray-100" colSpan="1"></th>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-2 py-1 border border-gray-400 bg-gray-100 font-bold">&nbsp;</td>
                        <td colSpan="2" className="px-2 py-1 border border-gray-400 text-right"></td>
                        <td colSpan="2" className="px-2 py-1 border border-gray-400 text-right "></td>
                        <td colSpan="1" className="px-2 py-1 border border-gray-400 text-right "></td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-2 py-1 border border-gray-400 bg-gray-100 font-bold">&nbsp;</td>
                        <td colSpan="2" className="px-2 py-1 border border-gray-400 text-right"></td>
                        <td colSpan="2" className="px-2 py-1 border border-gray-400 text-right "></td>
                        <td colSpan="1" className="px-2 py-1 border border-gray-400 text-right "></td>
                      </tr>
                      </tbody>
                  </table>
            </div>
  )
}

export default ScoringGridWithScores;