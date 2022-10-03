import React from 'react'

const ScoringRowWithScores = ({pos, data}) => {
// console.log('ScoringRowWithScores data', data);
let totalPoints  = 0;
    totalPoints += data?.scores?.PassingYards;
    totalPoints += data?.scores?.RushingYards;
    totalPoints += data?.scores?.PassingTouchdowns
    totalPoints += data?.scores?.RushingTouchdowns
    totalPoints += data?.scores?.ReceivingYards
    totalPoints += data?.scores?.ReceivingTouchdowns;
   
  return (
    <>
    <tr>
      <td className="px-2 py-1 border border-gray-400 bg-gray-100 font-bold">{pos}: {data.name}</td>
      <td className="px-2 py-1 border border-gray-400 text-right">{data?.stats?.PassingYards}<span className="font-extrabold ml-2">({data?.scores?.PassingYards} pts)</span></td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.RushingYards}<span className="font-extrabold ml-2">({data?.scores?.RushingYards} pts)</span></td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.PassingTouchdowns}<span className="font-extrabold ml-2">({data?.scores?.PassingTouchdowns} pts)</span></td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.RushingTouchdowns}<span className="font-extrabold ml-2">({data?.scores?.RushingTouchdowns} pts)</span></td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.ReceivingYards}<span className="font-extrabold ml-2">({data?.scores?.ReceivingYards} pts)</span></td>
      <td className="px-2 py-1 border border-gray-400 text-right ">{data?.stats?.ReceivingTouchdowns}<span className="font-extrabold ml-2">({data?.scores?.ReceivingTouchdowns} pts)</span></td>
      <td className="px-2 py-1 border border-gray-400 text-right ">({totalPoints} pts)</td>
    </tr>
    </>
  )
}

export default ScoringRowWithScores