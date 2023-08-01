// import logo from './logo.svg';
import {Route,Routes} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Transactions from './components/Transactions';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import AdminDash from './components/AdminDash';
import AdminTrans from './components/AdminTrans';
// import AllTransaction from './components/AllTransaction/Alltransaction';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <>
    <Routes>
     
      <Route exact path='/' element={<Dashboard/>}/>
      <Route exact path='/transactions' element={<Transactions/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path='/profile' element={<Profile/>}/>
      <Route exact path='/adminDash' element={<AdminDash/>}/>
      <Route exact path='/adminTrans' element={<AdminTrans/>}/>
      {/* <Route exact path='/transaction/Alltransaction' element={<AllTransaction/>}/> */}
    </Routes>
    </>
  )
   
}

export default App;
