import { ProCard } from '@ant-design/pro-components';
import { Pagination, Space } from 'antd';
import LayerCard from '../LayerCard';
import styles from './index.less';

const LayerPickerPro = (props) => {
  const layerCardList = props.layers.map((layer) => {
    return (
      <LayerCard
        key={layer.uid}
        layer={layer}
        activeLayerOnChange={props.activeLayerOnChange}
        btn={true}
      />
    );
  });

  return (
    <ProCard ghost direction="column" className={styles.pickerContainer}>
      <ProCard direction="column" className={styles.layerCardContainer} ghost>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {layerCardList}
        </Space>
      </ProCard>
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
