import { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import Header from './components/Header';
import Summary from './components/Summary';
import Chart from './components/Chart';
import TransactionForm from './components/TransactionForm';
import Filters from './components/Filters';
import TransactionList from './components/TransactionList';
import ConfirmModal from './components/ConfirmModal';
import ToastContainer from './components/Toast';

export default function App() {
  const theme = useStore((s) => s.theme);
  const [skeletonVisible, setSkeletonVisible] = useState(true);

  // Keep body class in sync with theme store
  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light');
  }, [theme]);

  // Hide skeleton loader after initial paint (matches vanilla 300ms delay)
  useEffect(() => {
    const id = setTimeout(() => setSkeletonVisible(false), 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <div className="bg-gradient" />
      {skeletonVisible && (
        <div className="skeleton" aria-hidden="true">
          <div className="skeleton__block" />
          <div className="skeleton__block" />
          <div className="skeleton__block" />
        </div>
      )}
      <div className="app">
        <Header />
        <Summary />
        <Chart />
        <section className="grid">
          <TransactionForm />
          <Filters />
        </section>
        <TransactionList />
      </div>
      <ConfirmModal />
      <ToastContainer />
    </>
  );
}
