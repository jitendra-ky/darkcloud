import './App.css';
import AppHeader from './components/AppHeader';
import AppMain from './components/AppMain';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppHeader />
      </header>
      <main className='App-main'>
        <AppMain />
      </main>
    </div>
  );
}

export default App;
