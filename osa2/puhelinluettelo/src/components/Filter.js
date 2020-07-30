import React from 'react'

const Filter = (props) => {
    return (
        <>
        <label>Filter persons: </label>
        <input value={props.value} onChange={props.handle}/>
        </>
    )
}
export default Filter