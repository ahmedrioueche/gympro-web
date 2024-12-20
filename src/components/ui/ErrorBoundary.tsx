import React, { Component, ReactNode } from "react";
import ErrorScreen from "./ErrorScreen";

interface ErrorBoundaryProps {
  children: ReactNode;
  type?: "main" | "fullScreen";
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to display fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to an external service if needed
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen type={this.props.type} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
