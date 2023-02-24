
import { useState } from "react"
import styled  from "styled-components"
const CountStyle = styled.div`
    width:500px;
    height:500px;
    background:red;
    color:white;
    font-size:20px;
    display:flex;
    gap:20px;
    align-items:center;
    justify-content:center;


`
const CountButtonStyle = styled.button`
    background:white;
    color:black;
    width:100px;
    height:100px;
`


export const Count = () => {
    const [count,setCount] = useState(0)
    const [user,setUser]= useState({
        name:'Kha',
        age:18
    })
    const onDecre = (ev) =>{
        // console.log(ev)
        setCount((e)=>e-1)

    }
    const onIncre = (ev)=>{
        // console.log(ev)
        setCount(count+1)

    }
    console.log('re-render')
    return (
        <CountStyle>
            <CountButtonStyle onClick={onDecre}>-</CountButtonStyle>
            <div className="count">{count}</div>
            {/* <CountButtonStyle onClick={()=>setUser({...user,birthday:'30/1'})}>Click</CountButtonStyle> */}
            {/* <div>{JSON.stringify(user)}</div> */}
            <CountButtonStyle onClick={onIncre}>+</CountButtonStyle>
        </CountStyle>
    )
}