import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// This would come from your CMS or database in a real application
const articles = [
  {
    id: 1,
    title: "The Future of AI in Everyday Life",
    excerpt:
      "Exploring how artificial intelligence will transform our daily routines and interactions in the coming decade.",
    date: "October 15, 2023",
    author: "Dr. Jane Smith",
    category: "Future Tech",
    image: "/placeholder.svg?height=400&width=600&text=AI+Future",
  },
  {
    id: 2,
    title: "Machine Learning: A Beginner's Guide",
    excerpt:
      "Breaking down the complex concepts of machine learning into digestible insights for newcomers to the field.",
    date: "September 28, 2023",
    author: "Prof. Michael Johnson",
    category: "Education",
    image: "/placeholder.svg?height=400&width=600&text=ML+Guide",
  },
  {
    id: 3,
    title: "Ethics in Robotics Development",
    excerpt:
      "Examining the ethical considerations and guidelines that should govern the creation of advanced robotic systems.",
    date: "September 10, 2023",
    author: "Dr. Sarah Williams",
    category: "Ethics",
    image: "/placeholder.svg?height=400&width=600&text=Ethics",
  },
  {
    id: 4,
    title: "The Rise of Quantum Computing",
    excerpt:
      "How quantum computing is set to revolutionize computational capabilities and solve previously impossible problems.",
    date: "August 22, 2023",
    author: "Dr. Robert Chen",
    category: "Computing",
    image: "/placeholder.svg?height=400&width=600&text=Quantum",
  },
  {
    id: 5,
    title: "AI in Healthcare: Current Applications",
    excerpt:
      "A comprehensive look at how AI is currently being used to improve diagnostics, treatment, and patient care.",
    date: "August 5, 2023",
    author: "Dr. Emily Rodriguez",
    category: "Healthcare",
    image: "/placeholder.svg?height=400&width=600&text=Healthcare",
  },
  {
    id: 6,
    title: "The Evolution of Natural Language Processing",
    excerpt: "Tracing the development of NLP from rule-based systems to today's sophisticated neural network models.",
    date: "July 19, 2023",
    author: "Prof. David Kim",
    category: "Language AI",
    image: "/placeholder.svg?height=400&width=600&text=NLP",
  },
]

export default function MagazinePage() {
  return (
    <div className="py-20 grid-pattern">
      <div className="container-custom">
        <h1 className="page-heading text-center">Magazine</h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Explore the latest insights, research findings, and thought leadership from our team and the broader AI
          community.
        </p>

        {/* Featured Article */}
        <div id="magazine" className="card overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-square lg:aspect-auto relative">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Featured+Article"
                alt="Featured Article"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="text-sm text-gray-400 mb-2">Featured Article</div>
              <h2 className="text-3xl font-bold mb-4">Breakthroughs in Reinforcement Learning</h2>
              <p className="text-gray-300 mb-6">
                Our latest research has uncovered new approaches to reinforcement learning that significantly improve
                efficiency and adaptability in complex environments. This breakthrough has implications for autonomous
                systems, robotics, and more.
              </p>
              <div className="flex items-center text-sm text-gray-400 mb-6">
                <span>October 25, 2023</span>
                <span className="mx-2">•</span>
                <span>By Dr. Alex Thompson</span>
              </div>
              <Link href="#article-1" className="inline-flex items-center text-white hover:text-gray-300">
                <span>Read full article</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} id={`article-${article.id}`} className="card group overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">{article.category}</span>
                  <span className="text-sm text-gray-400">{article.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <div className="text-sm text-gray-400 mb-4">By {article.author}</div>
                <div className="flex items-center text-gray-300 group-hover:text-white">
                  <span>Read more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="inline-flex">
            <a href="#" className="px-4 py-2 border border-gray-700 rounded-l-md bg-gray-800">
              Previous
            </a>
            <a href="#" className="px-4 py-2 border-t border-b border-gray-700 bg-gray-700">
              1
            </a>
            <a href="#" className="px-4 py-2 border-t border-b border-gray-700 bg-gray-800">
              2
            </a>
            <a href="#" className="px-4 py-2 border-t border-b border-gray-700 bg-gray-800">
              3
            </a>
            <a href="#" className="px-4 py-2 border border-gray-700 rounded-r-md bg-gray-800">
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
