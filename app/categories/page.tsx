import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Laptops",
    description: "Powerful laptops for work, gaming, and everyday use",
    subcategories: ["Ultrabooks", "Gaming Laptops", "Business Laptops", "Budget Laptops", "Convertibles"],
  },
  {
    name: "Smartphones",
    description: "The latest smartphones with cutting-edge features",
    subcategories: ["Flagship Phones", "Mid-range Phones", "Budget Phones", "Foldable Phones", "Camera Phones"],
  },
  {
    name: "Audio",
    description: "Premium audio devices for immersive sound experiences",
    subcategories: ["Wireless Earbuds", "Over-ear Headphones", "Speakers", "Soundbars", "Microphones"],
  },
  {
    name: "Accessories",
    description: "Essential accessories to complement your devices",
    subcategories: ["Chargers", "Cases", "Screen Protectors", "Stands", "Adapters"],
  },
  {
    name: "Smart Home",
    description: "Devices to make your home smarter and more convenient",
    subcategories: ["Smart Speakers", "Smart Displays", "Smart Lighting", "Security Cameras", "Smart Thermostats"],
  },
]

export default function CategoriesPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">Product Categories</h1>

        <div className="grid grid-cols-1 gap-12">
          {categories.map((category) => (
            <div key={category.name} className="card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-video md:aspect-square relative">
                  <Image
                    src={`/placeholder.svg?height=400&width=400&text=${category.name}`}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="md:col-span-2 p-6">
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="text-gray-300 mb-6">{category.description}</p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Subcategories</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                          className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm"
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/category/${category.name.toLowerCase()}`}
                    className="inline-flex items-center text-gray-300 hover:text-white"
                  >
                    <span>Browse all {category.name}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
