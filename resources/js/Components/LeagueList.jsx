import { Link } from "@inertiajs/inertia-react";
import React from "react";

const LeagueList = ({ leagues }) => {
    console.log("leagues", leagues, leagues.length);

    const listItems = leagues.map((league) => (
        <li key={league.id}>
            <Link href={"/dashboard/teams/" + league.id}>{league.name}</Link>
        </li>
    ));
    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    {leagues.length > 0 && <ul>{listItems}</ul>}
                </div>
                {!leagues.length && <p>There are no leagues yet.</p>}
            </div>
        </div>
    );
};

export default LeagueList;
