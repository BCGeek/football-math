import React from 'react'

const ScoringRow = ({pos, data}) => {
console.log('ScoringRow data', data);

  return (
    <>
    <tr>
      <td className="px-2 py-1 border border-gray-400 bg-gray-100 font-bold">{pos}: {data.name}</td>
      <td className="px-2 py-1 border border-gray-400 text-right">{data?.stats?.PassingYards}</td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.RushingYards}</td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.PassingTouchdowns}</td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.RushingTouchdowns}</td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.ReceivingYards}</td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.ReceivingTouchdowns}</td>
      <td className="px-2 py-1 border border-gray-400 text-right "></td>
    </tr>
    </>
  )
}

export default ScoringRow