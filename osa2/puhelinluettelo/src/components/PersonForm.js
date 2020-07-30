import React from 'react'

const PersonForm = (props) => {
    return (
        <>
        <form onSubmit={props.handleSubmit}>
            <div>
                name: <input value={props.name} onChange={props.handleName} />
            </div>
            <div>
                number: <input value={props.phone} onChange={props.handlePhone} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}
export default PersonForm