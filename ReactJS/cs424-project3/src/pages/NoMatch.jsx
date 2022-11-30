import { useState } from "react"
const NoMatch = ({data, changeData, renderMode, changeRenderMode,  chosenData, changeChosenData, ...props}) => {
    useState(()=>{
        changeRenderMode('none')
    },[])
    return<div><h1>404 Not Found Page</h1></div>
}


export default NoMatch;