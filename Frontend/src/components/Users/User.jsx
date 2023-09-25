import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../App.css'


function User() {
  const [data, setData] = useState([])
  const {id} = useParams()
  const getusers=async()=>{
    const res=await fetch('/api/getUsers')
    const users=await res.json()
    setData(users.Result)
  }
  

  useEffect(()=> {
    getusers();
  }, [])

  const handleDelete = (id) => {
    axios.delete('/api/deleteuser/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload();
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }
  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Users List</h3>
      </div>
      <Link to="/dashboard/create" className='btn btn-success'>Add User</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Photo</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data&&data.length>0?data.map((user, index) => {
              return <tr key={user.Id}>
                  <td>{user.Name}</td>
                  <td>{
                    <img src={`http://localhost:8801/images/`+user.Image} alt="" className='user_image'/>
                    }</td>
                  <td>{user.Age}</td>
                  <td>{user.Phone}</td>
                  <td>{user.Email}</td>
                  <td>
                    <Link to={`/dashboard/userEdit/`+user.Id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(user.Id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            }):null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User
