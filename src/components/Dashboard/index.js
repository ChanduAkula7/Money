import React, { Component } from 'react'
import Sidebar from '../Sidebar';
import './DashboardIndex.css'
import { FiArrowDownCircle,FiArrowUpCircle} from 'react-icons/fi';
import { MdOutlineEdit,MdOutlineDelete} from 'react-icons/md';
import Popup from 'reactjs-popup'
// import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts"

const Bardata = [
  {
    group_name: "Sun",
    credit: 200,
    debit: 400,
  },
  {
    group_name: "Mon",
    credit: 3000,
    debit: 500,
  },
  {
    group_name: "Tue",
    credit: 1000,
    debit: 1500,
  },
  {
    group_name: "wed",
    credit: 700,
    debit: 1200,
  },
  {
    group_name: "Thu",
    credit: 3000,
    debit: 500,
  },
  {
    group_name: "Fri",
    credit: 1000,
    debit: 1500,
  },
  {
    group_name: "sat",
    credit: 700,
    debit: 1200,
  }
]

class Dashboard extends Component{
  state={debitCreditAmount:[],lastThreeTran:[],blur:false}

  componentDidMount(){
    this.getSums();
    this.getThreeTransations();
    this.getchart();
  }

  getchart = async event => {
    
    const url = 'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days'
    const options = {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      }
    }
    const response = await fetch(url, options)
    let data = await response.json()
    data=data.last_7_days_transactions_credit_debit_totals;
    console.log(data);

  }




  getThreeTransations = async event => {
    const limit=3;
    const offset=2;
    const url = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`
    const options = {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      },
    }
    const response = await fetch(url, options)
    let data = await response.json()
    data=data.transactions;
    const lastThree=data.map(i=>({
      amount: i.amount,
      category:i.category,
      date: i.date,
      id: i.id,
      transactionName:i.transaction_name,
      type: i.type,
      userId:i.user_id

    }))
    console.log(lastThree);
    this.setState({lastThreeTran:lastThree})
  }

  
  getSums = async event => {
    
    const url = 'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals'
    const options = {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      }
    }
    const response = await fetch(url, options)
    let data = await response.json()
    data=data.totals_credit_debit_transactions;
    const NewData=data.map(i=>({
      type:i.type,
      sum:i.sum
    }))

    this.setState({debitCreditAmount:NewData})
  }

  delresource=(id)=>{
    console.log("printing ID");
    console.log(id);
  }

  blurrings=()=>{
    console.log("Blurring");
    this.setState({blur:true});
  }


  AddTransButton=()=>{
    console.log("ADDDDIG")
  }

  render(){
    // let t="cha";
    const {debitCreditAmount,lastThreeTran,blur}=this.state
    // console.log(debitCreditAmount);
    const t=debitCreditAmount[1];
    const t1=debitCreditAmount[2];

    let ctype=null;
    let csum=null;
    let dtype=null;
    let dsum=null;
    
    if(t && t1){
     ctype=t.type;
     csum=t.sum;
     dtype=t1.type;
     dsum=t1.sum;
    }
    console.log(blur);
    
    return(
      <>
      <div className={blur?"main-container blurring1":"main-container"}>
    <div className='ss'><Sidebar/></div>
    <div className='Dashboard-container'>
      <div className='Account-section'>
        <h3>Accounts</h3>
        
        <Popup
    trigger={<button className='tran-button' type="button" onClick={this.blurrings}>Add Transactions</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <div className='modal-header-dash'>
        <div className="header"><h3>Add Transaction</h3></div>
        <button className="close1" onClick={close}>
          &times;
        </button>
        </div>
        <div className="dash-content">
          <form className='dash-form'>
            {/* <h3>Add Transaction</h3> */}
            <div className='dash-each-form'>
              <label htmlFor='TN'>Transaction Name</label>
              <input type="text"  placeholder='Transaction' id="TN" className='dash-input'/>
            </div> 
            <div className='dash-each-form'>
              <label htmlFor='TT'>Transaction Type</label>
              <select id="TT" className='dash-input'>
                <option>--SELECT Transaction Type</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <div className='dash-each-form'>
              <label htmlFor='CT'>Category</label>
              <select id="CT" className='dash-input'>
                <option value="category">Category Type</option>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Market">Market</option>
                <option value="Netflix">Netflix</option>
              </select>
            </div>
            <div className='dash-each-form'>
              <label htmlFor='A'>Amount</label>
              <input type="number"  placeholder='Transaction' id="A" className='dash-input'/>
            </div> 
            <div className='dash-each-form'>
              <label htmlFor='D'>Date</label>
              <input type="Date"  placeholder='Transaction' id="D" className='dash-input'/>
            </div> 
           < div className="actions">
          <Popup
            trigger={<button className="trigger-button" onClick={this.AddTransButton}> Trigger </button>}
            position="top center"
            nested
          >
          </Popup>
          
        </div>
          </form>
        </div>
        
      </div>
    )}
  </Popup>

      </div>
      <div className='dashboard-section'>
        <div className='total-debit-credit'>
          <div className='amount'>
            <div>
              <h1>${csum}</h1>
              <p>{ctype}</p>
            </div>
            <img src='https://img.freepik.com/free-vector/gold-coins-banknotes-3d-cartoon-style-icon-stack-coins-with-dollar-sign-wad-money-cash-savings-flat-vector-illustration-wealth-economy-finance-profit-currency-concept_74855-25998.jpg?size=626&ext=jpg' alt='credit' className='credit-image'/>
          </div>
          <div  className='amount'>
          <div>
              <h1>${dsum}</h1>
              <p>{dtype}</p>
            </div>
            <img src='https://img.freepik.com/free-vector/gold-coins-banknotes-3d-cartoon-style-icon-stack-coins-with-dollar-sign-wad-money-cash-savings-flat-vector-illustration-wealth-economy-finance-profit-currency-concept_74855-25998.jpg?size=626&ext=jpg' alt='debit' className='credit-image'/>
          </div>
        </div>
        <div className='dashboard-part-2'>
        <h3>Last Transactions</h3>
        <div className='last-transactions'>
      
          {lastThreeTran.map(i=>(
            <div className='each-transaction'>
              <div className='part-1'>
                <div className='element'>
                  {i.type==="credit"?<FiArrowUpCircle className='creditcolor arrow'/>:<FiArrowDownCircle className='debitcolor arrow'/>}
                </div>
              <p className='element'>{i.transactionName}</p>
              </div>
              <div  className='part-1'>
              <div  className='element category-color'>{i.category}</div>
              <div  className='element  category-color'>{i.date}</div>
              {i.type==="credit"?<div  className='element creditcolor'>+${i.amount}</div>:<div  className='element debitcolor'>-${i.amount}</div>}
              
              <div  className='element edit-color' ><MdOutlineEdit /></div>
              <div  className='element del-color' onClick={this.delresource}><MdOutlineDelete  id={i.id}/></div>
              </div>
              
            </div>
           
          ))}
        </div>
        <h3>Debit & Credit Overview</h3>    
        <div className='bar-graph'>
          
         <ResponsiveContainer width="80%" height={200}>
            
      <BarChart
        data={Bardata}
        margin={{
          top: 5,
        }}
      >
        <Bar dataKey="credit" name="Debit" fill="#1f77b4" barSize="20%"  className='barpillars'/>
        <Bar dataKey="debit" name="Credit" fill="#fd7f0e" barSize="20%" className='barpillars'/>
        <XAxis
          dataKey="group_name"
          tick={{
            stroke: "gray",
            strokeWidth: 1,
          }}
        />
        <YAxis
          tick={{
            stroke: "gray",
            strokeWidth: 0,
          }}
        />
        
      </BarChart>
    </ResponsiveContainer>
        </div>
      </div>
      </div>
    
    </div>
        
    </div>

      </>
    )
  }
}
export default Dashboard;
