export default {
  namespace: 'parameter',
  state: {
    toolParameter: {},
    userParameter: {},
    controlCycle: 1,
    ENIName: '',
    isHaveENI: true,
    slaveType: {
      slaveType: ['无'],
      //slaveTypeEnglish 记录伺服的英文名称 作为伺服报错的表名
      slaveTypeEnglish: ['none'],
      servoNum: [1],
      IONum: [0],
    },
    robotTypeAxisMap: {
      servoSum: 6, //伺服个数
      sum: 1, //机器人个数
      robot: [
        {
          robotType: 'R_SCARA', //机器人类型
          servoMap: [1, 2, 3, 4], //伺服映射
          syncSum: 2, //外部轴个数
          syncGroupSum: 1, //外部轴组数
          syncType: [2, 0, 0], //外部轴类型
          syncMap: [[5, 6]], //外部轴映射
        },
      ],
    },
    encoder: {
      zero: [false, false, false, false, false, false, false],
      underVol: [],
      syncUnderVol: [],
      parameter: [],
      syncParameter: [],
    },
    servoSum: 0,
    drivenShaft: {},
    dh: null,
    joint: {
      axis: [],
      sync: [],
    },
    linearSpeed: {},
    decare: {},
    jogSpeed: {
      sensitivity: 0,
      joint: [],
      linear: [],
      sync: [],
    },
    runningParameter: {
      absolutePosResolution: 0,
      interpolationMethod: 0,
      runDelayTime: 0,
      stopTime: 0,
    },
    remoteJobfile: [],
    selfStart: [],
  },
  reducers: {
    toolParameter(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.toolParameter = action.data;
      return _state;
    },
    userParameter(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.userParameter = action.data;
      return _state;
    },
    dh(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.dh = action.data;
      console.log(action.data);
      return _state;
    },
    joint(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      console.log(JSON.stringify(action.data));
      if (_state.joint.axis.length > 0) {
        for (let i = 0; i < _state.joint.axis.length; i++) {
          if (_state.joint.axis[i]['AxisNum'] == action.data.Joint.AxisNum) {
            _state.joint.axis = [];
          }
        }
      }
      _state.joint.axis.push(action.data.Joint);
      return _state;
    },
    syncJoint(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      if (_state.joint.sync.length > 0) {
        for (let i = 0; i < _state.joint.sync.length; i++) {
          if (
            _state.joint.sync[i]['syncGroupNum'] == action.data.syncGroupNum
          ) {
            _state.joint.sync = [];
          }
        }
      }
      _state.joint.sync.push(action.data);
      return _state;
    },
    linearSpeed(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.linearSpeed = action.data.Decare;
      return _state;
    },
    jogJointSpeed(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      if (_state.jogSpeed.joint.length > 0) {
        for (let i = 0; i < _state.jogSpeed.joint.length; i++) {
          if (_state.jogSpeed.joint[i]['AxisNum'] == action.data.AxisNum) {
            _state.jogSpeed.joint = [];
          }
        }
      }
      _state.jogSpeed.joint.push(action.data);
      return _state;
    },
    jogLinearSpeed(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.jogSpeed.linear = action.data;
      return _state;
    },
    jogSyncSpeed(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      if (_state.jogSpeed.sync.length > 0) {
        for (let i = 0; i < _state.jogSpeed.sync.length; i++) {
          if (
            _state.jogSpeed.sync[i]['syncGroupNum'] == action.data.syncGroupNum
          ) {
            _state.jogSpeed.sync = [];
          }
        }
      }
      _state.jogSpeed.sync.push(action.data);
      return _state;
    },
    jogSensitivity(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.jogSpeed.sensitivity = action.data.Sensitivity;
      return _state;
    },
    runningParameter(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.runningParameter = action.data;
      return _state;
    },
    controlCycle(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.controlCycle = action.data.controlCycle;
      return _state;
    },
    eni(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.ENIName = action.data.ENIName;
      _state.isHaveENI = action.data.isHaveENI;
      return _state;
    },
    slaveType(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.slaveType = action.data;
      return _state;
    },
    servoSum(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.servoSum = action.data;
      return _state;
    },
    robotTypeAxisMap(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      console.log(JSON.stringify(action.data));
      _state.robotTypeAxisMap = action.data;
      return _state;
    },
    drivenShaft(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.drivenShaft = action.data;
      return _state;
    },
    encoder(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.encoder.parameter = action.data.value;
      return _state;
    },
    encoderZero(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      if (action.data.axis == 0) {
        _state.encoder.zero = [true, true, true, true, true, true, true];
      } else {
        _state.encoder.zero[action.data.axis - 1] = true;
      }
      return _state;
    },
    encoderUndervol(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.encoder.underVol = action.data.encoderUndervoltage;
      _state.encoder.syncUnderVol = action.data.encoderUndervoltageSync;
      return _state;
    },
    syncEncoder(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.encoder.syncParameter = action.data.allValue;
      return _state;
    },
    remoteJobfile(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let _d = _state.remoteJobfile;
      for (let i = 0; i < _d.length; i++) {
        if (_d[i]['robot'] == action.data['robot']) {
          _d[i] = action.data;
          _state.remoteJobfile = _d;
          return _state;
        }
      }
      _d.push(action.data);
      _state.remoteJobfile = _d;
      return _state;
    },
    selfStart(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let _d = _state.selfStart;
      for (let i = 0; i < _d.length; i++) {
        if (_d[i]['robot'] == action.data['robot']) {
          _d[i] = action.data;
          _state.selfStart = _d;
          return _state;
        }
      }
      _d.push(action.data);
      _state.selfStart = _d;
      return _state;
    },
  },
};
