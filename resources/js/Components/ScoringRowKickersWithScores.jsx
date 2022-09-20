import React from 'react'

const ScoringRowKickers = ({pos, data}) => {
console.log('ScoringRow data', data);

  return (
    <>
    <tr>
      <td colSpan="2" className="px-2 py-1 border border-gray-400 bg-gray-100 font-bold">{pos}: {data.name}</td>
      <td colSpan="2" className="px-2 py-1 border border-gray-400 text-right">{data?.stats?.FieldGoalsMade}<span className="font-extrabold ml-2">({data?.scores?.FieldGoalsMade} pts)</span></td>
      <td colSpan="2" className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.ExtraPointsMade}<span className="font-extrabold ml-2">({data?.scores?.ExtraPointsMade} pts)</span></td>
      <td colSpan="2" className="px-2 py-1 border border-gray-400 text-right "></td>
    </tr>
    </>
  )
}

export default ScoringRowKickers