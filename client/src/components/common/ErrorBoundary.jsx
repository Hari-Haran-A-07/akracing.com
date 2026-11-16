import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[AKR ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="max-w-lg text-center">
            <div className="text-6xl mb-4">ðŸ</div>
            <h1 className="text-2xl font-bold text-white mb-2">Race Incident Detected</h1>
            <p className="text-gray-400 mb-6">
              Something went wrong on the circuit. Our pit crew is investigating.
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold tracking-wide"
            >
              RESTART LAP
            </button>
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <pre className="mt-6 text-left text-xs text-red-400 bg-gray-900 p-4 rounded overflow-auto max-h-48">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
