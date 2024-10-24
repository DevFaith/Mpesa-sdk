import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import PaymentForm from './Components/PaymentForm';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Home />
      <PaymentForm />
      <Footer />
    </div>
  );
};

export default App;
