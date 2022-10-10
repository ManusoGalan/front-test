import React from 'react'
import PropTypes from 'prop-types'

import Header from './components/Header'

const DefaultView = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

DefaultView.propTypes = {
  children: PropTypes.elementType
}

export default DefaultView
