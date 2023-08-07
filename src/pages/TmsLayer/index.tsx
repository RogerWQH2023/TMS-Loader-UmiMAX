import { PageContainer } from '@ant-design/pro-components';
import { Cesium } from '@umijs/max';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import { Button } from 'antd';


const TmsLayer: React.FC<any> = () => {
  const divRef = useRef<HTMLDivElement>(null); 
  let viewer: any;
  useEffect(()=>{
    if (!!viewer) return;  
    viewer = new Cesium.Viewer(divRef.current as Element, {
      animation: true, // 动画控制，默认true
    });
  });
  return (
    <PageContainer
      ghost
      header={{
        title: '古地理TMS展示',
      }}
      extra={[
        <Button key="layerMenu">图层</Button>,

      ]}
    >
      <div ref={divRef} className={styles.pageBlock}></div>
    </PageContainer>
  );
};

export default TmsLayer;
