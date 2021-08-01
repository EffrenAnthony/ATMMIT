const ATMDeposit = ({ onChange, isDeposit, isValid, deposit, listBills }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  console.log(deposit);
  
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      {
        (deposit%10 !== 0 || deposit < 10 )&&
        <p className="alert">Only 10, 20, 50 or 100 bills availables</p>
      }
      <input id="number-input" type="number" width="200" onChange={onChange} step="10" value={deposit}></input>
      <input type="submit" width="200" value={isDeposit ? 'Deposit' : 'Withdraw'} id="submit-input" disabled={!isValid}></input>
      <div className="bills-div">
        {
          !isDeposit && 
          listBills.map(i => (
            <img src={i.bill} alt={i.val} key={i.val} />
          ))
        }
      </div>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('')
  const [validTransaction, setValidTransaction] = React.useState(false);

  const [listBills, setListBills] = React.useState([]);

  const bills = [
    {
      value: 10,
      bill:'./10.jpeg'
    },
    {
      value: 20,
      bill:'./20.jpeg'
    },
    {
      value: 50,
      bill:'./50.jpeg'
    },
    {
      value: 100,
      bill:'./100.jpeg'
    }
  ]
  const listOfWithdrawals = function (){
    let rest = deposit
    console.log(rest)
    const listOfBills = []
    while (rest >= 100) {
      listOfBills.push(bills[3])
      rest -= 100
    }
    if (rest < 100 && rest !== 0) {

      const tempRest = rest / 50
      // greater than 50


      if (rest === 50) {
        rest -= 50
        listOfBills.push(bills[2])
      }
      else 
      if (tempRest >= 1 && rest !== 0) {

        rest -= 50
        listOfBills.push(bills[2])
        if (rest%20 !== 0 && rest !== 0) {
          if (rest === 10) {
            listOfBills.push(bills[0])
          } else {
            listOfBills.push(bills[0])
            listOfBills.push(bills[1])
          }
        } else {
          // let numberOf20S = rest/20
          if (rest === 20) {
            listOfBills.push(bills[1])
          } else {
            listOfBills.push(bills[1])
            listOfBills.push(bills[1])
          }
        }
      // less than 50
      }
      else if (rest > 0){
        if (rest%20 !== 0) {
          if (rest === 10) {
            listOfBills.push(bills[0])
          } else {
            listOfBills.push(bills[0])
            listOfBills.push(bills[1])
          }
        } else {
          // const numberOf20S = rest/20
          if (rest === 20) {
            listOfBills.push(bills[1])
          } else {
            listOfBills.push(bills[1])
            listOfBills.push(bills[1])
          }
        }
      }
    }
    setListBills(listOfBills)
  }
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if (deposit < 0) {
      setDeposit(0);
    } else {
      setDeposit(Number(event.target.value));
    }
    setValidTransaction(false)
    if(event.target.value <= 0){
      return
    }
    if(atmMode === 'Cash Back' && event.target.value > totalState){
      setValidTransaction(false)
    } else {
      setValidTransaction(true)
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    if (!isDeposit) {
      listOfWithdrawals()
    }
    setValidTransaction(false);
  };
  const handleModeSelect = (event) => {
    setAtmMode(event.target.value)
    if(event.target.value === "Deposit"){
      setIsDeposit(true)
    } else if (event.target.value === "Cash Back"){
      setIsDeposit(false)
    } 
  }
  const handlePressButton = () => {

  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {
        atmMode !== '' &&
        <>
        <ATMDeposit 
          onChange={handleChange}
          isDeposit={isDeposit}
          isValid={validTransaction}
          deposit={deposit}
          listBills={listBills}
          ></ATMDeposit>
        {/* <div className="buttons-div">
          <button onClick={handlePressButton}>1</button>
          <button onClick={handlePressButton}>2</button>
          <button onClick={handlePressButton}>3</button>
          <button onClick={handlePressButton}>4</button>
          <button onClick={handlePressButton}>5</button>
          <button onClick={handlePressButton}>6</button>
          <button onClick={handlePressButton}>7</button>
          <button onClick={handlePressButton}>8</button>
          <button onClick={handlePressButton}>9</button>
          <button onClick={handlePressButton}> </button>
          <button onClick={handlePressButton}>0</button>
          <button onClick={handleSubmit} disabled={!validTransaction}>OK</button>
        </div> */}
        </>
      }
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));