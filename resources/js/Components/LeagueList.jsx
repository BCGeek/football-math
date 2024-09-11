import { Link } from "@inertiajs/inertia-react";
import React from "react";

const LeagueList = ({ leagues }) => {
    console.log("leagues", leagues, leagues.length);

    const listItems = leagues.map((league) => (
        <li key={league.id}>
            <Link
                className="inline-flex px-5 py-3 text-white
                bg-green-600 hover:bg-green-700 focus:bg-green-700
                rounded-md ml-6 mb-3 w-full"
                href={"/dashboard/league/" + league.id}
            >
                {league.name}
            </Link>
        </li>
    ));
    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-transparent overflow-hidden shadow-sm sm:rounded-lg flex justify-start p-4">
                    {leagues.length > 0 && <ul>{listItems}</ul>}
                </div>
                {!leagues.length && <p>There are no leagues yet.</p>}
            </div>
        </div>
    );
};

export default LeagueList;
