import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../../App.css'


function ViewDocument() {
  const location=useLocation()
  const navigate=useNavigate()
  const [data, setData] = useState([])
  const {id} = useParams()
  const getdocuments=async()=>{
    const res=await fetch('/api/getdocuments')
    const documents=await res.json()
    setData(documents.Result)
  }
  

  useEffect(()=> {
    getdocuments();
  }, [])

  const handleDelete = (id) => {
    axios.delete('/api/deletedocument/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  const gotoAddDocument =()=>{
navigate('/dashboard/createdocument',{
  state:location.state
})
  } 

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Documents List</h3>
      </div>
      <button onClick={gotoAddDocument} className='btn btn-success'>Add Document</button>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>DocumentName</th>
              <th>StartDate</th>
              <th>RenewalPeriod</th>
              <th>EndDate</th>
            </tr>
          </thead>
          <tbody>
            {data&&data.length>0?data.map((document, index) => {
              return <tr key={document.Id}>
                  <td>{document.DocumentName}</td>
                  <td>{document.CreatedDate}</td>
                  <td>{document.RenewalPeriod}</td>
                  <td>{document.EndDate}</td>
                  <td>
                    <Link to={`/dashboard/documentEdit/`+document.Id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(document.Id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            }):null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewDocument
