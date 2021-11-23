/*
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * File: main.js.
 *
 * Author: hanhui@acoinfo.com
 *
 */

/* Import system modules */
const WebApp = require("webapp");
var Device = require("device");
var devices = [];
var device = undefined;

/* Create App */
const app = WebApp.createApp();

/* Set static path */
app.use(WebApp.static("./public"));

var io = require("socket.io")(app, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

io.on("connection", () => {
  console.log("someone connected");
});

io.on("messagea", (data) => {
  console.log(data);
  if (device) {
    device.send(data);
  }
});

app.post("/getDeviceList", (req, res) => {
  res.send(devices);
});

app.post("/connectDevice/:devid", (req, res) => {
  device = new Device();
  device.request(req.params.devid, (error) => {
    if (error) {
      res.send({
        result: false,
        code: 50004,
        message: `设备错误:${error.message}`,
      });
      device = undefined;
    } else {
      res.send({ result: true, code: 20000, message: "连接成功" });
      device.on("lost", () => {
        io.emit("device-lost", "");
        console.log("device-lost-emit");
        deviceRemove();
      });
      device.on("message", (msg) => {
        io.emit("message", msg);
      });
      device.send(
        { query: true },
        (error) => {
          if (error) {
            console.error(`发送消息到设备失败:${error.message}`);
          } else {
            console.log("发送消息到设备成功");
          }
        },
        3
      );
    }
  });
});

function deviceRemove() {
  if (device) {
    device.release();
    device.removeAllListeners();
  }
}

/* Start App */
app.start();

getDevice();

setInterval(() => {
  getDevice();
}, 2000);

function getDevice() {
  Device.list(true, (error, list) => {
    if (list) {
      devices = [];
      list.forEach((v) => {
        Device.info(v.devid, (error, info) => {
          if (info) {
            devices.push({
              devid: v.devid,
              alias: v.alias,
              info: info,
            });
          }
        });
      });
    }
  });
}

/* Event loop */
require("iosched").forever();
