import React, { Component } from 'react';
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react';
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };
  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }
  private handleReload = () => {
    window.location.reload();
  };
  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen w-full flex flex-col items-center justify-center p-6"
          style={{
            backgroundColor: '#f5f5f7'
          }}>

          <div
            className="bg-white border border-red-200 rounded-lg p-8 max-w-md w-full text-center"
            style={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>

            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertTriangleIcon size={32} className="text-red-500" />
            </div>
            <h1 className="font-sans text-2xl font-bold text-gray-900 mb-2">
              Qualcosa è andato storto
            </h1>
            <p className="font-sans text-sm text-gray-600 mb-6">
              Si è verificato un errore imprevisto nell'applicazione.
            </p>

            {this.state.error &&
            <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded text-left overflow-auto">
                <p className="font-mono text-xs text-gray-500 break-words">
                  {this.state.error.toString()}
                </p>
              </div>
            }

            <button
              onClick={this.handleReload}
              className="flex items-center justify-center gap-2 w-full font-sans font-semibold text-sm py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors">

              <RefreshCwIcon size={16} />
              Ricarica la pagina
            </button>
          </div>
        </div>);

    }
    return this.props.children;
  }
}