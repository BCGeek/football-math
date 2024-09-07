import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

const LeagueAdd = ({ showPage }) => {
    const [name, setName] = useState("");
    const [school, setSchool] = useState("MoundsView");
    const [year, setYear] = useState("2024");

    const [processing, setProcessing] = useState(false);

    const [values, setValues] = useState([]);

    const submit = (e) => {
        console.log("submit");
        e.preventDefault();
        Inertia.post("/dashboard/league", values);
        showPage("list");
    };

    const updateName = (e) => {
        setName(e.target.value);
        setValues((values) => ({
            ...values,
            name: e.target.value,
        }));
    };
    const updateSchool = (e) => {
        setSchool(e.target.value);
        setValues((values) => ({
            ...values,
            school: e.target.value,
        }));
    };
    const updateYear = (e) => {
        setYear(e.target.value);
        setValues((values) => ({
            ...values,
            year: e.target.value,
        }));
    };

    return (
        <div className="py-8">
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
                                handleChange={updateName}
                            />

                            <InputLabel forInput="school" />
                            <TextInput
                                type="text"
                                name="school"
                                value={school}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={updateSchool}
                            />

                            <InputLabel forInput="year" />
                            <TextInput
                                type="text"
                                name="year"
                                value={year}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={updateYear}
                            />
                            <input type="submit" value="Add" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeagueAdd;
