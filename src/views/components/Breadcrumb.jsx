import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const Breadcrumb = ({ linkPath, children, isActive }) => {
  if (!isActive) {
    return (
      <li className="breadcrumb-item active" aria-current="page">
        {children}
      </li>
    )
  }

  return (
    <li className="breadcrumb-item" aria-current="page">
      <Link to={linkPath}>{children}</Link>
    </li>
  )
}

Breadcrumb.propTypes = {
  linkPath: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  isActive: PropTypes.bool
}

export default Breadcrumb
