/** @jsxImportSource theme-ui */
import { TileLayer, MapContainer, LayerGroup, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { addCircles, brushLayer } from "../hooks/functions/brushModeProcessingData";
import { drawPolygon } from "../hooks/functions/brushModeProcessingData";
import { selectMap } from "../hooks/functions/selectModeProcessingData";
import * as L from "leaflet";

const chicagoCoordinates = [41.8781, -87.48];
const defaultZoomLevel = 12;

const Maps = ({
    data,
    changeData,
    renderMode,
    changeRenderMode,
    chosenData,
    changeChosenData,
    checkBoxes,
    ...props
}) => {
    const mapRef = useRef(null);
    const layerRef = useRef(null);
    const editableLayerRef = useRef(null);

    useEffect(() => {
        if (layerRef.current != null) {
            layerRef.current.clearLayers();
            if (editableLayerRef.current == null) {
                editableLayerRef.current = drawPolygon(mapRef.current, editableLayerRef.current, data, changeChosenData);
                // console.log(editableLayerRef.current)
            } else {
                editableLayerRef.current.clearLayers();
            }
            if (renderMode === "brushmode" || renderMode === "slidermode") {
                addCircles(data, 5000, layerRef.current);
            } else if (renderMode === "selectmode") {
                selectMap(data, layerRef.current,checkBoxes);
            }
        }
    }, [data, renderMode, checkBoxes]);


    return (
        <div sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <MapContainer
                ref={mapRef}
                center={chicagoCoordinates}
                zoom={defaultZoomLevel}
                sx={{ width: "100vw", height: "100vh" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
                />
                <LayerGroup ref={layerRef}>
                </LayerGroup>
                
            </MapContainer>
        </div>
    );
};

export default Maps;
