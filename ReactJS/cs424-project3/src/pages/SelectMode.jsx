import { useEffect } from "react";
import raw from "../hooks/functions/divvy_dataset.json";
import PieChart from "./PieChart";
import { Checkbox, Grid, Label } from "theme-ui";
import { useState } from "react";
const SelectMode = ({
    data,
    changeData,
    renderMode,
    changeRenderMode,
    chosenData,
    changeChosenData,
    checkBoxes,
    changeCheckBoxes,
    ...props
}) => {
    useEffect(() => {
        changeData(raw);
        changeRenderMode("selectmode");
    }, []);
    //https://medium.com/programming-essentials/how-to-manage-a-checkbox-with-react-hooks-f8c3d973eeca#:~:text=The%20state%20related%20to%20a%20checkbox%20input%20is,at%20How%20to%20Create%20Functional%20Components%20in%20React.
    return (
        <div>
            <PieChart data={data} chosenData={chosenData} />
            <Grid gap={2} columns={4}>
                <Label>
                    <Checkbox
                        checked={checkBoxes[0]}
                        onChange={(e) =>
                            changeCheckBoxes([
                                checkBoxes[0] ? false : true,
                                checkBoxes[1],
                                checkBoxes[2],
                                checkBoxes[3],
                            ])
                        }
                    >
                        Casual Normal
                    </Checkbox>
                </Label>
                <Label>
                    <Checkbox
                        checked={checkBoxes[1]}
                        onChange={(e) =>
                            changeCheckBoxes([
                                checkBoxes[0],
                                checkBoxes[1] ? false : true,
                                checkBoxes[2],
                                checkBoxes[3],
                            ])
                        }
                    >
                        Casual Electric
                    </Checkbox>
                </Label>
                <Label>
                    <Checkbox
                        checked={checkBoxes[2]}
                        onChange={(e) =>
                            changeCheckBoxes([
                                checkBoxes[0],
                                checkBoxes[1],
                                checkBoxes[2] ? false : true,
                                checkBoxes[3],
                            ])
                        }
                    >
                        Member Normal
                    </Checkbox>
                </Label>
                <Label>
                    <Checkbox
                        checked={checkBoxes[3]}
                        onChange={(e) =>
                            changeCheckBoxes([
                                checkBoxes[0],
                                checkBoxes[1],
                                checkBoxes[2],
                                checkBoxes[3] ? false : true,
                            ])
                        }
                    >
                        Member Electric
                    </Checkbox>
                </Label>
            </Grid>
        </div>
    );
};

export default SelectMode;
