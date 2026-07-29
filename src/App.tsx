import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import ErrorBoundary from './components/ErrorBoundary';
export default function App() {

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <UIProvider>
          <CartProvider>
            <Layout />
          </CartProvider>
        </UIProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
