import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import DxfParser, { DxfData } from "dxf-parser";
import { AppToaster } from "../inc/toaster";

const parser = new DxfParser();

export const DxfContext = createContext<{
  dxfData?: DxfData;
  entityIndex: number;
  instructionIndex: number;
  setDxfDataFromText: (dxfString: string) => void;
  setEntityIndex: (entityIndex: number) => void;
  setInstructionIndex: (instructionIndex: number) => void;
}>({
  entityIndex: 0,
  instructionIndex: 0,
  setDxfDataFromText: (dxfString: string) => {},
  setEntityIndex: (entityIndex: number) => {},
  setInstructionIndex: (instructionIndex: number) => {}
});

const DxfProvider = ({ children }: { children: any }) => {
  const [dxfData, setDxfData] = useState();
  const [entityIndex, setEntityIndex] = useState(0);
  const [instructionIndex, setInstructionIndex] = useState(0);

  const setDxfDataFromText = (dxfString: string) => {
    try {
      setDxfData(parser.parseSync(dxfString));
      setEntityIndex(0);
      setInstructionIndex(0);
      AppToaster.show({ message: "Bestand is ingelezen", intent: "success" });
    } catch (e) {
      AppToaster.show({ message: e.message, intent: "danger" });
    }
  };

  useEffect(() => {
    axios.get("/resources/18_veel lijnen.dxf").then(res => {
      setDxfDataFromText(res.data);
    });
  }, []);
  return (
    <DxfContext.Provider
      value={{
        setDxfDataFromText,
        dxfData,
        entityIndex,
        setEntityIndex,
        instructionIndex,
        setInstructionIndex
      }}
    >
      {children}
    </DxfContext.Provider>
  );
};

export default DxfProvider;
