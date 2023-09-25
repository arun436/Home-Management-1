import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import profileavatar from '../assets/profile avatar.jpg'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Dashboard() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
const userid=localStorage.getItem('Id')
  const handleClose1 = ()=> {
setShow(false)
  }
  const handleClose2 = ()=> {
   setShow(false)
axios.delete('/api/deleteuser/'+userid)
        .then(res => {
          if(res.data.Status === "Success") {
            navigate('/')
          } else {
            alert("Error")
          }
        })
        .catch(err => console.log(err));
  }

  const handleShow = () => setShow(true);
    const [data, setData] = useState({
		name: '',
		email: '',
        age:'',
        phone:'',
        image:''
	})
    const [menutoggle, setMenuToggle] = useState(true);
	axios.defaults.withCredentials = true;
    const userId=localStorage.getItem('Id')

    useEffect(()=> {
		axios.get('/api/getuser/'+userId)
		.then(res => {
			setData({...data.Result, name: res.data.Result[0][0].Name,
				age: res.data.Result[0][0].Age,
				phone: res.data.Result[0][0].Phone,
			  email: res.data.Result[0][0].Email,
        image:res.data.Result[0][0].Image
			})
		})
		.catch(err =>console.log(err));
	}, [])

    const changeMenuBar = (menutoggle) => {
        if(menutoggle == false){
          setMenuToggle(true);
        //   ShowNav()
        }else{
          setMenuToggle(false)
        //   HideNav()
        }
  }
  

	return (
		<div className="container-fluid">
    <div className="row flex-nowrap">
        <div className={menutoggle ? "col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark text-white show-side-nav" : " d-none d-print-block hide-side-nav"}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li>
                        <Link to='/dashboard/home' data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/user"  className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Users</span> </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/profile"  className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span> </Link>
                    </li>
                    <li>
                        <Link to="/"  className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span> </Link>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
        <div className="col p-0 m-0 ">
        <div className='p-3 shadow bg-dark text-white' id='top-nav-main'>
            <div className={menutoggle ? 'openmenu menu' : 'menu'} onClick={() => changeMenuBar(menutoggle)}>
                <div>
                    <span className="line-1"></span>
                    <span className="line-2"></span>
                    <span className="line-3"></span>
                </div>
            </div>
              <div><h4>Home Management</h4></div>
              <div className='welcome-text' styel={{marginLeft:'80px'}}>Welcome {data?.name}</div>
              <div id='top-nav-profile'>
            {data.image!=null?
                <img src={`http://localhost:8801/images/`+data?.image} className='user_image'/>:
                <img src={profileavatar} className='user_image'/>
            }
              
                <div className="dropdown-content">
                    <Link to='/dashboard/profile'>
                    <i className="fs-4 bi-person"></i>Profile</Link>
                    <Link to='/'>
                    <i className="fs-4 bi-power"></i>Logout</Link>
                    <Link to='#' onClick={handleShow}>
                    <i className="fs-4 bi-power"></i>Close Account</Link>
                </div>
              </div>
              </div>
              <div className='content-pages'>
              <Outlet />
              </div>
        </div>
    </div>
    <Modal show={show} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
           close
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            confirm
          </Button>
        </Modal.Footer>
      </Modal>
</div>
	)
}

export default Dashboard