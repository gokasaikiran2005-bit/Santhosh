import React, { useState, useEffect, useRef } from 'react';
import type { Theme, FileData, SocialLink, BannerData, PageBackground, Skill } from './types';
import Header from './components/Header';
import SocialLinks from './components/SocialLinks';
import Services from './components/Services';
import Tools from './components/Tools';
import CompanyProfiles, { CompanyProfile } from './components/CompanyProfiles';
import About from './components/About';
import Banner from './components/Banner';
import Background from './components/Background';
import EditBackgroundFAB from './components/EditBackgroundFAB';
import EditPageBackgroundModal from './components/EditPageBackgroundModal';
import EditModeFAB from './components/EditModeFAB';
import SaveFAB from './components/SaveFAB';
import ResetFAB from './components/ResetFAB';
import ConfirmationModal from './components/ConfirmationModal';
import Sidebar from './components/Sidebar';
import RecentWorks, { Work } from './components/RecentWorks';
import RestoreDraftBanner from './components/RestoreDraftBanner';
import Toast from './components/Toast';
import * as idb from './idb';
import SettingsModal from './components/SettingsModal';
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
  const [accentColor, setAccentColor] = useState('#FF6F61');
  const [resume, setResume] = useState<FileData | null>(null);
  const [name, setName] = useState('Santhosh Goka');
  const [title, setTitle] = useState('Motion Graphics Artist');
  const [aboutTitle, setAboutTitle] = useState('About Me');
  const [aboutContent, setAboutContent] = useState(
    "I'm a passionate Motion Graphics Artist with a knack for creating visually stunning and compelling animations. With a strong foundation in design principles and years of experience with industry-standard software, I specialize in bringing ideas to life through movement, whether it's for brand identities, explainer videos, or social media campaigns. My goal is to tell stories that captivate and engage audiences."
  );
  const [aboutImage, setAboutImage] = useState<FileData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([
    { name: 'After Effects', proficiency: 95 },
    { name: 'Cinema 4D', proficiency: 90 },
    { name: 'Blender', proficiency: 85 },
    { name: 'Photoshop', proficiency: 80 },
    { name: 'Premiere Pro', proficiency: 88 },
    { name: 'Illustrator', proficiency: 75 },
  ]);
  const [companyProfilesTitle, setCompanyProfilesTitle] = useState('Company Profiles');
  const [recentWorksTitle, setRecentWorksTitle] = useState('Recent Works');
  const [servicesTitle, setServicesTitle] = useState('Services');
  const [toolsTitle, setToolsTitle] = useState('Tools I Use');
  const [services, setServices] = useState(["SEO", "Framer", "UX/UI Design", "Webflow", "Social Media", "Branding", "3D Design"]);
  const [tools, setTools] = useState([
    'Photoshop',
    'After Effects',
    'Premiere Pro',
    'Illustrator',
    'Blender',
    'Cinema 4D',
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { icon: 'X', label: 'X', href: '#' },
    { icon: 'LinkedIn', label: 'LinkedIn', href: '#' },
    { icon: 'Gmail', label: 'Gmail', href: 'mailto:example@gmail.com' },
    { icon: 'Phone', label: 'Contact', href: 'tel:+' },
    { icon: 'Location', label: 'Location', href: '#' },
  ]);
  const [bannerData, setBannerData] = useState<BannerData>({
    title: "Let's collab!",
    content: "Let's turn your idea into reality with my design experience!",
    buttonText: "Send a message now!",
    buttonLink: "#",
    backgroundType: 'color',
    backgroundUrl: '',
    backgroundMaxSize: 10,
  });
  const [pageBackground, setPageBackground] = useState<PageBackground>({
    type: 'image',
    value: 'https://images.unsplash.com/photo-1542029027-563d3fb7d855?q=80&w=2071&auto=format&fit=crop',
  });
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profiles, setProfiles] = useState<CompanyProfile[]>(initialProfiles);
  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [draft, setDraft] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const PORTFOLIO_STORAGE_KEY = 'santhosh-goka-portfolio-data';
  const DRAFT_STORAGE_KEY = 'santhosh-goka-portfolio-draft';

  useEffect(() => {
    // Set the initial state of the sidebar based on screen size,
    // but don't listen for resizes to avoid overriding user actions.
    setIsSidebarOpen(window.innerWidth >= 768);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const applyStateFromData = (dataToApply: any) => {
    if (!dataToApply) return;
    
    const processLoadedFile = (fileData: any): FileData | null => {
      if (!fileData || !fileData.url) return null;
      if (fileData.blob instanceof Blob) {
          return { name: fileData.name, url: URL.createObjectURL(fileData.blob) };
      }
      return fileData;
    };

    const processLoadedUrl = (value: string | Blob): string => {
        if (!value) return '';
        if (value instanceof Blob) {
            return URL.createObjectURL(value);
        }
        return value;
    };

    const processLoadedWork = (work: any): Work => {
      const loadedImages = (work.images || []).map(processLoadedUrl);
      const loadedVideoUrls = (work.videoUrls || []).map(processLoadedUrl);
      return { ...work, images: loadedImages, videoUrls: loadedVideoUrls };
    };

    const processLoadedProfile = (profile: any): CompanyProfile => {
        return profile;
    };

    setTheme(dataToApply.theme ?? 'dark');
    setAccentColor(dataToApply.accentColor ?? '#FF6F61');
    setResume(processLoadedFile(dataToApply.resume) ?? null);
    setName(dataToApply.name ?? 'Santhosh Goka');
    setTitle(dataToApply.title ?? 'Motion Graphics Artist');
    setAboutTitle(dataToApply.aboutTitle ?? 'About Me');
    setAboutContent(dataToApply.aboutContent ?? '');
    setAboutImage(processLoadedFile(dataToApply.aboutImage) ?? null);
    setSkills(dataToApply.skills ?? []);
    setCompanyProfilesTitle(dataToApply.companyProfilesTitle ?? 'Company Profiles');
    setRecentWorksTitle(dataToApply.recentWorksTitle ?? 'Recent Works');
    setServicesTitle(dataToApply.servicesTitle ?? 'Services');
    setToolsTitle(dataToApply.toolsTitle ?? 'Tools I Use');
    setServices(dataToApply.services ?? []);
    setTools(dataToApply.tools ?? []);
    setSocialLinks(dataToApply.socialLinks ?? []);
    setBannerData(dataToApply.bannerData ? { ...dataToApply.bannerData, backgroundUrl: processLoadedUrl(dataToApply.bannerData.backgroundUrl) } : bannerData);
    setPageBackground(dataToApply.pageBackground ? { ...dataToApply.pageBackground, value: processLoadedUrl(dataToApply.pageBackground.value) } : pageBackground);
    setProfiles((dataToApply.profiles ?? initialProfiles).map(processLoadedProfile));
    setWorks((dataToApply.works ?? initialWorks).map(processLoadedWork));
  };


  useEffect(() => {
    idb.initDB().then(success => {
      if (success) {
        setIsDbInitialized(true);
      } else {
        console.error("IndexedDB could not be initialized.");
      }
    });
  }, []);

  // Load state from IndexedDB on initial render
  useEffect(() => {
    if (!isDbInitialized) return;

    const loadData = async () => {
      try {
        let savedState = await idb.get<any>(PORTFOLIO_STORAGE_KEY);

        if (!savedState) {
          const savedStateJSON = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
          if (savedStateJSON) {
            console.log("Migrating data from localStorage to IndexedDB.");
            savedState = JSON.parse(savedStateJSON);
            await idb.set(PORTFOLIO_STORAGE_KEY, savedState);
            localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
          }
        }
        
        if (savedState) {
          applyStateFromData(savedState);
        }

        const savedDraftJSON = sessionStorage.getItem(DRAFT_STORAGE_KEY);
        if (savedDraftJSON) {
          console.log("Found an unsaved draft.");
          setDraft(JSON.parse(savedDraftJSON));
        }

      } catch (error) {
        console.error("Failed to load state", error);
      }
    };
    loadData();
  }, [isDbInitialized]);

  const portfolioState = { theme, accentColor, resume, name, title, aboutTitle, aboutContent, aboutImage, skills, companyProfilesTitle, recentWorksTitle, servicesTitle, toolsTitle, services, tools, socialLinks, bannerData, pageBackground, profiles, works };
  const stateRef = useRef(portfolioState);
  useEffect(() => {
      stateRef.current = portfolioState;
  });

  useEffect(() => {
    if (!isEditMode) return;

    const autoSave = () => {
        if (stateRef.current) {
            // Helper to prevent saving temporary blob URLs to session storage, as they become invalid on page reload.
            const filterBlobUrl = (url: string | undefined): string => {
                return (url && url.startsWith('blob:')) ? '' : url || '';
            };

            const processWorkForDraft = (work: Work): Work => ({
                ...work,
                images: work.images.map(url => filterBlobUrl(url)).filter(Boolean),
                videoUrls: (work.videoUrls || []).map(url => filterBlobUrl(url)).filter(Boolean),
            });
            
            const processFileDataForDraft = (fileData: FileData | null): { name: string; url: string } | null => {
                if (!fileData) return null;
                return { name: fileData.name, url: filterBlobUrl(fileData.url) };
            };

            const draftState = {
                ...stateRef.current,
                resume: processFileDataForDraft(stateRef.current.resume),
                aboutImage: processFileDataForDraft(stateRef.current.aboutImage),
                bannerData: {
                    ...stateRef.current.bannerData,
                    backgroundUrl: filterBlobUrl(stateRef.current.bannerData.backgroundUrl),
                },
                pageBackground: {
                    ...stateRef.current.pageBackground,
                    value: stateRef.current.pageBackground.type === 'color' 
                        ? stateRef.current.pageBackground.value 
                        : filterBlobUrl(stateRef.current.pageBackground.value),
                },
                works: stateRef.current.works.map(processWorkForDraft),
            };
            
            sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftState));
            setToastMessage('Draft saved automatically.');
        }
    };

    const intervalId = setInterval(autoSave, 120000);
    window.addEventListener('beforeunload', autoSave);

    return () => {
        clearInterval(intervalId);
        window.removeEventListener('beforeunload', autoSave);
    };
  }, [isEditMode]);


  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty('--color-accent', accentColor);
  }, [accentColor]);
  
  useEffect(() => {
    if (pageBackground.type === 'color' && pageBackground.value) {
        document.body.style.backgroundColor = pageBackground.value;
    } else {
        document.body.style.backgroundColor = '';
    }
  }, [pageBackground]);

  // Clean up any created object URLs to avoid memory leaks
  useEffect(() => {
    const urlsToClean = [
      resume?.url,
      aboutImage?.url,
      bannerData.backgroundUrl,
      pageBackground.value,
      ...works.flatMap(work => work.images),
      ...works.flatMap(work => work.videoUrls || []),
    ].filter(Boolean) as string[];

    return () => {
      urlsToClean.forEach(url => {
        if (url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
        }
      });
    };
  }, [resume, aboutImage, bannerData.backgroundUrl, pageBackground.value, works, profiles]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const enterEditMode = () => {
    setIsEditMode(true);
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const handleResumeChange = (file: File | null) => {
    if (resume?.url.startsWith('blob:')) {
      URL.revokeObjectURL(resume.url);
    }
    if (file) {
      setResume({
        file,
        url: URL.createObjectURL(file),
        name: file.name,
      });
    } else {
      setResume(null);
    }
  };

  const handleIntroChange = (newName: string, newTitle: string) => {
    setName(newName);
    setTitle(newTitle);
  };

  const handleAboutTitleChange = (newTitle: string) => {
    setAboutTitle(newTitle);
  };

  const handleAboutContentChange = (newContent: string) => {
    setAboutContent(newContent);
  };
  
  const handleAboutImageChange = (file: File | null) => {
    if (aboutImage?.url.startsWith('blob:')) {
      URL.revokeObjectURL(aboutImage.url);
    }
    if (file) {
      setAboutImage({
        file,
        url: URL.createObjectURL(file),
        name: file.name
      });
    } else {
      setAboutImage(null);
    }
  };
  
  const handleSkillsChange = (newSkills: Skill[]) => {
    setSkills(newSkills);
  };

  const handleCompanyProfilesTitleChange = (newTitle: string) => {
    setCompanyProfilesTitle(newTitle);
  };

  const handleRecentWorksTitleChange = (newTitle: string) => {
    setRecentWorksTitle(newTitle);
  };

  const handleServicesTitleChange = (newTitle: string) => {
    setServicesTitle(newTitle);
  };

  const handleToolsTitleChange = (newTitle: string) => {
    setToolsTitle(newTitle);
  };

  const handleServicesChange = (newServices: string[]) => {
    setServices(newServices);
  };

  const handleToolsChange = (newTools: string[]) => {
    setTools(newTools);
  };

  const handleSocialLinksChange = (newLinks: SocialLink[]) => {
    setSocialLinks(newLinks);
  };
  
  const handleBannerChange = (newData: BannerData) => {
    if (bannerData.backgroundUrl.startsWith('blob:') && bannerData.backgroundUrl !== newData.backgroundUrl) {
      URL.revokeObjectURL(bannerData.backgroundUrl);
    }
    setBannerData(newData);
  };

  const handlePageBackgroundChange = (newBg: PageBackground) => {
    if (pageBackground.value.startsWith('blob:') && pageBackground.value !== newBg.value) {
      URL.revokeObjectURL(pageBackground.value);
    }
    setPageBackground(newBg);
  };
  
  const handleWorksChange = (newWorks: Work[]) => {
    // Basic cleanup for old blob URLs that are no longer in use
    const newImageUrls = new Set(newWorks.flatMap(w => w.images));
    const oldImageUrls = works.flatMap(w => w.images);
    for (const url of oldImageUrls) {
      if (url.startsWith('blob:') && !newImageUrls.has(url)) {
        URL.revokeObjectURL(url);
      }
    }
    
    const newVideoUrls = new Set(newWorks.flatMap(w => w.videoUrls || []));
    const oldVideoUrls = works.flatMap(w => w.videoUrls || []);
    for (const url of oldVideoUrls) {
      if (url.startsWith('blob:') && !newVideoUrls.has(url)) {
        URL.revokeObjectURL(url);
      }
    }

    setWorks(newWorks);
  };

  const handleSave = async () => {
    if (!isDbInitialized) {
        alert("Database is not ready. Please try again in a moment.");
        return;
    }
    setIsSaving(true);
    try {
      const processFileData = async (fileData: FileData | null) => {
        if (!fileData) return null;
        if (fileData.file) {
            return { name: fileData.name, blob: fileData.file };
        }
        if (fileData.url.startsWith('blob:')) {
            const response = await fetch(fileData.url);
            const blob = await response.blob();
            return { name: fileData.name, blob };
        }
        return { name: fileData.name, url: fileData.url };
      };

      const processUrl = async (url: string) => {
          if (url && url.startsWith('blob:')) {
              const response = await fetch(url);
              return await response.blob();
          }
          return url;
      };
      
      const processWork = async (work: Work): Promise<any> => {
        const savedImages = await Promise.all(work.images.map(processUrl));
        const savedVideoUrls = await Promise.all((work.videoUrls || []).map(processUrl));
        return { ...work, images: savedImages, videoUrls: savedVideoUrls };
      };

      const [savedResume, savedAboutImage, savedBannerUrl, savedPageBgUrl, savedWorks] = await Promise.all([
        processFileData(resume),
        processFileData(aboutImage),
        processUrl(bannerData.backgroundUrl),
        processUrl(pageBackground.value),
        Promise.all(works.map(processWork)),
      ]);

      const stateToSave = {
        theme,
        accentColor,
        resume: savedResume,
        name, title, aboutTitle, aboutContent,
        aboutImage: savedAboutImage,
        skills,
        companyProfilesTitle, recentWorksTitle, servicesTitle, toolsTitle,
        services, tools, socialLinks,
        bannerData: { ...bannerData, backgroundUrl: savedBannerUrl },
        pageBackground: { ...pageBackground, value: savedPageBgUrl },
        profiles: profiles,
        works: savedWorks,
      };

      await idb.set(PORTFOLIO_STORAGE_KEY, stateToSave);
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      setDraft(null);
      alert('Portfolio saved successfully!');
    } catch (error) {
      console.error("Failed to save state:", error);
      alert('There was an error while saving. Please check the console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmReset = async () => {
    try {
      await idb.remove(PORTFOLIO_STORAGE_KEY);
      localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      window.location.reload();
    } catch(e) {
      console.error("Failed to reset portfolio", e);
      alert("Error resetting portfolio. See console for details.");
    }
  };

  const handleRestoreDraft = () => {
    if (draft) {
      applyStateFromData(draft);
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      setDraft(null);
      setToastMessage('Draft restored successfully.');
    }
  };

  const handleDismissDraft = () => {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      setDraft(null);
  };
  
  const hasDraft = !!draft;

  return (
    <>
      <RestoreDraftBanner
        isOpen={hasDraft}
        onRestore={handleRestoreDraft}
        onDismiss={handleDismissDraft}
      />
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      <Background background={pageBackground} />
      <TopBar onMenuClick={toggleSidebar} hasDraft={hasDraft} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={toggleSidebar}
      />
      <div className={`relative z-0 font-sans transition-all duration-300 bg-light-bg/85 dark:bg-dark-bg/85 backdrop-blur-xl min-h-screen ${isSidebarOpen ? 'md:ml-64' : ''} ${isEditMode ? 'outline outline-2 outline-accent outline-offset-[-2px]' : ''} ${hasDraft ? 'pt-28 md:pt-14' : 'pt-16 md:pt-0'}`}>
        <main className="container mx-auto px-6 md:px-12 py-24 max-w-4xl">
          <Header 
            theme={theme} 
            toggleTheme={toggleTheme} 
            toggleSidebar={toggleSidebar}
            onSettingsClick={() => setIsSettingsModalOpen(true)}
            resume={resume}
            onResumeChange={handleResumeChange}
            name={name}
            title={title}
            onIntroChange={handleIntroChange}
            isEditMode={isEditMode}
          />
          <div className="space-y-24 md:space-y-32 mt-16">
            <div id="about">
              <About
                title={aboutTitle}
                onTitleChange={handleAboutTitleChange}
                content={aboutContent}
                onContentChange={handleAboutContentChange}
                image={aboutImage}
                onImageChange={handleAboutImageChange}
                skills={skills}
                onSkillsChange={handleSkillsChange}
                isEditMode={isEditMode}
              />
            </div>
            <div id="company-profiles">
              <CompanyProfiles
                title={companyProfilesTitle}
                onTitleChange={handleCompanyProfilesTitleChange}
                isEditMode={isEditMode}
                profiles={profiles}
                onProfilesChange={setProfiles}
                onEnterEditMode={enterEditMode}
              />
            </div>
            <div id="recent-works">
              <RecentWorks
                title={recentWorksTitle}
                onTitleChange={handleRecentWorksTitleChange}
                isEditMode={isEditMode}
                works={works}
                onWorksChange={handleWorksChange}
                onEnterEditMode={enterEditMode}
                profiles={profiles}
              />
            </div>
            <div id="tools">
              <Tools 
                title={toolsTitle}
                onTitleChange={handleToolsTitleChange}
                tools={tools}
                onToolsChange={handleToolsChange}
                isEditMode={isEditMode}
              />
            </div>
            <div id="services">
              <Services
                title={servicesTitle}
                onTitleChange={handleServicesTitleChange}
                services={services}
                onServicesChange={handleServicesChange}
                isEditMode={isEditMode}
              />
            </div>
          </div>
        </main>
        
        <footer className="mt-24 md:mt-32">
          <div id="lets-collab">
            <Banner
              data={bannerData}
              onDataChange={handleBannerChange}
              isEditMode={isEditMode}
            />
          </div>
          <div id="social-links">
            <div className="bg-transparent">
                <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
                  <SocialLinks 
                    links={socialLinks}
                    onLinksChange={handleSocialLinksChange}
                    isEditMode={isEditMode}
                  />
                </div>
            </div>
          </div>
        </footer>
      </div>
      <EditModeFAB isEditMode={isEditMode} onClick={toggleEditMode} />
      <EditBackgroundFAB onClick={() => setIsBgModalOpen(true)} />
      {isEditMode && (
        <>
            <SaveFAB onClick={handleSave} isSaving={isSaving} />
            <ResetFAB onClick={() => setIsResetModalOpen(true)} />
        </>
      )}
      <EditPageBackgroundModal
        isOpen={isBgModalOpen}
        onClose={() => setIsBgModalOpen(false)}
        currentBackground={pageBackground}
        onSave={handlePageBackgroundChange}
        theme={theme}
      />
       <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={confirmReset}
        title="Reset Portfolio"
        message="Are you sure you want to reset? All saved changes will be lost and the portfolio will be restored to its default state."
        confirmText="Yes, Reset"
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentAccentColor={accentColor}
        onAccentColorChange={setAccentColor}
      />
    </>
  );
};

export default App;