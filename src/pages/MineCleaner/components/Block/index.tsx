import '@/tailwind.css';

export type Status =
  | 'normal'
  | 'mine'
  | 'clicked'
  | 'flag'
  | 'locked-failed'
  | 'locked-success'
  | 'mine-clear';

export type BlockProps = {
  id: number;
  inputStatus: Status;
  count: number;
  isMine: boolean;
  blockOnClick: (id: number) => void;
  blockFlagChange: (id: number) => void;
};

const Block: React.FC<BlockProps> = ({
  id,
  inputStatus = 'normal',
  count = 0,
  blockOnClick,
  blockFlagChange,
}) => {
  const onClick = () => {
    blockOnClick(id);
  };
  const onContextMenu = (e: any) => {
    e.preventDefault();
    blockFlagChange(id);
    //setStatus('flag');
  };

  switch (inputStatus) {
    case 'normal':
      return (
        <div
          className="m-0.25 w-10 h-10 bg-slate-400 hover:bg-slate-600 shadow-md rounded-sm transition-all"
          onClick={onClick}
          onContextMenu={onContextMenu}
        ></div>
      );
    case 'mine':
      return (
        <div className="m-0.25 w-10 h-10 bg-red-600 shadow-md rounded-sm border-2 border-red-800">
          <div className="m-0.25 w-10 h-10 bg-red-800 shadow-md rounded-sm border-2 border-red-600 animate-ping"></div>
        </div>
      );
    case 'clicked':
      if (count === 0) {
        return (
          <div className="m-0.25 w-10 h-10 bg-red-100 shadow-md rounded-sm"></div>
        );
      } else if (count < 3) {
        return (
          <div className="m-0.25 w-10 h-10 bg-red-300 text-center text-lg shadow-md rounded-sm">
            <p className="w-full h-full">
              <b>{count}</b>
            </p>
          </div>
        );
      } else if (count < 5) {
        return (
          <div className="m-0.25 w-10 h-10 bg-red-400 text-center text-lg shadow-md rounded-sm">
            <p className="w-full h-full">
              <b>{count}</b>
            </p>
          </div>
        );
      } else if (count < 7) {
        return (
          <div className="m-0.25 w-10 h-10 bg-red-500 text-center text-lg shadow-md rounded-sm">
            <p className="w-full h-full">
              <b>{count}</b>
            </p>
          </div>
        );
      } else if (count < 9) {
        return (
          <div className="m-0.25 w-10 h-10 bg-red-600 text-center text-lg shadow-md rounded-sm">
            <p className="w-full h-full">
              <b>{count}</b>
            </p>
          </div>
        );
      } else return;
    case 'flag':
      return (
        <div
          className="m-0.25 w-10 h-10 bg-slate-400 hover:bg-slate-600 text-center text-lg shadow-md rounded-sm"
          onContextMenu={onContextMenu}
        >
          🚩
        </div>
      );
    case 'locked-failed':
      return (
        <div className="m-0.25 w-10 h-10 bg-slate-600 shadow-md rounded-sm transition-all"></div>
      );
    case 'locked-success':
      return (
        <div className="m-0.25 w-10 h-10 bg-green-100 shadow-md rounded-sm transition-all duration-1000"></div>
      );
    case 'mine-clear':
      return (
        <div className="m-0.25 w-10 h-10 bg-green-100 shadow-md rounded-sm transition-all duration-1000">
          <div className="m-0.25 w-10 h-10 bg-green-600 shadow-md rounded-sm transition-all duration-1000 animate-bounce"></div>
        </div>
      );
  }
};

export default Block;
