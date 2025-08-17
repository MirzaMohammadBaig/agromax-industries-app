import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, Building, Users, BadgePercent, Wrench } from 'lucide-react';
import Constants from './AppConstants';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      project: '',
      message: ''
    });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-orange-500">{Constants.companyName}</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-orange-400 transition">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-orange-400 transition">About</button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-orange-400 transition">Gallery</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-orange-400 transition">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-orange-400 transition">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 hover:text-orange-400">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 hover:text-orange-400">About</button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left py-2 hover:text-orange-400">Gallery</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 hover:text-orange-400">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 hover:text-orange-400">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Building Your Dreams Into <span className="text-orange-500">Reality</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                With over 5 years of experience, we deliver exceptional construction services for residential and commercial projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  Get Free Quote
                </button>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="border-2 border-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-semibold transition"
                >
                  View Our Work
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl shadow-2xl">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <Building size={48} className="mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">50+</h3>
                  <p>Projects Completed</p>
                </div>
                <div>
                  <Users size={48} className="mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">5+</h3>
                  <p>Years Experience</p>
                </div>
                <div>
                  <BadgePercent size={48} className="mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">15% OFF</h3>
                  <p>On Service Charges</p>
                </div>
                <div>
                  <Wrench size={48} className="mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">24/7</h3>
                  <p>Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">About {Constants.companyName}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a family-owned construction company committed to delivering quality workmanship and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <Building className="text-orange-500 mb-4" size={48} />
              <h3 className="text-xl text-orange-500 font-semibold mb-4">Quality Construction</h3>
              <p className="text-gray-600">
                We use only the finest materials and employ skilled craftsmen to ensure every project meets our high standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <Clock className="text-orange-500 mb-4" size={48} />
              <h3 className="text-xl text-orange-500 font-semibold mb-4">On-Time Delivery</h3>
              <p className="text-gray-600">
                We understand the importance of deadlines and are committed to completing every project on time and within budget.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <Users className="text-orange-500 mb-4" size={48} />
              <h3 className="text-xl text-orange-500 font-semibold mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Our experienced team of engineers, and contractors work together to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Recent Projects</h2>
            <p className="text-xl text-gray-600">Take a look at some of our completed construction projects</p>
          </div>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "/images/image1.jpg",
              "/images/image2.jpg",
              "/images/image3.jpg",
              "/images/image4.jpg",
              "/images/image5.jpg",
              "/images/image5.jpg",
              "/images/image5.jpg",
              "/images/image6.jpg"
            ].map((image, index) => (
              <div
                key={index}
                className="h-64 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-all"
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              </div>
            ))}
          </div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {[
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image12.jpg",
    "/images/image1.jpg",
    "/images/image13.jpg",
    "/images/image14.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
    "/images/image7.jpg",
    "/images/image8.jpg",
    "/images/image9.jpg",
    "/images/image10.jpg",
    "/images/image11.jpg",
    "/images/image15.jpg",
  ].map((image, index) => (
    <div
      key={index}
      className="relative w-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
    >
      <img
        src={image}
        alt={`Gallery Image ${index + 1}`}
        className="w-full h-auto object-contain"
      />
    </div>
  ))}
</div>


        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-300">Don't just take our word for it - hear from our satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mohammed Kaleem",
                role: "Homeowner",
                text: `${Constants.companyName} transformed our vision into reality. The attention to detail and professionalism was outstanding. Highly recommended!`,
                rating: 5
              },
              {
                name: "Arun Kumar",
                role: "Business Owner",
                text: "They completed our office renovation ahead of schedule and within budget. The quality of work exceeded our expectations.",
                rating: 5
              },
              {
                name: "Gunjan Chawla",
                role: "Interior Designer",
                text: `Working with ${Constants.companyName} has been a pleasure. Their expertise and reliability make them our go-to construction partner.`,
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800 p-8 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-orange-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-orange-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Inquiry Form Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to start your construction project? Contact us today!</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl text-orange-500 font-semibold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="text-orange-500 mr-4" size={24} />
                  <div>
                    <h4 className="text-gray-900 font-semibold">Phone</h4>
                    <p className="text-gray-600">{Constants.companyPhoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="text-orange-500 mr-4" size={24} />
                  <div>
                    <h4 className="text-gray-900 font-semibold">Email</h4>
                    <p className="text-gray-600">{Constants.companyEmailAddress}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-orange-500 mr-4" size={24} />
                  <div>
                    <h4 className="text-gray-900 font-semibold">Address</h4>
                    <p className="text-gray-600">{Constants.companyAddressLine1}<br />{Constants.companyAddressLine2} <br />{Constants.companyPinCode}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="text-orange-500 mr-4" size={24} />
                  <div>
                    <h4 className="text-gray-900 font-semibold">Business Hours</h4>
                    <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl text-gray-900 font-semibold mb-6">Request a Quote</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Project Type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="renovation">Renovation</option>
                      <option value="extension">Extension</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105"
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-4">{Constants.companyName}</h3>
              <p className="text-gray-300 mb-4">
                Building dreams into reality with quality construction services since 2020.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition">
                  <span className="text-sm font-bold"><a href={Constants.facebookUrl}>f</a></span>
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition">
                  <span className="text-sm font-bold"><a href={Constants.instagramUrl}>ig</a></span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Residential Construction</li>
                <li>Commercial Construction</li>
                <li>Renovations</li>
                <li>Extensions</li>
                <li>Project Management</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-orange-400 transition">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-orange-400 transition">About</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="hover:text-orange-400 transition">Gallery</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-orange-400 transition">Testimonials</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-orange-400 transition">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>{Constants.companyAddressLine1}</p>
                <p>{Constants.companyAddressLine2}</p>
                <p>{Constants.companyPinCode}</p>
                <p>Phone: {Constants.companyPhoneNumber}</p>
                <p>Email: {Constants.companyEmailAddress}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 {Constants.companyName} Construction Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;