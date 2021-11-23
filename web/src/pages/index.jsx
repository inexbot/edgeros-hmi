import { useState, useEffect } from 'react';
import { useHistory, connect } from 'umi';
import { List } from 'antd';
import './index.less';
import Axios from 'axios';
import { Button, notification } from 'antd';
import { SendMessage } from '../service';

const mapStateToProps = (state) => {
  return {
    deviceLost: state.index.deviceLost,
    devid: state.index.devid,
  };
};

function IndexPage(props) {
  const [deviceList, setDeviceList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getDeviceList();
  }, []);
  const getDeviceList = () => {
    Axios.post('/getDeviceList', '').then((res) => {
      if (typeof res.data != 'object') {
        return;
      }
      setDeviceList(res.data);
    });
  };
  const selectDevice = (devid) => {
    Axios.post(`/connectDevice/${devid}`).then((res) => {
      if (res.data.code == 20000) {
        props.dispatch({
          type: 'index/deviceLost',
          data: false,
        });
        props.dispatch({
          type: 'index/devid',
          data: devid,
        });
        history.replace('/teach');
      } else {
        props.dispatch({
          type: 'index/deviceLost',
          data: true,
        });
      }
    });
  };
  return (
    <div>
      <List
        header={
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexFlow: 'row',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: '500',
                display: 'inline',
                width: '100px',
              }}
            >
              选择设备
            </div>
          </div>
        }
        bordered
        loadMore={
          <div
            style={{
              textAlign: 'center',
              marginTop: 12,
              height: 32,
              lineHeight: '32px',
            }}
          >
            <Button onClick={getDeviceList}>重新获取</Button>
          </div>
        }
      >
        {deviceList
          ? deviceList.map((v, i) => (
              <List.Item
                onClick={selectDevice.bind(this, v.devid)}
                extra={v.info.report.desc}
              >
                <List.Item.Meta description={v.devid} title={v.alias} />
              </List.Item>
            ))
          : ''}
      </List>
      <Button
        onClick={() => {
          SendMessage(0x2299, { robot: 1 });
        }}
      >
        sdasda
      </Button>
    </div>
  );
}

export default connect(mapStateToProps)(IndexPage);
