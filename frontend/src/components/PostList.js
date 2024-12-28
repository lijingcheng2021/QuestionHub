import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('获取帖子失败:', error);
        setError('获取帖子失败，请刷新页面重试');
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          还没有任何帖子，快来发布第一个帖子吧！
        </div>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>发布于: {new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList; 