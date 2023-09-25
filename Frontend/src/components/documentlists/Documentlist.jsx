import React, { useEffect, useState } from 'react'
import './documentlist.css'
import Card from 'react-bootstrap/Card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";
import EditDocument from '../Documents/EditDocument'

function Documentlist() {
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

    const getdocuments=async()=>{
        const res=await axios.get('/api/getdocuments',{params:{userid:userId}})
        .then(res=>{
          if(res.data.Status==='Success'){
            setData(res.data.Result[0])
          }
        })
        .catch(err=>console.log(err))
       
      }

      
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

      
    
      useEffect(()=> {
        getdocuments();
      }, [])
  return (
    
    <div>
      { data.length>0?
        data.map((document,index)=>{
            return <div key={document.Id}>
            <Card className="text-center" border="primary" style={{ width: '14rem',marginLeft:'25px',height:'110px' }}>
        <Card.Header  style={{ marginTop:'-30px',fontWeight:'bold' }}>{document.DocumentName}</Card.Header>
        <Card.Body>
          <Card.Title ></Card.Title>
          <Card.Text style={{ marginTop:'-10px',fontWeight:'normal',fontSize:'12px',width:'70px' }}>
          {index==0?
          <span  className="dot bi bi-check">
          </span>:
          ""
          }
          Ends on <strong>{document.EndDate}</strong>
          <button className='button9  bi bi-pencil-fill' onClick={e=>handleShow(document.Id)}></button>
          <button className='button10  bi bi-trash' onClick={e => handleDelete(document.Id)}></button>
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
      
      }):
      <div id='nodocuments-text'>No Documents</div>
      }
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditDocument data1={Id}/>
        </Modal.Body>
        <Modal.Footer>
          </Modal.Footer>
      </Modal>
    </div>

    
  )
}

export default Documentlist
