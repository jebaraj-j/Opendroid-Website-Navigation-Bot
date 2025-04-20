import Link from "next/link"
import Image from "next/image"
import { Filter, ChevronDown } from "lucide-react"

// This would come from your database in a real application
const products = [
  { id: 1, name: "UltraBook Pro", category: "Laptops", price: "$1,299", rating: 4.8 },
  { id: 2, name: "UltraBook Air", category: "Laptops", price: "$999", rating: 4.5 },
  { id: 3, name: "SmartPhone X", category: "Smartphones", price: "$899", rating: 4.7 },
  { id: 4, name: "SmartPhone Lite", category: "Smartphones", price: "$599", rating: 4.3 },
  { id: 5, name: "Wireless Earbuds Pro", category: "Audio", price: "$199", rating: 4.6 },
  { id: 6, name: "Wireless Earbuds", category: "Audio", price: "$149", rating: 4.4 },
  { id: 7, name: "Smart Watch Pro", category: "Accessories", price: "$349", rating: 4.5 },
  { id: 8, name: "Smart Watch", category: "Accessories", price: "$299", rating: 4.2 },
  { id: 9, name: "Smart Speaker", category: "Smart Home", price: "$129", rating: 4.3 },
  { id: 10, name: "Smart Display", category: "Smart Home", price: "$179", rating: 4.4 },
  { id: 11, name: "Gaming Laptop Pro", category: "Laptops", price: "$1,799", rating: 4.9 },
  { id: 12, name: "Gaming Laptop", category: "Laptops", price: "$1,499", rating: 4.7 },
]

export default function ProductsPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            <span>Filters:</span>

            <div className="ml-4 flex flex-wrap gap-2">
              <button className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm">
                Category
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <button className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm">
                Price
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <button className="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm">
                Rating
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
          {products.map((product) => (
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
                <div className="text-sm text-gray-400 mb-1">{product.category}</div>
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-semibold">{product.price}</div>
                  <div className="text-sm text-gray-400">★ {product.rating}</div>
                </div>
              </div>
            </Link>
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
