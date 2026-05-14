import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
          <h2 className="mt-4 text-xl font-semibold text-red-800">Ocurrió un error</h2>
          <p className="mt-2 text-red-600">
            Lo sentimos, algo salió mal al procesar tu solicitud. Por favor, intenta de nuevo más tarde.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
