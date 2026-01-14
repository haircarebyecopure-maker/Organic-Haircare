import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  MessageCircle, 
  X, 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  MapPin, 
  Leaf, 
  Droplet, 
  ShieldCheck, 
  Phone,
  Menu,
  Check,
  Share2,
  Locate,
  Mail
} from 'lucide-react';

/**
 * SUCHI'S ECO PURE - Main Application Component
 * * Updates:
 * - Contact Number: +918317581308
 * - Feature: Popup Checkout Form with "Use Current Location"
 * - Fix: WhatsApp message encoding
 * - Fix: Click-to-call
 * - Fix: Maps overlay button
 */

// --- Data Constants ---

const PRODUCT = {
  name: "SUCHI’S ECO PURE Infused Organic Hair Oil",
  description: "Enriched with nature's finest ingredients, our organic hair oil is a blend of tradition and purity. Designed to combat hair fall, promote growth, and restore natural shine without harmful chemicals.",
  tags: ["100% Natural", "Paraben Free", "Cruelty Free", "No Mineral Oil"],
  ingredients: ["Amla", "Onion", "Curry Leaves", "Almond", "Hibiscus", "Sesame", "Fenugreek"],
  benefits: [
    { title: "Premature Greying", desc: "Helps prevent premature greying with nutrient-rich herbs.", icon: <Leaf className="w-5 h-5" /> },
    { title: "Control Hair Fall", desc: "Strengthens roots to significantly reduce hair fall and dandruff.", icon: <ShieldCheck className="w-5 h-5" /> },
    { title: "Boosts Growth", desc: "Promotes thicker, healthier hair growth naturally.", icon: <TrendingUpIcon className="w-5 h-5" /> },
    { title: "Deep Nourishment", desc: "Penetrates deep into the scalp to nourish from within.", icon: <Droplet className="w-5 h-5" /> },
  ],
  variants: [
    { size: "100 ml", price: 250 },
    { size: "250 ml", price: 450 },
    { size: "500 ml", price: 750 },
  ],
  contact: "918317581308", 
  displayContact: "8317581308",
  mapLink: "https://maps.app.goo.gl/6i3aF37GjFSBubTRA?g_st=ac"
};

const TESTIMONIALS = [
  { name: "Priya S.", text: "I've tried so many oils, but this one is different. My hair feels so soft and the hair fall has actually stopped!", rating: 5 },
  { name: "Rahul M.", text: "The smell is very earthy and natural. Loved the packaging and the results are visible in 3 weeks.", rating: 5 },
  { name: "Ananya K.", text: "Authentic homemade feel. Highly recommend for anyone struggling with dry scalp.", rating: 4 },
];

const FAQS = [
  { q: "Is this oil suitable for all hair types?", a: "Yes, our organic blend is designed to be lightweight and nourishing for all hair textures, from straight to curly." },
  { q: "How often should I apply it?", a: "For best results, apply 2-3 times a week. Massage into the scalp and leave it on for at least an hour before washing." },
  { q: "Is it safe for chemically treated hair?", a: "Absolutely. Since it is 100% natural and paraben-free, it is safe and actually helps repair damage." },
];

// Helper Icon
function TrendingUpIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );
}

const IMAGES = [
  { id: 1, src: "1000262838.jpg", alt: "Main Bottle View" },
  { id: 2, src: "1000262836.jpg", alt: "Ingredients Detail" },
  { id: 3, src: "1000262837.jpg", alt: "Texture View" },
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1528740561666-dc24705f08a7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
];

export default function App() {
  const [selectedSize, setSelectedSize] = useState(PRODUCT.variants[1]); 
  const [activeImage, setActiveImage] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  // --- WhatsApp Chat State ---
  const [chatStep, setChatStep] = useState(0); 
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: "Namaste! Welcome to Suchi's Eco Pure. 🌿" }
  ]);
  const [chatUserForm, setChatUserForm] = useState({ name: '', phone: '', address: '' });

  // --- Checkout Form State ---
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Scroll Refs
  const productSectionRef = useRef(null);

  // --- SEO & Agentic Commerce Injection ---
  useEffect(() => {
    // 1. Meta Tags Injection
    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Buy Suchi's Eco Pure Organic Hair Oil. 100% natural, homemade ayurvedic remedy for hair fall, premature greying, and dandruff. Freshly prepared with Amla, Onion, and Hibiscus.";
    document.head.appendChild(metaDescription);

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = "keywords";
    metaKeywords.content = "Organic hair oil India, Ayurvedic hair oil for hair fall, Homemade hair growth oil, Stop hair fall naturally, Paraben free hair oil, Best oil for grey hair, Herbal hair oil Hyderabad";
    document.head.appendChild(metaKeywords);

    // 2. Structured Data (JSON-LD)
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "SUCHI’S ECO PURE Infused Organic Hair Oil",
      "image": IMAGES.map(img => img.src),
      "description": PRODUCT.description,
      "brand": {
        "@type": "Brand",
        "name": "Suchi's Eco Pure"
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "INR",
        "price": selectedSize.price,
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "124"
      }
    });
    document.head.appendChild(schemaScript);

    // Local Business Schema
    const businessScript = document.createElement('script');
    businessScript.type = 'application/ld+json';
    businessScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HealthAndBeautyBusiness",
      "name": "Suchi's Eco Pure",
      "image": IMAGES[0].src,
      "telephone": PRODUCT.contact,
      "priceRange": "₹250 - ₹750",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressCountry": "IN"
      },
      "url": window.location.href
    });
    document.head.appendChild(businessScript);

    return () => {
      // Cleanup
      if (document.head.contains(metaDescription)) document.head.removeChild(metaDescription);
      if (document.head.contains(metaKeywords)) document.head.removeChild(metaKeywords);
      if (document.head.contains(schemaScript)) document.head.removeChild(schemaScript);
      if (document.head.contains(businessScript)) document.head.removeChild(businessScript);
    };
  }, [selectedSize]);


  const addToCart = () => {
    const newItem = {
      ...selectedSize,
      id: Date.now(),
      name: PRODUCT.name,
      image: IMAGES[0].src
    };
    setCart([...cart, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  // --- Location Feature ---
  const getCurrentLocation = (formSetter, currentForm) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        formSetter({
          ...currentForm,
          address: `${currentForm.address ? currentForm.address + '\n' : ''}📍 My Location: ${mapLink}`
        });
        setLoadingLocation(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location. Please enter address manually.");
        setLoadingLocation(false);
      }
    );
  };

  // --- Main Checkout Logic ---

  const openCheckoutModal = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const submitOrder = (e) => {
    e.preventDefault();
    
    // Construct items list
    const itemsList = cart.map(i => `- ${i.name} (${i.size}): ₹${i.price}`).join('\n');
    
    // Construct formatted message
    const messageText = `*New Order Request* 🛒
    
*Customer Details:*
Name: ${checkoutForm.name}
Phone: ${checkoutForm.phone}
Email: ${checkoutForm.email || "N/A"}
Address: ${checkoutForm.address}

*Order Summary:*
${itemsList}

*Total Amount: ₹${cartTotal}*

Please confirm my order.`;

    const encodedMessage = encodeURIComponent(messageText);
    window.open(`https://wa.me/${PRODUCT.contact}?text=${encodedMessage}`, '_blank');
    
    setIsCheckoutModalOpen(false);
    setCart([]); // Optional: clear cart after order
    setCheckoutForm({ name: '', phone: '', email: '', address: '' });
  };


  // --- Chat Bot Logic ---
  
  const startChat = () => {
    if (chatStep === 0) {
      setChatStep(1);
      addBotMessage("I can help you find the perfect hair care routine. Ready for a quick 3-question quiz?");
    }
    setIsChatOpen(true);
  };

  const addBotMessage = (text) => {
    setChatHistory(prev => [...prev, { type: 'bot', text }]);
  };

  const addUserMessage = (text) => {
    setChatHistory(prev => [...prev, { type: 'user', text }]);
  };

  const handleChatOption = (option) => {
    addUserMessage(option);
    
    setTimeout(() => {
      if (chatStep === 1) {
        addBotMessage("Got it. What's your main hair concern?");
        setChatStep(2);
      } else if (chatStep === 2) {
        addBotMessage("Understood. And how often do you oil your hair?");
        setChatStep(3);
      } else if (chatStep === 3) {
        addBotMessage("Thanks! Our Infused Organic Hair Oil is perfect for that. Would you like to place an order now?");
        setChatStep(4);
      } else if (chatStep === 4) {
        if (option === 'Yes, please') {
          addBotMessage("Great! Please fill in your details below so I can prepare your order.");
          setChatStep(5);
        } else {
          addBotMessage("No problem! Feel free to browse our website. 🌿");
          setChatStep(0); 
        }
      }
    }, 500);
  };

  const handleChatFormSubmit = (e) => {
    e.preventDefault();
    
    const messageText = `*New Order Inquiry via Chatbot* 🤖

*Customer:* ${chatUserForm.name}
*Phone:* ${chatUserForm.phone}
*Address:* ${chatUserForm.address}

*Context:* They completed the hair quiz and are interested in buying.`;

    const encodedMessage = encodeURIComponent(messageText);
    
    window.open(`https://wa.me/${PRODUCT.contact}?text=${encodedMessage}`, '_blank');
    addBotMessage("Thank you! Opening WhatsApp to finalize your order...");
    setTimeout(() => setIsChatOpen(false), 3000);
  };

  const handleImageError = (index, e) => {
    e.target.src = FALLBACK_IMAGES[index] || FALLBACK_IMAGES[0];
  };

  return (
    <div className="font-sans text-gray-800 bg-[#fdfbf7] min-h-screen selection:bg-green-100 selection:text-green-900">
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-green-800 text-white p-2 rounded-full">
                <Leaf size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-green-900 leading-none">SUCHI’S</h1>
                <span className="text-xs tracking-widest text-green-700 uppercase">Eco Pure</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#product" className="hidden md:block hover:text-green-700 font-medium transition-colors">Product</a>
              <a href="#ingredients" className="hidden md:block hover:text-green-700 font-medium transition-colors">Ingredients</a>
              <a href="#reviews" className="hidden md:block hover:text-green-700 font-medium transition-colors">Reviews</a>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-green-50 rounded-full transition-colors group"
                aria-label="Open Cart"
              >
                <ShoppingCart className="w-6 h-6 text-green-900 group-hover:scale-110 transition-transform" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero / Product Section --- */}
      <section id="product" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" ref={productSectionRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-2xl group">
              <img 
                src={IMAGES[activeImage].src} 
                alt={IMAGES[activeImage].alt}
                onError={(e) => handleImageError(activeImage, e)}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-800 shadow-sm">
                FRESHLY PREPARED
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {IMAGES.map((img, idx) => (
                <button 
                  key={img.id}
                  onClick={() => setActiveImage(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${activeImage === idx ? 'border-green-800 ring-2 ring-green-800/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    onError={(e) => handleImageError(idx, e)}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">Handmade</span>
              <div className="flex text-amber-500">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <span className="text-gray-500 text-sm">(124 Reviews)</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              {PRODUCT.name}
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {PRODUCT.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {PRODUCT.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                  <Check size={14} className="text-green-600" /> {tag}
                </span>
              ))}
            </div>

            {/* Price & Size Selector */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Select Size</p>
                  <div className="flex gap-2">
                    {PRODUCT.variants.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedSize(v)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedSize.size === v.size 
                            ? 'bg-green-800 text-white shadow-lg shadow-green-900/20' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-900">₹{selectedSize.price}/-</p>
                  <p className="text-xs text-green-600 font-medium">In Stock: Limited</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={addToCart}
                  className="flex-1 bg-green-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-900/20"
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 bg-green-50/50 p-4 rounded-lg border border-green-100">
               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                  <TruckIcon /> 
               </div>
               <p>“Pure roots. Pure growth.” — Nature’s care for stronger hair delivered to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Ingredients & Benefits --- */}
      <section id="ingredients" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">Power of Nature</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2">Enriched with 7 Miracle Herbs</h3>
            <div className="w-24 h-1 bg-green-800 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCT.benefits.map((benefit, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl hover:bg-green-50 hover:shadow-lg transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-800 mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h4>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {PRODUCT.ingredients.map(ing => (
              <span key={ing} className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-green-600 hover:text-green-700 transition-colors cursor-default bg-white">
                {ing}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials Slider --- */}
      <section id="reviews" className="py-20 bg-[#1a472a] text-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
               <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="currentColor" />
               </pattern>
               <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
            </svg>
         </div>

         <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h3 className="text-3xl font-serif font-bold mb-12">Stories of Transformation</h3>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
               <div className="flex justify-center mb-6 text-amber-400">
                  {[...Array(TESTIMONIALS[0].rating)].map((_, i) => <Star key={i} fill="currentColor" className="w-6 h-6" />)}
               </div>
               <p className="text-xl md:text-2xl font-light italic mb-8 leading-relaxed">"{TESTIMONIALS[0].text}"</p>
               <div>
                  <p className="font-bold text-lg">{TESTIMONIALS[0].name}</p>
                  <p className="text-green-200 text-sm">Verified Buyer</p>
               </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
               <div className="w-3 h-3 rounded-full bg-white"></div>
               <div className="w-3 h-3 rounded-full bg-white/30"></div>
               <div className="w-3 h-3 rounded-full bg-white/30"></div>
            </div>
         </div>
      </section>

      {/* --- FAQ & Map --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQ */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white hover:border-green-200 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Visit Us</h3>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex-grow">
               <div className="w-full h-64 bg-gray-200 rounded-xl mb-6 overflow-hidden relative group">
                  {/* Live Embed */}
                  <iframe 
                    title="Suchi's Eco Pure Location"
                    className="w-full h-full object-cover border-0"
                    src="https://maps.google.com/maps?q=Suchi's+Eco+Pure&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                  
                  {/* Button positioned above iframe content */}
                  <div className="absolute bottom-4 right-4">
                     <a 
                       href={PRODUCT.mapLink} 
                       target="_blank" 
                       rel="noreferrer"
                       className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                     >
                        <MapPin size={18} className="text-red-500" /> Open Larger Map
                     </a>
                  </div>
               </div>
               
               <div className="flex items-start gap-4">
                 <a href={`tel:+91${PRODUCT.displayContact}`} className="bg-green-100 p-3 rounded-full text-green-800 hover:bg-green-200 transition-colors">
                   <Phone size={24} />
                 </a>
                 <div>
                   <p className="font-bold text-gray-900">Order & Support</p>
                   <a href={`tel:+91${PRODUCT.displayContact}`} className="text-gray-600 mb-2 hover:text-green-800 font-medium block">+91 {PRODUCT.displayContact}</a>
                   <p className="text-xs text-gray-400">Available Mon-Sat, 9AM - 6PM</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Leaf className="w-8 h-8 mx-auto mb-6 text-green-400" />
          <h2 className="text-2xl font-serif font-bold mb-2">SUCHI’S ECO PURE</h2>
          <p className="text-gray-400 mb-8">Nature’s care for stronger hair.</p>
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Suchi's Eco Pure. All rights reserved.</p>
        </div>
      </footer>

      {/* --- Checkout Modal (New) --- */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCheckoutModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-green-800 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Confirm Your Details</h3>
              <button onClick={() => setIsCheckoutModalOpen(false)} className="hover:bg-green-700 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={submitOrder} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  required
                  type="text"
                  placeholder="e.g. Anjali Sharma"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  required
                  type="tel"
                  placeholder="e.g. 9876543210"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <input 
                  type="email"
                  placeholder="e.g. anjali@example.com"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                <div className="relative">
                  <textarea 
                    required
                    placeholder="House No, Street, Landmark, City, Pin Code"
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                  ></textarea>
                  <button 
                    type="button"
                    onClick={() => getCurrentLocation(setCheckoutForm, checkoutForm)}
                    disabled={loadingLocation}
                    className="absolute bottom-2 right-2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md border border-green-200 hover:bg-green-100 flex items-center gap-1"
                  >
                    {loadingLocation ? (
                       <span className="animate-spin h-3 w-3 border-2 border-green-600 rounded-full border-t-transparent"></span>
                    ) : (
                       <Locate size={12} /> 
                    )}
                    Use Current Location
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-green-800 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-900 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle size={20} /> Place Order via WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  This will open WhatsApp with your order details pre-filled.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Cart Sidebar --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Your Cart ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-4 text-green-800 font-bold hover:underline">Continue Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <img 
                       src={item.image} 
                       alt={item.name} 
                       onError={(e) => e.target.src = FALLBACK_IMAGES[0]}
                       className="w-20 h-20 rounded-lg object-cover bg-gray-100" 
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-green-800">₹{item.price}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                <button 
                  onClick={openCheckoutModal}
                  className="w-full bg-green-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-900 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Check size={20} /> Proceed to Buy
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Floating Chatbot --- */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {isChatOpen && (
           <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
              <div className="bg-green-800 p-4 text-white flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                       <Leaf size={16} />
                    </div>
                    <div>
                       <h4 className="font-bold text-sm">Eco Pure Assistant</h4>
                       <p className="text-[10px] text-green-200">Online • Replies instantly</p>
                    </div>
                 </div>
                 <button onClick={() => setIsChatOpen(false)}><X size={18} /></button>
              </div>

              <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3">
                 {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
                       <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.type === 'bot' ? 'bg-white text-gray-800 shadow-sm rounded-tl-none' : 'bg-green-800 text-white rounded-tr-none'}`}>
                          {msg.text}
                       </div>
                    </div>
                 ))}
                 
                 {/* Chat Controls */}
                 <div className="mt-4">
                    {chatStep === 1 && (
                       <div className="flex gap-2">
                          <button onClick={() => handleChatOption("Let's go!")} className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-green-200">Start Quiz</button>
                       </div>
                    )}
                    {chatStep === 2 && (
                       <div className="flex flex-wrap gap-2">
                          {["Hair Fall", "Dryness/Frizz", "Grey Hair", "Dandruff"].map(opt => (
                             <button key={opt} onClick={() => handleChatOption(opt)} className="bg-white border border-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs hover:bg-green-50">{opt}</button>
                          ))}
                       </div>
                    )}
                    {chatStep === 3 && (
                       <div className="flex flex-wrap gap-2">
                          {["Daily", "Weekly", "Rarely"].map(opt => (
                             <button key={opt} onClick={() => handleChatOption(opt)} className="bg-white border border-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs hover:bg-green-50">{opt}</button>
                          ))}
                       </div>
                    )}
                    {chatStep === 4 && (
                       <div className="flex gap-2">
                          <button onClick={() => handleChatOption("Yes, please")} className="bg-green-800 text-white px-4 py-2 rounded-full text-xs font-bold">Yes, Order Now</button>
                          <button onClick={() => handleChatOption("Just browsing")} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-xs font-bold">No, thanks</button>
                       </div>
                    )}
                    {chatStep === 5 && (
                       <form onSubmit={handleChatFormSubmit} className="space-y-2 mt-2">
                          <input 
                             required 
                             placeholder="Your Name" 
                             className="w-full text-sm p-2 border rounded-md focus:outline-none focus:border-green-500" 
                             value={chatUserForm.name}
                             onChange={(e) => setChatUserForm({...chatUserForm, name: e.target.value})}
                          />
                          <input 
                             required 
                             placeholder="Phone Number" 
                             className="w-full text-sm p-2 border rounded-md focus:outline-none focus:border-green-500" 
                             value={chatUserForm.phone}
                             onChange={(e) => setChatUserForm({...chatUserForm, phone: e.target.value})}
                          />
                          <textarea 
                             required 
                             placeholder="Delivery Address" 
                             className="w-full text-sm p-2 border rounded-md focus:outline-none focus:border-green-500" 
                             rows="2"
                             value={chatUserForm.address}
                             onChange={(e) => setChatUserForm({...chatUserForm, address: e.target.value})}
                          ></textarea>
                          <button type="submit" className="w-full bg-green-800 text-white py-2 rounded-md text-sm font-bold hover:bg-green-900">Submit & Order</button>
                       </form>
                    )}
                 </div>
              </div>
           </div>
        )}

        <button 
          onClick={startChat}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Chat with us</span>
        </button>
      </div>

    </div>
  );
}

// Helper for shipping icon
function TruckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  );
}


