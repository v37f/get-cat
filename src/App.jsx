import styles from './App.module.scss';
import GetCat from './components/GetCat/GetCat';

function App() {
  return (
    <main className={styles.app}>
      <GetCat />
    </main>
  );
}

export default App;
