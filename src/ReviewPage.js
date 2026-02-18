
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Footer from './Footer.js';
import './ReviewPage.css';

const e = React.createElement;

const POSTS_PER_PAGE = 6;
const INITIAL_POST_COUNT = 9;

export const featuresData = [
    {
        "id": "001",
        "headline": "Physical: Asia’s Team Philippines Is In the Spotlight",
        "subHeadline": "Inside the cutting-edge training that’s redefining athletic collaboration.",
        "description": "At the heart of every championship lies a story of unity. We explore how elite teams are leveraging innovative strategies to foster a culture of peak performance and mutual trust.",
        "author": "By Vogue Philippines",
        "date": "2025-12-29",
        "category": "SPOTLIGHT",
        "imageUrl": "https://assets.vogue.ph/wp-content/uploads/2025/12/Vogue-Philippines-Physical-Asia-L-2240x1173.webp",
        "refLink": "https://vogue.ph/spotlight/physical-asia-team-philippines/"
    },
    {
        "id": "002",
        "headline": "The Art of Recovery: More Than Just Rest",
        "subHeadline": "Unlocking the secrets to peak physical and mental regeneration.",
        "description": "In the world of elite sports, the ability to recover is as crucial as the performance itself. Discover the holistic wellness practices that top athletes are adopting to stay ahead of the game.",
        "author": "By STATSPH",
        "date": "2024-10-24",
        "category": "Wellness",
        "imageUrl": "https://i.pinimg.com/736x/2d/90/6f/2d906f3baf4e9f9cbd8985f1f12ff9fb.jpg",
        "refLink": "https://www.instagram.com/reel/C-mPzj-SBg5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
        "id": "003",
        "headline": "STATS x UP: A History of championship",
        "subHeadline": "Two leaders unite to push the boundaries of sports and athletic gear.",
        "description": "This landmark collaboration brings together STATS' expertise in performance analytics with Velocity's pioneering material science, promising a new generation of smart apparel.",
        "author": "By STATS TEAM",
        "date": "2024-10-22",
        "category": "Teams",
        "imageUrl": "https://sports.inquirer.net/files/2024/12/IMG_0402_UAAP-87-mens-basketball-finals-game-three-UP-DLSU_UP-celebration-2048x1365.jpg",
        "refLink": "/UPXSTATS"
    },
    {
        "id": "004",
        "headline": "Introducing the KOBE 2026 Jersey: Breathe, Perform, Conquer.",
        "subHeadline": "The revolutionary fabric that adapts to your body in real-time.",
        "description": "Months of research and development culminate in our most advanced product yet. The ION-Flow Jersey features nano-sensor technology that optimizes thermoregulation and muscle support.",
        "author": "By STATS",
        "date": "2024-10-20",
        "category": "Product",
        "imageUrl": "https://i.pinimg.com/736x/c1/c6/89/c1c689c6d63ef9d593c7bdff6f51d933.jpg",
        "refLink": "https://www.instagram.com/reel/DTzwmIYEqo3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
        "id": "005",
        "headline": "STATS X FLOW: Wellness meets Performance",
        "subHeadline": "The long-distance icon joins the STATS family in a multi-year deal.",
        "description": "Kaito Tanaka, celebrated for his record-breaking runs and unwavering spirit, will now be a global ambassador for the STATS brand, embodying our commitment to endurance and excellence.",
        "author": "By STATS MARKETING",
        "date": "2024-10-19",
        "category": "Partnerships",
        "imageUrl": "https://i.pinimg.com/736x/26/f5/aa/26f5aa8819e00a431f2e2fa00f407698.jpg",
        "refLink": "https://www.instagram.com/p/DHqI4RohZMN/"
    },
    {
        "id": "006",
        "headline": "UP Fencing team",
        "subHeadline": "The game has changed.",
        "description": "We dive deep into the world of sports science and explore how data-driven insights are empowering athletes to train smarter, prevent injuries, and achieve new personal bests.",
        "author": "By STATSPH",
        "date": "2024-10-18",
        "category": "Teams",
        "imageUrl": "https://i.pinimg.com/736x/9c/b4/23/9cb423e161a26ba8f690637097fefbcb.jpg",
        "refLink": "https://www.instagram.com/up_fencing/"
    },
    {
        "id": "007",
        "headline": "Beyond the Finish Line: Athlete-Led Community Initiatives",
        "subHeadline": "STATS athletes are making an impact that transcends sport.",
        "description": "Learn about the inspiring projects and foundations our athletes are dedicating their time to, from youth mentorship programs to environmental advocacy, making a real difference in the world.",
        "author": "By Liam Gallagher",
        "date": "2024-10-15",
        "category": "News",
        "imageUrl": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2806&auto=format&fit=crop",
        "refLink": "#"
    },
    {
        "id": "008",
        "headline": "The Locker Room Goes Green: Sustainability in Sportswear",
        "subHeadline": "Our new line of apparel is made from 100% recycled materials.",
        "description": "STATS is proud to lead the charge in eco-conscious performance wear. This new collection delivers the same elite quality while helping to protect our planet for future generations.",
        "author": "By STATS Staff",
        "date": "2024-10-12",
        "category": "Product",
        "imageUrl": "https://images.unsplash.com/photo-1594924343105-134441535948?q=80&w=2787&auto=format&fit=crop",
        "refLink": "#"
    },
    {
        "id": "009",
        "headline": "The Mind Game: Mental Fortitude in High-Stakes Competition",
        "subHeadline": "Top sports psychologists weigh in on what it takes to be mentally unbeatable.",
        "description": "It's often said that victory is 90% mental. We explore the techniques and training regimes that build the resilience, focus, and unwavering confidence of a champion.",
        "author": "By Dr. Anya Sharma",
        "date": "2024-10-10",
        "category": "Wellness",
        "imageUrl": "https://images.unsplash.com/photo-1552674605-db6ffd5e259b?q=80&w=2940&auto=format&fit=crop",
        "refLink": "#"
    },
    {
        "id": "010",
        "headline": "Hoops & Harmony: The Rise of the Manila Mavericks",
        "subHeadline": "How a local basketball team became a national phenomenon.",
        "description": "The Mavericks aren't just winning games; they're winning hearts. This is the story of their incredible journey, their bond with the city, and their vision for the future of Philippine basketball.",
        "author": "By Rico Santos",
        "date": "2024-10-08",
        "category": "Teams",
        "imageUrl": "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2940&auto=format&fit=crop",
        "refLink": "#"
    }
];

// --- Internal PostCard Component ---
const PostCard = ({ post, isLarge = false, swipeHandlers = {}, children }) => {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const cardRef = useRef(null);

    useEffect(() => {
        // Only observe if not large (spotlight cards are always visible)
        if (!isLarge) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                },
                { threshold: 0.1, rootMargin: '0px 0px 50px 0px' }
            );
            if (cardRef.current) observer.observe(cardRef.current);
            return () => observer.disconnect();
        }
    }, [post.id, isLarge]);

    const content = [
        e('div', { key: 'img', className: 'post-image-container' },
            e('img', { 
                src: post.imageUrl, 
                alt: post.headline, 
                className: 'post-image',
                loading: 'lazy',
                draggable: false,
                onDragStart: (e) => e.preventDefault()
            }),
            isLarge && e('div', { className: 'image-overlay-vignette' }),
            // Render children (indicators) inside the image container for overlay positioning
            isLarge && children
        ),
        e('div', { key: 'txt', className: isLarge ? 'post-large-details' : 'post-medium-details' },
            e('div', { className: 'category-label' }, post.category),
            e('h2', { className: 'post-headline' }, post.headline),
            isLarge && e('p', { className: 'post-subheadline' }, post.subHeadline),
            e('div', { className: 'post-author-date' }, 
                e('span', { className: 'author-name' }, post.author),
                e('span', { className: 'divider' }, ' | '),
                e('span', { className: 'post-date' }, formattedDate)
            )
        )
    ];

    return e('a', {
        ref: cardRef,
        href: post.refLink,
        // Only apply scroll-reveal class if NOT large
        className: `post-card ${isLarge ? 'is-large' : 'is-medium scroll-reveal'}`,
        target: '_blank',
        rel: 'noopener noreferrer',
        ...swipeHandlers,
        style: isLarge ? { touchAction: 'pan-y' } : {},
        draggable: false,
        onDragStart: (e) => e.preventDefault()
    }, ...content);
};

// --- Main Page Component ---
const ReviewPage = () => {
    const [visibleCount, setVisibleCount] = useState(INITIAL_POST_COUNT);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isGridTransitioning, setIsGridTransitioning] = useState(false);
    const [spotlightIndex, setSpotlightIndex] = useState(0);

    const categories = useMemo(() => 
        ['All', ...new Set(featuresData.map(p => p.category))], 
    []);

    const spotlightPost = featuresData[spotlightIndex];
    
    const gridSource = useMemo(() => {
        return featuresData.filter((_, index) => index !== spotlightIndex);
    }, [spotlightIndex]);

    const filteredGridItems = useMemo(() => {
        if (activeCategory === 'All') return gridSource;
        return gridSource.filter(p => p.category === activeCategory);
    }, [activeCategory, gridSource]);

    const itemsToDisplay = filteredGridItems.slice(0, visibleCount);

    const handleLoadMore = () => setVisibleCount(prev => prev + POSTS_PER_PAGE);
    
    const handleCategoryClick = (cat) => {
        setIsGridTransitioning(true);
        setActiveCategory(cat);
        setVisibleCount(INITIAL_POST_COUNT);
        setTimeout(() => setIsGridTransitioning(false), 300);
    };

    // Auto-advance logic: 8 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setSpotlightIndex((prev) => (prev + 1) % featuresData.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [spotlightIndex]); // Dependency on index ensures reset on interaction

    const handlers = useSwipeable({
        onSwipedLeft: () => setSpotlightIndex((prev) => (prev + 1) % featuresData.length),
        onSwipedRight: () => setSpotlightIndex((prev) => (prev - 1 + featuresData.length) % featuresData.length),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return e('div', { className: 'editorial-page' },
        e('div', { className: 'grain-texture' }),
        
        e('section', { className: 'editorial-hero' },
            e('div', { className: 'hero-inner' },
                e('h1', { className: 'hero-title' }, '')
            )
        ),

        e('main', { className: 'editorial-container' },
            e('div', { className: 'spotlight-wrapper' },
                e(PostCard, { post: spotlightPost, isLarge: true, swipeHandlers: handlers },
                    // Indicators are now children of PostCard to sit inside the image container
                    e('div', { className: 'spotlight-indicators' },
                        featuresData.map((_, idx) => 
                            e('div', {
                                key: idx,
                                className: `c-dot ${idx === spotlightIndex ? 'is-active' : ''}`,
                                onClick: (e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); // Prevent card link navigation
                                    setSpotlightIndex(idx);
                                }
                            })
                        )
                    )
                )
            ),

            e('nav', { className: 'editorial-subnav' },
                e('div', { className: 'subnav-container' },
                    e('ul', { className: 'category-list' },
                        categories.map(cat => 
                            e('li', { key: cat }, 
                                e('button', {
                                    className: `category-btn ${activeCategory === cat ? 'is-active' : ''}`,
                                    onClick: () => handleCategoryClick(cat)
                                }, cat)
                            )
                        )
                    )
                )
            ),

            e('section', { 
                className: `editorial-grid ${isGridTransitioning ? 'fade-out' : ''}`,
                key: activeCategory
            },
                itemsToDisplay.map(post => e(PostCard, { key: post.id, post }))
            ),

            visibleCount < filteredGridItems.length && e('div', { className: 'load-more-wrapper' },
                e('button', { className: 'load-more-btn', onClick: handleLoadMore }, 
                    e('span', null, 'LOAD MORE STORIES'),
                    e('div', { className: 'btn-line' })
                )
            ),

            filteredGridItems.length === 0 && e('div', { className: 'no-results' }, 
                e('p', null, 'No stories found in this section.')
            )
        ),
        
        e(Footer)
    );
};

export default ReviewPage;
