/** @jsxImportSource theme-ui */
import * as React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import BrushMode from "./pages/BrushMode";
import SliderMode from "./pages/SliderMode";
import SelectMode from "./pages/SelectMode";
import About from "./pages/About";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Maps from "./pages/Maps";
import raw from "./hooks/functions/divvy_dataset.json";

export default function App() {
    const [data, changeData] = React.useState(raw);
    const [chosenData, changeChosenData] = React.useState([]);
    const [renderMode, changeRenderMode] = React.useState("none");
    const [checkBoxes, changeCheckBoxes] = React.useState([true, true, true, true]);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <div
                    sx={{
                        position: "fixed",
                        width: "100vw",
                        height: "100vh",
                        zIndex: "-8",
                        top: 0,
                        left: 0,
                    }}
                >
                    <Maps
                        data={data}
                        changeData={changeData}
                        renderMode={renderMode}
                        changeRenderMode={changeRenderMode}
                        chosenData={chosenData}
                        changeChosenData={changeChosenData}
                        checkBoxes={checkBoxes}
                    />
                </div>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route
                                index
                                element={
                                    <Home
                                        data={data}
                                        changeData={changeData}
                                        renderMode={renderMode}
                                        changeRenderMode={changeRenderMode}
                                        chosenData={chosenData}
                                        changeChosenData={changeChosenData}
                                    />
                                }
                            />
                            <Route
                                path="about"
                                element={
                                    <About
                                        data={data}
                                        changeData={changeData}
                                        renderMode={renderMode}
                                        changeRenderMode={changeRenderMode}
                                    />
                                }
                                chosenData={chosenData}
                                changeChosenData={changeChosenData}
                            />
                            <Route
                                path="BrushMode"
                                element={
                                    <BrushMode
                                        data={data}
                                        changeData={changeData}
                                        renderMode={renderMode}
                                        changeRenderMode={changeRenderMode}
                                        chosenData={chosenData}
                                        changeChosenData={changeChosenData}
                                    />
                                }
                            />
                            <Route
                                path="SelectMode"
                                element={
                                    <SelectMode
                                    data={data}
                                    changeData={changeData}
                                    renderMode={renderMode}
                                    changeRenderMode={changeRenderMode}
                                    chosenData={chosenData}
                                    changeChosenData={changeChosenData}
                                    checkBoxes={checkBoxes}
                                    changeCheckBoxes={changeCheckBoxes}
                                    />
                                }
                            />
                            <Route
                                path="SliderMode"
                                element={
                                    <SliderMode
                                        data={data}
                                        changeData={changeData}
                                        renderMode={renderMode}
                                        changeRenderMode={changeRenderMode}
                                        chosenData={chosenData}
                                        changeChosenData={changeChosenData}
                                    />
                                }
                            />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </div>
    );
}
