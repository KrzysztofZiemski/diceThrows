import React from 'react';
import '../styles/App.css';
import Nav from './Nav.js'
import Footer from './Footer'
import Pages from './pages/Pages'
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <section className="main">
          <aside>
            <Nav></Nav>
          </aside>
          <main>
            <Pages></Pages>
          </main>
        </section>
        <footer><Footer></Footer> </footer>
      </div>
    </Router >
  );
}

export default App;
