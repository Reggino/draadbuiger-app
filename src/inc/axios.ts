import axios from "axios";

const instance = axios.create({
  baseURL: "http://draadbuigpi/"
});

export default instance;
