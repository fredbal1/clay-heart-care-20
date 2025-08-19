
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Index = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Redirect to dashboard for now (in real app would check auth status)
    navigate('/', { replace: true })
  }, [navigate])

  return null
}

export default Index
