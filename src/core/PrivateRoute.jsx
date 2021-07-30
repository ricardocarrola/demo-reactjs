import React  from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../core/services/AuthContext';

export default function PrivateRoute({ component: Component, ...props }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...props}
      render={prps => {
        return currentUser ? <Component {...prps} /> : <Redirect to="/login" />
      }}
    >
    </Route>
  )
}
