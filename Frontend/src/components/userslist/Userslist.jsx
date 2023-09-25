import React, { useEffect, useState } from 'react'
import './userslist.css'
import Card from 'react-bootstrap/Card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";
import EditUser from '../Users/EditUser'
import profileavatar from '../../assets/profile avatar.jpg'

function Userslist() {
    const [data, setData] = useState([])
    const {id} = useParams()
    const [show, setShow] = useState(false);
    const [Id,setId]=useState('')
    const navigate=useNavigate()
    let adminId=localStorage.getItem('AdminId')
    const handleClose = () => {
      setShow(false);
    }
    const handleShow = (Id) =>{
      setShow(true);
      setId(Id)
    } 

    const getusers=async()=>{
        const res=await axios.get('/api/getUsers',{params:{adminid:adminId}})
        .then(res=>{
          if(res.data.Status==='Success'){
            setData(res.data.Result[0])
          }
        })
        .catch(err=>console.log(err))
       
      }

     
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

      
    
      useEffect(()=> {
        getusers();
      }, [])
  return (
    
    <div>
      { data&&
        data.map((user,index)=>{
            return <div key={user.Id}>
            <Card className="text-center" border="primary" style={{ width: '14rem',marginLeft:'25px',height:'110px' }}>
        <Card.Header style={{ marginTop:'-30px',fontWeight:'bold' }}><span style={{ marginTop:'-30px',fontWeight:'bold' }}>{user.Name}</span></Card.Header>
        
        <Card.Body>
          <Card.Title>
          {user.Image!=null?
            <img src={`http://localhost:8801/images/`+user.Image} alt="" id='user_imagenew'/>:
            <img src={profileavatar} alt="" id='user_imagenew'/>
          }

          </Card.Title>
          <Card.Text id='card-text'>
           <span id="user-email">{user.Email}</span>
          <button className='button11  bi bi-pencil-fill' id='edit-button' onClick={e=>handleShow(user.Id)}></button>
          <button className='button12  bi bi-trash'  id='delete-button' onClick={e => handleDelete(user.Id)}></button>
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
      
      })
      }
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUser data1={Id}/>
        </Modal.Body>
        <Modal.Footer>
          </Modal.Footer>
      </Modal>
    </div>

    
  )
}

export default Userslist
