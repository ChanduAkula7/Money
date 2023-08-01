import {Component} from 'react'
import {Navigate } from 'react-router-dom'
// import { } from 'react-router-dom';
import './LoginIndex.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    userName: '',
    password: '',
    showErrorMsg: false,
    errorMsg1: '',
  }

  onSubmitSuccess = jwtToken => {
   
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    // history1('/');
    // console.log(jwtToken);

    return <Navigate  to="/" />
  }

  onfailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg1: errorMsg})
  }

  submit = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const email = userName
    const userDetails = {email, password}
    console.log(userDetails)
    const url = 'https://bursting-gelding-24.hasura.app/api/rest/get-user-id'
    const options = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const dataobtained = await response.json()
    // console.log(response)
    console.log(response.ok)
    // console.log(dataobtained.jwt_token)
    if (response.ok) {
      this.onSubmitSuccess("localCookie")
    } else {
      this.onfailure(dataobtained.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
    // console.log(userName)
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderUserName = () => {
    const {userName} = this.state
    return (
      <>
        <label className="userlabel" htmlFor="input">
          Emial
        </label>
        <input
          type="email"
          className="passwordEle"
          id="input"
          value={userName}
          onChange={this.onChangeUsername}
          placeholder="UserName"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="passwordlabel" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="password"
          className="passwordEle"
          id="password"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  AdminLogin=()=>{
    const {userName,password}=this.state;
    console.log(userName,password);
    if(userName==="admin@gmail.com" && password==="Admin@123"){
      return <Navigate to='/adminDash'/>
    }
    else{
      this.setState({
        showErrorMsg: true,
        errorMsg1: 'Not Matched',
      })
    }

    // return <Navigate  to="/profile" />
  }

  render() {
    const {showErrorMsg, errorMsg1} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Navigate  to="/" />
    }
    return (
      <>
        <div className="login-container">
          <form className="login" onSubmit={this.submit}>
            <img
              src="https://img.freepik.com/free-vector/gold-coins-banknotes-3d-cartoon-style-icon-stack-coins-with-dollar-sign-wad-money-cash-savings-flat-vector-illustration-wealth-economy-finance-profit-currency-concept_74855-25998.jpg?size=626&ext=jpg"
              alt="website logo"
              className="logo"
            />
            <h4 className='site-name'>MONEY MATTER</h4>
            <div className="input-container">{this.renderUserName()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button type="submit" className="btn1">
              Login as User
            </button>
            <button type="button" className="btn1" onClick={this.AdminLogin}>
              Login as Admin
            </button>
            <div className="err">
              {showErrorMsg && <p className="error">{errorMsg1}</p>}
            </div>
          </form>
        </div>
      </>
    )
  }
}
export default Login;

