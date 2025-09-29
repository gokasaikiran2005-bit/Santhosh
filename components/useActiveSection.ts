import { useState, useEffect, useRef } from 'react';

function useActiveSection(sectionIds: string[], options?: IntersectionObserverInit): string {
    const [activeSection, setActiveSection] = useState<string>('');
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const callback = (entries: IntersectionObserverEntry[]) => {
            const intersectingEntries = entries.filter(entry => entry.isIntersecting);
            if (intersectingEntries.length > 0) {
                const mostVisibleEntry = intersectingEntries.reduce((prev, current) => {
                    return prev.intersectionRatio > current.intersectionRatio ? prev : current;
                });
                
                setActiveSection(mostVisibleEntry.target.id);
            }
        };

        observerRef.current = new IntersectionObserver(callback, {
            // Create a granular threshold array [0, 0.01, 0.02, ..., 1]
            // This ensures the callback runs frequently as visibility changes
            threshold: Array.from({ length: 101 }, (_, i) => i / 100),
            ...options
        });

        const observer = observerRef.current;
        sectionIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [sectionIds, JSON.stringify(options)]); // Using JSON.stringify to stabilize the options dependency

    return activeSection;
}

export default useActiveSection;