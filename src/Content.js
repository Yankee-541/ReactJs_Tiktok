import {useEffect, useLayoutEffect, useState} from 'react';


//1. useEffect(callback)
//- được gọi callback sau khi re-render
//-gọi callback sau khi component them element vào Dom
//2. useEffect(callback, [])
//- chỉ gọi callback 1 lần sau khi component mounted
//3. useEffect(callback, [deps])
//-callback sẽ đc gọi lại mỗi khi deps thay đổi

//--------------------- đúng với cả 3 tk bên trên
//1. Callback luôn được gọi sau khi component mounted 
//2. cleanup function luôn đc gọi trc khi component unmounted
//3. cleanup function luôn đc gọi trc khi component đc gọi (trừ lầm mounted )



/*
            useEffect
    1: cập nhập lại state
    2: cập nhập DOM(mutated)
    3: render lại UI
    4: gọi cleanup function nếu deps thay đổi
    5: gọi useEffect callback 

            useLayoutEffect
    1: cập nhập lại state
    2: cập nhập DOM(mutated)
    3: gọi cleanup nếu deps thay đổi (sync)
    4: gọi useLayoutEffect callback (sync)
    5: render lại UI
    
*/


const tabs = ['posts', 'comments', 'albums']

const lessons = [
    {
      id: 1,
      name: 'React, learn from React',
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

function Content(){
    const [title, setTitle] = useState('');
    const [type, setType] = useState('posts');
    const [posts, setPosts] = useState([]);
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const countWidth = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', countWidth);
        return () => {
            window.removeEventListener('resize', countWidth);
        }
    },[])

    useEffect(()=>{
        // console.log('Mounted ' + title);
        // document.title = title;

        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(res => res.json())
        .then(posts => {
            setPosts(posts)
        });
    }, [type])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= 200){
                //show scroll
                setShowGoToTop(true);
            }else{
                //hide button scroll
                setShowGoToTop(false);
            }
            // setShowGoToTop(window.scrollY > 200);
        } 
        window.addEventListener('scroll', handleScroll);
        
        //cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    },[])
//----------------------------------------------------------------
    // const [countdown, setCountdown] = useState(180);

    // useEffect(() => {
    //     const timeId = setInterval(() => {
    //         setCountdown(prev => prev -1);
    //         console.log('Countdown...');
    //     }, 1000)
    //     return () => clearInterval(timeId);
    // },[])
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCountdown(countdown -1);
    //     }, 1000)
    // },[countdown])

    //----------------------------------------------------------------
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        return ()=>{
            avatar && URL.revokeObjectURL(avatar.preview); // xoá bộ nhớ nếu thay đổi ảnh
        }

    },[avatar])

    const handlePreviewImg = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    }

    //-----------------------------fake chat app-----------------------------
    const [lessonID, setLesson] = useState(1);

    useEffect(() => {
        const handleCmt = ({detail})=>{
            console.log(detail);
        }
        window.addEventListener(`lesson-${lessonID}`, handleCmt);
        return()=>{
            window.removeEventListener(`lesson-${lessonID}`, handleCmt);
        }
    },[lessonID])
    //--------------------------------------------------------------------------------
    const [count, setCount] = useState(0);
    useLayoutEffect(() => {
        if (count >3){
            setCount(0)
        }
    }, [ count])

    const handleRun = () => {
        setCount(count + 1)
    }
    return(
        <div>

            <ul>
                {
                    lessons.map(lesson => (
                        <li key={lesson.id}
                            style={{color:lessonID == lesson.id ? 'red' : '#333'}}
                            onClick={()=> setLesson(lesson.id)}>
                                {lesson.name}
                        </li>
                    ))
                }
            </ul>
            <h1>{count}</h1>
            <button onClick={handleRun}>Run</button>


            {/* count width screen */}
            {/* <h1>{width}</h1> */}

            {/* count time  */}
            {/* <h1>{countdown}</h1> */}

            {/* choose avata */}
            {/* <input type="file" onChange={handlePreviewImg}/><br/>
            {avatar&& ( <img src={avatar.preview} alt="" width='100%'/>)} */}

            {/* button */}
            {/* {tabs.map(tab=>(
                <button 
                    key={tab}
                    style={type === tab ? {color:'#fff', backgroundColor:'#333'} : {}}
                    onClick={() => setType(tab)}
                    >{tab}
                </button>
            ))} */}

            {/* -----------------------set title page--------------------------------- */}
            {/* <input value={title} onChange={e=>setTitle(e.target.value)}/> */}

            {/* ---------------------------------------------------------------- */}
            {/* {posts.map(post => (
                <li key={post.id}>{post.title || post.name}</li>
            ))}
            {showGoToTop && (
                <button style={{
                    position:'fixed',
                    bottom:20,
                    right:20,
                }}>
                    Top
                </button>
            )} */}
        </div>
    )
}

export default Content;