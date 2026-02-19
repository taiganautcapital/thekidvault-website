import { useState, useEffect, useCallback } from "react";

export interface Profile {
  name: string;
  stars: Record<string, boolean>;
}

const STORAGE_KEY = "kv_profiles_v2";
const ACTIVE_KEY = "kv_active_profile";

export function useProfiles() {
  const [profiles, setProfilesRaw] = useState<Profile[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const active = localStorage.getItem(ACTIVE_KEY);
      if (stored) setProfilesRaw(JSON.parse(stored));
      if (active !== null) setActiveIndex(parseInt(active, 10));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist whenever profiles change
  const setProfiles = useCallback((p: Profile[]) => {
    setProfilesRaw(p);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
  }, []);

  const selectProfile = useCallback((i: number) => {
    setActiveIndex(i);
    try { localStorage.setItem(ACTIVE_KEY, String(i)); } catch {}
  }, []);

  const addProfile = useCallback((name: string) => {
    const newProfiles = [...profiles, { name, stars: {} }];
    setProfiles(newProfiles);
    const idx = newProfiles.length - 1;
    selectProfile(idx);
    return idx;
  }, [profiles, setProfiles, selectProfile]);

  const deleteProfile = useCallback((i: number) => {
    const newProfiles = profiles.filter((_, j) => j !== i);
    setProfiles(newProfiles);
    const newActive = newProfiles.length === 0 ? -1 : Math.min(activeIndex, newProfiles.length - 1);
    selectProfile(newActive);
    return newProfiles.length;
  }, [profiles, activeIndex, setProfiles, selectProfile]);

  const markStar = useCallback((id: string) => {
    if (activeIndex < 0) return;
    const prof = profiles[activeIndex];
    if (prof.stars[id]) return; // already earned
    const newProfiles = [...profiles];
    newProfiles[activeIndex] = { ...prof, stars: { ...prof.stars, [id]: true } };
    setProfiles(newProfiles);
  }, [activeIndex, profiles, setProfiles]);

  const activeProfile = activeIndex >= 0 ? profiles[activeIndex] ?? null : null;

  return {
    profiles,
    activeIndex,
    activeProfile,
    hydrated,
    selectProfile,
    addProfile,
    deleteProfile,
    markStar,
  };
}
