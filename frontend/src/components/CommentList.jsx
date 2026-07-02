import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'

export default function CommentList({ postId, comments, onCommentsChange }) {
  const { user } = useAuth()
  const [newComment, setNewComment] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [error, setError] = useState('')

  const submitComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    try {
      const { data } = await api.post('/comments/', { post: postId, content: newComment })
      onCommentsChange([...comments, data])
      setNewComment('')
      setError('')
    } catch {
      setError('Could not post your comment. Please try again.')
    }
  }

  const startEdit = (comment) => {
    setEditingId(comment.id)
    setEditText(comment.content)
  }

  const saveEdit = async (commentId) => {
    try {
      const { data } = await api.patch(`/comments/${commentId}/`, { content: editText })
      onCommentsChange(comments.map((c) => (c.id === commentId ? data : c)))
      setEditingId(null)
    } catch {
      setError('Could not update the comment.')
    }
  }

  const deleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return
    try {
      await api.delete(`/comments/${commentId}/`)
      onCommentsChange(comments.filter((c) => c.id !== commentId))
    } catch {
      setError('Could not delete the comment.')
    }
  }

  return (
    <div className="comments">
      <h3>Comments ({comments.length})</h3>

      {error && <p className="error-text">{error}</p>}

      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          {editingId === comment.id ? (
            <div className="comment-edit-form">
              <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
              <div className="comment-actions">
                <button onClick={() => saveEdit(comment.id)}>Save</button>
                <button onClick={() => setEditingId(null)} className="secondary">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className="comment-content">{comment.content}</p>
              <div className="comment-meta">
                <span>{comment.author_username}</span>
                {user?.username === comment.author_username && (
                  <span className="comment-actions">
                    <button onClick={() => startEdit(comment)} className="link-button">Edit</button>
                    <button onClick={() => deleteComment(comment.id)} className="link-button danger">Delete</button>
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      ))}

      {user ? (
        <form onSubmit={submitComment} className="comment-form">
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p className="muted">Log in to add a comment.</p>
      )}
    </div>
  )
}
