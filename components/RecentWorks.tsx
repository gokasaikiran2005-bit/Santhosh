import React, { useState, useMemo, useRef } from 'react';
import type { CompanyProfile } from './CompanyProfiles';
import { EditIcon } from './icons/EditIcon';
import EditSectionTitleModal from './EditSectionTitleModal';
import AddWorkModal from './AddWorkModal';
import ConfirmationModal from './ConfirmationModal';
import WorkCard from './WorkCard';
import WorkDetailModal from './WorkDetailModal';
import { PlusIcon } from './icons/PlusIcon';
import useIntersectionObserver from './useIntersectionObserver';
import EditTagsModal from './EditTagsModal';

export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:3' | '21:9';

export interface Tag {
  name: string;
  color: string;
}

export interface Work {
  id: number;
  title: string;
  description:string;
  images: string[];
  tags: Tag[];
  date?: string;
  videoUrls?: string[];
  projectUrl?: string;
  companyProfileId?: number;
  aspectRatio?: AspectRatio;
}

interface RecentWorksProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  isEditMode: boolean;
  works: Work[];
  onWorksChange: (works: Work[]) => void;
  onEnterEditMode: () => void;
  profiles: CompanyProfile[];
}

const RecentWorks: React.FC<RecentWorksProps> = ({ title, onTitleChange, isEditMode, works, onWorksChange, onEnterEditMode, profiles }) => {
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
  const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);
  
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [deletingWork, setDeletingWork] = useState<Work | null>(null);
  const [viewingWork, setViewingWork] = useState<Work | null>(null);

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'>('date-desc');
  const [activeCompanyFilterId, setActiveCompanyFilterId] = useState<number | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const allTags = useMemo(() => {
    const tagsSet = new Map<string, Tag>();
    works.forEach(work => {
      work.tags.forEach(tag => {
        if (!tagsSet.has(tag.name)) {
          tagsSet.set(tag.name, tag);
        }
      });
    });
    return Array.from(tagsSet.values());
  }, [works]);
  
  const companiesWithWorks = useMemo(() => {
    const companyIdsWithWorks = new Set(works.map(work => work.companyProfileId).filter((id): id is number => id !== undefined));
    return profiles.filter(profile => companyIdsWithWorks.has(profile.id));
  }, [works, profiles]);

  const filteredWorks = useMemo(() => {
    const worksToFilter = works.filter(work => {
      const tagMatch = activeTags.length === 0 || work.tags.some(t => activeTags.includes(t.name));
      const companyMatch = activeCompanyFilterId === null || work.companyProfileId === activeCompanyFilterId;
      return tagMatch && companyMatch;
    });

    worksToFilter.sort((a, b) => {
        switch (sortBy) {
          case 'date-desc':
            // Newest first, undated last
            return (b.date || '0000-01-01').localeCompare(a.date || '0000-01-01');
          case 'date-asc':
            // Oldest first, undated last
            return (a.date || '9999-12-31').localeCompare(b.date || '9999-12-31');
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
    });

    return worksToFilter;
  }, [works, activeTags, activeCompanyFilterId, sortBy]);
  
  const handleTagClick = (tagName: string) => {
    setActiveTags(prev => {
        if (prev.includes(tagName)) {
            return prev.filter(t => t !== tagName);
        } else {
            return [...prev, tagName];
        }
    });
  };

  const handleAddWork = (work: Omit<Work, 'id'>) => {
    const newWork = { ...work, id: works.length > 0 ? Math.max(...works.map(w => w.id)) + 1 : 1 };
    onWorksChange([...works, newWork]);
  };

  const handleEditWork = (work: Work) => {
    onWorksChange(works.map(w => w.id === work.id ? work : w));
  };

  const handleDeleteWork = () => {
    if (deletingWork) {
      onWorksChange(works.filter(w => w.id !== deletingWork.id));
      setDeletingWork(null);
    }
  };

  const handleTagsUpdate = (tagChanges: Record<string, Tag | null>) => {
    const newWorks = works.map(work => {
        const newTags = work.tags
            .map(tag => {
                const change = tagChanges[tag.name];
                if (change === undefined) {
                    return tag;
                }
                return change;
            })
            .filter((tag): tag is Tag => tag !== null);
        return { ...work, tags: newTags };
    });

    onWorksChange(newWorks);

    setActiveTags(prevActiveTags => {
        return prevActiveTags.map(activeTag => {
            const change = tagChanges[activeTag];
            if (change === null) {
                return null; // tag deleted
            }
            if (change) {
                return change.name; // tag renamed
            }
            return activeTag; // no change
        }).filter((t): t is string => t !== null);
    });
  };

  const openAddModal = () => {
    onEnterEditMode();
    setEditingWork(null);
    setIsAddWorkModalOpen(true);
  };
  
  const openEditModal = (work: Work) => {
    setEditingWork(work);
    setIsAddWorkModalOpen(true);
  };
  
  const openDetailModal = (work: Work) => {
    setViewingWork(work);
  };

  const viewingWorkCompanyName = useMemo(() => {
    if (!viewingWork || !viewingWork.companyProfileId) return undefined;
    return profiles.find(p => p.id === viewingWork.companyProfileId)?.name;
  }, [viewingWork, profiles]);

  return (
    <>
      <section
        ref={sectionRef}
        className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex justify-between items-center mb-10">
          <div className={`group flex items-center gap-4 rounded-lg ${isEditMode ? 'outline-dashed outline-1 outline-accent/50 p-2' : ''}`}>
            <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">{title}</h2>
            <button
              onClick={() => setIsTitleModalOpen(true)}
              className={`p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 ${isEditMode ? '!opacity-100' : ''} transform hover:scale-110`}
              aria-label="Edit section title"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all text-sm transform hover:scale-105"
          >
            <PlusIcon className="w-4 h-4" />
            Add New Project
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-x-8 gap-y-4 mb-10">
            <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex-shrink-0">Sort by:</label>
                <div className="relative">
                    <select 
                        id="sort-by"
                        value={sortBy} 
                        onChange={e => setSortBy(e.target.value as any)}
                        className="appearance-none w-full md:w-auto bg-light-card/60 dark:bg-dark-card/60 border border-light-border/30 dark:border-dark-border/30 text-light-text dark:text-dark-text text-sm rounded-lg focus:ring-accent focus:border-accent block pl-3 pr-8 py-2 font-semibold"
                        aria-label="Sort projects"
                    >
                        <option value="date-desc">Newest</option>
                        <option value="date-asc">Oldest</option>
                        <option value="title-asc">Title (A-Z)</option>
                        <option value="title-desc">Title (Z-A)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
        </div>

        <div className={`space-y-6 mb-10 rounded-lg ${isEditMode ? 'outline-dashed outline-1 outline-accent/50 p-4' : ''}`}>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Tags:</span>
                {isEditMode && (
                  <button
                    onClick={() => setIsEditTagsModalOpen(true)}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
                    aria-label="Edit tags"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                )}
                <button
                    onClick={() => setActiveTags([])}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 ${activeTags.length === 0 ? 'bg-accent text-white' : 'bg-light-card/60 dark:bg-dark-card/60 border border-light-border/30 dark:border-dark-border/30 text-light-text dark:text-dark-text'}`}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag.name}
                        onClick={() => handleTagClick(tag.name)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 ${activeTags.includes(tag.name) ? 'bg-accent text-white' : 'bg-light-card/60 dark:bg-dark-card/60 border border-light-border/30 dark:border-dark-border/30 text-light-text dark:text-dark-text'}`}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>

            {companiesWithWorks.length > 0 && (
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Company:</span>
                    <button
                        onClick={() => setActiveCompanyFilterId(null)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 ${activeCompanyFilterId === null ? 'bg-accent text-white' : 'bg-light-card/60 dark:bg-dark-card/60 border border-light-border/30 dark:border-dark-border/30 text-light-text dark:text-dark-text'}`}
                    >
                        All
                    </button>
                    {companiesWithWorks.map(profile => (
                        <button
                            key={profile.id}
                            onClick={() => setActiveCompanyFilterId(profile.id)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 ${activeCompanyFilterId === profile.id ? 'bg-accent text-white' : 'bg-light-card/60 dark:bg-dark-card/60 border border-light-border/30 dark:border-dark-border/30 text-light-text dark:text-dark-text'}`}
                        >
                            {profile.name}
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {filteredWorks.map(work => {
                const companyName = work.companyProfileId ? profiles.find(p => p.id === work.companyProfileId)?.name : undefined;
                return (
                    <WorkCard
                        key={work.id}
                        work={work}
                        companyName={companyName}
                        isEditMode={isEditMode}
                        onEdit={() => openEditModal(work)}
                        onDelete={() => setDeletingWork(work)}
                        onClick={() => openDetailModal(work)}
                    />
                );
            })}
        </div>
      </section>

      <EditSectionTitleModal
        isOpen={isTitleModalOpen}
        onClose={() => setIsTitleModalOpen(false)}
        currentTitle={title}
        onSave={onTitleChange}
        modalTitle="Edit Section Title"
      />
      
      <AddWorkModal
        isOpen={isAddWorkModalOpen}
        onClose={() => setIsAddWorkModalOpen(false)}
        onAddWork={handleAddWork}
        onEditWork={handleEditWork}
        existingWork={editingWork}
        allTags={allTags}
        profiles={profiles}
        activeCompanyFilterId={activeCompanyFilterId}
      />

      <WorkDetailModal
        work={viewingWork}
        onClose={() => setViewingWork(null)}
        companyName={viewingWorkCompanyName}
      />

      <ConfirmationModal
        isOpen={!!deletingWork}
        onClose={() => setDeletingWork(null)}
        onConfirm={handleDeleteWork}
        title="Delete Work"
        message={`Are you sure you want to delete the work "${deletingWork?.title}"? This cannot be undone.`}
        confirmText="Delete"
      />

      <EditTagsModal
        isOpen={isEditTagsModalOpen}
        onClose={() => setIsEditTagsModalOpen(false)}
        allTags={allTags}
        onSave={handleTagsUpdate}
      />
    </>
  );
};

export default RecentWorks;