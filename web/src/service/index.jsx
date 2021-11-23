import io from 'socket.io-client';
import { edger } from '@edgeros/web-sdk';
import utf8 from '@protobufjs/utf8';
import crc32 from 'crc-32';
import _Buffer from 'buffer/';
export var socket;
var Buffer = _Buffer.Buffer;
var bufferPool = Buffer.alloc(0);
export function OpenSocket() {
  edger.token().then((data) => {
    const auth = {
      'edger-token': data.token,
      'edger-srand': data.srand,
    };
    socket = io({ query: auth });
  });
}

export function SendMessage(command, data) {
  if (!socket.connected) {
    return;
  }
  let message = getDataBuffer(command, data);
  console.log(message);
  socket.emit('messagea', message);
}

export function ParseReceivedData(data) {
  let dataBuffer = Buffer.from(data);
  if (dataBuffer.length < 10) {
    return;
  }
  let commandBuffer = dataBuffer.slice(4, 6);
  let dataValueBuffer = dataBuffer.slice(6, dataBuffer.length - 4);
  let command = commandBuffer.readUIntBE(0, 2);
  let dataJson = dataValueBuffer.toString()
    ? JSON.parse(dataValueBuffer.toString())
    : {};
  let msg = { command: command, data: dataJson };
  return msg;
}
export function SendLog(logs) {
  socket.emit('log', logs);
}
function getDataBuffer(command, data) {
  let dataString = JSON.stringify(data);
  let dataBuffer = new Uint8Array(utf8.length(dataString));
  utf8.write(dataString, dataBuffer, 0);
  let dataLength = data ? dataBuffer.byteLength : 0;
  let headerBuffer = Buffer.from([0x4e, 0x66]);
  let lengthBuffer = Buffer.alloc(2);
  lengthBuffer.writeIntBE(dataLength, 0, 2);
  let commandBuffer = Buffer.alloc(2);
  commandBuffer.writeUIntBE(command, 0, 2);
  let toCrc32 = Buffer.concat([lengthBuffer, commandBuffer, dataBuffer]);
  let crc32Number = crc32.buf(toCrc32);
  let crc32Buffer = Buffer.alloc(4);
  crc32Buffer.writeIntBE(crc32Number, 0, 4);
  let message = Buffer.concat([
    headerBuffer,
    lengthBuffer,
    commandBuffer,
    dataBuffer,
    crc32Buffer,
  ]);
  return message;
}
