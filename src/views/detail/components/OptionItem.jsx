import React from 'react'
import PropTypes from 'prop-types'

const OptionItem = ({ name, radioGroupName, value, isChecked }) => {
  return (
    <>
      <input
        type="radio"
        value={value}
        className="btn-check"
        name={radioGroupName}
        id={name.toLowerCase()}
        autoComplete="off"
        defaultChecked={isChecked}
      />
      <label className="btn btn-outline-secondary" htmlFor={name.toLowerCase()}>
        {name}
      </label>
    </>
  )
}

OptionItem.propTypes = {
  name: PropTypes.string,
  radioGroupName: PropTypes.string,
  value: PropTypes.number,
  isChecked: PropTypes.bool
}

export default OptionItem
