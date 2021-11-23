import React, { useEffect } from 'react';
import Header from '@/component/header';
import { useHistory } from 'umi';
import './index.less';
function Teach() {
  const history = useHistory();
  const handleClick = (path) => {
    history.push(`teach/${path}`);
  };

  return (
    <div className="teach">
      <Header />
      <div style={{ display: 'flex', flexWrap: 'wrap', flexFlow: 'row' }}>
        <div
          className="teach-index1"
          onClick={handleClick.bind(this, 'drag')}
        />
        <div className="teach-index2" onClick={handleClick.bind(this, 'jog')} />
      </div>
    </div>
  );
}

export default Teach;
