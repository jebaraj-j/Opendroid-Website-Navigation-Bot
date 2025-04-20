import Link from "next/link"
import Image from "next/image"
import { Filter, ChevronDown } from "lucide-react"

// This would come from your database in a real application
const getCategoryProducts = (slug: string) => {
  const categories = {
    laptops: {
      name: "Laptops",
      description: "Powerful laptops for work, gaming, and everyday use",
      products: [
        { id: 1, name: "UltraBook Pro", price: "$1,299", rating: 4.8 },
        { id: 2, name: "UltraBook Air", price: "$999", rating: 4.5 },
        { id: 11, name: "Gaming Laptop Pro", price: "$1,799", rating: 4.9 },
        { id: 12, name: "Gaming Laptop", price: "$1,499", rating: 4.7 },
        { id: 13, name: "Business Laptop", price: "$1,199", rating: 4.6 },
        { id: 14, name: "Budget Laptop", price: "$699", rating: 4.2 },
        { id: 15, name: "Convertible Laptop", price: "$1,099", rating: 4.4 },
        { id: 16, name: "Student Laptop", price: "$799", rating: 4.3 },
      ],
    },
    smartphones: {
      name: "Smartphones",
      description: "The latest smartphones with cutting-edge features",
      products: [
        { id: 3, name: "SmartPhone X", price: "$899", rating: 4.7 },
        { id: 4, name: "SmartPhone Lite", price: "$599", rating: 4.3 },
        { id: 17, name: "SmartPhone Pro", price: "$1,099", rating: 4.8 },
        { id: 18, name: "SmartPhone Mini", price: "$499", rating: 4.2 },
        { id: 19, name: "SmartPhone Ultra", price: "$1,299", rating: 4.9 },
        { id: 20, name: "SmartPhone Plus", price: "$799", rating: 4.5 },
      ],
    },
    audio: {
      name: "Audio",
      description: "Premium audio devices for immersive sound experiences",
      products: [
        { id: 5, name: "Wireless Earbuds Pro", price: "$199", rating: 4.6 },
        { id: 6, name: "Wireless Earbuds", price: "$149", rating: 4.4 },
        { id: 21, name: "Over-ear Headphones", price: "$249", rating: 4.7 },
        { id: 22, name: "Noise Cancelling Headphones", price: "$299", rating: 4.8 },
        { id: 23, name: "Bluetooth Speaker", price: "$129", rating: 4.5 },
        { id: 24, name: "Portable Speaker", price: "$79", rating: 4.3 },
      ],
    },
    accessories: {
      name: "Accessories",
      description: "Essential accessories to complement your devices",
      products: [
        { id: 7, name: "Smart Watch Pro", price: "$349", rating: 4.5 },
        { id: 8, name: "Smart Watch", price: "$299", rating: 4.2 },
        { id: 25, name: "Wireless Charger", price: "$49", rating: 4.4 },
        { id: 26, name: "Power Bank", price: "$59", rating: 4.6 },
        { id: 27, name: "Phone Case", price: "$29", rating: 4.3 },
        { id: 28, name: "Screen Protector", price: "$19", rating: 4.2 },
      ],
    },
    "smart-home": {
      name: "Smart Home",
      description: "Devices to make your home smarter and more convenient",
      products: [
        { id: 9, name: "Smart Speaker", price: "$129", rating: 4.3 },
        { id: 10, name: "Smart Display", price: "$179", rating: 4.4 },
        { id: 29, name: "Smart Bulb", price: "$39", rating: 4.5 },
        { id: 30, name: "Smart Plug", price: "$29", rating: 4.2 },
        { id: 31, name: "Security Camera", price: "$149", rating: 4.6 },
        { id: 32, name: "Video Doorbell", price: "$199", rating: 4.7 },
      ],
    },
  }

  return categories[slug as keyof typeof categories]
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryProducts(params.slug)

  if (!category) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">The category you're looking for doesn't exist or has been removed.</p>
        <Link href="/categories" className="btn-primary">
          Browse All Categories
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-white">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{category.name}</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-xl text-gray-300 mb-8">{category.description}</p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            <span>Filters:</span>

            <div className="ml-4 flex flex-wrap gap-2">
              <button className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm">
                Price
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <button className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm">
                Rating
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <button className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm">
                Features
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2 w-full md:w-auto">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="card group"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=400&width=400&text=${product.name}`}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-400 mb-1">{category.name}</div>
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-semibold">{product.price}</div>
                  <div className="text-sm text-gray-400">★ {product.rating}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
