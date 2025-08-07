import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import React, { useEffect } from 'react'
import { allUser } from './features/userSlice';

function App() {
  
  const dispatch = useDispatch();
  const {users,loading}=useSelector((state)=>state.users);

  useEffect(()=>{
    dispatch(allUser())
  },[])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      {users.map((u)=>(
        <p>{u.url}</p>
      ))}    
    </div>
  )
}

export default App
