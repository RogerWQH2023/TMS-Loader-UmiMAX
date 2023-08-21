import '@/tailwind.css';

export type HintStatus = 'none' | 'working' | 'failed' | 'success';

export type HintProps = {
  inputStatus: HintStatus;
};

const Hint: React.FC<HintProps> = ({ inputStatus = 'working' }) => {
  switch (inputStatus) {
    case 'none':
      return;
    case 'working':
      return (
        <h1 className="text-center text-4xl text-slate-600 animate-pulse">
          ~~<b>Have Fun!</b>~~
        </h1>
      );
    case 'failed':
      return (
        <h1 className="text-center text-4xl text-red-600 animate-bounce">
          --<b>GAME OVER</b>--
        </h1>
      );
    case 'success':
      return (
        <h1 className="text-center text-4xl text-green-600 animate-bounce">
          ==<b>Congratulations!!!</b>==
        </h1>
      );
  }
};

export default Hint;
