import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-auto">
      <div className="container mx-auto flex justify-end items-center">
        <a href="https://github.com/itsvinitlunia" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-gray-300">
          <Github className="w-5 h-5" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  )
}

