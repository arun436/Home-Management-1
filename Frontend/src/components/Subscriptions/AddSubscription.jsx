import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function AddSubscription({ onSubmit }) {
	let loggedinuserId=localStorage.getItem('Id')
	const planperiods=[3,6,9,12]
	const platforms=['Amazon Prime','Disney Hotstar','Netflix','Ahaa','Spotify']
  const [data, setData] = useState({
		accountname: '',
       planperiod:'',
        startdate:'',
		enddate: '',
        userid:loggedinuserId
	})
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("accountname", data.accountname);
    formdata.append("planperiod", data.planperiod);
		formdata.append("startdate", data.startdate);
		formdata.append("enddate", data.enddate);
		formdata.append("userId",data.userid);
		await axios.post('/api/createsubscription', data)
		.then(res => {
			if(res.data.Status=='Success'){
				window.location.reload();
			}
		})
		.catch(err => console.log(err));
	}
	const handleplanperiod=(e)=>{
		const startdate=new Date()
		data.startdate=`${startdate.getDate()}/${startdate.getMonth()}/${startdate.getFullYear()}`
		if(e.target.value==='3 months'){
        const enddate1=new Date(startdate.setDate(startdate.getDate()+90))
		data.enddate=`${enddate1.getDate()}/${enddate1.getMonth()}/${enddate1.getFullYear()}`
		}
		if(e.target.value==='6 months'){
        const enddate2=new Date(startdate.setDate(startdate.getDate()+180))
		data.enddate=`${enddate2.getDate()}/${enddate2.getMonth()}/${enddate2.getFullYear()}`
		}
		if(e.target.value==='9 months'){
        const enddate3=new Date(startdate.setDate(startdate.getDate()+270))
		data.enddate=`${enddate3.getDate()}/${enddate3.getMonth()}/${enddate3.getFullYear()}`
		}
		if(e.target.value==='12 months'){
        const enddate4=new Date(startdate.setDate(startdate.getDate()+360))
		data.enddate=`${enddate4.getDate()}/${enddate4.getMonth()}/${enddate4.getFullYear()}`
		}
		setData({...data,
			planperiod:e.target.value,
			startdate:data.startdate,
			enddate:data.enddate
	})
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<form className="row g-3 w-50" onSubmit={handleSubmit}>

			<div className="col-12">
			<label className="form-label">SelectPlatform</label>
			<select className="form-control form-control-lg-col-12" name='accountname'
			onChange={e => setData({...data, accountname: e.target.value})}>
			{platforms.map((item,index)=>
			<option key={index}>{item}</option>
			)}
			</select>
				</div>

		 <div className="col-12">
			<label className="form-label">SelectPlanPeriod</label>
			<select className="form-control form-control-lg-col-12" name='planperiod'
			onChange={handleplanperiod}>
			{planperiods.map((item,index)=>
			<option key={index}>{item} months</option>
			)}
			</select>
				</div>

				<div className="col-12">
					<label htmlFor="inputstartdate" className="form-label">StartDate</label>
					<input type="text" className="form-control" id="inputstartdate" name="inputstartdate" placeholder="Enter start date" autoComplete='off'
					defaultValue={data.startdate}/>
				</div>

				<div className="col-12">
					<label htmlFor="inputenddate" className="form-label">EndDate</label>
					<input type="text" className="form-control" id="inputenddate" name="inputenddate" placeholder='Enter end date' autoComplete='off'
					defaultValue={data.enddate} />
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
  )
}

export default AddSubscription
