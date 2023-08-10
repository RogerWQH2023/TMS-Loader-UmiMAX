import { ProCard } from '@ant-design/pro-components';
import { Pagination, Space } from 'antd';
import { useState } from 'react';
import LayerCard from '../LayerCard';
import styles from './index.less';

const LayerPickerPro = (props) => {
  const [layerCardList, setLayerCardList] = useState();
  return (
    <ProCard ghost direction="column" className={styles.pickerContainer}>
      <ProCard direction="column" className={styles.layerCardContainer} ghost>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <LayerCard
            layer={props.layers[0]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
          <LayerCard
            layer={props.layers[1]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
          <LayerCard
            layer={props.layers[2]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
          <LayerCard
            layer={props.layers[3]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
          <LayerCard
            layer={props.layers[4]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
          <LayerCard
            layer={props.layers[5]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
          <LayerCard
            layer={props.layers[6]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
          <LayerCard
            layer={props.layers[7]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
          <LayerCard
            layer={props.layers[8]}
            activeLayerOnChange={props.activeLayerOnChange}
          />
        </Space>
      </ProCard>
      <br />
      <ProCard ghost className={styles.paginationCard}>
        <Pagination
          defaultCurrent={1}
          total={50}
          className={styles.Pagination}
        />
        <br />
      </ProCard>
    </ProCard>
  );
};

export default LayerPickerPro;
