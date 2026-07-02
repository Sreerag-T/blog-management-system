import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios.js'

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/posts/')
      .then(({ data }) => setPosts(data.results ?? data))
      .catch(() => setError('Could not load posts.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading posts...</p>
  if (error) return <p className="error-text">{error}</p>

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.length === 0 && <p className="muted">No posts yet. Be the first to write one!</p>}
      <div className="post-grid">
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content.slice(0, 140)}{post.content.length > 140 ? '...' : ''}</p>
            <div className="post-meta">
              <span>By {post.author_username}</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
