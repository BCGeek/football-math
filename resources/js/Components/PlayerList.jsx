import React from 'react'

function PlayerList({players, kickers, nfl_teams}) {
  const qbs = players.filter(player => {return player.Position==='QB'});
  const rbs = players.filter(player => {return player.Position==='RB'});
  const wrs = players.filter(player => {return player.Position==='WR'});
  const tes = players.filter(player => {return player.Position==='TE'});
  // const ks = kickers.filter(player => {return player.Position==='K'});
  // const teams = players.filter(player => {return player.Position==='TEAM'});

  return (
          <ul className="flex-1">
              <li className="text-lg font-bold">Quarterbacks</li>
              {
                qbs.map((qb) => {
                  return (<li key={qb.PlayerID} className="pl-3">{qb.Name}</li>)
                })
              }
              <li className="text-lg font-bold">Running Backs</li>
              {
                rbs.map((rb) => {
                  return (<li key={rb.PlayerID} className="pl-3">{rb.Name}</li>)
                })
              }
              <li className="text-lg font-bold">Wide Receivers</li>
              {
                wrs.map((wr) => {
                  return (<li key={wr.PlayerID} className="pl-3">{wr.Name}</li>)
                })
              }
              <li className="text-lg font-bold">Tight Ends</li>
              {
                tes.map((te) => {
                  return (<li key={te.PlayerID} className="pl-3">{te.Name}</li>)
                })
              }
              <li className="text-lg font-bold">Kickers</li>
              {
                kickers.map((k) => {
                  return (<li key={k.PlayerID} className="pl-3">{k.Name}</li>)
                })
              }
              <li className="text-lg font-bold">Teams</li>
              {
                nfl_teams.map((team) => {
                  return (<li key={team.PlayerID} className="pl-3">{team.Name}</li>)
                })
              }

          </ul>
        )
}

export default PlayerList