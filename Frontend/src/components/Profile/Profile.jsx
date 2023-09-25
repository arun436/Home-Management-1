import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
function Profile() {
  const userId=localStorage.getItem('Id')
  const [loading,setloading]=useState(false)
  const [data,setData]=useState({
    name: '',
	email: '',
    age:'',
    phone:'',
    image:''

  })
  const navigate=useNavigate();
  const updateprofilephoto=()=>{
    let formdata=new FormData()
    formdata.append('image',data.image)
    axios.put('/api/updateuserprofileimage/'+userId, formdata)
		.then(res => {
			if(res.data.Status === "Success") {
				window.location.reload();
			}
		})
		.catch(err => console.log(err));
  }

  useEffect(()=>{
    axios.get('/api/getuser/'+userId)
		.then(res => {
			setData({...data.Result, name: res.data.Result[0][0].Name,
				age: res.data.Result[0][0].Age,
				phone: res.data.Result[0][0].Phone,
			  email: res.data.Result[0][0].Email,
              image:res.data.Result[0][0].Image
			})
		})
		.catch(err =>{console.log(err)
        }
        );
    
  },[])
  
  return (
    <div className="container container-fluid">
        <h2 className="mt-5 ml-5">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                {data.image!=null?
                    <img className="rounded-circle img-fluid" src={`http://localhost:8801/images/`+data.image} alt='' />:
                    <img src={profileavatar} className='rounded-circle img-fluid'/>
                }
                </figure>
                <label className="form-label" htmlFor="inputGroupFile01">Update Photo</label>
					<input type="file" className="form-control" id="inputGroupFile01" name="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
                    <button onClick={updateprofilephoto}>Upload</button>
     
            </div>
            
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{data.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{data.email}</p>

               <Link to={`/dashboard/profileEdit/`+userId} className="btn btn-primary btn-block mt-3">
                    Change Details
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Profile
