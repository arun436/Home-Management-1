import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Subscribelist from './subscribelists/Subscribelist';
import Documentlist from './documentlists/Documentlist';
import Card from 'react-bootstrap/Card';
import { Modal, Button, Form } from "react-bootstrap";
import AddSubscription from './Subscriptions/AddSubscription';
import AddDocument from './Documents/AddDocument';
import AddUser from './Users/AddUser';
import Userslist from './userslist/Userslist';
import axios from 'axios'

function Home() {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    let userId=localStorage.getItem('Id')
    let AdminId=localStorage.getItem('AdminId')
  const handleClose1 = () => {
    setShow1(false);
    setToggle1(true)
  }
  const handleClose2 = () => {
    setShow2(false);
    setToggle2(true)
  }
  const handleClose3 = () => {
    setShow3(false);
    setToggle3(true)

  }
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const handleShow3 = () => setShow3(true);

  const onsubscriptionFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };
  const ondocumentFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };
  const onuserFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };
  

const navigate=useNavigate();
const [subscriptionscount,setsubscriptionscount]=useState(0)
const [documentscount,setdocumentscount]=useState(0)
const [userscount,setuserscount]=useState(0)
const [toggle1, setToggle1] = useState(false);
const [toggle2, setToggle2] = useState(false);
const [toggle3, setToggle3] = useState(false);

 const handletoggle1=()=>{
    setToggle1(prev => {
        return !prev
    })
 }
 const handletoggle2=()=>{
    setToggle2(prev => {
        return !prev
    })
 }
 const handletoggle3=()=>{
    setToggle3(prev => {
        return !prev
    })
 }
 const getsubscriptions=async()=>{
  const res=await axios.get('/api/getsubscriptions',{params:{userid:userId}})
  .then(res=>{
    if(res.data.Status==='Success'){
      setsubscriptionscount(res.data.Result[0].length)
    }
  })
  .catch(err=>console.log(err))
 
}
const getdocuments=async()=>{
  const res=await axios.get('/api/getdocuments',{params:{userid:userId}})
  .then(res=>{
    if(res.data.Status==='Success'){
      setdocumentscount(res.data.Result[0].length)
    }
  })
  .catch(err=>console.log(err))
 
}

const getusers=async()=>{
  const res=await axios.get('/api/getUsers',{params:{adminid:AdminId}})
  .then(res=>{
    if(res.data.Status==='Success'){
      setuserscount(res.data.Result[0].length)
    }
  })
  .catch(err=>console.log(err))
 
}

    useEffect(()=>{
  getsubscriptions();
  getdocuments();
  getusers();
    })


  return (
    <div>
    <div className="container">
    <div className="row">
<Card className="text-center" border="primary" style={{ width: '14rem',marginLeft:'37px',height:'140px' }}>
        <Card.Header  style={{ marginTop:'-30px',fontWeight:'bold',fontSize:'20px' }}>Subscriptions</Card.Header>
        <Card.Body>
          <Card.Title ></Card.Title>
          <Card.Text style={{ marginTop:'-10px',fontWeight:'bold',fontSize:'18px',width:'100px' }}>
          Total : <strong>{subscriptionscount}</strong>
          <button  className='button1 btn-primary' onClick={handletoggle1}>View</button>
          <button className='button2 btn-primary' onClick={handleShow1}>Add</button>
          </Card.Text>
        </Card.Body>
      </Card>
      <div>
        {
            toggle1?
            <Subscribelist />:''
        }
      </div>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSubscription onSubmit={onsubscriptionFormSubmit} />
        </Modal.Body>
        <Modal.Footer>
          </Modal.Footer>
      </Modal>
      </div>
      </div>


      <div>
      <div className="row" style={{ width: '14rem',marginLeft:'250px',height:'140px',marginTop:'-400px' }}>
<Card className="text-center" border="primary" style={{ width: '14rem',marginLeft:'37px',height:'140px' }}>
        <Card.Header  style={{ marginTop:'-30px',fontWeight:'bold',fontSize:'20px' }}>Documents</Card.Header>
        <Card.Body>
          <Card.Title ></Card.Title>
          <Card.Text style={{ marginTop:'-10px',fontWeight:'bold',fontSize:'18px',width:'120px' }}>
          Total : <strong>{documentscount}</strong>
          <button className='button3 btn-primary' onClick={handletoggle2}>View</button>
          <button className='button4 btn-primary' onClick={handleShow2}>Add</button>
          </Card.Text>
        </Card.Body>
      </Card>
      <div>
        {
            toggle2?
            <Documentlist />:''
        }
      </div>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddDocument onSubmit={ondocumentFormSubmit}/>
        </Modal.Body>
        <Modal.Footer>
          </Modal.Footer>
      </Modal>
      </div>
      </div>


      <div>
      <div className="row" style={{ width: '14rem',marginLeft:'500px',height:'140px',marginTop:'-139px' }}>
<Card className="text-center" border="primary" style={{ width: '14rem',marginLeft:'37px',height:'140px' }}>
        <Card.Header  style={{ marginTop:'-30px',fontWeight:'bold',fontSize:'20px' }}>Users</Card.Header>
        <Card.Body>
          <Card.Title ></Card.Title>
          <Card.Text style={{ marginTop:'-10px',fontWeight:'bold',fontSize:'18px',width:'120px' }}>
          Total : <strong>{userscount}</strong>
          <button className='button5 btn-primary' onClick={handletoggle3}>View</button>
          <button className='button6 btn-primary' onClick={handleShow3}>Add</button>
          </Card.Text>
        </Card.Body>
      </Card>
      <div>
        {
            toggle3?
            <Userslist />:''
        }
      </div>
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUser onSubmit={onuserFormSubmit}/>
        </Modal.Body>
        <Modal.Footer>
          </Modal.Footer>
      </Modal>
      </div>
      </div>
     
      </div>
     

     

      

     
  )
}

export default Home
