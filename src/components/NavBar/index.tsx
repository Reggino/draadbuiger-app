import { Classes, HTMLSelect } from "@blueprintjs/core";
import React, { useContext } from "react";

import "./index.scss";
import { DxfContext } from "../../provider/Dxf";

export default () => {
  const { setDxfDataFromText } = useContext(DxfContext);
  return (
    <div className={`${Classes.NAVBAR} ${Classes.DARK}`}>
      <div className={Classes.NAVBAR_GROUP}>
        <div className={Classes.NAVBAR_HEADING}>
          <a href="https://bitbucket.org/Reggino/draadbuiger-app/">
            Draadbuiger
          </a>
        </div>
      </div>
      <div className={`${Classes.NAVBAR_GROUP} ${Classes.BUTTON_GROUP}`}>
        <label className={`theme-selection ${Classes.LABEL} ${Classes.INLINE}`}>
          Load file:{" "}
          <input
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { files } = e.target;
              if (!files || !files.length) {
                alert("Please select a file!");
                return;
              }
              // eslint-disable-next-line prefer-destructuring
              const file = files[0];
              const start = 0;
              const stop = file.size - 1;
              const reader = new FileReader();

              // If we use onloadend, we need to check the readyState.
              reader.onloadend = (evt: any) => {
                if (!evt.target || !evt.target.readyState) {
                  return;
                }
                if (evt.target.readyState === FileReader.DONE) {
                  // DONE == 2
                  setDxfDataFromText(evt.target.result);
                }
              };

              const blob = file.slice(start, stop + 1);
              reader.readAsBinaryString(blob);
            }}
          />
        </label>
        <div className="navbar-separator" />
        <label className={`theme-selection ${Classes.LABEL} ${Classes.INLINE}`}>
          Draad:
          <HTMLSelect
            value={""}
            onChange={e => {
              console.log(e);
            }}
          >
            <option>draad</option>
            <option>draad</option>
            <option>draad</option>
          </HTMLSelect>
        </label>
      </div>
    </div>
  );
};
