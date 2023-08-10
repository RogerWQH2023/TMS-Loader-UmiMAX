import { ProCard } from '@ant-design/pro-components';
import { Pagination, Space, Button } from 'antd';
import styles from './index.less';
import { useState } from 'react';
import LayerCard from '../LayerCard'

const LayerPickerPro = (props) => {
  const [layerCardList, setLayerCardList] = useState();
  return (
    <ProCard ghost direction="column" className={styles.pickerContainer}>
      <ProCard direction="column" className={styles.layerCardContainer} ghost>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <LayerCard layer={props.layers[30]}  activeLayerOnChange={props.activeLayerOnChange}/>
        <ProCard
          type="inner"
          title="Card2"
          bordered={true}
          className={styles.layerCard}
        ></ProCard>
        <ProCard
          type="inner"
          title="Card3"
          bordered={true}
          className={styles.layerCard}
        ></ProCard>
        <ProCard
          type="inner"
          title="Card4"
          bordered={true}
          className={styles.layerCard}
        ></ProCard>
        <ProCard
          type="inner"
          title="Card5"
          bordered={true}
          className={styles.layerCard}
        ></ProCard>
        <ProCard
          type="inner"
          title="Card6"
          bordered={true}
          className={styles.layerCard}
        ></ProCard>
        <ProCard
          type="inner"
          title="Card7"
          bordered={true}
          className={styles.layerCard}
        ></ProCard>
        <ProCard
          type="inner"
          title="Card8"
          bordered={true}
          className={styles.layerCard}
        ></ProCard>
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
