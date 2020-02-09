declare module 'dxf-parser' {
  export interface DxfEntity {
    handle: string;
    vertices: {}[];
  }

  export interface DxfData {
    entities: DxfEntity[];
  }

  export default class DxfParser {
    parseSync(data: string): DxfData;
  }
}
