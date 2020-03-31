import React from 'react'

const Filter = ({ input, onChange }) => {
    return (
        <div>
        filter shown with <input value={input} onChange={onChange} />
        </div>
    )
}

export default Filter