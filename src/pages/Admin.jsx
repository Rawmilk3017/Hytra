import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Download,
  Edit3,
  Eye,
  EyeOff,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { ADMIN_SESSION_KEY } from '../adminConfig';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';
import { useProjects } from '../hooks/useProjects';

const emptyProject = {
  id: '',
  title: '',
  category: 'Web Development',
  subtitle: '',
  description: '',
  tech: [],
  accentColor: '#A855F7',
  secondaryColor: '#EC4899',
  visualType: 'dashboard',
  features: [],
  github: 'https://github.com/Rawmilk3017',
  website: '',
  discord: '',
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'x-admin-password': password },
      });
      if (!response.ok) throw new Error('Invalid password');
      sessionStorage.setItem(ADMIN_SESSION_KEY, password);
      onLogin(password);
    } catch {
      setError('Incorrect admin password.');
    }
  };

  return (
    <main className="min-h-screen bg-[#07040A] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-purple-deep/70 bg-[#0E0914]/90 backdrop-blur-xl p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-[11px] font-mono tracking-[0.3em] text-accent-magenta uppercase">RAW MILK // PRIVATE</p>
          <h1 className="mt-3 text-3xl font-black font-display">Project Manager</h1>
          <p className="mt-2 text-sm text-text-muted">Sign in to manage the projects displayed on your portfolio.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block text-xs font-mono uppercase tracking-widest text-text-muted">Admin password</label>
          <div className="relative">
            <input
              autoFocus
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-purple-deep bg-black/30 px-4 py-3 pr-12 text-white outline-none focus:border-accent-violet"
              placeholder="Enter password"
            />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-3 text-text-muted hover:text-white">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button className="w-full rounded-xl bg-accent-violet px-4 py-3 font-mono text-xs font-bold tracking-widest hover:bg-accent-violet/90">
            ENTER ADMIN
          </button>
        </form>

        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white">
          <ArrowLeft size={14} /> Back to portfolio
        </Link>
      </div>
    </main>
  );
}

function ProjectEditor({ project, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    ...emptyProject,
    ...project,
    techText: (project?.tech || []).join(', '),
    featuresText: (project?.features || []).join('\n'),
  }));

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) return;

    const clean = {
      id: form.id || slugify(title) || `project-${Date.now()}`,
      title,
      category: form.category.trim() || 'Project',
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      tech: form.techText.split(',').map((item) => item.trim()).filter(Boolean),
      accentColor: form.accentColor || '#A855F7',
      secondaryColor: form.secondaryColor || '#EC4899',
      visualType: form.visualType || 'dashboard',
      features: form.featuresText.split('\n').map((item) => item.trim()).filter(Boolean),
      github: form.github.trim(),
      website: form.website.trim(),
      discord: form.discord.trim(),
    };
    onSave(clean);
  };

  const field = (label, key, placeholder = '') => (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-text-muted">{label}</span>
      <input
        value={form[key] || ''}
        onChange={(e) => update(key, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-purple-deep bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-accent-violet"
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-[10000] overflow-y-auto bg-black/80 p-4 backdrop-blur-xl sm:p-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-purple-deep bg-[#0E0914] p-6 shadow-2xl sm:p-8">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-accent-magenta">PROJECT EDITOR</p>
            <h2 className="mt-2 text-2xl font-black">{project ? 'Edit project' : 'Add project'}</h2>
          </div>
          <button onClick={onCancel} className="rounded-full border border-purple-deep p-2 text-text-muted hover:text-white"><X size={18} /></button>
        </div>

        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          {field('Project name *', 'title', 'My new project')}
          {field('Category', 'category', 'Discord Bot Development')}
          {field('Subtitle', 'subtitle', 'A short one-line description')}
          {field('GitHub URL', 'github', 'https://github.com/Rawmilk3017')}
          {field('Website URL', 'website', 'https://example.com')}
          {field('Discord URL', 'discord', 'https://discord.gg/...')}

          <label className="block">
            <span className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-text-muted">3D visual</span>
            <select value={form.visualType} onChange={(e) => update('visualType', e.target.value)} className="w-full rounded-xl border border-purple-deep bg-black/30 px-3 py-2.5 text-sm text-white outline-none">
              <option value="dashboard">Dashboard</option>
              <option value="network">Network</option>
              <option value="matrix">Matrix</option>
              <option value="bot">Bot</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-text-muted">Technologies</span>
            <input value={form.techText} onChange={(e) => update('techText', e.target.value)} placeholder="Python, React, Discord.py" className="w-full rounded-xl border border-purple-deep bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-accent-violet" />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-text-muted">Description</span>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} placeholder="Explain what you built..." className="w-full resize-y rounded-xl border border-purple-deep bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-accent-violet" />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-text-muted">Features (one per line)</span>
            <textarea value={form.featuresText} onChange={(e) => update('featuresText', e.target.value)} rows={5} placeholder={'Moderation\nTicket system\nDashboard'} className="w-full resize-y rounded-xl border border-purple-deep bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-accent-violet" />
          </label>

          <div className="sm:col-span-2 flex flex-wrap justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="rounded-xl border border-purple-deep px-5 py-3 text-xs font-mono font-bold tracking-widest text-text-muted hover:text-white">CANCEL</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-accent-violet px-5 py-3 text-xs font-mono font-bold tracking-widest text-white hover:bg-accent-violet/90"><Save size={15} /> SAVE PROJECT</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [adminPassword, setAdminPassword] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) || '');
  const [loggedIn, setLoggedIn] = useState(() => Boolean(sessionStorage.getItem(ADMIN_SESSION_KEY)));
  const { projects, saveProjects } = useProjects();
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState('');

  const sortedProjects = useMemo(() => projects, [projects]);

  if (!loggedIn) return <AdminLogin onLogin={(password) => { setAdminPassword(password); setLoggedIn(true); }} />;

  const saveProject = (project) => {
    const exists = projects.some((item) => item.id === project.id);
    const next = exists ? projects.map((item) => item.id === project.id ? project : item) : [...projects, project];
    saveProjects(next, adminPassword)
      .then(() => {
        setEditing(null);
        setNotice(exists ? 'Project updated.' : 'Project added.');
        window.setTimeout(() => setNotice(''), 2500);
      })
      .catch((error) => setNotice(error.message));
  };

  const removeProject = (project) => {
    if (!window.confirm(`Remove “${project.title}” from the portfolio?`)) return;
    saveProjects(projects.filter((item) => item.id !== project.id), adminPassword).catch((error) => setNotice(error.message));
  };

  const resetToDefaults = () => {
    if (!window.confirm('Reset the portfolio projects back to the original Rawmilk3017 defaults?')) return;
    saveProjects(DEFAULT_PROJECTS, adminPassword).catch((error) => setNotice(error.message));
  };

  const exportProjects = () => {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'rawmilk3017-projects.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importProjects = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed)) throw new Error('Invalid file');
        saveProjects(parsed, adminPassword)
          .then(() => setNotice('Projects imported.'))
          .catch((error) => setNotice(error.message));
      } catch {
        setNotice('That file is not a valid project export.');
      }
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-[#07040A] text-white px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-5 rounded-3xl border border-purple-deep/70 bg-[#0E0914]/90 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] text-accent-magenta">RAW MILK // ADMIN</p>
            <h1 className="mt-2 text-3xl font-black font-display sm:text-4xl">Project Manager</h1>
            <p className="mt-2 text-sm text-text-muted">Add, edit, or remove the projects shown on your public portfolio.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-purple-deep px-4 py-2.5 text-xs font-mono font-bold tracking-widest text-text-muted hover:text-white"><ArrowLeft size={15} /> PORTFOLIO</Link>
            <button onClick={() => { sessionStorage.removeItem(ADMIN_SESSION_KEY); setAdminPassword(''); setLoggedIn(false); }} className="inline-flex items-center gap-2 rounded-xl border border-purple-deep px-4 py-2.5 text-xs font-mono font-bold tracking-widest text-text-muted hover:text-white"><LogOut size={15} /> LOG OUT</button>
          </div>
        </header>

        {notice && <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"><Check size={16} /> {notice}</div>}

        <section className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button onClick={() => setEditing({ ...emptyProject })} className="flex min-h-28 flex-col items-start justify-between rounded-2xl border border-accent-violet/40 bg-accent-violet/10 p-5 text-left transition hover:border-accent-violet">
            <Plus size={22} className="text-accent-soft" />
            <span className="text-sm font-bold">Add project</span>
          </button>
          <button onClick={exportProjects} className="flex min-h-28 flex-col items-start justify-between rounded-2xl border border-purple-deep bg-[#0E0914] p-5 text-left transition hover:border-accent-violet">
            <Download size={22} className="text-accent-soft" />
            <span className="text-sm font-bold">Export projects</span>
          </button>
          <label className="flex min-h-28 cursor-pointer flex-col items-start justify-between rounded-2xl border border-purple-deep bg-[#0E0914] p-5 text-left transition hover:border-accent-violet">
            <Upload size={22} className="text-accent-soft" />
            <span className="text-sm font-bold">Import projects</span>
            <input type="file" accept="application/json,.json" onChange={importProjects} className="hidden" />
          </label>
          <button onClick={resetToDefaults} className="flex min-h-28 flex-col items-start justify-between rounded-2xl border border-purple-deep bg-[#0E0914] p-5 text-left transition hover:border-red-400/50">
            <RotateCcw size={22} className="text-text-muted" />
            <span className="text-sm font-bold">Reset defaults</span>
          </button>
        </section>

        <section className="rounded-3xl border border-purple-deep/70 bg-[#0E0914]/90 p-5 backdrop-blur-xl sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] text-text-subtle">PUBLIC PROJECTS</p>
              <h2 className="mt-1 text-xl font-bold">{sortedProjects.length} project{sortedProjects.length === 1 ? '' : 's'}</h2>
            </div>
            <span className="rounded-full border border-purple-deep px-3 py-1 text-[10px] font-mono text-text-muted">GITHUB SYNC</span>
          </div>

          <div className="space-y-3">
            {sortedProjects.map((project) => (
              <article key={project.id} className="flex flex-col gap-4 rounded-2xl border border-purple-deep/60 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold">{project.title}</h3>
                    <span className="rounded-full border border-purple-deep px-2 py-0.5 text-[9px] font-mono text-text-muted">{project.category}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-text-muted">{project.subtitle || project.description}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => setEditing(project)} className="inline-flex items-center gap-2 rounded-lg border border-purple-deep px-3 py-2 text-xs font-mono text-text-muted hover:border-accent-violet hover:text-white"><Edit3 size={14} /> EDIT</button>
                  <button onClick={() => removeProject(project)} className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-mono text-red-300 hover:border-red-400 hover:bg-red-500/10"><Trash2 size={14} /> DELETE</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-5 text-center text-[10px] font-mono text-text-subtle">
          Admin changes are saved to your GitHub projects file through the private Vercel API. Export is still available as a backup.
        </p>
      </div>

      {editing && <ProjectEditor project={editing.id ? editing : null} onSave={saveProject} onCancel={() => setEditing(null)} />}
    </main>
  );
}
