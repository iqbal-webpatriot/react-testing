import './App.css';
import AllRoutes from './AllRoutes/AllRoutes';

function App() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    worker.start();
  }

  return (
    <>
      <div className="App">
        <AllRoutes />
      </div>
    </>
  );
}

export default App;
