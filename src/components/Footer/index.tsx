import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  LM
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                LifeStyle Mart
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your premier destination for quality lifestyle products. Curating
              the best items for modern living.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Products
              </Link>
              <Link
                href="/cart"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Shopping Cart
              </Link>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Service</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Shipping Info
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Returns & Exchanges
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  hello@lifestylemart.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  123 Lifestyle Ave, City, ST 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 LifeStyle Mart. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
