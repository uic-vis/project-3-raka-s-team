import { useEffect, useState } from "react";
import { brushModeProcessedData } from "../hooks/functions/brushModeProcessingData";
import LineChart from "./LineChart";
const BrushMode = ({
    data,
    changeData,
    renderMode,
    changeRenderMode,
    chosenData,
    changeChosenData,
    ...props
}) => {
    useEffect(() => {
        changeData(brushModeProcessedData());
        changeRenderMode("brushmode");
    }, []);
    return (
        <div>
            <LineChart data={data} chosenData={chosenData}/>
        </div>
    );
};

export default BrushMode;
