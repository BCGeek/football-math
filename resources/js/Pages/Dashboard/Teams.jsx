import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import TeamAdd from "@/Components/TeamAdd";
import TeamList from "@/Components/TeamList";

export default function Teams(props) {
    console.log("props", props);
    const [page, setPage] = useState("");

    useEffect(() => {
        setPage(props.action);
    }, []);

    console.log("teams", props);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.league.name}: Teams
                </h2>
            }
        >
            <Head title="Teams" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {page === "list" && props.teams.length && (
                            <TeamList teams={props.teams} />
                        )}
                        {page === "add" && (
                            <TeamAdd
                                showPage={setPage}
                                league={props.league.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
