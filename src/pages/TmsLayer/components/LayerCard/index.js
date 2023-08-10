import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import styles from './index.less';

const LayerCard = (props) => {
  const onClick = () => {
    props.activeLayerOnChange(props.layer);
  };
  return (
    <ProCard
      type="inner"
      title={props.layer.name}
      extra={<Button onClick={onClick}>切换</Button>}
      bordered={true}
      className={styles.layerCard}
      direction="column"
    >
      <h4>DESCRIPTION</h4>
      <p>{props.layer.description}</p>
      <h4>URL</h4>
      <div className={styles.codeBox}>
        <code>{props.layer.url}</code>
      </div>
    </ProCard>
  );
};

export default LayerCard;
{
  /* <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        <ProCard title="DESCRIPTION">{props.layer.description}</ProCard>
        <ProCard title="URL">
          <div className={styles.codeBox}>
            <code>{props.layer.url}</code>
          </div>
        </ProCard>
      </Space> */
}
