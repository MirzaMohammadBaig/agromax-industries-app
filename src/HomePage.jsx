import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, ChevronDown, Building, Wrench, Users, CheckCircle, Zap, Package, Hammer, Briefcase, Home, Palette, Drill } from 'lucide-react';
import Constants from './AppConstants';
import { interiorImages, exteriorImages, videoItems, backgrounds } from './assets/media';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });

  // All media are imported from `src/assets/media.js`

  // Gallery state: images are imported from `src/assets/media.js` as `interiorImages` and `exteriorImages`.
  const INITIAL_VISIBLE = 6;
  const LOAD_STEP = 6;
  const [visibleInterior, setVisibleInterior] = useState(INITIAL_VISIBLE);
  const [visibleExterior, setVisibleExterior] = useState(INITIAL_VISIBLE);
  const [loadedImages, setLoadedImages] = useState({});
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Video gallery state: `videoItems` is imported from `src/assets/media.js`.
  const [videoIndex, setVideoIndex] = useState(null);
  const [visibleVideos, setVisibleVideos] = useState({});
  const [hoveredVideo, setHoveredVideo] = useState(null);

  const openVideo = (i) => setVideoIndex(i);
  const closeVideo = () => setVideoIndex(null);

  const combinedGallery = interiorImages.concat(exteriorImages);

  const markLoaded = (i) => setLoadedImages((s) => ({ ...s, [i]: true }));

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  // keyboard navigation for lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex((idx) => Math.min(combinedGallery.length - 1, idx + 1));
      if (e.key === 'ArrowLeft') setLightboxIndex((idx) => Math.max(0, idx - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  // Intersection Observer for video autoplay on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.dataset.videoId;
          if (entry.isIntersecting) {
            setVisibleVideos((prev) => ({
              ...prev,
              [videoId]: { visible: true, showPlayButton: true }
            }));
            // Hide play button after 2 seconds
            const timer = setTimeout(() => {
              setVisibleVideos((prev) => ({
                ...prev,
                [videoId]: { ...prev[videoId], showPlayButton: false }
              }));
            }, 2000);
            return () => clearTimeout(timer);
          } else {
            setVisibleVideos((prev) => ({
              ...prev,
              [videoId]: { visible: false, showPlayButton: false }
            }));
          }
        });
      },
      { threshold: 0.5 }
    );

    const videoElements = document.querySelectorAll('[data-video-id]');
    videoElements.forEach((el) => observer.observe(el));

    return () => {
      videoElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

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

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 shadow-2xl metallic-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold heading-premium bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg glow-orange">🏗️</div>
              {Constants.companyName}
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {[{name: 'Home', id: 'home'}, {name: 'About', id: 'about'}, {name: 'Gallery', id: 'gallery'}, {name: 'Process', id: 'process'}, {name: 'Video', id: 'video'}, {name: 'FAQ', id: 'faq'}, {name: 'Testimonials', id: 'testimonials'}, {name: 'Contact', id: 'contact'}].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white px-4 py-2 rounded-lg relative group font-semibold transition-all duration-300 hover:text-orange-300"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-orange-400 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 bg-slate-800 bg-opacity-95 rounded-lg backdrop-blur-sm">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 px-4 text-white hover:text-orange-400 transition font-semibold text-sm">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 px-4 text-white hover:text-orange-400 transition font-semibold text-sm">About</button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left py-2 px-4 text-white hover:text-orange-400 transition font-semibold text-sm">Gallery</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left py-2 px-4 text-white hover:text-orange-400 transition font-semibold text-sm">Process</button>
              <button onClick={() => scrollToSection('video')} className="block w-full text-left py-2 px-4 text-white hover:text-orange-400 transition font-semibold text-sm">Video</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 px-4 text-white hover:text-orange-400 transition font-semibold text-sm">FAQ</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 px-4 text-white hover:text-orange-400 transition font-semibold text-sm">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 px-4 text-white hover:text-orange-400 transition font-semibold text-sm">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="blueprint-bg text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-left">
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight heading-premium">
                Building Your Dreams Into <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Reality</span>
              </h1>
              <p className="text-base md:text-lg mb-6 text-gray-200 leading-relaxed">
                With over 5 years of experience, we deliver exceptional construction services for residential and commercial projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-industrial px-6 py-3 rounded-lg font-bold text-white transition transform hover:scale-105 shadow-xl text-sm"
                >
                  Get Free Quote
                </button>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="border-2 border-yellow-400 hover:bg-yellow-400 hover:text-slate-900 px-6 py-3 rounded-lg font-bold transition transform hover:scale-105 text-sm"
                >
                  View Our Work
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-slide-right">
              <div className="premium-card p-6 rounded-2xl text-center group cursor-default">
                <Building className="w-12 h-12 mx-auto mb-3 text-orange-600 animate-bounce-vertical" strokeWidth={1.5} />
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">50+</h3>
                <p className="text-gray-700 font-semibold text-xs">Projects Completed</p>
              </div>
              <div className="premium-card p-6 rounded-2xl text-center group cursor-default">
                <Hammer className="w-12 h-12 mx-auto mb-3 text-blue-600 animate-shake" strokeWidth={1.5} />
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-2">5+</h3>
                <p className="text-gray-700 font-semibold text-xs">Years Experience</p>
              </div>
              <div className="premium-card p-6 rounded-2xl text-center group cursor-default">
                <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-600 animate-pulse-scale" strokeWidth={1.5} />
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-2">15% OFF</h3>
                <p className="text-gray-700 font-semibold text-xs">On Service Charges</p>
              </div>
              <div className="premium-card p-6 rounded-2xl text-center group cursor-default">
                <Users className="w-12 h-12 mx-auto mb-3 text-red-600 animate-float-bounce" strokeWidth={1.5} />
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-2">24/7</h3>
                <p className="text-gray-700 font-semibold text-xs">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative bg-gradient-to-b from-white via-gray-50 to-slate-100 overflow-hidden geo-pattern-1" style={{
        backgroundImage: `url(${backgrounds.about})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="section-divider-thick relative z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 heading-premium">About {Constants.companyName}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 rounded"></div>
            <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              We are a family-owned construction company committed to delivering quality workmanship and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="premium-card p-8 rounded-2xl group relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <CheckCircle className="w-12 h-12 mb-4 text-orange-600 animate-wobble" strokeWidth={1.5} />
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-3">Quality Construction</h3>
                <p className="text-gray-700 leading-relaxed font-medium text-sm">
                  We use only the finest materials and employ skilled craftsmen to ensure every project meets our high standards.
                </p>
              </div>
            </div>
            <div className="premium-card p-8 rounded-2xl group relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <Zap className="w-12 h-12 mb-4 text-blue-600 animate-bounce-vertical" strokeWidth={1.5} />
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-3">On-Time Delivery</h3>
                <p className="text-gray-700 leading-relaxed font-medium text-sm">
                  We understand the importance of deadlines and are committed to completing every project on time and within budget.
                </p>
              </div>
            </div>
            <div className="premium-card p-8 rounded-2xl group relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <Users className="w-12 h-12 mb-4 text-purple-600 animate-swing" strokeWidth={1.5} />
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">Expert Team</h3>
                <p className="text-gray-700 leading-relaxed font-medium text-sm">
                  Our experienced team of engineers, and contractors work together to bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-gray-100 to-white relative overflow-hidden geo-pattern-2" style={{
        backgroundImage: `url(${backgrounds.gallery})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="section-divider-thick relative z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 heading-premium">Our Recent Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 rounded"></div>
            <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">Take a look at some of our completed construction projects</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-black mb-4">Interior Projects</h3>
            <div className="gallery-masonry">
              {interiorImages.slice(0, visibleInterior).map((image, idx) => {
                const combinedIndex = idx; // interior first
                return (
                  <div key={combinedIndex} onClick={() => openLightbox(combinedIndex)} className="gallery-tile relative overflow-hidden rounded-2xl border-2 border-orange-300 group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-0 group-hover:opacity-10 transition-all duration-300 z-20 pointer-events-none"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center justify-center text-white font-bold text-sm shadow-lg">📐</div>
                    <div className={`img-placeholder absolute inset-0 transition-opacity duration-700 ${loadedImages[combinedIndex] ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: `url(${image})` }} />
                    <img src={image} alt={`Interior ${idx + 1}`} loading="lazy" onLoad={() => markLoaded(combinedIndex)} className={`w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500 brightness-100 group-hover:brightness-110 img-real relative z-10 ${loadedImages[combinedIndex] ? 'loaded' : ''}`} />
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              {visibleInterior < interiorImages.length && (
                <button onClick={() => setVisibleInterior((c) => Math.min(interiorImages.length, c + LOAD_STEP))} className="btn-industrial py-2 px-6 rounded-lg text-white font-black hover:scale-105 transition-transform duration-300">Load more</button>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-black mb-4">Exterior Projects</h3>
            <div className="gallery-masonry">
              {exteriorImages.slice(0, visibleExterior).map((image, j) => {
                const combinedIndex = interiorImages.length + j;
                return (
                  <div key={combinedIndex} onClick={() => openLightbox(combinedIndex)} className="gallery-tile relative overflow-hidden rounded-2xl border-2 border-orange-300 group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-0 group-hover:opacity-10 transition-all duration-300 z-20 pointer-events-none"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center justify-center text-white font-bold text-sm shadow-lg">📐</div>
                    <div className={`img-placeholder absolute inset-0 transition-opacity duration-700 ${loadedImages[combinedIndex] ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: `url(${image})` }} />
                    <img src={image} alt={`Exterior ${j + 1}`} loading="lazy" onLoad={() => markLoaded(combinedIndex)} className={`w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500 brightness-100 group-hover:brightness-110 img-real relative z-10 ${loadedImages[combinedIndex] ? 'loaded' : ''}`} />
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              {visibleExterior < exteriorImages.length && (
                <button onClick={() => setVisibleExterior((c) => Math.min(exteriorImages.length, c + LOAD_STEP))} className="btn-industrial py-2 px-6 rounded-lg text-white font-black hover:scale-105 transition-transform duration-300">Load more</button>
              )}
            </div>
          </div>

          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeLightbox}>
              <div
                className="relative w-full mx-2 md:mx-4 max-w-6xl max-h-[calc(100vh-96px)] overflow-auto flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-2 md:top-4 right-2 md:right-4 text-white bg-gray-900 bg-opacity-30 rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center z-30 text-lg md:text-xl"
                  aria-label="Close image"
                >
                  ✕
                </button>

                {/* Prev / Next overlay controls */}
                <button
                  onClick={() => setLightboxIndex((i) => Math.max(0, i - 1))}
                  className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-30 text-lg md:text-2xl"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={() => setLightboxIndex((i) => Math.min(combinedGallery.length - 1, i + 1))}
                  className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-30 text-lg md:text-2xl"
                  aria-label="Next image"
                >
                  ›
                </button>

                <div className="p-2 md:p-4 w-full flex items-center justify-center">
                  <img
                    src={combinedGallery[lightboxIndex]}
                    alt={`Open ${lightboxIndex + 1}`}
                    className="max-w-full w-auto max-h-[calc(100vh-160px)] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 blueprint-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4 heading-premium">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-4 rounded"></div>
            <p className="text-sm md:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">Don't just take our word for it - hear from our satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
              <div key={index} className="glass-dark p-6 rounded-2xl group hover:scale-105 transition-transform duration-300 border-t-4 border-b-4 border-t-yellow-400 border-b-orange-500">
                <div className="flex mb-4 gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current drop-shadow-lg" />
                  ))}
                </div>
                <p className="text-gray-100 mb-6 italic font-medium text-sm leading-relaxed">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-yellow-400 border-opacity-30">
                  <h4 className="font-black text-white text-base group-hover:text-yellow-300 transition-colors">{testimonial.name}</h4>
                  <p className="text-yellow-300 font-semibold mt-1 text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden geo-pattern-3" style={{
        backgroundImage: `url(${backgrounds.process})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 to-gray-50/85"></div>
        <div className="section-divider-thick relative z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10\">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 heading-premium">Our Construction Process</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 rounded"></div>
            <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">We follow a streamlined, professional approach to deliver excellence</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 pt-4">
            {[
              { step: '01', title: 'Planning', desc: 'Detailed Blueprint', icon: Briefcase, color: 'text-blue-600', animation: 'animate-swing' },
              { step: '02', title: 'Design', desc: 'Creative Design', icon: Palette, color: 'text-purple-600', animation: 'animate-bounce-vertical' },
              { step: '03', title: 'Execute', desc: 'Expert Execution', icon: Drill, color: 'text-orange-600', animation: 'animate-shake' },
              { step: '04', title: 'Complete', desc: 'Quality Assurance', icon: CheckCircle, color: 'text-green-600', animation: 'animate-pulse-scale' }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
              <div key={idx} className="relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full text-white font-bold text-sm flex items-center justify-center shadow-lg z-20">{item.step}</div>
                <div className="premium-card p-6 pt-8 rounded-2xl text-center group hover:scale-105 transition-transform duration-300">
                  <IconComponent className={`w-10 h-10 mx-auto mb-3 ${item.color} ${item.animation}`} strokeWidth={1.5} />
                  <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-xs font-semibold">{item.desc}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-gradient-to-br from-gray-100 to-white relative overflow-hidden geo-pattern-4" style={{
        backgroundImage: `url(${backgrounds.video})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="section-divider-thick relative z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10\">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 heading-premium">Watch Our Work</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 rounded"></div>
            <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">See our recent projects and construction process in action</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videoItems.map((v, i) => (
              <div 
                key={i} 
                data-video-id={`video-${i}`}
                role="button" 
                tabIndex={0} 
                onClick={() => openVideo(i)} 
                onKeyDown={(e) => { if (e.key === 'Enter') openVideo(i); }} 
                onMouseEnter={() => setHoveredVideo(i)}
                onMouseLeave={() => setHoveredVideo(null)}
                className="premium-card rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
              >
                <div className="relative h-56 flex items-center justify-center overflow-hidden bg-black">
                  <video 
                    src={v.src} 
                    autoPlay={visibleVideos[`video-${i}`]?.visible} 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div 
                      className={`w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center transition-opacity duration-500 shadow-lg ${
                        (visibleVideos[`video-${i}`]?.showPlayButton || hoveredVideo === i) ? 'opacity-90' : 'opacity-0'
                      }`}
                    >
                      <span className="text-3xl text-white">▶</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-xs font-medium">Click to watch — opens in a player modal.</p>
                </div>
              </div>
            ))}
          </div>

          {videoIndex !== null && (
            <div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-80"
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-title"
              onClick={closeVideo}
            >
              <div
                className="relative w-full mx-2 md:mx-4 max-w-6xl max-h-[calc(100vh-96px)] overflow-auto flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeVideo}
                  aria-label="Close video"
                  className="absolute top-2 md:top-4 right-2 md:right-4 text-white bg-gray-900 bg-opacity-30 rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center z-30 text-lg md:text-xl"
                >
                  ✕
                </button>
                <h3 id="video-title" className="sr-only">
                  {videoItems[videoIndex].title}
                </h3>

                {/* Prev / Next overlay controls */}
                <button
                  onClick={() => setVideoIndex((i) => Math.max(0, i - 1))}
                  aria-label="Previous video"
                  className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-30 text-lg md:text-2xl"
                >
                  ‹
                </button>
                <button
                  onClick={() => setVideoIndex((i) => Math.min(videoItems.length - 1, i + 1))}
                  aria-label="Next video"
                  className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-30 text-lg md:text-2xl"
                >
                  ›
                </button>

                <div className="p-2 md:p-4 w-full flex items-center justify-center">
                  <video
                    src={videoItems[videoIndex].src}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full w-auto max-h-[calc(100vh-160px)] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-white via-gray-50 to-slate-100 relative overflow-hidden geo-pattern-1" style={{
        backgroundImage: `url(${backgrounds.video})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="section-divider-thick relative z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10\">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 heading-premium">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 rounded"></div>
            <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">Got questions? We have answers to help you get started</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'What is your project timeline?', a: 'Project timelines vary based on scope and complexity. Most residential projects take 4-8 weeks, while commercial projects may take longer. We provide detailed schedules during consultation.' },
              { q: 'Do you provide warranty on work?', a: 'Yes! We provide comprehensive warranty on all our construction work. Typically 1-2 years on labor and longer on materials. Details are discussed during the quote phase.' },
              { q: 'How do we get a free quote?', a: 'Contact us via phone, email, or fill out our inquiry form. We\'ll schedule a site visit to understand your project needs and provide a detailed, no-obligation quote.' },
              { q: 'Do you handle permits and approvals?', a: 'Absolutely! We manage all necessary permits, approvals, and compliance documentation. This is included in our project management services.' },
              { q: 'Can you work within my budget?', a: 'Yes! We work with clients to create solutions within their budget. During the quote phase, we discuss costs and can suggest alternatives to optimize your investment.' },
              { q: 'What makes your team different?', a: 'Our team has 5+ years of experience with attention to detail, on-time delivery, and customer-centric service. We use premium materials and employ skilled professionals for superior results.' }
            ].map((item, idx) => (
              <div key={idx} className="premium-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex justify-between items-center font-black text-left text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 hover:text-orange-600 transition-colors group"
                >
                  <span className="text-sm md:text-base">{item.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-orange-600 transition-transform duration-300 flex-shrink-0 ${expandedFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-5 border-t border-orange-200 animate-slide-up">
                    <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Inquiry Form Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-100 via-white to-slate-100 relative overflow-hidden geo-pattern-2" style={{
        backgroundImage: `url(${backgrounds.about})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="section-divider-thick relative z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10\">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 heading-premium">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 rounded"></div>
            <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">Ready to start your construction project? Contact us today!</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="premium-card p-5 rounded-2xl flex items-center gap-3 group cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Phone className="text-white" size={22} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-black text-sm">Phone</h4>
                    <p className="text-gray-600 font-semibold text-xs">{Constants.companyPhoneNumber}</p>
                  </div>
                </div>
                <div className="premium-card p-5 rounded-2xl flex items-center gap-3 group cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Mail className="text-white" size={22} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-black text-sm">Email</h4>
                    <p className="text-gray-600 font-semibold text-xs">{Constants.companyEmailAddress}</p>
                  </div>
                </div>
                <div className="premium-card p-5 rounded-2xl flex items-start gap-3 group cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mt-1">
                    <MapPin className="text-white" size={22} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-black text-sm">Address</h4>
                    <p className="text-gray-600 font-semibold text-xs">{Constants.companyAddressLine1}<br />{Constants.companyAddressLine2} <br />{Constants.companyPinCode}</p>
                  </div>
                </div>
                <div className="premium-card p-5 rounded-2xl flex items-start gap-3 group cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mt-1">
                    <Clock className="text-white" size={22} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-black text-sm">Business Hours</h4>
                    <p className="text-gray-600 font-semibold text-xs">Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="premium-card p-8 rounded-2xl border-t-4 border-orange-500 shadow-xl">
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6">Request a Quote</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="text-gray-700 w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 font-medium text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-gray-700 w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 font-medium text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="text-gray-700 w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 font-medium text-sm"
                      placeholder="+91 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">Project Type</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="text-gray-700 w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 font-medium bg-white text-sm"
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
                  <label className="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="text-gray-700 w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 font-medium resize-none text-sm"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full btn-industrial text-white font-black py-3 px-6 rounded-lg transition transform hover:scale-105 uppercase tracking-wider shadow-xl text-sm"
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="metallic-bg text-white py-12 relative overflow-hidden border-t-4 border-orange-500 geo-pattern-3">
        <div className="absolute inset-0 opacity-20 blueprint-grid pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg glow-orange text-xs">🏗️</div>
                <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">{Constants.companyName}</h3>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed font-medium text-xs">
                Building dreams into reality with quality construction services since 2020.
              </p>
              <div className="flex space-x-2">
                <a href={Constants.facebookUrl} className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl hover:glow-orange text-xs">
                  <span className="font-bold">f</span>
                </a>
                <a href={Constants.instagramUrl} className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl hover:glow-orange text-xs">
                  <span className="font-bold">ig</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black mb-4 text-yellow-300 uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 text-gray-200 text-xs">
                <li><button className="hover:text-orange-300 transition font-semibold">Residential</button></li>
                <li><button className="hover:text-orange-300 transition font-semibold">Commercial</button></li>
                <li><button className="hover:text-orange-300 transition font-semibold">Renovations</button></li>
                <li><button className="hover:text-orange-300 transition font-semibold">Extensions</button></li>
                <li><button className="hover:text-orange-300 transition font-semibold">Management</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black mb-4 text-yellow-300 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-gray-200 text-xs">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-orange-300 transition font-semibold">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-orange-300 transition font-semibold">About</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="hover:text-orange-300 transition font-semibold">Gallery</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-orange-300 transition font-semibold">FAQ</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-orange-300 transition font-semibold">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black mb-4 text-yellow-300 uppercase tracking-wider">Contact Info</h4>
              <div className="space-y-2 text-gray-200 text-xs font-medium">
                <p>{Constants.companyAddressLine1}</p>
                <p>{Constants.companyAddressLine2}</p>
                <p className="font-bold text-orange-300">{Constants.companyPinCode}</p>
                <p className="pt-2 border-t border-orange-400 border-opacity-30">☎️ {Constants.companyPhoneNumber}</p>
                <p>📧 {Constants.companyEmailAddress}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-orange-500 border-opacity-30 pt-6 text-center">
            <p className="text-gray-300 font-bold tracking-wide text-xs">&copy; 2025 <span className="text-orange-400">{Constants.companyName}</span> Construction Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;