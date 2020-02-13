import { ITileProps } from "../index";
import { MosaicWindow } from "react-mosaic-component";
import React from "react";
import { Button } from "@blueprintjs/core";
import "./index.scss";
import { AppToaster } from "../../inc/toaster";
import axios from "../../inc/axios";

const sendSerialCommand = (command: string) =>
  axios.request({
    method: "post",
    url: "/serial",
    params: {
      command
    }
  });

const sendGpioCommand = ({ pin, high }: { pin: number; high: boolean }) =>
  axios.request({
    method: "post",
    url: `/gpio/${pin}`,
    params: {
      high
    }
  });

const gpioCommand = {
  laag: {
    pin: 6,
    high: true
  },
  hoog: {
    pin: 6,
    high: false
  },
  vast: {
    pin: 5,
    high: true
  },
  los: {
    pin: 5,
    high: false
  }
};

const showSuccess = () =>
  AppToaster.show({ message: "Command processed", intent: "success" });

const showError = (e: Error) =>
  AppToaster.show({ message: e.message, intent: "danger" });

export default ({ path }: ITileProps) => (
  <MosaicWindow title={`Manuele besturing`} path={path}>
    <table className="tiles__controls-tile__table">
      <tbody>
        <tr>
          <td>
            <Button
              large={true}
              icon="refresh"
              title="Draai links"
              className="tiles__controls-tile__rotate-left"
              onClick={() => {
                sendSerialCommand("g91 g1 f1000 x-10")
                  .then(showSuccess)
                  .catch(showError);
              }}
              style={{ transform: "rotate(180deg)" }}
            />
          </td>
          <td>
            <Button
              icon="arrow-up"
              title="Heen / voeren"
              large={true}
              onClick={() => {
                sendGpioCommand(gpioCommand.los)
                  .then(() => sendSerialCommand("g91 g1 f2000 y100"))
                  .then(() => sendGpioCommand(gpioCommand.vast))
                  .then(showSuccess)
                  .catch(showError);
              }}
            />
          </td>
          <td>
            <Button
              icon="refresh"
              title="Draai rechts"
              large={true}
              onClick={() => {
                sendSerialCommand("g91 g1 f1000 x10")
                  .then(showSuccess)
                  .catch(showError);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Button
              icon="arrow-left"
              large={true}
              onClick={() => {
                sendSerialCommand("g91 g1 f1000 z1")
                  .then(showSuccess)
                  .catch(showError);
              }}
              title="Buig links"
            />
          </td>
          <td>
            <Button
              icon="home"
              large={true}
              onClick={() => {
                sendGpioCommand({ pin: -1, high: true })
                  .then(() => sendSerialCommand("g92 x0 y0 z0"))
                  .then(showSuccess)
                  .catch(showError);
              }}
              title="Home"
            />
          </td>
          <td>
            <Button
              icon="arrow-right"
              large={true}
              onClick={() => {
                sendSerialCommand("g91 g1 f1000 z-1")
                  .then(showSuccess)
                  .catch(showError);
              }}
              title="Buig rechts"
            />
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>
            <Button
              icon="arrow-down"
              large={true}
              title="Terug"
              onClick={() => {
                sendGpioCommand(gpioCommand.los)
                  .then(() => sendSerialCommand("g91 g1 f1000 y-10"))
                  .then(() => sendGpioCommand(gpioCommand.vast))
                  .then(showSuccess)
                  .catch(showError);
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </MosaicWindow>
);
