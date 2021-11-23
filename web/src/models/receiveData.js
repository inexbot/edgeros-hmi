export function receiveData(dispatch, args) {
  switch (args.command) {
    case 0x2003:
      dispatch({
        type: 'status/servoStatus',
        data: args.data,
      });
      break;
    case 0x2e06:
      dispatch({
        type: 'status/robotSum',
        data: args.data,
      });
      break;
    case 0x5003:
      dispatch({
        type: 'status/currentRobot',
        data: args.data,
      });
      break;
    case 0x2e03:
      dispatch({
        type: 'status/robotType',
        data: args.data,
      });
      break;
    case 0x2103:
      dispatch({
        type: 'status/operationMode',
        data: args.data,
      });
      break;
    case 0x2106:
      dispatch({
        type: 'status/teachType',
        data: args.data,
      });
      break;
    case 0x2203:
      dispatch({
        type: 'status/coord',
        data: args.data,
      });
      break;
    case 0x2303:
      dispatch({
        type: 'status/deadman',
        data: args.data,
      });
      break;
    case 0x2603:
      dispatch({
        type: 'status/speed',
        data: args.data,
      });
      break;
    case 0x4306:
      dispatch({
        type: 'index/finishinit',
        data: args.data,
      });
      break;
    case 0x3403:
      dispatch({
        type: 'version',
        data: args.data,
      });
      break;
    case 0x2a03:
      dispatch({
        type: 'status/position',
        data: args.data,
      });
      break;
    case 0x3807:
      dispatch({
        type: 'parameter/toolParameter',
        data: args.data,
      });
      break;
    case 0x380c:
      dispatch({
        type: 'status/tool',
        data: args.data,
      });
      break;
    case 0x3c09:
      dispatch({
        type: 'parameter/userParameter',
        data: args.data,
      });
      break;
    case 0x3c0c:
      dispatch({
        type: 'status/user',
        data: args.data,
      });
      break;
    case 0x2a05:
      dispatch({
        type: 'status/motorVel',
        data: args.data,
      });
      break;
    case 0x2a07:
      dispatch({
        type: 'status/motorTorque',
        data: args.data,
      });
      break;
    case 0x5609:
      dispatch({
        type: 'var/numeral',
        data: args.data,
      });
      break;
    case 0x5606:
      dispatch({
        type: 'var/position',
        data: args.data,
      });
      break;
    case 0x561c:
      dispatch({
        type: 'var/externPosition',
        data: args.data,
      });
      break;
    case 0x2e09:
      dispatch({
        type: 'parameter/controlCycle',
        data: args.data,
      });
      break;
    case 0x2e1c:
      dispatch({
        type: 'parameter/eni',
        data: args.data,
      });
      break;
    case 0x2e0f:
      dispatch({
        type: 'parameter/slaveType',
        data: args.data,
      });
      break;
    case 0x2e16:
      dispatch({
        type: 'parameter/robotTypeAxisMap',
        data: args.data,
      });
      break;
    case 0x2e19:
      dispatch({
        type: 'parameter/drivenShaft',
        data: args.data,
      });
      break;
    case 0x3a03:
      dispatch({
        type: 'parameter/dh',
        data: args.data,
      });
      break;
    case 0x3b03:
      dispatch({
        type: 'parameter/joint',
        data: args.data,
      });
      break;
    case 0x7023:
      dispatch({
        type: 'parameter/syncJoint',
        data: args.data,
      });
      break;
    case 0x3b06:
      dispatch({
        type: 'parameter/linearSpeed',
        data: args.data,
      });
      break;
    case 0x2606:
      dispatch({
        type: 'parameter/jogJointSpeed',
        data: args.data,
      });
      break;
    case 0x2609:
      dispatch({
        type: 'parameter/jogLinearSpeed',
        data: args.data,
      });
      break;
    case 0x7026:
      dispatch({
        type: 'parameter/jogSyncSpeed',
        data: args.data,
      });
      break;
    case 0x260c:
      dispatch({
        type: 'parameter/jogSensitivity',
        data: args.data,
      });
      break;
    case 0x2803:
      dispatch({
        type: 'parameter/runningParameter',
        data: args.data,
      });
      break;
    case 0x330a:
      dispatch({
        type: 'parameter/encoder',
        data: args.data,
      });
      break;
    case 0x3303:
      dispatch({
        type: 'parameter/encoderZero',
        data: args.data,
      });
      break;
    case 0x3306:
      dispatch({
        type: 'parameter/encoderUndervol',
        data: args.data,
      });
      break;
    case 0x7037:
      dispatch({
        type: 'parameter/syncEncoder',
        data: args.data,
      });
      break;
    case 0x5508:
      dispatch({
        type: 'transFile/configFileList',
        data: args.data,
      });
      break;
    case 0x5533:
      dispatch({
        type: 'transFile/programSum',
        data: args.data,
      });
      break;
    case 0x5534:
      dispatch({
        type: 'transFile/programList',
        data: args.data,
      });
      break;
    case 0x2c03:
      dispatch({
        type: 'parameter/remoteJobfile',
        data: args.data,
      });
      break;
    case 0x5083:
      dispatch({
        type: 'parameter/selfStart',
        data: args.data,
      });
      break;
    default:
      break;
  }
}
