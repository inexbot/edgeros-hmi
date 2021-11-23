import { socket, ParseReceivedData, OpenSocket } from '@/service';
import { message } from 'antd';
export default {
  namespace: 'index',
  state: {
    deviceLost: true,
    devid: '',
    connection: 0,
    ip: [''],
    connectedIp: '',
    version: '',
    finishinit: false,
    update: {
      status: 0,
      progress: 0,
      bytesPerSecond: 0,
      total: 0,
      version: '',
    },
  },
  subscriptions: {
    onMessage({ dispatch }) {
      OpenSocket();
      setTimeout(() => {
        socket.emit('message', '123123');
        socket.on('device-lost', () => {
          console.log('device-lost-emited?');
          dispatch({
            type: 'deviceLost',
            data: true,
          });
          message.error('设备断开连接！');
        });
        socket.on('message', (data) => {
          let msg = ParseReceivedData(data);
          console.log(msg.command, msg.data);
        });
      }, 1000);
    },
  },
  reducers: {
    deviceLost(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.deviceLost = action.data;
      return _state;
    },
    devid(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.devid = action.data;
      return _state;
    },
    config(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.ip = action.data.ip;
      return _state;
    },
    connection(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.connection = action.data.connection;
      _state.connectedIp = action.data.connectedIp;
      return _state;
    },
    setConnectedIp(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.connectedIp = action.data.connectedIp;
      return _state;
    },
    version(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.version = action.data.version;
      return _state;
    },
    finishinit(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.finishinit = action.data.finishinit;
      return _state;
    },
    update(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let _status = action.data.status;
      let _data = action.data.data;
      switch (_status) {
        case 'checking-for-update':
          _state.update['status'] = 1;
          break;
        case 'update-not-available':
          _state.update['status'] = 2;
          break;
        case 'download-progress':
          _state.update['status'] = 3;
          _state.update['progress'] = _data['percent'].toFixed(1);
          _state.update['total'] = _data['total'] / (1024 * 1024);
          _state.update['bytesPerSecond'] =
            _data['bytesPerSecond'] / (1024 * 1024);
          break;
        case 'update-downloaded':
          _state.update['status'] = 4;
          _state.update['version'] = _data['version'];
          break;
        case 'error':
          _state.update['status'] = 5;
          break;
        default:
          break;
      }
      return _state;
    },
  },
};
