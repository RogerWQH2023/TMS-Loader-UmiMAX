import React from "react";
import * as Cesium from 'cesium';
import { ImageryLayer } from "resium";





/**
 * 
 * @param {*} props.activeLayers 所有需要显示的Layer 
 * @returns 
 */
function ViewerLayer(props) {
    //一开始activeLayer可能没有，所以设置为NULL
    const Layers = props.activeLayer?.map(layer => {
        return <ImageryLayer imageryProvider={
            new Cesium.TileMapServiceImageryProvider({
                url: layer.url,
                tilingScheme: new Cesium.GeographicTilingScheme(),
            })
        } key={layer.uid}/>
    }); 

    return (
        <div>
            {Layers}
        </div>
    );

};

export default ViewerLayer;



    //疑问：先从props创建tms_layer,再由tms_layer赋值ImageryLayer；为什么这么操作Imagery不会随props变化而变化？
    //原来的写法（无法正常更新。是因为Imagery是间接受到影响吗？）：
    /* const tms_layer = new Cesium.TileMapServiceImageryProvider({
        url: activeLayer[0].url,
        tilingScheme: new Cesium.GeographicTilingScheme(),
    });

    useEffect(() => {
        //console.log(activeLayer);
    });

    return <ImageryLayer imageryProvider={tms_layer} />  */



