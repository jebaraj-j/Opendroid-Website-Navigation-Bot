import Image from "next/image"
import Link from "next/link"
import { ArrowRight, FileText, Users, Code } from "lucide-react"

// This would come from your CMS or database in a real application
const researchProjects = [
  {
    id: 1,
    title: "Advanced Reinforcement Learning",
    description:
      "Developing new approaches to reinforcement learning that improve efficiency and adaptability in complex environments.",
    image: "/placeholder.svg?height=400&width=600&text=RL+Research",
    category: "Machine Learning",
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Neural Network Architectures",
    description: "Exploring novel neural network architectures for improved performance in various AI tasks.",
    image: "/placeholder.svg?height=400&width=600&text=Neural+Networks",
    category: "Deep Learning",
    status: "Ongoing",
  },
  {
    id: 3,
    title: "Robotic Perception Systems",
    description: "Creating more accurate and efficient perception systems for robotic applications.",
    image: "/placeholder.svg?height=400&width=600&text=Robotics",
    category: "Robotics",
    status: "Ongoing",
  },
  {
    id: 4,
    title: "Natural Language Understanding",
    description: "Improving how machines understand and process human language for more natural interactions.",
    image: "/placeholder.svg?height=400&width=600&text=NLP",
    category: "NLP",
    status: "Ongoing",
  },
  {
    id: 5,
    title: "Ethical AI Development",
    description: "Researching frameworks and methodologies for more ethical and responsible AI development.",
    image: "/placeholder.svg?height=400&width=600&text=Ethics",
    category: "Ethics",
    status: "Ongoing",
  },
  {
    id: 6,
    title: "Quantum Machine Learning",
    description: "Investigating the potential of quantum computing to enhance machine learning algorithms.",
    image: "/placeholder.svg?height=400&width=600&text=Quantum+ML",
    category: "Quantum Computing",
    status: "Exploratory",
  },
]

// This would come from your CMS or database in a real application
const publications = [
  {
    id: 1,
    title: "Efficient Reinforcement Learning in Complex Environments",
    authors: "Chen, E., Wilson, J., Johnson, S.",
    conference: "Conference on Neural Information Processing Systems (NeurIPS)",
    year: 2023,
    link: "#",
  },
  {
    id: 2,
    title: "Novel Architectures for Deep Learning",
    authors: "Kim, D., Thompson, L., Rodriguez, M.",
    conference: "International Conference on Machine Learning (ICML)",
    year: 2023,
    link: "#",
  },
  {
    id: 3,
    title: "Advances in Robotic Perception",
    authors: "Wilson, J., Chen, R., Lee, A.",
    conference: "IEEE International Conference on Robotics and Automation (ICRA)",
    year: 2022,
    link: "#",
  },
  {
    id: 4,
    title: "Ethical Considerations in AI Development",
    authors: "Rodriguez, M., Johnson, S., Chen, E.",
    conference: "AAAI Conference on Artificial Intelligence",
    year: 2022,
    link: "#",
  },
]

export default function ResearchPage() {
  return (
    <div className="py-20 grid-pattern">
      <div className="container-custom">
        <h1 id="research-heading" className="page-heading text-center">Research</h1>
        <p id="research-intro" className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Explore our cutting-edge research in artificial intelligence, machine learning, and robotics. Our team is
          dedicated to pushing the boundaries of what's possible.
        </p>

        {/* Research Areas */}
        <section id="research-areas research" className="mb-20">
          <h2 className="section-heading text-center mb-12">Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <Code className="h-8 w-8 mb-4" />,
              title: "Artificial Intelligence",
              description: "Advancing the capabilities of AI systems through innovative algorithms and approaches.",
            },
            {
              icon: <FileText className="h-8 w-8 mb-4" />,
              title: "Machine Learning",
              description: "Developing new machine learning techniques for improved performance and efficiency.",
            },
            {
              icon: <Users className="h-8 w-8 mb-4" />,
              title: "Robotics",
              description: "Creating more intelligent and capable robotic systems for various applications.",
            }].map((area, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="flex justify-center">{area.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{area.title}</h3>
                <p className="text-gray-400">{area.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Projects */}
        <section id="current-projects" className="mb-20">
          <h2 className="section-heading text-center mb-12">Current Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchProjects.map((project) => (
              <Link key={project.id} href="#" className="card group overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">{project.category}</span>
                    <span className="text-sm px-2 py-1 bg-gray-800 rounded-full">{project.status}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex items-center text-gray-300 group-hover:text-white">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section id="publications">
          <h2 className="section-heading text-center mb-12">Recent Publications</h2>
          <div className="space-y-6">
            {publications.map((publication) => (
              <div key={publication.id} className="card p-6">
                <h3 className="text-xl font-semibold mb-2">{publication.title}</h3>
                <p className="text-gray-400 mb-2">{publication.authors}</p>
                <p className="text-gray-400 mb-4">
                  {publication.conference}, {publication.year}
                </p>
                <Link href={publication.link} className="inline-flex items-center text-gray-300 hover:text-white">
                  <span>Read paper</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="#" className="btn-primary inline-block">
              View All Publications
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
