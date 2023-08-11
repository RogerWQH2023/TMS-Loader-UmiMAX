import { ProCard } from '@ant-design/pro-components';
import { Pagination, Space } from 'antd';
import { useState } from 'react';
import LayerCard from '../LayerCard';
import styles from './index.less';

const LayerPickerPro = (props) => {
  const [layerCardList, setLayerCardList] = useState(props.layers.slice(0, 10));
  const layerCardDisplay = layerCardList.map((layer) => {
    return (
      <LayerCard
        key={layer.uid}
        layer={layer}
        activeLayerOnChange={props.activeLayerOnChange}
        btn={true}
      />
    );
  });

  const pageChange = (page) => {
    setLayerCardList(props.layers.slice(10 * (page - 1), 10 * page));
  };

  return (
    <ProCard ghost direction="column" className={styles.pickerContainer}>
      <ProCard direction="column" className={styles.layerCardContainer} ghost>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {layerCardDisplay}
        </Space>
      </ProCard>
      <Pagination
        size="middle"
        defaultCurrent={1}
        total={props.layers.length}
        pageSize={10}
        showSizeChanger={false}
        className={styles.pagination}
        onChange={pageChange}
      />
    </ProCard>
  );
};

export default LayerPickerPro;
