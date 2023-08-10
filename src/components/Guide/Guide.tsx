import { Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './Guide.less';

interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          <p>
            Made By <strong>WQH</strong> with <strong>{name}</strong> ！
          </p>
          <br />
          <div className={styles.picBall}>
            <img
              className={styles.pic}
              src="https://avatars.githubusercontent.com/u/140324071?s=400&u=be20bf52259b3b4a92a745f1177cba29b49628b6&v=4"
            ></img>
          </div>
        </Typography.Title>
      </Row>
    </Layout>
  );
};

export default Guide;
