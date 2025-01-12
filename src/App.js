import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronRight, Star, Facebook, Twitter, MessageCircle, X, ChevronLeft } from 'lucide-react';
import '@fontsource/exo-2/400.css';
import '@fontsource/exo-2/700.css';
import { FaGem, FaShieldAlt, FaChess, FaCoins, FaGamepad } from 'react-icons/fa';
import weeklyImage from './images/image.png';
import arenaImage from './images/arena.png';
import lordsImage from './images/lords.png';
import dungeonsImage from './images/dungeons.png';
import pvpImage from './images/pvp.png';
import flashImage from './images/flash.png';
import challengesImage from './images/challenge.png';


// Updated Button component
const Button = ({ children, style, variant = 'default', href, ...props }) => {
  const baseStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  };

  const variantStyles = {
    default: {
      backgroundColor: '#2196F3',
      color: 'white',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid #2196F3',
      color: '#64B5F6',
    },
  };
  
  const combinedStyle = { ...baseStyle, ...variantStyles[variant], ...style };
  
  return href ? (
    <a href={href} style={combinedStyle} {...props}>
      {children}
    </a>
  ) : (
    <button style={combinedStyle} {...props}>
      {children}
    </button>
  );
};

const characters = [
  { name: 'Archmage of Fire', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/233.png', replayUrl: 'https://www.wizardsarena.net/fightreplay/fights/Am7N7SBbFGRgdEoyPpZT' },
  { name: 'Archmage of Ice', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/714.png', replayUrl: 'https://wizardsarena.net/fightreplay/fights/dG4645tPPqlMa43Hl1I8' },
  { name: 'Archmage of Acid', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/183.png', replayUrl: 'https://www.wizardsarena.net/fightreplay/fights/s1C0aQKmv6FCkrmsYTYs' },
  { name: 'Archbishop of Undead', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/1443.png', replayUrl: 'https://www.wizardsarena.net/fightreplay/fights/rWremIMb2uNAmXbmW1ly' },
  { name: 'Archbishop of Water', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/1391.png', replayUrl: 'https://www.wizardsarena.net/fightreplay/fights/75zpA6uZmYvdPHWb77vo' },
  { name: 'Archbishop of Psycho', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/1822.png', replayUrl: 'https://www.wizardsarena.net/fightreplay/fights/xMZOuTplkP0Z4opzu5BR' },
  { name: 'Archdruid of Sun', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/2522.png', replayUrl: 'https://www.wizardsarena.net/fightreplay/fights/vcdTDEbdnaClZJDoifMG' },
  { name: 'Archdruid of Wind', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/2947.png', replayUrl: 'https://www.wizardsarena.net/fightreplay/fights/azSUnWAJIprYF0tQSETC' },
  { name: 'Archdruid of Dark', image: 'https://storage.googleapis.com/wizarena/wizards_nobg/2142.png', replayUrl: 'https://www.wizardsarena.net/fightreplay/fights/NO7BR7aJlxEX6LEgQRZA' },
  
];

const gameModes = [
  { name: 'Weekly Tournaments', image: weeklyImage, description: 'Compete weekly for top prizes.', link: 'https://www.wizardsarena.net/tournaments' },
  { name: 'Arena', image: arenaImage, description: 'Free-to-Play daily battles with Rewards', link: 'https://www.wizardsarena.net/arena' },
  { name: 'Lords of Wizards World', image: lordsImage, description: 'Compete to become Lord of a Region', link: 'https://www.wizardsarena.net/lords' },
  { name: 'Dungeons of Wizards World', image: dungeonsImage, description: 'Slay as many Orcs as you can before falling', link: 'https://www.wizardsarena.net/dungeons' },
  { name: 'PVP', image: pvpImage, description: 'Engage in Weekly player versus player combat', link: 'https://www.wizardsarena.net/pvp' },
  { name: 'Flash Tournaments', image: flashImage, description: 'Create your own tournaments with custom rules', link: 'https://www.wizardsarena.net/flashtournaments' },
  { name: 'Challenges', image: challengesImage, description: 'Complete various challenges for rewards.', link: 'https://www.wizardsarena.net/challenges' }, 
];

const WizardsArenaLanding = () => {
  const [email, setEmail] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mapRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showDescription, setShowDescription] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showIframe, setShowIframe] = useState(false);

  const regionButtonPositions = useMemo(() => ({
    Sitenor: { top: '27%', left: '22%' },
    Vedrenon: { top: '69%', left: '20%' },
    Druggorial: { top: '47%', left: '29%' },
    Oceorah: { top: '14%', left: '49%' },
    Opherus: { top: '39%', left: '57%' },
    Ulidalar: { top: '62%', left: '50%' },
    Wastiaxus: { top: '80%', left: '57%' },
    Ulanara: { top: '25%', left: '73%' },
    Bremonon: { top: '60%', left: '75%' },
  }), []); // Empty dependency array as this object doesn't depend on any state

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signed up with email:', email);
    setEmail('');
  };

  const locations = [
    { name: 'Sitenor', image: 'https://www.wizardsarena.net/static/media/sitenor_bg_hd.8d22d844.jpg' },
    { name: 'Vedrenon', image: 'https://www.wizardsarena.net/static/media/vedrenon_bg_hd.1f25b515.jpg' },
    { name: 'Druggorial', image: 'https://www.wizardsarena.net/static/media/druggorial_bg_hd.008f5b84.jpg' },
    { name: 'Oceorah', image: 'https://www.wizardsarena.net/static/media/oceorah_bg_hd.0d4683df.jpg' },
    { name: 'Opherus', image: 'https://www.wizardsarena.net/static/media/opherus_bg_hd.9a826255.jpg' },
    { name: 'Ulidalar', image: 'https://www.wizardsarena.net/static/media/ulidalar_bg_hd.802a4f2a.jpg' },
    { name: 'Wastiaxus', image: 'https://www.wizardsarena.net/static/media/wastiaxus_bg_hd.84886dc3.jpg' },
    { name: 'Ulanara', image: 'https://www.wizardsarena.net/static/media/ulanara_bg_hd.58d7aa41.jpg' },
    { name: 'Bremonon', image: 'https://www.wizardsarena.net/static/media/bremonon_bg_hd.37fa4652.jpg' },
  ];

  const regionDescriptions = {
    Sitenor: { title: "Sitenor, Land of Ash", description: "Known for its restlessness, this environment where earth and fire endlessly battle for control stands never still. Magma rising from the core pushes the barren soil and bends it to its will."},
    Vedrenon: { title: "Vedrenon, Bane of the Damned", description: "It is said that Vedrenon has its own special second sun. The twinned eyes peer down on everyone who dares to enter this domain. Watchful, gazing…" },
    Druggorial: { title: "Druggorial, Domain of the Dead", description: "A vile place where those who were denied passage to the other side make a last attempt by clinging onto the backs and ankles of the living. Watch out, before these dark passengers bring you to an even darker destination." },
    Oceorah: { title: "Oceorah, Vale of Tears", description: "When gazing upon the barren lands the Allmother wept with sadness, thus gifting the lands fertility with her ever flowing essence. In Oceorah, this essence falls from the heavenly skies." },
    Opherus: { title: "Opherus, the Mist Fields", description: "The spirit is the testament of true strength. For the strongest of souls shall be unwithered, unscathed and unbroken. But weak souls age like bad fruit, rotting and darkening with a vile stench." },
    Ulidalar: { title: "Ulidalar, Witches Grave", description: "When loud cackles are heard within the night, the witches three, detest the wizards might. They skew and plot with thunder and wind. Villainous the witches grinned." },
    Wastiaxus: { title: "Wastiaxus, The Green Marshes", description: "Said to stomach even the greatest of warriors, these lands are perilous and not what they seem. So, test your every step, or it could be you last!" },
    Ulanara: { title: "Ulanara, Woodland of the Lost", description: "Among the trees of Ulanara lives a danger greater than any environmental threat. A creeping sensation that sets into even the strongest of minds, leaving them crippled with fear and paranoia." },
    Bremonon: { title: "Bremonon, Land of Despair", description: "The ice fields of Bremonon are difficult to estimate, even for the most experienced wizards. This tundra can be the nudge that takes you to victory, or the avalanche that kills you." },
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setIsTransitioning(true);
  };

  const handleExitClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedLocation(null);
    }, 500); // Half of the transition duration
  };

  useEffect(() => {
    if (mapRef.current) {
      if (selectedLocation) {
        const position = regionButtonPositions[selectedLocation.name];
        const left = parseFloat(position.left) / 100;
        const top = parseFloat(position.top) / 100;
        mapRef.current.style.transition = 'all 0.5s ease-in-out';
        mapRef.current.style.transform = `scale(3) translate(${(0.5 - left) * 100}%, ${(0.5 - top) * 100}%)`;
        
        setTimeout(() => {
          mapRef.current.style.opacity = '0';
          mapRef.current.style.transition = 'opacity 0.5s ease-in-out';
          setTimeout(() => {
            mapRef.current.style.backgroundImage = `url(${selectedLocation.image})`;
            mapRef.current.style.transform = 'none';
            mapRef.current.style.opacity = '1';
            setIsTransitioning(false);
          }, 500);
        }, 1000);
      } else {
        mapRef.current.style.transition = 'all 0.5s ease-in-out';
        mapRef.current.style.transform = 'none';
        mapRef.current.style.backgroundSize = 'contain';
        setTimeout(() => {
          mapRef.current.style.backgroundImage = "url('https://www.wizardsarena.net/static/media/ww_map.fff6b8ac.png')";
          mapRef.current.style.opacity = '1';
          setIsTransitioning(false);
        }, 500);
      }
    }
  }, [selectedLocation, regionButtonPositions]);

  const styles = useMemo(() => ({
    container: {
      minHeight: '100vh',
      backgroundColor: 'black',
      color: '#D1D5DB',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Exo 2', sans-serif",
    },
    backgroundEffect: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url("https://www.wizardsarena.net/static/media/ww_map.fff6b8ac.png")',
      opacity: 0.1,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    content: {
      position: 'relative',
      zIndex: 10,
    },
    header: {
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
    },
    logoImage: {
      width: '40px',
      height: '40px',
      objectFit: 'contain',
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#64B5F6', // Light blue
      marginLeft: '0.5rem',
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 1rem',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      color: '#64B5F6',
      textAlign: 'center',
      marginBottom: '0.5rem', // Reduced margin to bring subtitle closer
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#9CA3AF', // A lighter shade of blue
      textAlign: 'center',
      marginBottom: '2rem',
      fontWeight: 'normal',
    },
    description: {
      fontSize: '1.25rem',
      maxWidth: '42rem',
      margin: '0 auto 2rem',
      color: '#9CA3AF',
    },
    section: {
      maxWidth: '1200px',
      margin: '4rem auto',
      padding: '0 1rem',
    },
    sectionTitle: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center',
      color: '#64B5F6', // Light blue
    },
    mapContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '1200px', // Increased from 48rem to accommodate the full map
      margin: '0 auto',
      border: '2px solid #64B5F6',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      aspectRatio: '16 / 9', // This maintains the aspect ratio of the map image
    },
    map: {
      width: '100%',
      height: '100%',
      backgroundImage: "url('https://www.wizardsarena.net/static/media/ww_map.fff6b8ac.png')",
      backgroundSize: 'contain', // Changed from 'cover' to 'contain'
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat', // Ensure the image doesn't repeat
      position: 'relative',
      transition: 'all 0.5s ease-in-out',
    },
    mapOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
    },
    regionButton: {
      position: 'absolute',
      padding: '5px 10px',
      backgroundColor: 'rgba(100, 181, 246, 0.6)',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      '@media (max-width: 768px)': {
        fontSize: '0.6rem',
        padding: '3px 6px',
      },
    },
    locationDescriptionContainer: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      maxWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    toggleDescriptionButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      marginBottom: '10px',
      alignSelf: 'flex-start',
    },
    locationDescription: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      transition: 'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out',
      opacity: showDescription ? 1 : 0,
      maxHeight: showDescription ? '1000px' : '0',
      overflow: 'hidden',
    },
    locationTitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontWeight: 'bold',
      marginBottom: isMobile ? '5px' : '10px',
      color: '#64B5F6',
    },
    locationText: {
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      lineHeight: isMobile ? '1.3' : '1.4',
    },
    wizardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    wizardCard: {
      background: 'linear-gradient(to bottom right, #1F2937, #0D47A1)', // Darker blue gradient
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    wizardImage: {
      width: '100%',
      height: '16rem',
      objectFit: 'cover',
      borderRadius: '0.375rem',
      marginBottom: '1rem',
    },
    wizardTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#64B5F6', // Light blue
    },
    wizardDescription: {
      color: '#9CA3AF',
      marginBottom: '1rem',
    },
    footer: {
      backgroundColor: '#1F2937', // Dark background for the footer
      padding: '2rem', // Increased padding for better spacing
      color: 'white', // Set text color to white
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column', // Stack sections vertically
      alignItems: 'flex-start', // Align items to the left
    },
    footerSections: {
      display: 'flex',
      flexDirection: 'row', // Horizontal layout for links
      justifyContent: 'space-between',
      flexWrap: 'wrap', // Allow wrapping for responsiveness
      width: '100%', // Full width for the sections
    },
    footerLinks: {
      textAlign: 'left',
      marginRight: '2rem', // Space between link sections
      flex: '1 1 200px', // Allow links to grow and set a minimum width
      marginBottom: '1rem', // Space below each link section
    },
    footerSocials: {
      textAlign: 'left', // Align text to the left for social links
    },
    socialLinksContainer: {
      display: 'flex',
      flexWrap: 'wrap', // Allow wrapping for responsiveness
    },
    socialColumn: {
      flex: '1 1 50%', // Two columns, each taking half the width
      marginBottom: '1rem', // Space below each column
    },
    footerSectionTitle: {
      fontSize: '1rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#64B5F6',
    },
    footerText: {
      color: '#6B7280',
      textAlign: 'center', // Center the copyright text
      marginTop: '1rem', // Space above the copyright text
    },
    footerLink: {
      color: 'white', // Set link color to white
      textDecoration: 'none',
      margin: '0 0 0.5rem', // Adjust margin for vertical spacing
      display: 'block', // Make links block elements for vertical stacking
      transition: 'color 0.3s',
    },
    socialLink: {
      color: 'white', // Set social link color to white
      textDecoration: 'none',
      margin: '0 0 0.5rem', // Adjust margin for vertical spacing
      display: 'block', // Make links block elements for vertical stacking
      transition: 'color 0.3s',
    },
    demoSection: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '10px',
      padding: '2rem',
      margin: '2rem auto',
      maxWidth: '1000px',
    },
    demoTitle: {
      color: '#64B5F6',
      fontSize: '2rem',
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    demoSubtitle: {
      color: '#A5B4FC',
      fontSize: '1rem',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    iframeContainer: {
      width: '100%',
      height: '680px',
      marginTop: '2rem',
      border: '2px solid #64B5F6',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative',
    },
    iframe: {
      width: '100%',
      height: 'calc(100% + 140px)',
      border: 'none',
      position: 'absolute',
      top: '-80px',
      left: '50%',
      transform: 'translateX(-50%)',
    },

    iframeOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the alpha value for more or less shading
      zIndex: 5, // Ensure the overlay is above the iframe
      pointerEvents: 'none',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: 10, // Ensure the close button is above the overlay
    },
    characterSelect: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '10px',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      height: '300px',
    },
    characterDisplay: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    characterImage: {
      width: '150px',
      height: '150px',
      objectFit: 'contain',
    },
    characterName: {
      color: '#64B5F6',
      fontSize: '1.2rem',
      textAlign: 'center',
      marginTop: '1rem',
    },
    arrowButton: {
      background: 'none',
      border: 'none',
      color: '#64B5F6',
      cursor: 'pointer',
      fontSize: '2rem',
      padding: '0',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    leftArrow: {
      left: '20px',
    },
    rightArrow: {
      right: '20px',
    },
    selectButton: {
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '0.5rem 1rem',
      marginTop: '1rem',
      cursor: 'pointer',
    },
    gameModeContainer: {
      display: 'flex',
      overflowX: 'auto',
      padding: '1rem',
      gap: '1rem',
    },
    gameModeCard: {
      minWidth: '250px',
      maxWidth: '250px',
      height: '200px',
      background: '#1F2937',
      borderRadius: '0.5rem',
      padding: '1rem',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease',
    },
    gameModeImage: {
      width: '100%',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '0.375rem',
    },
    gameModeName: {
      color: '#64B5F6',
      marginTop: '0.5rem',
    },
    gameModeDescription: {
      color: '#B0BEC5',
      marginTop: '0.5rem',
      fontSize: '0.9rem',
    },
    gameModeCardHover: {
      transform: 'scale(1.05)',
    },
    exitButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'red',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
    },
    exitIcon: {
      marginRight: '5px',
    },
  }), [isMobile, showDescription]); // Added isMobile and showDescription to the dependency array

  // Updated getButtonPosition function
  const getButtonPosition = (position) => {
    return {
      left: position.left,
      top: position.top,
    };
  };

  // Simplified hover effect function
  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.backgroundColor = 'rgba(100, 181, 246, 0.9)';
      e.target.style.transform = 'scale(1.1)';
      e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    } else {
      e.target.style.backgroundColor = 'rgba(100, 181, 246, 0.6)';
      e.target.style.transform = 'scale(1)';
      e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
    }
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };

  const handleShowIframe = () => {
    setShowIframe(true);
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
  };

  const CharacterSelect = ({ styles, onSelect }) => {
    return (
      <div style={styles.characterSelect}>
        <button style={{...styles.arrowButton, ...styles.leftArrow}} onClick={handlePrev}>
          <ChevronLeft size={32} />
        </button>
        <div style={styles.characterDisplay}>
          <img src={characters[selectedIndex].image} alt={characters[selectedIndex].name} style={styles.characterImage} />
          <h3 style={styles.characterName}>{characters[selectedIndex].name}</h3>
          <button 
            style={styles.selectButton}
            onClick={() => onSelect(characters[selectedIndex])}
          >
            Select
          </button>
        </div>
        <button style={{...styles.arrowButton, ...styles.rightArrow}} onClick={handleNext}>
          <ChevronRight size={32} />
        </button>
      </div>
    );
  };

  // Add hover effect for footer links
  const handleFooterLinkHover = (e, isHovering) => {
    e.target.style.color = isHovering ? '#A5B4FC' : 'white'; // Change hover color
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundEffect}></div>
      <div style={styles.content}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <img src="https://ronrank.xyz/wiz-hat.jpg" alt="Wizards Arena Logo" style={styles.logoImage} />
            <span style={styles.logoText}>Wizards Arena</span>
          </div>
          <Button href="https://wizardsarena.net" target="_blank" style={{ display: 'flex', alignItems: 'center' }}>
            Enter App
            <ChevronRight size={16} style={{ marginLeft: '0.5rem' }} />
          </Button>
        </header>
        
        <main style={styles.main}>
          <h1 style={styles.title}>Welcome to Wizards Arena</h1>
          <p style={styles.description}>
            Immerse yourself in a mystical realm where arcane strategy meets blockchain sorcery. Upgrade, battle, and earn with unique NFT wizards in this ethereal Web3 experience.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              style={{ display: 'flex', alignItems: 'center' }} 
              href="https://discord.gg/ds8fyte9fu"
            >
              Begin Your Journey
              <ChevronRight size={16} style={{ marginLeft: '0.5rem' }} />
            </Button>
          </div>
        </main>
        
        <section style={styles.section}>
          <h1 style={styles.title}>Explore Wizards World</h1>
          <h2 style={styles.subtitle}>Select a region to explore</h2>
          <div style={styles.mapContainer}>
            <div ref={mapRef} style={{...styles.map, transition: 'all 1s ease-in-out'}}>
              <div style={styles.mapOverlay}></div>
              {!selectedLocation && !isTransitioning && locations.map((location) => (
                <button
                  key={location.name}
                  style={{
                    ...styles.regionButton,
                    ...getButtonPosition(regionButtonPositions[location.name]),
                  }}
                  onClick={() => handleLocationClick(location)}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  {location.name}
                </button>
              ))}
              {selectedLocation && !isTransitioning && (
                <>
                  <div style={styles.locationDescriptionContainer}>
                    <button 
                      style={styles.toggleDescriptionButton}
                      onClick={() => setShowDescription(!showDescription)}
                    >
                      {showDescription ? 'Hide' : 'Show'} Description
                    </button>
                    <div style={styles.locationDescription}>
                      <h3 style={styles.locationTitle}>{regionDescriptions[selectedLocation.name].title}</h3>
                      <p style={styles.locationText}>{regionDescriptions[selectedLocation.name].description}</p>
                    </div>
                  </div>
                  <button style={styles.exitButton} onClick={handleExitClick}>
                    <X size={16} style={styles.exitIcon} />
                    Exit
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <section style={{...styles.section, ...styles.demoSection}}>
          <h2 style={styles.demoTitle}>Wizard Battle Demo</h2>
          <p style={styles.demoSubtitle}>Select a Wizard to view a demo battle</p>
          {!showIframe ? (
            <>
              <CharacterSelect styles={styles} onSelect={handleShowIframe} />
            </>
          ) : (
            <div style={styles.iframeContainer}>
              <iframe
                src={characters[selectedIndex].replayUrl}
                style={styles.iframe}
                title={`${characters[selectedIndex].name} Battle Replay`}
              />
              <div style={styles.iframeOverlay}></div> {/* Add the overlay here */}
              <button style={styles.closeButton} onClick={handleCloseIframe}>
                <X size={16} />
              </button>
            </div>
          )}
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Key Features</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { name: 'NFT Marketplace', icon: <FaGem size={32} color="#A5B4FC" /> },
              { name: 'NFT Upgrades', icon: <FaShieldAlt size={32} color="#A5B4FC" /> },
              { name: '$WIZA Token', icon: <FaCoins size={32} color="#A5B4FC" /> },
              { name: '7 Game Modes', icon: <FaGamepad size={32} color="#A5B4FC" /> },
            ].map((feature, index) => (
              <div key={index} style={{ textAlign: 'center', margin: '1rem' }}>
                {feature.icon}
                <h3 style={{ color: '#A5B4FC', marginTop: '1rem' }}>{feature.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Game Modes</h2>
          <div style={styles.gameModeContainer}>
            {gameModes.map((mode, index) => (
              <a 
                key={index} 
                href={mode.link}
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = styles.gameModeCardHover.transform}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={styles.gameModeCard}>
                  <img src={mode.image} alt={mode.name} style={styles.gameModeImage} />
                  <h3 style={styles.gameModeName}>{mode.name}</h3>
                  <p style={styles.gameModeDescription}>{mode.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerSections}>
              <div style={styles.footerLinks}>
              <h4 style={styles.footerSectionTitle}>Links/Tools</h4>
                <a href="https://prism-sand-bf4.notion.site/13c52883dc3180bcaab2e26ce6b75475?v=13c52883dc3180a1837d000c641d83f0" style={styles.footerLink}>Docs/Handbook</a>
                <a href="https://www.kdswap.exchange/swap/kda/wiza" style={styles.footerLink}>Buy $WIZA</a>
                <a href="https://www.kaderare.com/" style={styles.footerLink}>NFT Rarity</a>
                <a href="https://ronrank.xyz/calculator" style={styles.footerLink}>Level Calculator</a>
              </div>
              <div style={styles.footerLinks}>
                <h4 style={styles.footerSectionTitle}>Partners</h4>
                <a href="https://kadena.io" style={styles.footerLink}>Kadena</a>
                <a href="https://kdswap.exchange" style={styles.footerLink}>KDSwap</a>
                <a href="https://linxwallet.xyz" style={styles.footerLink}>Linx Wallet</a>
              </div>
              <div style={styles.footerSocials}>
                <h4 style={styles.footerSectionTitle}>Follow Us</h4>
                <div style={styles.socialLinksContainer}>
                  <div style={styles.socialColumn}>
                    <a href="https://www.facebook.com/profile.php?id=61565249494577" style={styles.socialLink} target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com/WizardsArena" style={styles.socialLink} target="_blank" rel="noopener noreferrer">X/Twitter</a>
                    <a href="https://discord.gg/ds8fyte9fu" style={styles.socialLink} target="_blank" rel="noopener noreferrer">Discord</a>
                    <a href="https://t.me/wizardsarena_announcments" style={styles.socialLink} target="_blank" rel="noopener noreferrer">Telegram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p style={styles.footerText}>&copy; 2024 Wizards Arena. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default WizardsArenaLanding;