import React from "react";
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { now: new Date() };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return <span className="clock">{this.state.now.toLocaleTimeString("vi-VN")}</span>;
  }
}
export default Clock;
