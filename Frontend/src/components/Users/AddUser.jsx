import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddUser() {
	const adminId=localStorage.getItem('AdminId')
  const [data, setData] = useState({
		name: '',
    age:'',
    phone:'',
		email: '',
		password: '',
		image: '',
		adminId:adminId
	})
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
    formdata.append("age", data.age);
		formdata.append("phone", data.phone);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		formdata.append("image", data.image);
		formdata.append("adminid", data.adminId);
		await axios.post('/api/createuser', formdata)
		.then(res => {
			if(res.data.Status=='Success'){
			window.location.reload()
			}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add User</h2>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>
			<div className="col-12">
					<label htmlFor="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" name="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
        <div className="col-12">
					<label htmlFor="inputAge" className="form-label">Age</label>
					<input type="text" className="form-control" id="inputAge"  name="inputAge" placeholder="Enter Age" autoComplete='off'
					onChange={e => setData({...data, age: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputPhone" className="form-label">Phone</label>
					<input type="text" className="form-control" id="inputPhone" name="inputPhone" placeholder="Enter Phone number" autoComplete='off'
					onChange={e => setData({...data, phone: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" name="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" name="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})}/>
				</div>
				<div className="col-12 mb-3">
					<label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
					<input type="file" className="form-control" id="inputGroupFile01" name="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
  )
}

export default AddUser
