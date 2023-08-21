import '@/tailwind.css';
import { PageContainer } from '@ant-design/pro-components';
import { Space } from 'antd';
import React from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <PageContainer header={{ title: '首页' }} className="content-center">
      <br /><br /><br />
      <div className="container mx-auto text-center gap-4 justify-start w-max">
        <Space direction="vertical" size="large" align="center">
          <div className={styles.picBall}>
            <img
              className={styles.pic}
              src="https://avatars.githubusercontent.com/u/140324071?s=400&u=be20bf52259b3b4a92a745f1177cba29b49628b6&v=4"
            ></img>
          </div>
          <p className="text-3xl text-center w-max h-max">
            Made By <strong>WQH</strong> with <strong>UmiMax</strong> ！
          </p>
        </Space>
      </div>
    </PageContainer>
  );
};

export default HomePage;
