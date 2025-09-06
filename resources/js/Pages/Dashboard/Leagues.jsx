import React from "react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import LeagueAdd from "@/Components/LeagueAdd";
import LeagueList from "@/Components/LeagueList";
import { Head } from "@inertiajs/inertia-react";

export default function Leagues(props) {
    const [page, setPage] = useState("");

    useEffect(() => {
        setPage(props.action);
    }, []);

    console.log("leagues props", props);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Leagues
                </h2>
            }
        >
            <Head title="Leagues" />
            {page === "list" && <LeagueList leagues={props.leagues} />}
            {page === "add" && <LeagueAdd showPage={setPage} />}
            {page === "list" && (
                <a
                    className="inline-flex px-5 py-3 text-white
                    bg-purple-600 hover:bg-purple-700 focus:bg-purple-700
                    rounded-md ml-6 mb-3"
                    onClick={() => setPage("add")}
                >
                    Add League
                </a>
            )}
        </AuthenticatedLayout>
    );
}
