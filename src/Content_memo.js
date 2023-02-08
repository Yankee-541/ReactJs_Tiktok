import { memo } from 'react'

// 1. memo => higher order component (HOC), ghi nhớ các props của component
//Hooks
//HOC
// Render props
// 2. useCallback

function Content_memo(){
    console.log('re-render');
    return(
        <>
        <h2>Hello Duy Dang</h2>
        
        </>
    )
}



export default memo(Content_memo);