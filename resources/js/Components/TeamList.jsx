import { Link } from '@inertiajs/inertia-react';
import React from 'react'

const TeamList = ({teams}) => {
  console.log('teams', teams, teams.length);
  const listItems =  teams.map((teams) => <li key={teams.id}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-200" ><Link href={'/dashboard/team/'+teams.id}>{teams.name}</Link></button></li>);

  return (
    <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              {
                teams.length>0 && (
                  <ul>
                    {
                      listItems
                    }
                  </ul>
                )
              }
            </div>
        </div>
    </div>
  )
}

export default TeamList