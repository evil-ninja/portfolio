import React from 'react';
import ReactDOM from 'react-dom/client';
import heroImg from './dr-peeyush-bhargava-malviya-nagar-jaipur-diabetologist-doctors-qw6rjvxcpw.jpg';

const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => {},
});

const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (userPrefersDark ? 'dark' : 'light');
    });

    React.useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

const App = () => {
    React.useEffect(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            const timer = setTimeout(() => {
                preloader.classList.add('loaded');
                const removeTimer = setTimeout(() => {
                    if (preloader.style) {
                       preloader.style.display = 'none';
                    }
                }, 500);
                return () => clearTimeout(removeTimer);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div style={styles.container}>
            <Header />
            <main>
                <Hero />
                <AnimatedSection id="about" style={styles.section} className="section">
                    <About />
                </AnimatedSection>
                <AnimatedSection id="doctors" style={styles.section} className="section">
                    <Doctors />
                </AnimatedSection>
                <AnimatedSection id="services" style={{...styles.section, backgroundColor: 'var(--color-background-secondary)'}} className="section">
                    <Services />
                </AnimatedSection>
                <AnimatedSection id="appointment" style={{...styles.section, backgroundColor: 'var(--color-background-tertiary)'}} className="section">
                    <Appointment />
                </AnimatedSection>
                <AnimatedSection id="testimonials" style={styles.section} className="section">
                    <Testimonials />
                </AnimatedSection>
                <AnimatedSection id="gallery" style={styles.section} className="section">
                    <Gallery />
                </AnimatedSection>
                <AnimatedSection id="contact" style={{...styles.section, backgroundColor: 'var(--color-background-secondary)'}} className="section">
                    <Contact />
                </AnimatedSection>
            </main>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

const Header = () => {
    const [hoveredLink, setHoveredLink] = React.useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    const navLinks = [
        { href: '#about', text: 'About' },
        { href: '#doctors', text: 'Doctors' },
        { href: '#services', text: 'Services' },
        { href: '#testimonials', text: 'Testimonials' },
        { href: '#gallery', text: 'Gallery' },
        { href: '#contact', text: 'Contact' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const getLinkStyle = (href) => ({
        ...styles.navLink,
        color: hoveredLink === href ? 'var(--color-primary)' : 'var(--color-text-primary)',
    });
    
    const ThemeToggleButton = ({ isMobile = false }) => {
        const { theme, toggleTheme } = useTheme();

        const mobileStyle = isMobile ? {
            transform: 'scale(1.3)',
            marginTop: '1rem',
        } : {};

        return (
            <button
                onClick={toggleTheme}
                style={{...styles.themeToggleButton, ...mobileStyle}}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                )}
            </button>
        );
    };

    const headerStyle = {
        ...styles.header,
        boxShadow: isScrolled ? '0 4px 20px var(--color-shadow-medium)' : '0 2px 10px var(--color-shadow)',
        backgroundColor: isScrolled ? 'var(--color-header-bg-scrolled)' : 'var(--color-header-bg)',
    };

    return (
        <header style={headerStyle} className="header">
            <div style={styles.headerContent}>
                <h1 style={styles.logo} className="logo">Girdhar Hospital & Research Centre</h1>
                <nav style={styles.nav} className="desktop-nav">
                    {navLinks.map(link => (
                         <a 
                            key={link.href}
                            href={link.href} 
                            style={getLinkStyle(link.href)}
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}
                            onClick={(e) => handleNavClick(e, link.href)}
                         >
                            {link.text}
                         </a>
                    ))}
                    <ThemeToggleButton isMobile={false} />
                </nav>
                <button 
                    className="hamburger-menu" 
                    onClick={toggleMenu} 
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-nav-menu"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>
            <div 
                id="mobile-nav-menu"
                className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}
            >
                {navLinks.map((link, index) => (
                    <div 
                        key={link.href}
                        className="nav-item"
                        style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                    >
                        <a 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.text}
                        </a>
                    </div>
                ))}
                <div 
                    className="nav-item"
                    style={{ transitionDelay: `${(navLinks.length + 1) * 100}ms` }}
                >
                    <ThemeToggleButton isMobile={true} />
                </div>
            </div>
        </header>
    );
};

const Hero = () => {
    const handleScrollToAppointment = () => {
        const targetElement = document.querySelector('#appointment');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <section style={styles.hero} className="hero">
            <div style={styles.heroOverlay} className="hero-overlay">
                <h2 style={styles.heroTitle} className="hero-title">Compassionate Care, Advanced Medicine</h2>
                <p style={styles.heroSubtitle} className="hero-subtitle">Your Health is Our Priority. Serving Jaipur Since 2000.</p>
                <button style={styles.heroButton} className="hero-button" onClick={handleScrollToAppointment}>
                    Book an Appointment
                </button>
            </div>
        </section>
    );
};

const AnimatedSection = ({ children, id, style, className }) => {
    const sectionRef = React.useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1 // Start animation when 10% of the element is visible
            }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id={id}
            style={style}
            className={`${className || ''} fade-in-section ${isVisible ? 'is-visible' : ''}`}
        >
            {children}
        </section>
    );
};


const About = () => (
    <>
        <h2 style={styles.sectionTitle} className="section-title">About Girdhar Hospital</h2>
        <p style={styles.sectionText}>
            Established in 2000, Girdhar Hospital & Research Centre has been a cornerstone of health in Malviya Nagar, Jaipur. Led by the experienced Dr. Peeyush Bhargava and Dr. Rishi Bhargava, our facility combines advanced medical technology with a patient-centric approach. We are committed to providing comprehensive healthcare in a clean, comfortable, and welcoming environment, ensuring every patient receives the highest standard of care.
        </p>
    </>
);

const DoctorCard = ({ name, qualifications, biography, professionalStatement, experience, specializations, knownFor, languages, societies = null }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const cardStyle = {
        ...styles.card,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 10px 30px var(--color-shadow-heavy)' : '0 4px 15px var(--color-shadow)',
        borderLeftColor: isHovered ? 'var(--color-primary)' : 'var(--color-primary-accent)',
    };
    
    return (
        <div 
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3 style={styles.cardTitle}>{name}</h3>
            <p style={styles.doctorQuals}><strong>{qualifications}</strong></p>
            <p style={styles.doctorBio}><strong>Biography:</strong> {biography}</p>
            <p style={styles.doctorBio}><strong>Professional Statement:</strong> <em>"{professionalStatement}"</em></p>
            <p><strong>Experience:</strong> {experience}</p>
            <p><strong>Specializations:</strong> {specializations.join(', ')}</p>
            <p><strong>Known For:</strong> {knownFor}</p>
            <p><strong>Languages:</strong> {languages.join(', ')}</p>
            {societies && <p><strong>Memberships:</strong> {societies.join(', ')}</p>}
        </div>
    );
};

const Doctors = () => (
    <>
        <h2 style={styles.sectionTitle} className="section-title">Our Expert Doctors</h2>
        <div style={styles.grid} className="grid">
            <DoctorCard 
                name="Dr. Peeyush Bhargava"
                qualifications="MBBS (RUHS Jaipur, 1996), MD (Medicine, SMS Hospital Jaipur, 1999)"
                biography="With over two decades of dedicated service at Girdhar Hospital, Dr. Bhargava is a respected figure in the Jaipur medical community. He is known for his meticulous approach to diagnostics and his compassionate care, building lasting relationships with his patients and their families."
                professionalStatement="My goal is to provide holistic care that addresses not just the symptoms, but the overall well-being of my patients. I believe in combining evidence-based medicine with clear, open communication to empower patients in their health journey."
                experience="24-26 years"
                specializations={["General Medicine", "Internal Medicine", "Family Physician"]}
                knownFor="Patient-centric, thorough diagnosis for fever, cough, IBS, pneumonia, and common cold."
                languages={["English", "Hindi"]}
                societies={["Indian Chest Society"]}
            />
            <DoctorCard 
                name="Dr. Rishi Bhargava"
                qualifications="MBBS, MD, DDV"
                biography="Dr. Rishi Bhargava has been a leading dermatologist in the region for 25 years. His expertise covers a wide spectrum of skin conditions, from common infections to complex dermatological issues. He is committed to staying at the forefront of dermatological advancements to offer the best possible treatments."
                professionalStatement="Healthy skin is integral to overall confidence and health. I am passionate about educating my patients on proper skin care and providing personalized treatment plans that deliver effective, visible results and improve their quality of life."
                experience="25 years"
                specializations={["Dermatology", "Skin Disease Management"]}
                knownFor="Treatment of viral, bacterial, and fungal skin and general infections."
                languages={["English", "Hindi"]}
            />
        </div>
    </>
);

const ServiceItem = ({ title, description }) => {
    const cardRef = React.useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            ref={cardRef}
            style={styles.serviceCard}
            className="service-card-interactive"
            onMouseMove={handleMouseMove}
        >
            <h3 style={styles.cardTitle}>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

const Services = () => (
    <>
        <h2 style={styles.sectionTitle} className="section-title">Facilities & Services</h2>
        <div style={styles.grid} className="grid">
            <ServiceItem title="OPD Consultations" description="Routine and specialized consultations with our expert doctors." />
            <ServiceItem title="X-Ray Diagnostics" description="In-house X-ray facilities for quick and accurate diagnostics." />
            <ServiceItem title="Minor Procedures" description="Equipped for various minor surgical procedures and treatments." />
            <ServiceItem title="Ambulance Services" description="Prompt and reliable ambulance services for emergencies." />
            <ServiceItem title="Healthcare Packages" description="Comprehensive and affordable health check-up packages." />
            <ServiceItem title="Multiple Payment Options" description="Accepting Cash, Credit/Debit Cards, UPI, and Online Payments." />
        </div>
    </>
);

const Appointment = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        doctor: 'Dr. Peeyush Bhargava',
        reason: ''
    });
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a server.
        console.log('Appointment Request:', formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <>
                <h2 style={styles.sectionTitle} className="section-title">Appointment Requested</h2>
                <p style={styles.successMessage}>
                    Thank you, {formData.name}! We have received your request. We will contact you at {formData.phone} or {formData.email} to confirm your appointment details.
                </p>
            </>
        );
    }
    
    return (
        <>
            <h2 style={styles.sectionTitle} className="section-title">Book an Appointment</h2>
            <form onSubmit={handleSubmit} style={styles.appointmentForm}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={styles.formInput} required />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={styles.formInput} required />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={styles.formInput} required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.formInput} required />
                <select name="doctor" value={formData.doctor} onChange={handleChange} style={styles.formInput}>
                    <option>Dr. Peeyush Bhargava</option>
                    <option>Dr. Rishi Bhargava</option>
                </select>
                <textarea name="reason" placeholder="Subject / Reason for visit..." value={formData.reason} onChange={handleChange} style={styles.formTextarea} rows={4}></textarea>
                <button type="submit" style={styles.submitButton}>Request Appointment</button>
            </form>
        </>
    );
};

const StarRating = ({ rating }) => (
    <div style={styles.starRating}>
        {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ ...styles.star, color: i < rating ? 'var(--color-accent)' : 'var(--color-border-star)' }}>★</span>
        ))}
    </div>
);

const Testimonials = () => {
    const testimonials = [
        { quote: "Very good doctor, satisfied with the treatment.", name: "Vikas Sharma", rating: 5 },
        { quote: "One of the best Doctor with great experience and excellent diagnosis.", name: "Deepak", rating: 5 },
        { quote: "Very good doctor, soft spoken and explains the problem very well.", name: "Pooja Agarwal", rating: 5 },
        { quote: "Best doctor for all type of fever and diseases.", name: "Narendra Kumar", rating: 5 },
        { quote: "Excellent diagnosis and treatment. Very polite and humble doctor.", name: "Anonymous", rating: 5 }
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)),
            4000
        );
        return () => resetTimeout();
    }, [currentIndex]);

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <>
            <h2 style={styles.sectionTitle} className="section-title">What Our Patients Say</h2>
            <div style={styles.testimonialSliderContainer}>
                <div style={{ ...styles.testimonialSlider, transform: `translateX(${-currentIndex * 100}%)` }}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} style={styles.testimonialSlide}>
                            <p style={styles.testimonialQuote}>"{testimonial.quote}"</p>
                            <StarRating rating={testimonial.rating} />
                            <h4 style={styles.testimonialAuthor}>- {testimonial.name}</h4>
                        </div>
                    ))}
                </div>
                <div style={styles.sliderDots}>
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            style={{...styles.sliderDot, backgroundColor: currentIndex === index ? 'var(--color-primary)' : 'var(--color-border)'}}
                            onClick={() => goToSlide(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </>
    );
};

const Modal = ({ src, onClose }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };
    
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const overlayStyle = {
        ...styles.modalOverlay,
        opacity: isVisible ? 1 : 0,
    };

    const imageStyle = {
        ...styles.modalImage,
        transform: `scale(${isVisible ? 1 : 0.95})`,
        opacity: isVisible ? 1 : 0,
    };

    return (
        <div style={overlayStyle} onClick={handleClose}>
            <span style={styles.modalClose} onClick={handleClose}>&times;</span>
            <img src={src} alt="Enlarged gallery view" style={imageStyle} onClick={e => e.stopPropagation()} />
        </div>
    );
};

const Gallery = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const openModal = (src) => setSelectedImage(src);
    const closeModal = () => setSelectedImage(null);
    
    const images = [
        "https://images.unsplash.com/photo-1616597082843-de7ce757d548?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551192015-e0c173d524a0?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
    ];

    const altTexts = [
        "Girdhar Hospital Exterior",
        "Hospital Reception and Waiting Area",
        "Advanced Medical Technology",
        "Welcoming Hospital Environment",
        "Clean and Modern Patient Room",
        "Professional and Skilled Medical Staff"
    ];
    
    const imageStyle = (index) => ({
        ...styles.galleryImage,
        transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
    });

    const getGalleryItemStyle = (index) => ({
        ...styles.galleryImageContainer,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.4s ease-out, transform 0.4s ease-out`,
        transitionDelay: `${index * 100}ms`,
    });

    return (
        <>
            <h2 style={styles.sectionTitle} className="section-title">Our Facility</h2>
            <div style={styles.galleryGrid} className="grid">
                 {images.map((src, index) => (
                    <div 
                        key={index}
                        style={getGalleryItemStyle(index)}
                        onClick={() => openModal(src)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <img
                            src={src} 
                            alt={altTexts[index]} 
                            style={imageStyle(index)} 
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
            {selectedImage && <Modal src={selectedImage} onClose={closeModal} />}
        </>
    );
};

const Contact = () => {
    const address = "Girdhar Hospital & Research Centre, 11/34, Girdhar Marg, Sector 11, Malviya Nagar, Jaipur, Rajasthan 302017";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    return (
        <>
            <h2 style={styles.sectionTitle} className="section-title">Contact & Timings</h2>
            <div style={styles.contactContainer} className="contact-container">
                <div style={styles.contactInfo}>
                    <h4>Our Address</h4>
                    <p>
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={styles.addressLink}>
                            Girdhar Hospital & Research Centre,<br/>11/34, Girdhar Marg, Sector 11, Malviya Nagar, Jaipur, Rajasthan 302017.
                        </a>
                    </p>
                    <p><strong>Landmark:</strong> near Hotel Grand Anshul</p>
                    <h4>Contact Numbers</h4>
                    <p>2552668 / 2731290 / 2396898</p>
                    <p><strong>Mobile:</strong> 9829007938</p>
                </div>
                <div style={styles.timings}>
                    <h4>Clinic Timings</h4>
                    <table style={styles.table}>
                        <tbody>
                            <tr><td>Mon, Tue, Thu, Fri, Sat</td><td>9:00 AM – 12:30 PM</td></tr>
                            <tr><td></td><td>5:00 PM – 6:30 PM</td></tr>
                            <tr style={styles.closedRow}><td>Wednesday</td><td>Closed</td></tr>
                            <tr><td>Sunday</td><td>9:00 AM – 12:30 PM</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    React.useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const buttonStyle = {
        ...styles.scrollToTopButton,
        ...(isVisible ? styles.scrollToTopButtonVisible : {}),
    };

    return (
        <button style={buttonStyle} className="scroll-to-top-button" onClick={scrollToTop} title="Go to top" aria-label="Scroll to top">
            &#8593;
        </button>
    );
};

const Footer = () => (
    <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Girdhar Hospital & Research Centre. All Rights Reserved.</p>
    </footer>
);

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    header: {
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        transition: 'box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    logo: {
        fontSize: '1.5rem',
        color: 'var(--color-primary)',
        margin: 0,
    },
    nav: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
    },
    navLink: {
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        transition: 'color 0.3s',
        cursor: 'pointer',
    },
    themeToggleButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-primary)',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'transform 0.2s ease-in-out',
    },
    hero: {
        height: '60vh',
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        color: 'var(--color-hero-text)',
    },
    heroOverlay: {
        backgroundImage: 'linear-gradient(to right, var(--color-hero-overlay-start) 25%, var(--color-hero-overlay-end) 75%)',
        padding: '2rem 4rem',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign: 'left',
    },
    heroTitle: {
        fontSize: '3rem',
        margin: '0 0 1rem 0',
        fontWeight: 700,
        maxWidth: '600px',
    },
    heroSubtitle: {
        fontSize: '1.2rem',
        margin: '0',
        fontWeight: 300,
        maxWidth: '500px',
    },
    heroButton: {
        marginTop: '2rem',
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        fontWeight: 600,
        color: 'var(--color-primary)',
        backgroundColor: 'var(--color-background-secondary)',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        boxShadow: '0 5px 15px var(--color-shadow-heavy)',
        transition: 'transform 0.2s ease-in-out, color 0.4s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
    },
    section: {
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: '2.5rem',
        color: 'var(--color-primary)',
        marginBottom: '2rem',
    },
    sectionText: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        maxWidth: '800px',
        margin: '0 auto',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    card: {
        backgroundColor: 'var(--color-background-secondary)',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 15px var(--color-shadow)',
        textAlign: 'left',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-left-color 0.3s ease',
        borderLeft: '4px solid var(--color-primary-accent)',
    },
    serviceCard: {
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 15px var(--color-shadow)',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: '1.5rem',
        color: 'var(--color-primary)',
        marginBottom: '1rem',
    },
    doctorQuals: {
        fontSize: '0.9rem',
        color: 'var(--color-text-secondary)',
        fontStyle: 'italic',
    },
    doctorBio: {
        fontSize: '0.95rem',
        lineHeight: 1.5,
        color: 'var(--color-text-light)',
        marginBottom: '0.5rem',
    },
    appointmentForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'left',
    },
    formInput: {
        padding: '0.8rem 1rem',
        borderRadius: '6px',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: 'var(--color-background-secondary)',
        color: 'var(--color-text-primary)',
    },
    formTextarea: {
        padding: '0.8rem 1rem',
        borderRadius: '6px',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        fontFamily: 'Poppins, sans-serif',
        resize: 'vertical',
        backgroundColor: 'var(--color-background-secondary)',
        color: 'var(--color-text-primary)',
    },
    submitButton: {
        padding: '1rem',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    successMessage: {
        fontSize: '1.2rem',
        color: 'var(--color-success-border)',
        backgroundColor: 'var(--color-success-bg)',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid var(--color-success-border)',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: 1.6,
    },
    testimonialSliderContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
    },
    testimonialSlider: {
        display: 'flex',
        transition: 'transform 0.5s ease-in-out',
    },
    testimonialSlide: {
        minWidth: '100%',
        boxSizing: 'border-box',
        padding: '2rem',
        backgroundColor: 'var(--color-background-secondary)',
        borderRadius: '8px',
        boxShadow: '0 5px 20px var(--color-shadow)',
    },
    testimonialQuote: {
        fontSize: '1.2rem',
        fontStyle: 'italic',
        color: 'var(--color-text-light)',
        lineHeight: 1.6,
        marginBottom: '1rem',
    },
    testimonialAuthor: {
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--color-primary)',
        marginTop: '0.5rem',
    },
    starRating: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.25rem',
        marginBottom: '1rem',
    },
    star: {
        fontSize: '1.5rem',
    },
    sliderDots: {
        textAlign: 'center',
        paddingTop: '1rem',
    },
    sliderDot: {
        display: 'inline-block',
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        margin: '0 5px',
        backgroundColor: 'var(--color-border)',
    },
    galleryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    galleryImageContainer: {
        height: '250px',
        borderRadius: '8px',
        boxShadow: '0 5px 20px var(--color-shadow-medium)',
        overflow: 'hidden',
        cursor: 'pointer',
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--color-modal-overlay)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        transition: 'opacity 0.3s ease-in-out',
    },
    modalImage: {
        maxWidth: '90vw',
        maxHeight: '90vh',
        objectFit: 'contain',
        boxShadow: '0 10px 30px var(--color-shadow-heavy)',
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    },
    modalClose: {
        position: 'absolute',
        top: '1rem',
        right: '2rem',
        fontSize: '3rem',
        color: 'var(--color-white)',
        cursor: 'pointer',
        lineHeight: 1,
    },
    addressLink: {
        color: 'inherit',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    contactContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        textAlign: 'left',
        justifyContent: 'center',
    },
    contactInfo: {
        flex: 1,
        minWidth: '300px',
        backgroundColor: 'var(--color-background-secondary)',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 15px var(--color-shadow)',
    },
    timings: {
        flex: 1,
        minWidth: '300px',
        backgroundColor: 'var(--color-background-secondary)',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 15px var(--color-shadow)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '1rem',
    },
    closedRow: {
        color: 'var(--color-danger-text)',
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        textAlign: 'center',
        padding: '1.5rem',
        marginTop: 'auto',
    },
    scrollToTopButton: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 10px var(--color-shadow-medium)',
        zIndex: 1001,
        opacity: 0,
        transform: 'scale(0.9)',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
    },
    scrollToTopButtonVisible: {
        opacity: 1,
        transform: 'scale(1)',
    },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);