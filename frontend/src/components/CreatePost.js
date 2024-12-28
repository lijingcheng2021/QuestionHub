import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('尝试发布帖子:', { title, content });
    console.log('API URL:', process.env.REACT_APP_API_URL);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, {
        title,
        content
      });
      
      console.log('发布成功:', response.data);
      navigate('/');
    } catch (error) {
      console.error('发布失败:', error);
      if (error.response) {
        console.error('服务器响应:', error.response.data);
        setError(`发布失败: ${error.response.data.message || '服务器错误'}`);
      } else if (error.request) {
        console.error('无响应:', error.request);
        setError('无法连接到服务器，请检查网络连接');
      } else {
        console.error('请求错误:', error.message);
        setError('发布失败，请重试');
      }
    }
  };

  return (
    <div className="create-post">
      <h2>发布新问题</h2>
      {error && (
        <div className="error-message" style={{
          color: 'red',
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入问题标题"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="请详细描述你的问题..."
            required
            className="form-control"
            rows="6"
          />
        </div>
        <button type="submit" className="submit-button">
          发布问题
        </button>
      </form>
    </div>
  );
};

export default CreatePost; 