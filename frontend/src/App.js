import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
              <li>
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>首页</Link>
              </li>
              <li>
                <Link to="/create" style={{ textDecoration: 'none', color: '#333' }}>发布问题</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 