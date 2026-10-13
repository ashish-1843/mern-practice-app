import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ArrowRight, Zap } from 'lucide-react'
import '../dashboard.css'
import React from 'react'
import { useNavigate } from 'react-router';


const Dashboard = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <main className="relative w-full overflow-hidden">
      <div className='main-container py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className=' max-w-3xl px-4 mx-auto md:px-6'>
          <div className=' flex flex-col items-center space-y-4 text-center'>
            {user && <h1 className='text-green-500 text-2xl font-bold'>Welcome {user.username}</h1>}

            <div className='space-y-2'>
              <Badge variant="secondary" className='border-green-400 text-green-300 mt-4'>
                <Zap className='w-3 h-3 mr-1' />
                New : AI-powered note organization
              </Badge>

              <h1 className='text-green-600 font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>Your thoughts, organized and accessible
                <span className='text-gray-400'> everywhere</span>
              </h1>

              <p className="max-w-[800px] md:text-xl">
                Capture ideas, organize thoughts, and collaborate seamlessly. The modern note-taking app that grows
                with you and keeps your ideas secure in the cloud.
              </p>

              <div className="flex gap-2 items-center justify-center">
                <Button onClick={() => navigate('/create-note')} size="lg" className="h-12 px-8  py-8 relative bg-green-600 hover:bg-green-500 cursor-pointer">
                  Start Taking Notes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 bg-white text-green-800 cursor-pointer">
                  Watch Demo
                </Button>
              </div>
              <p className="text-sm text-green-800">
                Free forever • No credit card required • 2 minutes setup
              </p>

              

            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

export default Dashboard