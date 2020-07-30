import React from 'react'

const Item = ({country,handle}) => {
  return (
    <>
      <p>{country.name} <button value={country.name} onClick={handle}>show</button></p>
    </>
  )
}

export default Item
