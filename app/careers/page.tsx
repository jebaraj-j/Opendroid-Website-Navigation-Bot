import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Job openings data
const jobOpenings = [
  {
    id: 1,
    title: "Senior AI Researcher",
    department: "Research",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "We're looking for an experienced AI researcher to lead projects in reinforcement learning and neural networks.",
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Join our engineering team to develop and deploy machine learning models for production environments.",
  },
  {
    id: 3,
    title: "Robotics Software Developer",
    department: "Robotics",
    location: "Boston, MA",
    type: "Full-time",
    description:
      "Develop software for our next-generation robotic systems, focusing on perception and control systems.",
  },
  {
    id: 4,
    title: "AI Ethics Specialist",
    department: "Ethics & Compliance",
    location: "New York, NY",
    type: "Full-time",
    description: "Help ensure our AI systems are developed and deployed in an ethical and responsible manner.",
  },
  {
    id: 5,
    title: "Technical Writer",
    department: "Documentation",
    location: "Remote",
    type: "Part-time",
    description: "Create clear, concise documentation for our AI systems, APIs, and research findings.",
  },
]

export default function CareersPage() {
  return (
    <div className="py-20 grid-pattern">
      <div className="container-custom">
        <h1 className="page-heading text-center">Careers</h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Join our team of innovators and help shape the future of artificial intelligence and robotics.
        </p>

        {/* Add an id to this section to enable navigation */}
        <section id="careers" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Why Join Us</h2>
              <p className="text-gray-300 mb-6">
                At Open Droids, we're building the future of AI and robotics. Our team consists of world-class
                researchers, engineers, and thought leaders who are passionate about pushing the boundaries of what's
                possible.
              </p>
              <p className="text-gray-300 mb-6">
                We offer a collaborative and inclusive environment where innovation thrives. Our team members have the
                freedom to explore new ideas, work on cutting-edge projects, and make a real impact on the future of
                technology.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Work on cutting-edge AI and robotics projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Collaborate with world-class researchers and engineers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Flexible work arrangements and competitive benefits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Opportunities for growth and professional development</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Our+Team"
                alt="Our Team"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="mb-20">
          <h2 className="section-heading text-center mb-12">Current Openings</h2>
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className="card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{job.department}</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{job.location}</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{job.type}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <Link href={`/careers/job/${job.id}`} className="inline-flex items-center text-gray-300 hover:text-white">
                  <span>View details</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section>
          <h2 className="section-heading text-center mb-12">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              {
                step: "1",
                title: "Apply Online",
                description: "Submit your application through our careers portal with your resume and cover letter.",
              },
              {
                step: "2",
                title: "Interview Process",
                description: "Participate in technical and cultural interviews with our team members.",
              },
              {
                step: "3",
                title: "Join Our Team",
                description: "Receive an offer and become part of our innovative and collaborative team.",
              },
            ].map((item) => (
              <div key={item.step} className="card p-6 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary inline-block">
              Apply Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
