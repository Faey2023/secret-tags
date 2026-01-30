import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Headphones, Shield, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/hero-lifestyle.jpg";

export default async function Home() {

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Carefully curated products for modern living"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Shopping",
      description: "Your data and payments are protected"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "We're here to help whenever you need us"
    }
  ];

  const categories = [
    { name: "Home Decor", count: "120+ items" },
    { name: "Furniture", count: "85+ items" },
    { name: "Kitchen", count: "95+ items" },
    { name: "Accessories", count: "150+ items" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero min-h-[80vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImage}
            alt="LifeStyle Mart - Premium Lifestyle Products"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Elevate Your
              <span className="text-primary"> Lifestyle</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover premium products that transform your everyday moments into extraordinary experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button className="btn-hero group">
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="btn-hero-outline">
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose LifeStyle Mart?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We &apos;re committed to providing you with the best shopping experience and highest quality products.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="product-card group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Products</h2>
            <p className="text-muted-foreground">Trending picks loved by our customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, name: "Aroma Diffuser", price: "$49", image: "/placeholder.svg?height=300&width=300" },
              { id: 2, name: "Minimal Lamp", price: "$89", image: "/placeholder.svg?height=300&width=300" },
              { id: 3, name: "Cozy Throw", price: "$39", image: "/placeholder.svg?height=300&width=300" },
              { id: 4, name: "Ceramic Vase", price: "$29", image: "/placeholder.svg?height=300&width=300" },
            ].map((item) => (
              <Card key={item.id} className="product-card group p-0 overflow-hidden">
                <CardContent className="p-0">
                  <div>
                    <Image
                      src={item.image}
                      height={256}
                      width={256}
                      alt={`Popular product - ${item.name}`}
                      className="w-full h-56 object-cover product-card-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground mt-1">{item.price}</p>
                    <Link href="/products" className="inline-flex items-center text-primary mt-3 text-sm font-medium">
                      View details
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you&apos;re looking for</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href="/products">
                <Card className="product-card group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.count}</p>
                    <div className="mt-4 flex items-center justify-center text-primary">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked items our team loves</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 5, name: "Bamboo Organizer", price: "$24", image: "/placeholder.svg?height=300&width=300" },
              { id: 6, name: "Aesthetic Clock", price: "$59", image: "/placeholder.svg?height=300&width=300" },
              { id: 7, name: "Scented Candle", price: "$19", image: "/placeholder.svg?height=300&width=300" },
              { id: 8, name: "Marble Tray", price: "$34", image: "/placeholder.svg?height=300&width=300" },
            ].map((item) => (
              <Card key={item.id} className="product-card group p-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full h-56">
                    <Image
                      src={item.image}
                      fill={true}
                      alt={`Featured product - ${item.name}`}
                      className="w-full h-56 object-cover product-card-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground mt-1">{item.price}</p>
                    <Link href="/products" className="inline-flex items-center text-primary mt-3 text-sm font-medium">
                      View details
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">New Arrivals</h2>
            <p className="text-muted-foreground">Fresh picks just added to the store</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 9, name: "Wall Art Set", price: "$79", image: "/placeholder.svg?height=300&width=300" },
              { id: 10, name: "Velvet Cushion", price: "$25", image: "/placeholder.svg?height=300&width=300" },
              { id: 11, name: "Glass Terrarium", price: "$45", image: "/placeholder.svg?height=300&width=300" },
              { id: 12, name: "Planter Duo", price: "$39", image: "/placeholder.svg?height=300&width=300" },
            ].map((item) => (
              <Card key={item.id} className="product-card group p-0 overflow-hidden">
                <CardContent className="p-0">
                  <div>
                    <Image
                      src={item.image}
                      height={256}
                      width={256}
                      alt={`New arrival - ${item.name}`}
                      className="w-full h-56 object-cover product-card-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground mt-1">{item.price}</p>
                    <Link href="/products" className="inline-flex items-center text-primary mt-3 text-sm font-medium">
                      View details
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have already discovered the perfect products for their lifestyle.
          </p>
          <Link href="/products">
            <Button variant="secondary" className="font-semibold px-8 py-3">
              Start Shopping Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
