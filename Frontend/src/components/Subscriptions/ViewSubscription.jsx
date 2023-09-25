import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../../App.css'


function ViewSubscription() {
  const location=useLocation()
  const navigate=useNavigate()
  const [data, setData] = useState([])
  const {id} = useParams()
  const getsubscriptions=async()=>{
    const res=await fetch('/api/getsubscriptions')
    const subscriptions=await res.json()
    setData(subscriptions.Result)
  }
  

  useEffect(()=> {
    getsubscriptions();
  }, [])

  const handleDelete = (id) => {
    axios.delete('/api/deletesubscription/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  const gotoAddSubscription =()=>{
navigate('/dashboard/createsubscription',{
  state:location.state
})
  } 

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Subscriptions List</h3>
      </div>
      <button onClick={gotoAddSubscription} className='btn btn-success'>Add Subscription</button>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>AccountName</th>
              <th>PlanPeriod</th>
              <th>StartDate</th>
              <th>EndDate</th>
            </tr>
          </thead>
          <tbody>
            {data&&data.length>0?data.map((subscription, index) => {
              return <tr key={subscription.Id}>
                  <td>{subscription.AccountName}</td>
                  <td>{subscription.PlanPeriod}</td>
                  <td>{subscription.StartDate}</td>
                  <td>{subscription.EndDate}</td>
                  <td>
                    <Link to={`/dashboard/subscriptionEdit/`+subscription.Id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(subscription.Id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            }):null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewSubscription
