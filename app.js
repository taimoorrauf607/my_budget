const barRef = useRef(null);

useEffect(() => {
  const monthlyData = Array.from({length:12},(_,i)=>{
    const mn = new Date(0,i).toLocaleString('en-US',{month:'short'});
    const income = transactions.filter(t=>t.type==='income'&&t.month===mn).reduce((a,b)=>a+b.amount,0);
    const expense = transactions.filter(t=>t.type==='expense'&&t.month===mn).reduce((a,b)=>a+b.amount,0);
    return {month: mn, income, expense};
  });

  if(barRef.current){
    new Chart(barRef.current,{
      type:'bar',
      data:{
        labels:monthlyData.map(d=>d.month),
        datasets:[
          {label:'Income', data:monthlyData.map(d=>d.income), backgroundColor:'#22c55e'},
          {label:'Expense', data:monthlyData.map(d=>d.expense), backgroundColor:'#ef4444'}
        ]
      },
      options:{
        responsive:true,
        plugins:{legend:{labels:{color:'white'}}},
        scales:{
          x:{ticks:{color:'white'}},
          y:{ticks:{color:'white'}},
        },
        interaction:{mode:'index', intersect:false},
        stacked:true
      }
    });
  }
}, [transactions]);
