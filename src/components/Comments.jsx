import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Comments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chapters/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to comment.');
        return;
      }

      await axios.post(
        `http://localhost:5000/api/chapters/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setComments([...comments, { content: newComment, date: new Date().toISOString() }]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {isAuthenticated ? (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>You must <a href="/login">log in</a> to comment.</p>
      )}

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment.content}</p>
              <small>{new Date(comment.date).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}

export default Comments;
