import Image from "next/image"
import { Twitter, Linkedin, Github } from "lucide-react"

// This would come from your CMS or database in a real application
const teamMembers = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    role: "Chief AI Scientist",
    bio: "Dr. Chen leads our AI research team, focusing on reinforcement learning and neural networks. With over 15 years of experience in the field, she has published numerous papers in top AI conferences.",
    image: "/placeholder.svg?height=400&width=400&text=Emily",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    role: "Director of Robotics",
    bio: "Dr. Wilson oversees our robotics division, bringing extensive experience in robotic systems design and control. His work focuses on creating more adaptive and responsive robotic systems.",
    image: "/placeholder.svg?height=400&width=400&text=James",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    role: "Lead ML Engineer",
    bio: "Dr. Johnson specializes in machine learning algorithms and their applications. She leads our efforts to develop more efficient and accurate ML models for various domains.",
    image: "/placeholder.svg?height=400&width=400&text=Sarah",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "AI Ethics Specialist",
    bio: "Michael ensures that our AI systems are developed and deployed in an ethical and responsible manner. He works closely with all teams to implement ethical guidelines and best practices.",
    image: "/placeholder.svg?height=400&width=400&text=Michael",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 5,
    name: "Dr. David Kim",
    role: "NLP Researcher",
    bio: "Dr. Kim focuses on natural language processing and understanding. His research aims to improve how machines understand and generate human language.",
    image: "/placeholder.svg?height=400&width=400&text=David",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 6,
    name: "Dr. Lisa Thompson",
    role: "Computer Vision Specialist",
    bio: "Dr. Thompson leads our computer vision research, developing new algorithms for object recognition, scene understanding, and visual reasoning.",
    image: "/placeholder.svg?height=400&width=400&text=Lisa",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 7,
    name: "Robert Chen",
    role: "Software Architect",
    bio: "Robert designs and implements the software architecture for our AI systems, ensuring they are scalable, efficient, and maintainable.",
    image: "/placeholder.svg?height=400&width=400&text=Robert",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 8,
    name: "Dr. Amanda Lee",
    role: "Quantum Computing Researcher",
    bio: "Dr. Lee explores the intersection of quantum computing and AI, investigating how quantum algorithms can enhance AI capabilities.",
    image: "/placeholder.svg?height=400&width=400&text=Amanda",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
]

export default function TeamPage() {
  return (
    <div id="team" className="py-20 grid-pattern">
      <div className="container-custom">
        <h1 className="page-heading text-center">Our Team</h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Meet the brilliant minds behind Open Droids. Our diverse team of researchers, engineers, and specialists is
          dedicated to advancing the field of AI and robotics.
        </p>

        {/* Leadership Section */}
        <section  className="mb-20">
          <h2 className="section-heading text-center mb-12">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.slice(0, 2).map((member) => (
              <div key={member.id} className="card overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="aspect-square relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <div className="text-gray-400 mb-4">{member.role}</div>
                    <p className="text-gray-300 mb-4">{member.bio}</p>
                    <div className="flex space-x-4">
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research & Engineering Team Section */}
        <section id="team-members">
          <h2 className="section-heading text-center mb-12">Research & Engineering Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.slice(2).map((member) => (
              <div key={member.id} className="card overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <div className="text-gray-400 mb-4">{member.role}</div>
                  <p className="text-gray-300 mb-4 line-clamp-3">{member.bio}</p>
                  <div className="flex space-x-4">
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
