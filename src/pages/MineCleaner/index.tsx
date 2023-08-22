import '@/tailwind.css';
import { PageContainer } from '@ant-design/pro-components';
import { Button, InputNumber, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import Block, { BlockProps } from './components/Block';
import Hint, { HintStatus } from './components/Hint';

const MineCleaner = () => {
  const [size, setSize] = useState<number>(15);
  const [mineNum, setMineNum] = useState<number>(30);
  const blockNum = size * size;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flagNum, setFlagNum] = useState<number>(0);
  const [blockRemain, setBlockRemain] = useState<number>(blockNum);
  const [restart, setRestart] = useState<boolean>(true);
  const [renew, setRenew] = useState<boolean>(false);
  const [hintStatus, setHintStatus] = useState<HintStatus>('working');

  const [mineList, setMineList] = useState(new Set());
  const [tmpStatusList, setTmpStatusList] = useState<BlockProps[][]>([]);
  const [_blockDisplay, set_blockDisplay] = useState<any>();

  const [tableStyle, setTableStyle] = useState<string>(
    'bg-white border-4 border-slate-400 rounded-sm p-1',
  );

  //当restart亮起时进行地雷阵的初始化
  useEffect(() => {
    //根据当前属性初始化地雷阵
    if (restart) {
      setRestart(false);
      setTableStyle('bg-white border-4 border-slate-400 rounded-sm p-1');
      setFlagNum(0);
      setBlockRemain(blockNum);
      setHintStatus('none');
      //初始化地雷位置
      while (mineList.size < mineNum)
        mineList.add(Math.floor(Math.random() * blockNum));
      /** 根据地雷集合初步生成方块 */
      for (let x = 0; x < size; x++) {
        tmpStatusList.push([]);
        for (let y = 0; y < size; y++) {
          if (mineList.has(x * size + y)) {
            tmpStatusList[x].push({
              id: x * size + y,
              inputStatus: 'normal',
              count: 0,
              isMine: true,
              blockOnClick: () => {},
              blockFlagChange: () => {},
            });
          } else {
            tmpStatusList[x].push({
              id: x * size + y,
              inputStatus: 'normal',
              count: 0,
              isMine: false,
              blockOnClick: () => {},
              blockFlagChange: () => {},
            });
          }
        }
      }
      /** 计算出每个方块周围的地雷数量 */
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          if (mineList.has(x * size + y)) {
            if (x > 0 && y > 0) tmpStatusList[x - 1][y - 1].count++;
            if (y > 0) tmpStatusList[x][y - 1].count++;
            if (x < size - 1 && y > 0) tmpStatusList[x + 1][y - 1].count++;
            if (x > 0) tmpStatusList[x - 1][y].count++;
            if (x < size - 1) tmpStatusList[x + 1][y].count++;
            if (x > 0 && y < size - 1) tmpStatusList[x - 1][y + 1].count++;
            if (y < size - 1) tmpStatusList[x][y + 1].count++;
            if (x < size - 1 && y < size - 1)
              tmpStatusList[x + 1][y + 1].count++;
          }
        }
      }
      setRenew(true);
    }
  }, [restart]);

  //当点击的方块周围全不是雷时拓展到八邻域。（深度优先）
  function expandBlocks(x: number, y: number): number {
    let count: number = 0;
    if (tmpStatusList[x][y].inputStatus !== 'normal') {
      return count;
    } else {
      tmpStatusList[x][y].inputStatus = 'clicked';
      if (tmpStatusList[x][y].count === 0) {
        if (y > 0) count = count + expandBlocks(x, y - 1);
        if (x > 0) count = count + expandBlocks(x - 1, y);
        if (x < size - 1) count = count + expandBlocks(x + 1, y);
        if (y < size - 1) count = count + expandBlocks(x, y + 1);
        if (x > 0 && y > 0) count = count + expandBlocks(x - 1, y - 1);
        if (x < size - 1 && y > 0) count = count + expandBlocks(x + 1, y - 1);
        if (x > 0 && y < size - 1) count = count + expandBlocks(x - 1, y + 1);
        if (x < size - 1 && y < size - 1)
          count = count + expandBlocks(x + 1, y + 1);
      }
      return count + 1;
    }
  }

  //当右键方块后触发此方法，在旗帜模式和普通模式之间切换
  function blockFlagChange(id: number): void {
    //计算坐标位置
    let x: number = Math.floor(id / size);
    let y: number = id % size;
    if (tmpStatusList[x][y].inputStatus === 'normal') {
      tmpStatusList[x][y].inputStatus = 'flag';
      setFlagNum(flagNum + 1);
      setBlockRemain(blockRemain - 1);
    } else {
      tmpStatusList[x][y].inputStatus = 'normal';
      setFlagNum(flagNum - 1);
      setBlockRemain(blockRemain + 1);
    }
    setRenew(true);
  }

  //当点击方块后触发此方法
  function blockOnClick(id: number): void {
    //计算坐标位置
    let x: number = Math.floor(id / size);
    let y: number = id % size;
    //如果点到地雷，直接全部爆炸（显示出所有地雷位置）
    if (tmpStatusList[x][y].isMine) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          if (tmpStatusList[x][y].isMine) {
            tmpStatusList[x][y].inputStatus = 'mine';
          } else {
            //if(tmpStatusList[x][y].inputStatus!=='clicked')
            tmpStatusList[x][y].inputStatus = 'locked-failed';
          }
        }
      }
      setHintStatus('failed');
      setTableStyle('bg-slate-400 border-4 border-slate-600 rounded-sm p-1');
    }
    setBlockRemain(blockRemain - expandBlocks(x, y));
    setRenew(true);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setMineList(new Set());
    setTmpStatusList([]);
    setRestart(true);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //在发生操作时刷新地雷阵
  useEffect(() => {
    if (renew) {
      setRenew(false);
      set_blockDisplay(
        tmpStatusList.map((col, index) => {
          return (
            <tr key={`col-${index}`}>
              {col.map((block) => {
                return (
                  <td key={`${block.id}`}>
                    <Block
                      id={block.id}
                      inputStatus={block.inputStatus}
                      count={block.count}
                      isMine={block.isMine}
                      blockOnClick={blockOnClick}
                      blockFlagChange={blockFlagChange}
                    />
                  </td>
                );
              })}
            </tr>
          );
        }),
      );
    }
  }, [renew]);

  useEffect(() => {
    if (hintStatus !== 'success' && blockRemain + flagNum - mineNum === 0) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          if (tmpStatusList[x][y].isMine) {
            tmpStatusList[x][y].inputStatus = 'mine-clear';
          } else {
            //if(tmpStatusList[x][y].inputStatus!=='clicked')
            tmpStatusList[x][y].inputStatus = 'locked-success';
          }
        }
      }
      //setBlockRemain(99);
      setHintStatus('success');
      setTableStyle('bg-white border-4 border-green-100 rounded-sm p-1');
      setRenew(true);
    }
  }, [_blockDisplay]);

  return (
    <PageContainer
      ghost
      header={{
        title: '扫雷',
      }}
      extra={[
        <div key="extraContainer" className="flex gap-2">
          <Button key="new-game" onClick={showModal}>
            新游戏
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ ghost: true }}
          >
            <div className="flex gap-2">
              <InputNumber
                addonBefore="地雷阵宽度"
                min={3}
                max={20}
                defaultValue={15}
                onChange={(value) => {
                  if (!!value) setSize(value);
                }}
              />
              <InputNumber
                addonBefore="地雷个数:"
                min={1}
                max={size * size - 1}
                defaultValue={30}
                onChange={(value) => {
                  if (!!value) setMineNum(value);
                }}
              />
            </div>
          </Modal>
        </div>,
      ]}
    >
      <div className="container mx-auto flex justify-start">
        <Space size="large" align="center">
          <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <div className="flex gap-2">
              <InputNumber
                addonBefore="剩余方块数"
                readOnly
                value={blockRemain}
              />
              <InputNumber
                addonBefore="旗帜数"
                addonAfter={`/${mineNum}`}
                readOnly
                value={flagNum}
              />
            </div>
            <table className={tableStyle}>
              <tbody>{_blockDisplay}</tbody>
            </table>
          </Space>
          <Hint inputStatus={hintStatus} />
        </Space>
      </div>
    </PageContainer>
  );
};

export default MineCleaner;
