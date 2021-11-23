export default {
  namespace: 'status',
  state: {
    robotSum: 1,
    currentRobot: 1,
    robotType: '',
    robotTypeNumber: 0,
    robotTypeChinese: '',
    robotAxisSum: 0,
    coord: 0,
    position: {},
    motorVel: {},
    motorTorque: {},
    servoStatus: 0,
    multiRobotMode: 0,
    operationMode: 0,
    teachType: 0,
    deadman: 0,
    speed: 0,
    tool: 0,
    user: 0,
  },
  reducers: {
    robotSum(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotSum = action.data.sum;
      return _state;
    },
    servoStatus(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.servoStatus = action.data.status;
      _state.multiRobotMode = action.data.mode;
      return _state;
    },
    operationMode(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.operationMode = action.data.mode;
      return _state;
    },
    teachType(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.teachType = action.data.teachType;
      return _state;
    },
    coord(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.coord = action.data.coord;
      return _state;
    },
    tool(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.tool = action.data.curToolNum;
      return _state;
    },
    user(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.user = action.data.curUserNum;
      return _state;
    },
    deadman(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.deadman = action.data.deadman;
      return _state;
    },
    speed(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.speed = action.data.speed;
      return _state;
    },
    position(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.position = action.data;
      return _state;
    },
    motorVel(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.motorVel = action.data;
      return _state;
    },
    motorTorque(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.motorTorque = action.data;
      return _state;
    },
  },
};
