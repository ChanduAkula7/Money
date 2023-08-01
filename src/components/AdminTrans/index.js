import React, { Component } from 'react'
import AdminSidebar from '../AdminSidebar';
// import './TransactionsIndex.css'
import { FiArrowDownCircle,FiArrowUpCircle} from 'react-icons/fi';
import { MdOutlineEdit,MdOutlineDelete} from 'react-icons/md';

let creditdata=[];
let debitdata=[];

class AdminTrans extends Component {

state={TransData:[]}

componentDidMount(){
  this.getAllTrans();
}

getAllTrans= async (event) => {
  creditdata=[];
  debitdata=[];
  const limit=10;
  const offset=1;
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
  // console.log(data);
  const opt = {  month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',  };
  data=data.transactions;
  const AllTransactionData=data.map(i=>({
   
    amount: i.amount,
    category:i.category,
    // date: i.date,
    date:new Date(i.date).toLocaleString('en-US', opt),
    id: i.id,
    transactionName:i.transaction_name,
    type: i.type,
    userId:i.user_id

}));



for(let i=0;i<AllTransactionData.length;i++){
  if(AllTransactionData[i].type==="credit"){
    creditdata.push({
      amount: AllTransactionData[i].amount,
      category:AllTransactionData[i].category,
      date: AllTransactionData[i].date,
      id: AllTransactionData[i].id,
      transactionName:AllTransactionData[i].transactionName,
      type: AllTransactionData[i].type,
      userId:AllTransactionData[i].userId
  
    })
  }
  else{
    debitdata.push({
      amount: AllTransactionData[i].amount,
      category:AllTransactionData[i].category,
      date: AllTransactionData[i].date,
      id: AllTransactionData[i].id,
      transactionName:AllTransactionData[i].transactionName,
      type: AllTransactionData[i].type,
      userId:AllTransactionData[i].userId
  
    })
  }
}
console.log(creditdata);
  console.log(debitdata);

  console.log( AllTransactionData);

  this.setState({TransData: AllTransactionData})
}



creditList=()=>{
  this.setState({TransData:creditdata});
    
}

debitList=()=>{
  this.setState({TransData:debitdata})
}

  render(){
    const {TransData}=this.state
  return (
    <>
    <div className='main-container'>
    <div className='ss'><AdminSidebar/></div>
    <div className='transaction-section'>
      <div className='transaction-header'>
      <div className='btn-section'>
        <button type="button" onClick={this.getAllTrans} className='click-btn animi'>All transaction</button>
        <button type="button" onClick={this.creditList} className='click-btn animi'>Credit</button>
        <button type="button" onClick={this.debitList} className='click-btn animi'>Debit</button>
      </div>

      </div>
      <div className='tran1'>
      <div className=' qwert last-transactions '>
      <div className='titles'>
        <div>
          <p className='trans-heading  k1'>TransactionsName</p>
          </div>
          <div className='t-2'>
          <p className=' trans-heading k'>Category</p>
          <p className='trans-heading k'>Date</p>
          <p className='trans-heading-amount k'>Amount</p>
          </div>
         
        </div>
      
          {TransData.map(i=>(
            <div className='each-transaction'>
              <div className='part-1'>
                <div className='element'>
                  {i.type==="credit"?<FiArrowUpCircle className='creditcolor arrow'/>:<FiArrowDownCircle className='debitcolor arrow'/>}
                </div>
              <p className='element'>{i.transactionName}</p>
              </div>
              <div  className='part-1'>
              <p  className='element category-color'>{i.category}</p>
              <p  className='element  category-color'>{i.date}</p>
              {i.type==="credit"?<p  className='element creditcolor'>+${i.amount}</p>:<p  className='element debitcolor'>-${i.amount}</p>}
          
              <p  className='element edit-color' ><MdOutlineEdit/></p>
              <p  className='element del-color'><MdOutlineDelete/></p>
              </div>
              
            </div>
           
          ))}
        </div>
        </div>


      
    </div>
    </div>
    </>
  )
}
}

export default AdminTrans;
