import {useState, useRef, useEffect, useMemo} from 'react'
import Content from './Content';
import Content_memo from './Content_memo';


//----------------------------------------------------------------
//useMemo tránh thực hiện lại 1 logic k cần thiết
//----------------
const giftList = [
  'gau bong',
  'banh sinh nhat',
  'nguoi yeu',
  'qua bong',
  'xa bong',
]

//response from api
const courses = [
  {
    id: 1,
    name: 'Math',
  },
  {
    id: 2,
    name: 'Physics',
  },
  {
    id: 3,
    name: 'Computer Science',
  },
  {
    id: 4,
    name: 'English',
  }
]


function App() {
  const [gift, setGift] = useState();
  
  const takeGift = () =>{
    const randomGift = Math.floor(Math.random() * giftList.length);
    setGift(
      giftList[randomGift]
    )
  }

  //----------------------------------
  const [info, setInfo] = useState({
    name: 'Duy Dang',
    age: '22',
    address: 'hung yen'
  })
  const handlerUpdate = () => {
    setInfo({
          ...info,
          myLove: ' NM'
    })

    // setCounter(counter+1)
    // setCounter(prevState => prevState + 1);
    // setCounter(prevState => prevState + 1);
    // setCounter(prevState => prevState + 1); // lấy kêt quả của cái trước cộng vào luôn 


 
  }
     //--------------------------------
    //  const [name, setname] = useState('');
     const [email, setemail] = useState('');


     //-------------------------------- xử lí với radio button
     const [checked, setChecked] = useState([]);

    const handleCheck = (id) => {
        setChecked(prev => {
          const isChecked = checked.includes(id);
          if (isChecked) {
            return checked.filter(item => item !== id);
          }
          else {
            return [...prev, id];
          }

        });
    }

     const handlerSubmit = () => {
      //call api
      console.log({ids:checked});

     }


     //-------------------------------- todolist and useState----------------------------------------------------------------


     
     const [job, setJob] = useState('');
     const [jobs, setJobs] = useState(
      () => {
        //khoong load lại giao dien
        const storageJobs = JSON.parse(localStorage.getItem('jobs'));
        console.log(storageJobs);
        return storageJobs ?? [];
      }
     );


    const handleSubmit = () =>{
      setJobs(prev => {
        { 
          const newJobs = [...prev, job]

          //save to local storage
          const jsonJobs = JSON.stringify(newJobs)
          // console.log(jsonJobs);
          localStorage.setItem('jobs', jsonJobs);

          return newJobs
        }
    });
      setJob('')   
    }
    //----------------------------------------------------------------

    const [show, setShow] = useState(false);
    //----------------------------------------------------------------useRef

    const [count, setCount] = useState(60);
    //useRef()
    const timerId = useRef();
    const prevCount = useRef();
    useEffect(() => {
      prevCount.current = count;
    }, [count]);

    const handleStart = () =>{
      timerId.current = setInterval(() =>{
        setCount(preCount => preCount - 1)
      },1000)
      console.log('timerId ' + timerId.current);
    }
    const handleStop = () =>{
      clearInterval(timerId.current)
      console.log('stop ' + timerId.current);

    }
    console.log(count, prevCount.current);

    //--------------------------------------------------------------------------useCallback
    const [count1, setCount1] = useState();
    //-------------------------------------------------------------------------- useMamo
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState('');
    const handlerSubmit_1 = () => {

    }

    
  return (
    <div className="App" style={{padding:20}}>
      


      {/* <Content_memo/>
      <h1>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button><br/> */}


      
        {/* <h1>{gift || 'Chua co phan thuong!!!'}</h1>
        <button onClick={takeGift}>Take gift</button>

        <input value={name} onChange = {e=>setname(e.target.value)}/>
        <input value={email} onChange = {e=>setemail(e.target.value)} /> */}

        {/* <h1>{JSON.stringify(info)}</h1>
        <button onClick={handlerUpdate}>Update</button> */}

       {/* ---------------------------------- */}
        {/* {courses.map(course =>(
            <div key={course.id}>
              <input 
                type="checkbox" 
                checked={checked.includes(course.id)}
                onChange={() => handleCheck(course.id)}  
                // checked={()=>handleCheck(course.id)}
                />
                  {course.name}
            </div>
          ))}

        <button onClick={handlerSubmit}>Submit Info</button><br/><br/> */}

          {/* ------------------------------ */}

          <input value={job} onChange={e => setJob(e.target.value)}/>
          <button style={{margin:20}} onClick={handleSubmit}>Add</button>
          <ul>
            {
              jobs.map((jobb,index) => (
                <li key={index}>
                  {jobb}
                </li>
              ))
            }
          </ul>

            <button onClick={() => setShow(!show)}>Show</button>
            {show && <Content/>}

    </div>
  );
}

export default App;
