import React, { useEffect, useState } from 'react'
import './subscribelist.css'
import Card from 'react-bootstrap/Card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";
import EditSubsription from '../Subscriptions/EditSubscription';

function Subscribelist() {
    const [data, setData] = useState([])
    const {id} = useParams()
    const [show, setShow] = useState(false);
    const [Id,setId]=useState('')
    const navigate=useNavigate()
let userId=localStorage.getItem('Id')
    const handleClose = () => {
      setShow(false);
    }
    const handleShow = (Id) =>{
      setShow(true);
      setId(Id)
    } 

    const getsubscriptions=async()=>{
        const res=await axios.get('/api/getsubscriptions',{params:{userid:userId}})
        .then(res=>{
          if(res.data.Status==='Success'){
            setData(res.data.Result[0])
          }
        })
        .catch(err=>console.log(err))
       
      }
    
      const handleDelete = (id) => {
        axios.delete('/api/deletesubscription/'+id)
        .then(res => {
          if(res.data.Status === "Success") {
            window.location.reload()
          } else {
            alert("Error")
          }
        })
        .catch(err => console.log(err));
      }
      
    
      useEffect(()=> {
        getsubscriptions();
      }, [])
  return (
    
    <div>
      { data.length>0?
        data.map((subscribe,index)=>{
            return <div key={subscribe.Id}>
            <Card className="text-center" border="primary" style={{ width: '14rem',marginLeft:'25px',height:'110px' }}>
        <Card.Header  style={{ marginTop:'-30px',fontWeight:'bold' }}>{subscribe.AccountName}</Card.Header>
        <Card.Body>
          <Card.Title ></Card.Title>
          <Card.Text style={{ marginTop:'-10px',fontWeight:'normal',fontSize:'12px',width:'70px' }}>
          {index==0?
            <span  className="dot bi bi-check"></span>:
          ""
          }
          Ends on <strong>{subscribe.EndDate}</strong>
          <button className='button7  bi bi-pencil-fill' onClick={e=>handleShow(subscribe.Id)}></button>
          <button className='button8  bi bi-trash' onClick={e => handleDelete(subscribe.Id)}></button>
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
      
      }):
      <div id='nosubscription-text'>No Subscriptions </div>
      }
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditSubsription data1={Id}/>
        </Modal.Body>
        <Modal.Footer>
          </Modal.Footer>
      </Modal>
    </div>

    
  )
}

export default Subscribelist
