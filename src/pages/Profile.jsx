/* eslint-disable no-unused-vars */
import {useContext} from 'react'
import Loader from '../components/Loader'
import { Context } from "../main"

const Profile = () => {

    const {isAuthenticated, users, loading} = useContext(Context)

  return (
    loading ? <Loader/> : (
        <div>
        <h1>{users?.name}</h1>
        <p>{users?.email}</p>
    </div>
    )
  )
}

export default Profile