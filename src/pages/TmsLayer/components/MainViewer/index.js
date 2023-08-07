import React from "react";
import { Viewer } from "resium";
import ViewerLayer from "../ViewerLayer"

/**
 * @param {*} props.activeLayer 所有需要显示的Layer
 */
function MainViewer(props) {
  //console.log(props.activeLayer);
  //const [activeLayer, setActiveLayer] = useState(props.activeLayer);
  return (
      <Viewer
        full
        id="viewer"
        animation={false}
        timeline={false}
        navigationHelpButton={false}
        geocoder={false}
        baseLayerPicker={false}
        fullscreenButton={false}>
        {/* 图层序列 */}
        <ViewerLayer activeLayer={props.activeLayer} />
      </Viewer>
  )
}

export default MainViewer;