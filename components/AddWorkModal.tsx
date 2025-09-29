
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import Modal from './Modal';
import { Work, Tag, AspectRatio } from './RecentWorks';
import { UploadIcon } from './icons/UploadIcon';
import { CompanyProfile } from './CompanyProfiles';
import { TrashIcon } from './icons/TrashIcon';

interface AddWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWork: (work: Omit<Work, 'id'>) => void;
  onEditWork: (work: Work) => void;
  existingWork: Work | null;
  allTags: Tag[];
  profiles: CompanyProfile[];
  activeCompanyFilterId: number | null;
}

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: '16:9', label: '16:9 (Widescreen)' },
  { value: '9:16', label: '9:16 (Vertical/Portrait)' },
  { value: '1:1', label: '1:1 (Square)' },
  { value: '4:3', label: '4:3 (Classic)' },
  { value: '21:9', label: '21:9 (Cinematic/Ultrawide)' },
];

const AddWorkModal: React.FC<AddWorkModalProps> = ({ isOpen, onClose, onAddWork, onEditWork, existingWork, allTags, profiles, activeCompanyFilterId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const [videoUrlText, setVideoUrlText] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [companyProfileId, setCompanyProfileId] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [previews, setPreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isImageDragging, setIsImageDragging] = useState(false);
  const [isVideoDragging, setIsVideoDragging] = useState(false);
  const objectUrlsRef = useRef<string[]>([]);
  const videoObjectUrlsRef = useRef<string[]>([]);
  const submitted = useRef(false);

  useEffect(() => {
    if (isOpen) {
      submitted.current = false;
      setError(null);
      objectUrlsRef.current.forEach(URL.revokeObjectURL);
      objectUrlsRef.current = [];
      videoObjectUrlsRef.current.forEach(URL.revokeObjectURL);
      videoObjectUrlsRef.current = [];

      if (existingWork) {
        setTitle(existingWork.title);
        setDescription(existingWork.description);
        setDate(existingWork.date || '');
        setTags(existingWork.tags.map(t => t.name).join(', '));
        
        const externalVideoUrls = (existingWork.videoUrls || []).filter(url => !url.startsWith('blob:'));
        const uploadedVideoUrls = (existingWork.videoUrls || []).filter(url => url.startsWith('blob:'));
        setVideoUrlText(externalVideoUrls.join('\n'));
        setVideoPreviews(uploadedVideoUrls);

        setPreviews(existingWork.images);
        setProjectUrl(existingWork.projectUrl || '');
        setCompanyProfileId(existingWork.companyProfileId?.toString() || '');
        setAspectRatio(existingWork.aspectRatio || '16:9');
      } else {
        setTitle('');
        setDescription('');
        setDate('');
        setTags('');
        setVideoUrlText('');
        setVideoPreviews([]);
        setProjectUrl('');
        setPreviews([]);
        setCompanyProfileId(activeCompanyFilterId?.toString() || '');
        setAspectRatio('16:9');
      }
    }
  }, [existingWork, isOpen, activeCompanyFilterId]);
  
  useEffect(() => {
    return () => {
      if (!submitted.current) {
        objectUrlsRef.current.forEach(URL.revokeObjectURL);
        videoObjectUrlsRef.current.forEach(URL.revokeObjectURL);
      }
    };
  }, []);

  const processImageFiles = (files: FileList) => {
    setError(null);
    const newFilesArray: File[] = Array.from(files);
    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    for (const file of newFilesArray) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`Unsupported file type: ${file.name}. Please upload JPG, PNG, GIF, or WEBP images.`);
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setError(`File is too large: ${file.name}. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }
    }

    const newObjectUrls = newFilesArray.map(file => URL.createObjectURL(file));
    objectUrlsRef.current.push(...newObjectUrls);
    setPreviews(prev => [...prev, ...newObjectUrls]);
  };

  const processVideoFiles = (files: FileList) => {
    setError(null);
    const newFilesArray: File[] = Array.from(files);
    const MAX_SIZE_MB = 50;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

    for (const file of newFilesArray) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`Unsupported file type: ${file.name}. Please upload MP4, WebM, or OGG videos.`);
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setError(`File is too large: ${file.name}. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }
    }

    const newObjectUrls = newFilesArray.map(file => URL.createObjectURL(file));
    videoObjectUrlsRef.current.push(...newObjectUrls);
    setVideoPreviews(prev => [...prev, ...newObjectUrls]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processImageFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processVideoFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleImageDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleImageDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsImageDragging(true);
    }
  };

  const handleImageDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsImageDragging(false);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsImageDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleVideoDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleVideoDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsVideoDragging(true);
    }
  };

  const handleVideoDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVideoDragging(false);
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVideoDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processVideoFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };


  const handleRemoveImage = (indexToRemove: number) => {
    const urlToRemove = previews[indexToRemove];
    setPreviews(prev => prev.filter((_, i) => i !== indexToRemove));

    const objectUrlIndex = objectUrlsRef.current.indexOf(urlToRemove);
    if (objectUrlIndex > -1) {
      URL.revokeObjectURL(urlToRemove);
      objectUrlsRef.current.splice(objectUrlIndex, 1);
    }
  };

  const handleRemoveVideo = (indexToRemove: number) => {
    const urlToRemove = videoPreviews[indexToRemove];
    setVideoPreviews(prev => prev.filter((_, i) => i !== indexToRemove));

    const objectUrlIndex = videoObjectUrlsRef.current.indexOf(urlToRemove);
    if (objectUrlIndex > -1) {
        URL.revokeObjectURL(urlToRemove);
        videoObjectUrlsRef.current.splice(objectUrlIndex, 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!title) {
      setError('Please provide a title for your work.');
      return;
    }
    if (previews.length === 0) {
      setError('Please upload at least one image for your work.');
      return;
    }

    const existingTagsMap = new Map(allTags.map(t => [t.name, t.color]));
    const finalTags = tags.split(',')
      .map(tagStr => {
        const name = tagStr.trim();
        if (!name) return null;
        return {
          name,
          color: existingTagsMap.get(name) || generateRandomColor(),
        };
      })
      .filter((tag): tag is Tag => tag !== null);

    const externalVideoUrls = videoUrlText.split('\n').map(url => url.trim()).filter(Boolean);
    const finalVideoUrls = [...externalVideoUrls, ...videoPreviews];

    const workData = { 
      title, 
      description, 
      date,
      tags: finalTags, 
      videoUrls: finalVideoUrls, 
      images: previews, 
      projectUrl,
      companyProfileId: companyProfileId ? parseInt(companyProfileId, 10) : undefined,
      aspectRatio,
    };

    submitted.current = true;

    if (existingWork) {
      onEditWork({ ...workData, id: existingWork.id });
    } else {
      onAddWork(workData);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
        {existingWork ? 'Edit Work' : 'Add New Work'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(null); }}
            required
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Associated Company (optional)
          </label>
          <select
            id="company"
            value={companyProfileId}
            onChange={(e) => setCompanyProfileId(e.target.value)}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          >
            <option value="">None</option>
            {profiles.map(profile => (
                <option key={profile.id} value={profile.id}>
                    {profile.name}
                </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Project Date (optional)
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Poster Aspect Ratio
          </label>
          <select
            id="aspectRatio"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          >
            {aspectRatios.map(ar => (
                <option key={ar.value} value={ar.value}>
                    {ar.label}
                </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setError(null); }}
            rows={4}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Tags (optional, comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => { setTags(e.target.value); setError(null); }}
            placeholder="e.g., Animation, Reel, Poster"
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="videoUrls" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            External Video URLs (optional, one per line)
          </label>
          <textarea
            id="videoUrls"
            value={videoUrlText}
            onChange={(e) => { setVideoUrlText(e.target.value); setError(null); }}
            rows={3}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
            placeholder="https://example.com/video1.mp4&#10;https://example.com/video2.mp4"
          />
        </div>
        <div>
            <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Project URL (optional)
            </label>
            <input
                type="url"
                id="projectUrl"
                value={projectUrl}
                onChange={(e) => { setProjectUrl(e.target.value); setError(null); }}
                className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:ring-accent focus:border-accent"
                placeholder="https://example.com/project-showcase"
            />
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Project Images
          </label>
          {previews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4">
              {previews.map((preview, index) => (
                <div key={`${preview}-${index}`} className="relative group aspect-square bg-light-bg dark:bg-dark-bg rounded-lg">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${isImageDragging ? 'border-accent bg-accent/10' : 'border-light-border dark:border-dark-border'}`}
            onDragEnter={handleImageDragIn}
            onDragLeave={handleImageDragOut}
            onDragOver={handleImageDrag}
            onDrop={handleImageDrop}
          >
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-light-card dark:bg-dark-card rounded-md font-medium text-accent hover:text-red-700 focus-within:outline-none"
                >
                  <span>Add image(s)</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/gif, image/webp" multiple required={previews.length === 0} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                PNG, JPG, GIF, WEBP up to 10MB
              </p>
            </div>
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Project Videos
          </label>
          {videoPreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {videoPreviews.map((preview, index) => (
                <div key={`${preview}-${index}`} className="relative group aspect-video bg-light-bg dark:bg-dark-bg rounded-lg">
                  <video src={preview} controls className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    aria-label={`Remove video ${index + 1}`}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${isVideoDragging ? 'border-accent bg-accent/10' : 'border-light-border dark:border-dark-border'}`}
            onDragEnter={handleVideoDragIn}
            onDragLeave={handleVideoDragOut}
            onDragOver={handleVideoDrag}
            onDrop={handleVideoDrop}
          >
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                <label
                  htmlFor="video-upload"
                  className="relative cursor-pointer bg-light-card dark:bg-dark-card rounded-md font-medium text-accent hover:text-red-700 focus-within:outline-none"
                >
                  <span>Add video(s)</span>
                  <input id="video-upload" name="video-upload" type="file" className="sr-only" onChange={handleVideoChange} accept="video/mp4,video/webm,video/ogg" multiple />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                MP4, WEBM, OGG up to 50MB
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg text-red-700 dark:text-red-300 text-sm" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className="pt-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-full font-semibold text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-accent text-white font-bold rounded-full hover:opacity-90 transition-all transform hover:scale-105"
          >
            {existingWork ? 'Save Changes' : 'Add Work'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddWorkModal;
