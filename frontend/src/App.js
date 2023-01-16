import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Header />
    <main>
      <Container>
        <h1>Hsiang Bakery</h1>
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default App;
