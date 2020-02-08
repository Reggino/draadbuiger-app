import React from "react";
import "./App.css";

interface IAppState {
  time: number;
}

export default class App extends React.Component<{}, IAppState> {
  public state: IAppState = { time: 0 };
  private intervalTimer?: number;

  componentDidMount(): void {
    this.intervalTimer = (setInterval(this.refresh, 100) as any) as number;
  }

  componentWillUnmount(): void {
    clearInterval(this.intervalTimer);
  }

  private refresh = () => {
    this.setState({ time: this.state.time + 1 });
  };

  public render() {
    return (
      <div className="App">
        <img src={`http://draadbuigpi/image?${this.state.time}`} alt="" />
      </div>
    );
  }
}
