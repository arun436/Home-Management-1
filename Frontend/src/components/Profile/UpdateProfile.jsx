import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProfile() {
    const [data, setData] = useState({
		name: '',
		email: ''
	})
	const navigate = useNavigate()
	
	const {id} = useParams();

	useEffect(()=> {
		axios.get('/api/getuser/'+id)
		.then(res => {
			setData({...data.Result, name: res.data.Result[0].Name,
				age: res.data.Result[0].Age,
				phone: res.data.Result[0].Phone,
			  email: res.data.Result[0].Email,
			  image: res.data.Result[0].Image
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('/api/updateuser/'+id, data)
		.then(res => {
			if(res.data.Status === "Success") {
				navigate('/dashboard/profile')
			}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
    <h2>Update User</h2>
    <form className="row g-3 w-50" onSubmit={handleSubmit}>
    <div className="col-12">
        <label htmlFor="inputName" className="form-label">Name</label>
        <input type="text" className="form-control" id="inputName"  name="inputName" placeholder='Enter Name' autoComplete='off'
        onChange={e => setData({...data, name: e.target.value})} value={data?.name|| ''}/>
      </div>
      <div className="col-12">
        <label htmlFor="inputAge" className="form-label">Age</label>
        <input type="text" className="form-control" id="inputAge"  name="inputAge"placeholder="Enter Age" autoComplete='off'
        onChange={e => setData({...data,age: e.target.value})} value={data?.age|| ''}/>
      </div>
      <div className="col-12">
        <label htmlFor="inputPhone" className="form-label">Phone</label>
        <input type="text" className="form-control" id="inputPhone" name="inputPhone" placeholder="Enter phone number" autoComplete='off'
        onChange={e => setData({...data, phone: e.target.value})} value={data?.phone|| ''}/>
      </div>
      <div className="col-12">
        <label htmlFor="inputEmail4" className="form-label">Email</label>
        <input type="email" className="form-control" id="inputEmail4" name="inputEmail4" placeholder='Enter Email' autoComplete='off'
        onChange={e => setData({...data, email: e.target.value})} value={data?.email|| ''}/>
      </div>
      
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
  )
}

export default UpdateProfile
