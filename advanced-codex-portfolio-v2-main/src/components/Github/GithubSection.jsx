import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Star, BookOpen, Code2 } from 'lucide-react';
import { Github } from '../ui/Icons';
import { GlowBadge, MaskSlide } from '../ui/RevealText';
import MagneticButton from '../ui/MagneticButton';
import { SOCIAL_LINKS } from '../../data/social';
import BlackMetalCard from '../ui/BlackMetalCard';

export default function GithubSection() {
  const [githubUser, setGithubUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGithub() {
      try {
        const userRes = await fetch('https://api.github.com/users/Rawmilk3017');
        if (userRes.ok) {
          const userData = await userRes.json();
          setGithubUser(userData);
        }
        const reposRes = await fetch('https://api.github.com/users/Rawmilk3017/repos?sort=updated&per_page=4');
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(reposData);
        }
      } catch (err) {
        console.log('GitHub API offline or rate-limited; using structured fallback.');
      } finally {
        setLoading(false);
      }
    }
    fetchGithub();
  }, []);

  return (
    <section id="github" className="relative py-28 px-4 sm:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <GlowBadge color="violet" className="mb-4">
            OPEN SOURCE REPOSITORY
          </GlowBadge>
          <MaskSlide>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight">
              GITHUB ENVIRONMENT
            </h2>
          </MaskSlide>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed font-light">
            Public repositories, open-source bot frameworks, and developer toolkits maintained on GitHub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Profile Overview Card (Left 4 cols) */}
          <div className="lg:col-span-4">
            <BlackMetalCard className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl border-2 border-accent-violet/50 overflow-hidden bg-surface-deep p-1">
                  <img
                    src={githubUser?.avatar_url || "https://github.com/Rawmilk3017.png"}
                    alt="Rawmilk3017 GitHub Avatar"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {githubUser?.name || "Rawmilk3017"}
                  </h3>
                  <p className="text-xs font-mono text-accent-soft">
                    @{githubUser?.login || "Rawmilk3017"}
                  </p>
                  <span className="text-[10px] font-mono text-text-subtle block mt-1">
                    Open Source Developer
                  </span>
                </div>
              </div>

              {githubUser?.bio && (
                <p className="text-xs text-text-muted leading-relaxed mb-6 font-light">
                  {githubUser.bio}
                </p>
              )}

              {/* Public Metrics (Only from official GitHub API) */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-surface-deep/80 border border-purple-deep/50 text-center">
                  <span className="text-xl font-mono font-bold text-white block">
                    {githubUser ? githubUser.public_repos : "Public"}
                  </span>
                  <span className="text-[10px] font-mono text-text-subtle uppercase">
                    Repositories
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-surface-deep/80 border border-purple-deep/50 text-center">
                  <span className="text-xl font-mono font-bold text-accent-magenta block">
                    {githubUser ? githubUser.followers : "Active"}
                  </span>
                  <span className="text-[10px] font-mono text-text-subtle uppercase">
                    Followers
                  </span>
                </div>
              </div>

              <MagneticButton
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                dataCursor="link"
                className="w-full py-3 rounded-xl bg-surface-subtle hover:bg-accent-violet/20 border border-purple-deep hover:border-accent-violet text-xs font-mono tracking-widest font-bold text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4 text-accent-violet" />
                <span>VIEW GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </MagneticButton>
            </BlackMetalCard>
          </div>

          {/* Repositories Showcase (Right 8 cols) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(repos.length > 0 ? repos : [
                {
                  id: 1,
                  name: "Sonic-Wave-Bot",
                  description: "High-performance Discord music bot with audio stream pipeline.",
                  language: "JavaScript",
                  html_url: SOCIAL_LINKS.github,
                  stargazers_count: 0,
                  forks_count: 0
                },
                {
                  id: 2,
                  name: "kreo-hub-platform",
                  description: "Developer workspace and Discord bot management interface.",
                  language: "JavaScript",
                  html_url: SOCIAL_LINKS.github,
                  stargazers_count: 0,
                  forks_count: 0
                },
                {
                  id: 3,
                  name: "discord-bot-controls",
                  description: "Real-time telemetry and command dashboard for Discord bots.",
                  language: "JavaScript",
                  html_url: SOCIAL_LINKS.github,
                  stargazers_count: 0,
                  forks_count: 0
                },
                {
                  id: 4,
                  name: "open-source-utils",
                  description: "Curated utilities and helper modules for Discord bot engineering.",
                  language: "JavaScript",
                  html_url: SOCIAL_LINKS.github,
                  stargazers_count: 0,
                  forks_count: 0
                }
              ]).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group p-5 rounded-2xl border border-purple-deep/60 bg-[#0E0914]/80 backdrop-blur-xl hover:border-accent-violet/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <BookOpen className="w-4 h-4 text-accent-violet" />
                      <ExternalLink className="w-3.5 h-3.5 text-text-subtle group-hover:text-accent-soft transition-colors" />
                    </div>
                    <h4 className="text-base font-mono font-bold text-white group-hover:text-accent-soft transition-colors mb-2 truncate">
                      {repo.name}
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-light mb-4 line-clamp-2">
                      {repo.description || "Public repository authored by Rawmilk3017."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-purple-deep/40 text-[11px] font-mono text-text-subtle">
                    <span className="flex items-center gap-1.5 text-accent-magenta">
                      <Code2 className="w-3 h-3" />
                      {repo.language || "Code"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {repo.stargazers_count ?? 0}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
