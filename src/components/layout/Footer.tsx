
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">SocialAwareConnect</h3>
            <p className="text-muted-foreground mb-4">
              Connecting people with causes that matter, empowering change, and supporting 
              local businesses that make a difference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="social-icon" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-cause transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-muted-foreground hover:text-cause transition-colors">
                  Campaigns
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-muted-foreground hover:text-cause transition-colors">
                  Businesses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-cause transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/campaigns?category=environment" className="text-muted-foreground hover:text-cause transition-colors">
                  Environment
                </Link>
              </li>
              <li>
                <Link to="/campaigns?category=education" className="text-muted-foreground hover:text-cause transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/campaigns?category=health" className="text-muted-foreground hover:text-cause transition-colors">
                  Health
                </Link>
              </li>
              <li>
                <Link to="/campaigns?category=poverty" className="text-muted-foreground hover:text-cause transition-colors">
                  Poverty
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>123 Change St.</p>
              <p>Awareness City, AC 12345</p>
              <p>Email: contact@socialawareconnect.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-border my-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SocialAwareConnect. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="hover:text-cause transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-cause transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-cause transition-colors">
              Cookie Policy
            </Link>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-accent" /> for social change
          </div>
        </div>
      </div>
    </footer>
  );
}
