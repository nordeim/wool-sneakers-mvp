import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-8 text-center">
            <h2 className="font-["Cormorant_Garamond",serif] text-xl mb-2">Something went wrong</h2>
            <p className="text-[#8C8580] text-sm">
              Please refresh the page or try again later.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-6 py-2 bg-[#3D3835] text-[#F7F4F0] rounded-full font-["Space_Grotesk",sans-serif] text-xs tracking-widest uppercase"
            >
              Try Again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
