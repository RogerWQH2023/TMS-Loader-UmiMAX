import React, { createRef, useState } from "react";

import './index.css';

import LayerInfo from "../LayerInfo";
//import { Button } from "antd";

function LayerPicker(props) {
    const [selectedLayer, setselectedLayer] = useState([props.layers[0]]);
    const selector = createRef(null);
    const selections = props.layers.map((layer) => {
        return <option key={layer.uid} value={layer.uid}>{layer.name}</option>
    });

    function layerChange() {
        //console.log(selector.current.value);
        props.changeActiveLayer(selector.current.value);
    }
    //当选择框变化时，更新备选图层信息栏
    function selectOnChange() {
        setselectedLayer(props.layers.filter((layer) => layer.uid === selector.current.value));
    }
    //当前图层信息栏
    const layerNowBox = <LayerInfo layer={props.activeLayer} />;



    return (
        <div>
            <h1>古地理地图预览</h1>
            <div id="p-abstract">
                <hr />
                <h2>当前图层</h2>
                <hr />
                {layerNowBox}
            </div>
            <hr />
            <div id="n-abstract">
                <hr />
                <h2>备选图层</h2>
                <hr />
                <select
                    ref={selector}
                    onChange={selectOnChange}>
                    {selections}
                </select>
            </div>
            <LayerInfo layer={selectedLayer} />
            <button onClick={layerChange}>切换</button>
            <hr />
        </div>

    )
        ;
}

export default LayerPicker;