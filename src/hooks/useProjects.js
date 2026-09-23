import { useCallback, useEffect, useState } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

export const PROJECTS_STORAGE_KEY = 'rawmilk3017_projects_v1';

async function fetchProjects() {
  const response = await fetch('/api/projects', { cache: 'no-store' });
  if (!response.ok) throw new Error('Project API unavailable');
  const parsed = await response.json();
  if (!Array.isArray(parsed)) throw new Error('Invalid project data');
  return parsed;
}

export function useProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    let active = true;
    fetchProjects()
      .then((remote) => {
        if (active) setProjects(remote);
      })
      .catch(() => {
        try {
          const local = localStorage.getItem(PROJECTS_STORAGE_KEY);
          if (active && local) setProjects(JSON.parse(local));
        } catch {
          // Keep bundled defaults.
        }
      });
    return () => { active = false; };
  }, []);

  const saveProjects = useCallback(async (nextProjects, password) => {
    const response = await fetch('/api/projects', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify(nextProjects),
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || 'Could not save projects.');

    setProjects(body.projects || nextProjects);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(body.projects || nextProjects));
    return body.projects || nextProjects;
  }, []);

  return { projects, saveProjects };
}
