import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted/50 to-muted text-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
              <h3 className="text-xl font-semibold">ACS</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Connecting people with causes that matter, empowering change, and supporting 
              local businesses that make a difference across Australia.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-cause/10 hover:bg-cause/20 text-cause hover:text-cause-dark p-2 rounded-full transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-cause/10 hover:bg-cause/20 text-cause hover:text-cause-dark p-2 rounded-full transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-cause/10 hover:bg-cause/20 text-cause hover:text-cause-dark p-2 rounded-full transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-cause/10 hover:bg-cause/20 text-cause hover:text-cause-dark p-2 rounded-full transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-border pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  Campaigns
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  Businesses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-border pb-2">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/campaigns?category=environment" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  Environment
                </Link>
              </li>
              <li>
                <Link to="/campaigns?category=education" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  Education
                </Link>
              </li>
              <li>
                <Link to="/campaigns?category=health" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  Health
                </Link>
              </li>
              <li>
                <Link to="/campaigns?category=poverty" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  Poverty
                </Link>
              </li>
              <li>
                <Link to="/campaigns?category=animals" className="text-muted-foreground hover:text-cause transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-cause rounded-full mr-2"></span>
                  Animals
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-border pb-2">Contact Us</h3>
            <address className="not-italic text-muted-foreground space-y-4">
              <p className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-cause mt-0.5" />
                <span>456 Collins Street<br/>Melbourne, VIC 3000</span>
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-cause" />
                <span className="hover:text-cause">
                  Advancedconsulting service
                </span>
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-cause" />
                <a href="tel:+61-3-9876-5432" className="hover:text-cause">
                  (03) 9876 5432
                </a>
              </p>
            </address>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-border my-10"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Advanced Consulting Services (ACS). All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
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
            Made with Love for change
          </div>
        </div>
      </div>
    </footer>
  );
}
