import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditSubscription({data1}) {

  const [data, setData] = useState({
		accountname:'',
    planperiod:'',
    startdate:'',
    enddate:''
	})
  const planperiods=[3,6,9,12]
	const navigate = useNavigate()
	
	const {id} = useParams();

	useEffect(()=> {
		axios.get('/api/getsubscription/'+data1)
		.then(res => {
			setData({...data, accountname: res.data.Result[0][0].AccountName,
				planperiod: res.data.Result[0][0].PlanPeriod,
				startdate: res.data.Result[0][0].StartDate,
			  enddate: res.data.Result[0][0].EndDate,
			})
		})
		.catch(err =>console.log(err));
	}, [])

  const handleplanperiod=(e)=>{
	switch(e.target.value){
    case '3 months':
            const newstartdate1=data.startdate.split('/')
            const newdate1=new Date(newstartdate1[2],newstartdate1[1]-1,newstartdate1[0])
            const enddate1=new Date(newdate1)
            enddate1.setDate(enddate1.getDate()+90)
             data.enddate=`${enddate1.getDate()}/${enddate1.getMonth()+1}/${enddate1.getFullYear()}`
            break;
        case '6 months':
            const newstartdate2=data.startdate.split('/')
            const newdate2=new Date(newstartdate2[2],newstartdate2[1]-1,newstartdate2[0])
            const enddate2=new Date(newdate2)
            enddate2.setDate(enddate2.getDate()+180)
             data.enddate=`${enddate2.getDate()}/${enddate2.getMonth()+1}/${enddate2.getFullYear()}`
            break;
        case '9 months':
            const newstartdate3=data.startdate.split('/')
            const newdate3=new Date(newstartdate3[2],newstartdate3[1]-1,newstartdate3[0])
            const enddate3=new Date(newdate3)
            enddate3.setDate(enddate3.getDate()+270)
             data.enddate=`${enddate3.getDate()}/${enddate3.getMonth()+1}/${enddate3.getFullYear()}`
            break;
        case '12 months':
            const newstartdate4=data.startdate.split('/')
            const newdate4=new Date(newstartdate4[2],newstartdate4[1]-1,newstartdate4[0])
            const enddate4=new Date(newdate4)
            enddate4.setDate(enddate4.getDate()+360)
             data.enddate=`${enddate4.getDate()}/${enddate4.getMonth()+1}/${enddate4.getFullYear()}`
            break;
        default:
            data.enddate=data.enddate;
            break;
    }
		setData({...data,
			planperiod:e.target.value,
			startdate:data.startdate,
			enddate:data.enddate
	})
  }
	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('/api/updateusubscription/'+data1, data)
		.then(res => {
			if(res.data.Status === "Success") {
				window.location.reload();
			}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
    <form className="row g-3 w-50" onSubmit={handleSubmit}>
    <div className="col-12">
        <label htmlFor="inputAccountName" className="form-label">AccountName</label>
        <input type="text" className="form-control" id="inputAccountName"  name="inputAccountName" placeholder='Select Account Name' autoComplete='off'
        onChange={e => setData({...data, accountname: e.target.value})} value={data?.accountname|| ''}/>
      </div>
      <div className="col-12">
			<label className="form-label">SelectPlanPeriod</label>
			<select className="form-control form-control-lg-col-12" name='planperiod' value={data.planperiod}
			onChange={handleplanperiod} >
			{planperiods.map((item,index)=>
			<option key={index} >{item} months</option>
			)}
			</select>
				</div>
      <div className="col-12">
        <label htmlFor="inputStartdate" className="form-label">Startdate</label>
        <input type="text" className="form-control" id="inputStartdate" name="inputStartdate" placeholder="Enter start date " autoComplete='off'
        onChange={e => setData({...data, startdate: e.target.value})} value={data?.startdate|| ''}/>
      </div>
      <div className="col-12">
        <label htmlFor="inputenddate" className="form-label">Enddate</label>
        <input type="text" className="form-control" id="inputenddate" name="inputenddate" placeholder='Enter End date' autoComplete='off'
        onChange={e => setData({...data, enddate: e.target.value})} value={data?.enddate|| ''}/>
      </div>
      
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
  )
}

export default EditSubscription
