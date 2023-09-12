import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import InputLabel from './InputLabel'
import PrimaryButton from './PrimaryButton'
import TextInput from './TextInput'

const LeagueAdd = ({showPage}) => {

  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [values,setValues] = useState({name:''})

  const submit = (e) => {
    e.preventDefault();
    Inertia.post('/dashboard/leagues', values);
    showPage('list');
  }

  const handleChange2 = (e) => {
    setName(e.target.value)
    setValues(values => ({
      ...values, 'name': e.target.value,
    }));
  }

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
                        handleChange = {handleChange2}
                    />


                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default LeagueAdd