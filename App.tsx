import React, { useState, useEffect } from 'react';
import type { Theme, FileData, SocialLink, BannerData, PageBackground, Skill } from './types';
import Header from './components/Header';
import SocialLinks from './components/SocialLinks';
import Services from './components/Services';
import Tools from './components/Tools';
import CompanyProfiles, { CompanyProfile } from './components/CompanyProfiles';
import About from './components/About';
import Banner from './components/Banner';
import Background from './components/Background';
import Sidebar from './components/Sidebar';
import RecentWorks, { Work } from './components/RecentWorks';
import TopBar from './components/TopBar';

const initialProfiles: CompanyProfile[] = [
  {
    id: 1,
    name: 'Alpha Studios',
    role: 'Lead Motion Designer',
    duration: '2021 - Present',
    description: 'Led a team of designers in creating compelling motion graphics for major brand campaigns and product launches.',
  },
  {
    id: 2,
    name: 'Beta Creative',
    role: 'Motion Graphics Artist',
    duration: '2019 - 2021',
    description: 'Developed animations, visual effects, and video assets for a variety of clients in the tech and entertainment sectors.',
  },
  {
    id: 3,
    name: 'Charlie Animations',
    role: 'Junior Animator',
    duration: '2017 - 2019',
    description: 'Assisted senior artists with 2D animation, storyboarding, and asset creation for animated series and commercials.',
  },
];

const initialWorks: Work[] = [
    {
        id: 1,
        title: 'Project Alpha Showcase',
        date: '2023-11-15',
        description: 'A dynamic showcase of motion graphics for the Project Alpha campaign, featuring 3D animations and visual effects that pushed the boundaries of our creative pipeline. This project involved complex character rigging, particle simulations, and advanced rendering techniques to bring a futuristic concept to life. The final result was used in a global marketing campaign, receiving accolades for its innovation and visual storytelling.',
        images: ['https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&h=675&auto=format&fit=crop', 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&h=675&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&h=675&auto=format&fit=crop'],
        tags: [{ name: 'Animation', color: '#FF6F61' }, { name: '3D', color: '#6B5B95' }],
        videoUrls: ['https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'],
        projectUrl: '#',
        companyProfileId: 1,
        aspectRatio: '16:9',
    },
    {
        id: 2,
        title: 'Creative Beta Reel',
        date: '2023-08-20',
        description: 'A compilation of our best work for Beta Creative, highlighting branding animations and social media content. The goal was to create a fast-paced, energetic reel that captured the essence of the brand and its diverse client base. We utilized a mix of 2D and 3D animation, typography, and live-action footage to create a visually cohesive and engaging piece.',
        images: ['https://images.unsplash.com/photo-1522124012248-3c3b0f5b6f3b?q=80&w=800&h=800&auto=format&fit=crop'],
        tags: [{ name: 'Branding', color: '#88B04B' }, { name: 'Social Media', color: '#F7CAC9' }],
        projectUrl: '#',
        companyProfileId: 2,
        aspectRatio: '1:1',
    },
    {
        id: 3,
        title: 'Charlie\'s Animated Shorts',
        date: '2022-05-10',
        description: 'A series of charming animated shorts created for Charlie Animations, focusing on storytelling and character design. Each short tells a unique story with a distinct visual style, showcasing our team\'s versatility and passion for narrative-driven animation. The project was a labor of love and has been featured in several animation festivals.',
        images: ['https://images.unsplash.com/photo-1611162617213-7d724e87c5d3?q=80&w=1200&h=900&auto=format&fit=crop'],
        tags: [{ name: 'Animation', color: '#FF6F61' }, { name: 'Storytelling', color: '#92A8D1' }],
        companyProfileId: 3,
        aspectRatio: '4:3',
    },
    {
        id: 4,
        title: 'Standalone VFX Work',
        date: '2024-01-05',
        description: 'Exploring advanced visual effects techniques for a personal project. This piece was an opportunity to experiment with new software and workflows, focusing on photorealistic compositing, procedural generation, and dynamic simulations. It served as a valuable learning experience and a powerful addition to my portfolio.',
        images: ['https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&h=675&auto=format&fit=crop'],
        tags: [{ name: 'VFX', color: '#955251' }, { name: '3D', color: '#6B5B95' }],
        aspectRatio: '16:9',
    },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [resume] = useState<FileData | null>({ name: 'SanthoshGoka_Resume.pdf', url: '#' });
  const [name] = useState('Santhosh Goka');
  const [title] = useState('Motion Graphics Artist');
  const [aboutTitle] = useState('About Me');
  const [aboutContent] = useState(
    "I'm a passionate Motion Graphics Artist with a knack for creating visually stunning and compelling animations. With a strong foundation in design principles and years of experience with industry-standard software, I specialize in bringing ideas to life through movement, whether it's for brand identities, explainer videos, or social media campaigns. My goal is to tell stories that captivate and engage audiences."
  );
  const [aboutImage] = useState<FileData | null>(null);
  const [skills] = useState<Skill[]>([
    { name: 'After Effects', proficiency: 95 },
    { name: 'Cinema 4D', proficiency: 90 },
    { name: 'Blender', proficiency: 85 },
    { name: 'Photoshop', proficiency: 80 },
    { name: 'Premiere Pro', proficiency: 88 },
    { name: 'Illustrator', proficiency: 75 },
  ]);
  const [companyProfilesTitle] = useState('Company Profiles');
  const [recentWorksTitle] = useState('Recent Works');
  const [servicesTitle] = useState('Services');
  const [toolsTitle] = useState('Tools I Use');
  const [services] = useState(["SEO", "Framer", "UX/UI Design", "Webflow", "Social Media", "Branding", "3D Design"]);
  const [tools] = useState([
    'Photoshop',
    'After Effects',
    'Premiere Pro',
    'Illustrator',
    'Blender',
    'Cinema 4D',
  ]);
  const [socialLinks] = useState<SocialLink[]>([
    { icon: 'X', label: 'X', href: '#' },
    { icon: 'LinkedIn', label: 'LinkedIn', href: '#' },
    { icon: 'Gmail', label: 'Gmail', href: 'mailto:example@gmail.com' },
    { icon: 'Phone', label: 'Contact', href: 'tel:+' },
    { icon: 'Location', label: 'Location', href: '#' },
  ]);
  const [bannerData] = useState<BannerData>({
    title: "Let's collab!",
    content: "Let's turn your idea into reality with my design experience!",
    buttonText: "Send a message now!",
    buttonLink: "#",
    backgroundType: 'color',
    backgroundUrl: '',
    backgroundMaxSize: 10,
  });
  const [pageBackground] = useState<PageBackground>({
    type: 'image',
    value: 'https://images.unsplash.com/photo-1542029027-563d3fb7d855?q=80&w=2071&auto=format&fit=crop',
  });
  const [profiles] = useState<CompanyProfile[]>(initialProfiles);
  const [works] = useState<Work[]>(initialWorks);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Set the initial state of the sidebar based on screen size,
    // but don't listen for resizes to avoid overriding user actions.
    setIsSidebarOpen(window.innerWidth >= 768);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (pageBackground.type === 'color' && pageBackground.value) {
        document.body.style.backgroundColor = pageBackground.value;
    } else {
        document.body.style.backgroundColor = '';
    }
  }, [pageBackground]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Background background={pageBackground} />
      <TopBar onMenuClick={toggleSidebar} hasDraft={false} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={toggleSidebar}
      />
      <div className={`relative z-0 font-sans transition-all duration-300 bg-light-bg/85 dark:bg-dark-bg/85 backdrop-blur-xl min-h-screen ${isSidebarOpen ? 'md:ml-64' : ''} pt-16 md:pt-0`}>
        <main className="container mx-auto px-6 md:px-12 py-24 max-w-4xl">
          <Header 
            theme={theme} 
            toggleTheme={toggleTheme} 
            toggleSidebar={toggleSidebar}
            resume={resume}
            name={name}
            title={title}
          />
          <div className="space-y-24 md:space-y-32 mt-16">
            <div id="about">
              <About
                title={aboutTitle}
                content={aboutContent}
                image={aboutImage}
                skills={skills}
              />
            </div>
            <div id="company-profiles">
              <CompanyProfiles
                title={companyProfilesTitle}
                profiles={profiles}
              />
            </div>
            <div id="recent-works">
              <RecentWorks
                title={recentWorksTitle}
                works={works}
                profiles={profiles}
              />
            </div>
            <div id="tools">
              <Tools 
                title={toolsTitle}
                tools={tools}
              />
            </div>
            <div id="services">
              <Services
                title={servicesTitle}
                services={services}
              />
            </div>
          </div>
        </main>
        
        <footer className="mt-24 md:mt-32">
          <div id="lets-collab">
            <Banner
              data={bannerData}
            />
          </div>
          <div id="social-links">
            <div className="bg-transparent">
                <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
                  <SocialLinks 
                    links={socialLinks}
                  />
                </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;