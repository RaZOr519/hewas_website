import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Instagram, Youtube, Phone, Mail, ArrowRight, X, Menu } from 'lucide-react';
import hewasLogo from './hewas_logo.PNG';
import wulingLogo from '../etc_files/l1.png';
import sdbLogo from '../etc_files/l2.png';
import banner01 from '../etc_files/l3.png';
import bgWatermark from './back.png';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  video: string;
}

interface Client {
  name: string;
  logo: string;
}

// --- Constants ---
const SERVICES: Service[] = [
  {
    id: 'film',
    title: 'FILM CAMPAIGNS',
    description: 'Cinematic storytelling that captures the essence of your brand through high-end production and narrative depth.',
    image: banner01,
    video: 'https://videos.pexels.com/video-files/2890236/2890236-hd_1920_1080_30fps.mp4',
  },
  {
    id: 'tv',
    title: 'TV COMMERCIALS',
    description: 'High-impact visuals designed to stop the scroll and command attention on the biggest screens.',
    image: banner01,
    video: 'https://videos.pexels.com/video-files/2890236/2890236-hd_1920_1080_30fps.mp4',
  },
  {
    id: 'content',
    title: 'CONTENT CREATION',
    description: 'Dynamic digital content tailored for modern platforms, blending creativity with strategic engagement.',
    image: banner01,
    video: 'https://videos.pexels.com/video-files/2890236/2890236-hd_1920_1080_30fps.mp4',
  },
];

const CLIENTS: Client[] = [
  { name: 'Wuling', logo: wulingLogo },
  { name: 'SDB Bank', logo: sdbLogo },
];

// --- Components ---

const CursorEffect = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleId = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });


  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle particle creation by checking distance
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        const id = particleId.current++;
        setParticles((prev) => [...prev.slice(-90), { id, x: e.clientX, y: e.clientY }]);

        // Auto-remove particles after animation
        setTimeout(() => {
          setParticles((current) => current.filter((p) => p.id !== id));
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.6, scale: 0.5, x: p.x - 4, y: p.y - 4 }}
            animate={{ opacity: 0, scale: 0, y: p.y + 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute h-2 w-2 rounded-full bg-primary/40 blur-[1px]"
            style={{
              backgroundColor: "#fec135",
              boxShadow: "0 0 10px #fec135"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3">
        <div className="flex items-center gap-2">
          <img
            src={hewasLogo}
            alt="Hewas Logo"
            className="h-12 md:h-16"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['HOME', 'VIDEOS', 'PHOTOS', 'ABOUT'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-bold tracking-widest hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-primary text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:scale-105 transition-transform"
          >
            CONTACT
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-4"
          >
            {['HOME', 'VIDEOS', 'PHOTOS', 'ABOUT'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-primary text-black px-6 py-3 rounded-xl text-center font-bold tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <section id="home" className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-[0.9em] text-xs">SHOWREEL</span>
        </div>

        <div
          className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Static Image / Poster */}
          <img
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920"
            alt="Showreel Poster"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Video */}
          <video
            ref={videoRef}
            src="https://videos.pexels.com/video-files/2890236/2890236-hd_1920_1080_30fps.mp4"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            muted
            loop
            playsInline
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl"
            >
              SHOWREEL
            </motion.h1>

            {!isHovered && (
              <div className="absolute bottom-8 right-8 glass p-4 rounded-full">
                <Play className="fill-white text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            WE TURN <br />
            CREATIVE SPARKS <br />
            INTO <span className="text-primary italic">CINEMATIC FIRE.</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

const TrustedBy = () => {
  return (
    <section className="py-20 border-y border-white/5 overflow-hidden">
      <div className="text-center mb-10">
        <span className="text-primary font-bold tracking-[0.9em] text-s">TRUSTED BY</span>
      </div>

      <div className="flex flex-wrap justify-center gap-12 md:gap-20 max-w-7xl mx-auto px-6 mt-10">
        {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, idx) => (
          <div key={`static-${idx}`} className="flex items-center opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-1">
            <img src={client.logo} alt={client.name} className="h-6 md:h-12 object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center mb-32`}>
      <div
        className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden relative glass group cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={service.image}
          alt={service.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          src={service.video}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
        />
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-3xl md:text-5xl font-bold text-primary">{service.title}</h3>
        <p className="text-lg text-white/60 leading-relaxed font-light">
          {service.description}
        </p>
        <button className="flex items-center gap-2 text-primary font-bold tracking-widest text-sm hover:gap-4 transition-all">
          VIEW PROJECTS <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="videos" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {SERVICES.map((service, idx) => (
          <ServiceCard key={service.id} service={service} index={idx} />
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="text-primary font-bold tracking-[0.3em] text-xs">ABOUT US</span>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">CRAFTING <br /> VISUAL <br /> LEGACIES.</h2>
            <p className="text-xl text-white/60 leading-relaxed">
              Hewas is a premier production house dedicated to pushing the boundaries of visual storytelling. From high-octane commercials to intimate brand films, we blend technical precision with artistic soul to create content that resonates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center sm:items-start space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-primary">10+</span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-center sm:text-left break-words">YEARS OF <br className="hidden sm:block" /> EXPERIENCE</h4>
            </div>
            <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center sm:items-start space-y-4 sm:mt-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-primary">500+</span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-center sm:text-left break-words">PROJECTS <br className="hidden sm:block" /> COMPLETED</h4>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold">WHAT OTHERS HAVE TO SAY</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: 'Ashen Nilushka',
                role: 'Executive Producer',
                bio: 'Working with House of Hewas has been an incredible journey. The team is passionate, creative, and dedicated to producing high-quality work.',
                image: 'https://images.unsplash.com/photo-1612029505187-002f3a7d35ac?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              },
              {
                name: 'Sachin Dewthuru',
                role: 'Creative Director',
                bio: 'House of hewas team is has a great vision and passion for storytelling. I am proud to be a part of this team.',
                image: 'https://images.unsplash.com/photo-1612029505187-002f3a7d35ac?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
            ].map((owner, idx) => (
              <div key={idx} className="glass p-10 rounded-[2rem] hover:border-primary/50 transition-colors group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all">
                  <img src={owner.image} alt={owner.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-bold mb-1">{owner.name}</h4>
                <p className="text-primary text-sm font-bold tracking-widest mb-6">{owner.role}</p>
                <p className="text-white/60 leading-relaxed">{owner.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto glass rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-16 lg:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/10 blur-[80px] md:blur-[120px] rounded-full -mr-32 -mt-32 md:-mr-48 md:-mt-48" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 relative z-10 w-full">
          <div className="space-y-8 md:space-y-12 min-w-0">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight break-words">LET'S <br className="hidden sm:block" /> COLLABORATE.</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer w-fit max-w-full">
                <div className="w-12 h-12 rounded-full glass flex shrink-0 items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                  <Phone size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white/40 font-bold tracking-widest">CALL US</p>
                  <p className="text-base md:text-lg font-bold truncate">+94 76 538 5284</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer w-fit max-w-full">
                <div className="w-12 h-12 rounded-full glass flex shrink-0 items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                  <Mail size={20} />
                </div>
                <div className="min-w-0 overflow-hidden">
                  <p className="text-xs text-white/40 font-bold tracking-widest">EMAIL US</p>
                  <p className="text-base md:text-lg font-bold truncate">dilekha@hewas.lk</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center border-white/10 hover:bg-primary hover:text-black hover:border-transparent transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center border-white/10 hover:bg-primary hover:text-black hover:border-transparent transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <form className="space-y-4 md:space-y-6 w-full min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
              <input type="text" placeholder="NAME" className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:border-primary transition-colors font-bold text-xs tracking-widest" />
              <input type="email" placeholder="EMAIL" className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:border-primary transition-colors font-bold text-xs tracking-widest" />
            </div>
            <input type="text" placeholder="SUBJECT" className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:border-primary transition-colors font-bold text-xs tracking-widest" />
            <textarea placeholder="MESSAGE" rows={4} className="w-full min-w-0 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:border-primary transition-colors font-bold text-xs tracking-widest resize-none"></textarea>
            <button className="w-full min-w-0 bg-primary text-black font-black tracking-widest md:tracking-[0.2em] py-4 md:py-5 rounded-xl md:rounded-2xl hover:scale-[1.02] shadow-lg shadow-primary/20 transition-all text-xs sm:text-sm">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-white/40 text-xs font-bold tracking-widest">
          © 2026 HEWAS PRODUCTION HOUSE, Made by <span className="text-[#2ace53]">MAGICIANS.</span>
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-white/40 text-xs font-bold tracking-widest hover:text-primary transition-colors">PRIVACY POLICY</a>
          <a href="#" className="text-white/40 text-xs font-bold tracking-widest hover:text-primary transition-colors">TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  );
};

const Photos = () => {
  const photos = [
    'https://plus.unsplash.com/premium_photo-1772065662730-da2a2dc3eb6b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=800',
    'https://plus.unsplash.com/premium_photo-1772065662730-da2a2dc3eb6b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=800',
    'https://plus.unsplash.com/premium_photo-1772065662730-da2a2dc3eb6b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=800',
    'https://plus.unsplash.com/premium_photo-1772065662730-da2a2dc3eb6b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=800',
    'https://plus.unsplash.com/premium_photo-1772065662730-da2a2dc3eb6b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=800',
    'https://plus.unsplash.com/premium_photo-1772065662730-da2a2dc3eb6b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=800',

  ];

  return (
    <section id="photos" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] text-xs">EVENTS</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">STILL MOMENTS.</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden glass group cursor-zoom-in"
            >
              <img
                src={photo}
                alt={`Photo ${idx + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Portfolio() {
  return (
    <div className="relative min-h-screen">
      <div className="grain-overlay" />

      {/* Fixed Watermark Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden flex items-center justify-center">
        <img
          src={bgWatermark}
          alt="Background Watermark"
          className="w-full h-full object-cover opacity-4 mix-blend-screen"
        />
      </div>

      <CursorEffect />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Photos />
        <About />
        <Contact />
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+94765385284"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
