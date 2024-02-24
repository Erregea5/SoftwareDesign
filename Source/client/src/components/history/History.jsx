import './table.css'

function Navbar(){
  return <>
  <ul className='navbar'>
    <li className='nav-link'><a className='nav-a' href="/">Home</a></li>
    <li className='nav-link'><a className='nav-a' href="/">Profile</a></li>
    <li className='nav-link'><a className='nav-a' href="/">Get Quote</a></li>
    <li className='nav-link'><a className='nav-a' href="/">Logout</a></li>
  </ul>
  </>;
}

export default function History() {
  const x={
    clientLocation:'uh',
    gallonsRequested:1,
    companyProfitMargin:0,
    rate:'10mph',
    date:'8/2/2',
    purchasedDate:'0/1/2',
    amountDue:100
  };
  const data=Array(10).fill(x);

  const dataColumns=[];
  for(let prop in data[0])
    dataColumns.push(prop);

  data.sort((a,b)=>a.date-b.date)
  return <>
  <Navbar/>
  <br/><br/><br/><br/>
  <section id="outer-table-container">
    <div id="inner-table-container">
      <table>
        <thead><tr key={-1}>{
          dataColumns.map((prop,idx)=><th key={idx+'+'}>{prop+' '}</th>)
        }</tr></thead>
        <tbody>{
          data.map((val,idx) => <>
            <tr key={idx}>{
              dataColumns.map((prop,i)=><td className='searchable' key={idx+'-'+i}>{val[prop]}</td>)
            }</tr>
          </>)
        }</tbody>
      </table>
    </div>
  </section>
  <button id='buy-button'>Buy Most Recent</button>
  </>;
}
