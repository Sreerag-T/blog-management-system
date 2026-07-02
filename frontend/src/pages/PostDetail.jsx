import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios.js'
import { useAuth } from '../context/AuthContext.jsx'
import CommentList from '../components/CommentList.jsx'

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get(`/posts/${id}/`)
      .then(({ data }) => setPost(data))
      .catch(() => setError('Post not found.'))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    try {
      await api.delete(`/posts/${id}/`)
      navigate('/')
    } catch {
      setError('Could not delete the post.')
    }
  }

  if (error) return <p className="error-text">{error}</p>
  if (!post) return <p>Loading...</p>

  const isOwner = user?.username === post.author_username

  return (
    <article className="post-detail">
      <Link to="/" className="back-link">&larr; Back to all posts</Link>
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>By {post.author_username}</span>
        <span>{new Date(post.created_at).toLocaleString()}</span>
      </div>
      <p className="post-content">{post.content}</p>

      {isOwner && (
        <div className="post-owner-actions">
          <Link to={`/posts/${post.id}/edit`}>Edit</Link>
          <button onClick={handleDelete} className="link-button danger">Delete</button>
        </div>
      )}

      <CommentList
        postId={post.id}
        comments={post.comments}
        onCommentsChange={(comments) => setPost({ ...post, comments })}
      />
    </article>
  )
}
