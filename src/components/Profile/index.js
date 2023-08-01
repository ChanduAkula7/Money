import React, { Component } from 'react'
import Sidebar from '../Sidebar';
import './ProfileIndex.css';

class Profile extends Component {

  state={userbio:[]}

componentDidMount(){
  this.getUsetDetails();
}

getUsetDetails = async event => {
  // const limit=3;
  // const offset=2;
  const url = "https://bursting-gelding-24.hasura.app/api/rest/profile"
  const options = {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
    },
  }
  const response = await fetch(url, options)
  let data = await response.json()
  data=data.users;
  const Info=data.map(i=>({
            id: i.id,
            name: i.name,
            email: i.email,
            country: i.country,
            dob:i.date_of_birth,
            city:i.city,
            paddress:i.permanent_address,
            postcode:i.postal_code,
            paddress1:i.present_address

  }))
  console.log(Info);
  this.setState({userbio:Info[0]})
}

  render(){
const {userbio}=this.state
const {name,email,country,dob,city,paddress,paddress1,postcode}=userbio

  return (
    <>
    <div className='main-container'>
    <div className='ss'><Sidebar/></div>
    <div className='Profile-container'>
      <div className='Profile-header'>
        <h3>Profile</h3>
        <button className='tran-button'><span>+</span>Add Transactions</button>
      </div>
      <div className='profile-section'>
        <div className='section'>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47eGNB4uktvhbGIeWWDPNl-0L1EBWByWRkg&usqp=CAU"
             alt="profile" 
             className='profile-pic'/>
          </div>
          <div className='sec-1'>
            <div className='each-input-field'>
            <label htmlFor='name'>Your Name</label>
            <input type='text' placeholder='Enter Your Name' className='input-box' id="name" value={name}  />
            </div>
            <div  className='each-input-field'>
            <label htmlFor='email'>Email</label>
            <input type='text' placeholder='Enter Emial' className='input-box' id="email" value={email}/>
            </div>
            <div className='each-input-field'>
              <label htmlFor="DOB">Date of Birth</label>
              <select className='input-box' id="DOB">
                <option value="chandu">{dob}</option>
                <option value="chandu">25 January 1990</option>
                <option value="chandu">25 January 1990</option>
                <option value="chandu">25 January 1990</option>
                <option value="chandu">25 January 1990</option>
              </select>
            </div>
            <div  className='each-input-field'>
            <label htmlFor='padd'>Permanent Address</label>
            <input type='text' placeholder='enter' className='input-box'id="padd" value={paddress}/>
            </div>
            <div  className='each-input-field'>
            <label htmlFor='postal'>Postal</label>
            <input type='text' placeholder='enter' className='input-box' id="postal" value={postcode}/>
            </div>
    
           
          </div>
          <div  className='sec-1'>
          <div className='each-input-field'>
            <label htmlFor='username'>User Name</label>
            <input type='text' placeholder='enter' className='input-box' id="username" value={name}/>
            </div>
            <div  className='each-input-field'>
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='enter' className='input-box'  id="password" />
            </div>
          <div  className='each-input-field'>
            <label htmlFor='padd'>Permanent Address</label>
            <input type='text' placeholder='enter' className='input-box' id="padd" value={paddress1}/>
            </div>
            <div  className='each-input-field'>
            <label htmlFor='city'>City</label>
            <input type='text' placeholder='enter' className='input-box' id="city" value={city}/>
            </div>
           
            <div  className='each-input-field'>
            <label htmlFor='country'>Country</label>
            <input type='text' placeholder='enter' className='input-box' id="country" value={country}/>
            </div>
          </div>

        </div>


      </div>
      </div>
    </div>
    </>
  )
}
}

export default Profile;
