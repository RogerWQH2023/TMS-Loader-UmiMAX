import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import LayerCard from './components/LayerCard';
import LayerPickerPro from './components/LayerPickerPro';
import Viewer from './components/Viewer';
import styles from './index.less';

const TmsLayer = () => {
  //定义URL
  const LAYER_URL =
    'https://deep-time.org/v1.0/api/data-central/dataset/5fd7fd2c-8140-42d5-b5bd-55f2061b3c3b/atoms?layered=1&pageSize=1000';
  //定义hooks
  const [loading, setLoading] = useState(true);
  const [layers, setLayers] = useState(null);
  const [activeLayer, setActiveLayer] = useState({
    uid: 'b05f31f1-d179-4ffd-aa98-3b350602607a',
    name: '000 PaleoAtlas',
    url: 'https://deep-time.org/tms/ScotesePaleoMap/Map1a_PALEOMAP_PaleoAtlas_0004326/{z}/{x}/{reverseY}.png',
    description: 'paleogeographic map in PaleoAtlas',
  });
  const [open, setOpen] = useState(false);

  const activeLayerOnChange = (layer) => {
    setActiveLayer(layer);
  };

  //读取数据
  useEffect(() => {
    //setLoading(true);
    //首先读取图层数据，读取完毕后再加载地球页面
    if (!layers) {
      const layerFetch = fetch(LAYER_URL);
      layerFetch
        .then((response) => {
          if (!response.ok) {
            throw new Error(`数据请求错误：${response.status}`);
          }
          return response.json();
        })
        .then(async (json) => {
          //读取图层列表中各个图层的name，url属性，所有图层初始都不显示。
          await setLayers(
            await json.data.list.map((layer) => {
              return {
                uid: layer.uid,
                name: layer.name,
                url: layer.layerServiceInfo.url,
                display: false,
                description: layer.description,
              };
            }),
          );
        });
    }
    //console.log(layers);
  }, []);
  //确保layers存在后，再进行图层初始化
  useEffect(() => {
    if (!!layers) {
      setActiveLayer(layers[0]);
      setLoading(false);
    }
  }, [layers]);

  if (loading === true) {
    return (
      <PageContainer ghost className={styles.pageContainer}>
        <div className={styles.loadingbox}>FETCHING THE LAYERS</div>
      </PageContainer>
    );
  }

  const showLayerDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <PageContainer
      ghost
      header={{
        title: '古地理TMS展示',
      }}
      extra={[
        <Button key="layerMenu" onClick={showLayerDrawer}>
          其他图层
        </Button>,
      ]}
      className={styles.pageContainer}
    >
      <ProCard ghost className={styles.fullCard}>
        <ProCard
          title={'当前图层信息'}
          colSpan="30%"
          bordered
          headerBordered
          className={styles.activeLayerCard}
        >
          <LayerCard
            //key={activeLayer.uid}
            layer={activeLayer}
          />
        </ProCard>
        <ProCard ghost colSpan="70%" className={styles.viewerCard} bordered>
          <Viewer key="viewer" activeLayer={activeLayer} />
        </ProCard>
      </ProCard>
      <Drawer
        title="备选图层"
        width={400}
        placement="left"
        onClose={onClose}
        open={open}
        //getContainer={false}
      >
        <LayerPickerPro
          layers={layers}
          activeLayerOnChange={activeLayerOnChange}
        />
      </Drawer>
    </PageContainer>
  );
};

export default TmsLayer;
