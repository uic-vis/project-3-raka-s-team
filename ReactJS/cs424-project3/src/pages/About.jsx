import { useState } from "react";

const About = ({data, changeData, renderMode, changeRenderMode, chosenData, changeChosenData, ...props}) => {
    useState(()=>{
        changeRenderMode('none')
    },[])
    return<div><h1>Hello World</h1></div>
}


export default About;