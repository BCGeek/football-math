import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

const TeamAdd = ({ showPage, league }) => {
    console.log("league", league, showPage);

    const [name, setName] = useState("");
    const [processing, setProcessing] = useState(false);
    const [values, setValues] = useState({ name: "", league_id: league.id });
    const [redir, setRedir] = useState({});

    const submit = (e) => {
        e.preventDefault();
        Inertia.post("/dashboard/league/addteam", values);
        showPage({ page: "list", league_id: values.league_id, league: league });
    };

    const handleChange = (e) => {
        setName(e.target.value);
        setValues((values) => ({
            ...values,
            name: e.target.value,
        }));
    };

    return (
        <div className="py-8">
            <h2 className="ml-6 mb-3"> Add Team</h2>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel forInput="name" value="Name" />

                            <TextInput
                                type="text"
                                name="name"
                                value={name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={handleChange}
                            />

                            <PrimaryButton
                                className="inline-flex ml-0 mt-2 px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md "
                                processing={processing}
                            >
                                Add Team
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeamAdd;
