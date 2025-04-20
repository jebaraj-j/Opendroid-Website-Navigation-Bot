import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"

// This would come from your database in a real application
const getProductBySlug = (slug: string) => {
  const products = {
    "ultrabook-pro": {
      id: 1,
      name: "UltraBook Pro",
      category: "Laptops",
      price: "$1,299",
      rating: 4.8,
      description:
        "The UltraBook Pro is our flagship laptop, featuring a stunning 14-inch display, powerful Intel Core i7 processor, 16GB RAM, and 512GB SSD storage. Perfect for professionals and creatives who need performance on the go.",
      specs: [
        { name: "Processor", value: "Intel Core i7-1260P" },
        { name: "RAM", value: "16GB LPDDR5" },
        { name: "Storage", value: "512GB NVMe SSD" },
        { name: "Display", value: '14" 2.8K OLED (90Hz)' },
        { name: "Graphics", value: "Intel Iris Xe" },
        { name: "Battery", value: "70Wh (Up to 12 hours)" },
        { name: "Weight", value: "1.3 kg" },
        { name: "Operating System", value: "Windows 11 Pro" },
      ],
      features: [
        "Precision CNC aluminum chassis",
        "Backlit keyboard with 1.5mm key travel",
        "Thunderbolt 4 ports",
        "Wi-Fi 6E and Bluetooth 5.2",
        "Full HD webcam with privacy shutter",
        "Dolby Atmos quad speakers",
        "Fingerprint reader integrated in power button",
        "Military-grade durability (MIL-STD-810H)",
      ],
      relatedProducts: [
        { id: 2, name: "UltraBook Air", price: "$999" },
        { id: 11, name: "Gaming Laptop Pro", price: "$1,799" },
        { id: 12, name: "Gaming Laptop", price: "$1,499" },
      ],
    },
    // More products would be defined here
  }

  return products[slug as keyof typeof products]
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products" className="btn-primary">
          Browse All Products
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
          <Link href="/products" className="hover:text-white">
            Products
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-white">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square relative mb-4 card overflow-hidden">
              <Image
                src={`/placeholder.svg?height=600&width=600&text=${product.name}`}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square relative card overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=150&width=150&text=View ${i}`}
                    alt={`${product.name} view ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <Link
              href={`/category/${product.category.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white"
            >
              {product.category}
            </Link>
            <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>

            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-400">{product.rating} (124 reviews)</span>
            </div>

            <p className="text-2xl font-bold mb-6">{product.price}</p>

            <p className="text-gray-300 mb-8">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="btn-primary flex items-center justify-center bg-gray-800">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
              <button className="btn-primary flex items-center justify-center">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </button>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-400">{spec.name}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feature, index) => (
              <div key={index} className="card p-6">
                <div className="text-lg mb-2">{feature}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="card group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=400&width=400&text=${relatedProduct.name}`}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{relatedProduct.name}</h3>
                  <div className="text-xl font-semibold">{relatedProduct.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
