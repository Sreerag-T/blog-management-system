import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

export default function PostForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (!isEditing) return
    api
      .get(`/posts/${id}/`)
      .then(({ data }) => {
        setTitle(data.title)
        setContent(data.content)
      })
      .catch(() => setError('Could not load this post.'))
      .finally(() => setLoading(false))
  }, [id, isEditing])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isEditing) {
        await api.patch(`/posts/${id}/`, { title, content })
        navigate(`/posts/${id}`)
      } else {
        const { data } = await api.post('/posts/', { title, content })
        navigate(`/posts/${data.id}`)
      }
    } catch {
      setError('Could not save the post. Check your input and try again.')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="form-page">
      <h2>{isEditing ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit} className="form">
        {error && <p className="error-text">{error}</p>}
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
        </label>
        <label>
          Content
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isEditing ? 'Save Changes' : 'Publish Post'}</button>
      </form>
    </div>
  )
}
