// @ts-nocheck
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">সাময়িক সমস্যা</h2>
            <p className="text-sm text-slate-500 mb-6">
              অ্যাপ্লিকেশনটি লোড হতে একটি সমস্যা হয়েছে। অনুগ্রহ করে পেজটি রিলোড করুন।
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-left overflow-auto text-[10px] font-mono text-red-600 mb-6 max-h-32">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#00a651] text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
            >
              রিলোড করুন
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
