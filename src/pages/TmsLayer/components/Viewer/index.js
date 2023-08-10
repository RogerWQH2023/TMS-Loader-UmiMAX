import { Cesium } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

const Viewer = (props) => {
  const divRef = useRef(null);

  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    if (!viewer) {
      setViewer(
        new Cesium.Viewer(divRef.current, {
          animation: false,
          timeline: false,
          navigationHelpButton: false,
          geocoder: false,
          baseLayerPicker: false,
          fullscreenButton: false, // 动画控制，默认true
          imageryProvider: false,
        }),
      );
    }
    //更新图层
    viewer?.imageryLayers.removeAll(true);
    viewer?.imageryLayers.addImageryProvider(
      new Cesium.TileMapServiceImageryProvider({
        url: props.activeLayer.url,
        tilingScheme: new Cesium.GeographicTilingScheme(),
      }),
    );
  }, [viewer, props.activeLayer]);

  return <div ref={divRef} className={styles.viewer}></div>;
};

export default Viewer;
