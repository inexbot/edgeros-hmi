import React, { useState, useEffect } from 'react';
import { connect, useHistory } from 'umi';
import './index.less';
const mapStateToProps = (state) => {
  return {
    connected: state.index.connection,
    servoStatus: state.status.servoStatus,
    deadman: state.status.deadman,
    deviceLost: state.index.deviceLost,
  };
};
function Header(props) {
  const [connectStatusCircle, setConnectStatusCircle] = useState('green');
  const [servoStatusCircle, setServoStatusCircle] = useState('#dddddd');
  const [deadmanStatusCircle, setDeadmanStatusCircle] = useState('green');

  const history = useHistory();

  useEffect(() => {
    if (props.deviceLost == true) {
      history.replace('/');
    }
  }, [props.deviceLost]);
  useEffect(() => {
    switch (props.connected) {
      case 0:
        setConnectStatusCircle('#dddddd');
        break;
      case 1:
        setConnectStatusCircle('green');
        break;
      case 2:
        setConnectStatusCircle('red');
        break;
      default:
        break;
    }
  }, [props.connected]);
  useEffect(() => {
    switch (props.servoStatus) {
      case 0:
        setServoStatusCircle('#dddddd');
        break;
      case 1:
        setServoStatusCircle('yellow');
        break;
      case 2:
        setServoStatusCircle('red');
        break;
      case 3:
        setServoStatusCircle('green');
        break;
      default:
        break;
    }
  }, [props.servoStatus]);
  useEffect(() => {
    if (props.deadman === 0) {
      setDeadmanStatusCircle('#dddddd');
    } else if (props.deadman === 1) {
      setDeadmanStatusCircle('green');
    }
  }, [props.deadman]);
  const clickServo = () => {
    if (servoStatusCircle === '#dddddd') {
      let servoData1 = {
        robot: 1,
        status: 1,
      };
      // sendMSGtoController('SERVO_STATUS_SET', servoData1);
    } else if (servoStatusCircle === 'yellow') {
      let servoData2 = {
        robot: 1,
        status: 0,
      };
      // sendMSGtoController('SERVO_STATUS_SET', servoData2);
    } else if (servoStatusCircle === 'red') {
      let servoData3 = {
        robot: 1,
      };
      // sendMSGtoController('FAULT_RESET', servoData3);
    }
  };
  const clickDeadman = () => {
    if (deadmanStatusCircle === '#dddddd') {
      let deadmanData = {
        deadman: 1,
      };
      // sendMSGtoController('DEADMAN_STATUS_SET', deadmanData);
      setDeadmanStatusCircle('green');
    } else if (deadmanStatusCircle === 'green') {
      let deadmanData1 = {
        deadman: 0,
      };
      sendMSGtoController('DEADMAN_STATUS_SET', deadmanData1);
      setDeadmanStatusCircle('#dddddd');
    }
  };
  return (
    <div className="header">
      <div className="status">
        <div className="status-content">
          <img
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/link.png"
            className="icon"
          />
          <p>连接</p>
          <div
            className="circle-status"
            style={{ background: connectStatusCircle }}
          />
        </div>
        <div className="status-content">
          <img
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/servo.png"
            className="icon"
          />
          <p>伺服</p>
          <div
            className="circle-status"
            style={{ background: servoStatusCircle }}
          />
        </div>
        <div className="status-content">
          <img
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/power.png"
            className="icon"
          />
          <p>上电</p>
          <div
            className="circle-status"
            style={{ background: servoStatusCircle }}
          />
        </div>
        <div className="status-content">
          <img
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/speed.png"
            className="icon"
          />
          <p>30%</p>
          <div
            className="circle-status"
            style={{ background: servoStatusCircle }}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Header);
