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
  children: PropTypes.element
}

export default DefaultView
