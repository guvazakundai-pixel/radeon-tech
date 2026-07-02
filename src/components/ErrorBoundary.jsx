import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "40px", fontFamily: "sans-serif", background: "#FAF8FF", minHeight: "100vh", color: "#1F1F28" }}>
          <h1 style={{ color: "#A78BFA" }}>Something went wrong</h1>
          <pre style={{ background: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid #E8E6F0", overflow: "auto", fontSize: "14px" }}>
            {this.state.error?.message || "Unknown error"}
            {"\n\n"}
            {this.state.info?.componentStack || ""}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
