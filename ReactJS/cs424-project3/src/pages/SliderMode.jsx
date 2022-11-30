import Scatterplot from "./Scatterplot";
import { useEffect } from "react";
import brushModeProcessedData from "../hooks/functions/brushModeProcessingData";
import { Slider, Flex } from "theme-ui";
import { useState } from "react";

const SliderMode = ({data, changeData, renderMode, changeRenderMode, chosenData, changeChosenData, ...props}) => {
    const [silderValue, changeSliderValue] = useState(0);
    const updatedMinuted = (value) => value / 100 * (7 * 24 * 60 - 60);
    const [updatedMinuteValue, changeUpdatedMinuteValue] =useState(updatedMinuted(silderValue));

    useEffect(()=>{
        changeUpdatedMinuteValue(updatedMinuted(silderValue))
    }, [silderValue])

    useEffect(() => {
        changeData(brushModeProcessedData());
        changeRenderMode("slidermode");
    }, []);
    
    return<div sx={{justifyContent: "center"}}>
        <Scatterplot data={data} chosenData={chosenData} minutesSince={updatedMinuteValue}/>
            <Slider defaultValue={silderValue} onChange={(e) =>{
                changeSliderValue(e.target.value) 
            }}/>
    </div>
}


export default SliderMode;