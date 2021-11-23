import { useState, useEffect } from 'react';
import { SendMessage } from '@/service';
import { Form, Select, Slider, Input, InputNumber, Button } from 'antd';

function Jog() {
  const [coordinate, setCoordinate] = useState(0);
  const [axis, setAxis] = useState(['J1', 'J2', 'J3', 'J4', 'J5', 'J6']);
  const [selected, setSelected] = useState('关节');
  const [speed, setSpeed] = useState(13);
  const coordinateRange = ['关节', '直角', '工具', '用户'];
  const changeSpeed = (val) => {
    SendMessage(0x2601, { robot: 1, speed: parseInt(val) });
  };
  useEffect(() => {
    return () => {
      let deadmanData = {
        deadman: 0,
      };
      sendMSGtoController('DEADMAN_STATUS_SET', deadmanData);
    };
  }, []);
  let jogInterval;
  useEffect(() => {
    let coordinate = props.coordinate;
    switch (coordinate) {
      case 0:
        setSelected(coordinateRange[0]);
        setCoordinate(0);
        setAxis(['J1', 'J2', 'J3', 'J4', 'J5', 'J6']);
        break;
      case 1:
        setSelected(coordinateRange[1]);
        setCoordinate(1);
        setAxis(['X', 'Y', 'Z', 'A', 'B', 'C']);
        break;
      case 2:
        setSelected(coordinateRange[2]);
        setCoordinate(2);
        setAxis(['TX', 'TY', 'TZ', 'TA', 'TB', 'TC']);
        break;
      case 3:
        setSelected(coordinateRange[3]);
        setCoordinate(3);
        setAxis(['UX', 'UY', 'UZ', 'UA', 'UB', 'UC']);
        break;
      default:
        break;
    }
  }, [props.coordinate]);
  useEffect(() => {
    console.log(props.pos);
  }, [props.pos]);
  useEffect(() => {
    setSpeed(props.speed);
  }, [props.speed]);
  const changeCoordinate = (val) => {
    let value = val.currentTarget.value;
    switch (value) {
      case '0':
        let jointData = {
          robot: 1,
          coord: 0,
        };
        sendMSGtoController('COORD_MODE_SET', jointData);
        break;
      case '1':
        let xyzData = {
          robot: 1,
          coord: 1,
        };
        sendMSGtoController('COORD_MODE_SET', xyzData);
        break;
      case '2':
        let toolData = {
          robot: 1,
          coord: 2,
        };
        sendMSGtoController('COORD_MODE_SET', toolData);
        break;
      case '3':
        let userData = {
          robot: 1,
          coord: 3,
        };
        sendMSGtoController('COORD_MODE_SET', userData);
        break;
      default:
        break;
    }
  };
  const startJog = (axis, direction) => {
    let jogData = {
      axis: axis,
      direction: direction,
    };
    jogInterval = setInterval(() => {
      SendMessage(0x2901, jogData);
    }, 300);
    return;
  };
  const stopJog = (axis) => {
    clearInterval(jogInterval);
    SendMessage(0x2902, {});
  };
  return (
    <Form>
      <Form.Item name="coord" label="坐标系">
        <Select>
          <Select.Option value={0}>关节</Select.Option>
          <Select.Option value={1}>直角</Select.Option>
          <Select.Option value={2}>工具</Select.Option>
          <Select.Option value={3}>用户</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="speed" label="速度">
        <Slider min={1} max={100} onChange={changeSpeed} value={speed} />
      </Form.Item>
    </Form>
  );
}

export default Jog;
