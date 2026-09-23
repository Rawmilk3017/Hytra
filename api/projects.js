const GITHUB_API = 'https://api.github.com';

function getConfig() {
  const [owner, repo] = (process.env.GITHUB_REPO || 'Rawmilk3017/advance-codex-portfolio-v2').split('/');
  return {
    owner,
    repo,
    path: process.env.GITHUB_PROJECTS_PATH || 'public/projects.json',
    token: process.env.GITHUB_TOKEN,
    password: process.env.ADMIN_PASSWORD,
    branch: process.env.GITHUB_BRANCH || 'main',
  };
}

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function authorized(req, config) {
  return Boolean(config.password && req.headers['x-admin-password'] === config.password);
}

async function github(url, config, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });
}

export default async function handler(req, res) {
  const config = getConfig();

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!config.token) return send(res, 500, { error: 'GITHUB_TOKEN is not configured in Vercel.' });

  if (req.method === 'POST') {
    if (!config.password) return send(res, 500, { error: 'ADMIN_PASSWORD is not configured in Vercel.' });
    return authorized(req, config) ? send(res, 200, { ok: true }) : send(res, 401, { error: 'Invalid admin password.' });
  }

  const fileUrl = `${GITHUB_API}/repos/${config.owner}/${config.repo}/contents/${config.path}`;

  if (req.method === 'GET') {
    const response = await github(fileUrl, config);
    if (!response.ok) return send(res, response.status, { error: 'Could not read projects from GitHub.' });
    const file = await response.json();
    try {
      const content = Buffer.from(file.content.replace(/\n/g, ''), 'base64').toString('utf8');
      return send(res, 200, JSON.parse(content));
    } catch {
      return send(res, 500, { error: 'The projects file contains invalid JSON.' });
    }
  }

  if (req.method === 'PUT') {
    if (!authorized(req, config)) return send(res, 401, { error: 'Invalid admin password.' });
    if (!Array.isArray(req.body)) return send(res, 400, { error: 'Projects must be an array.' });

    const currentResponse = await github(fileUrl, config);
    if (!currentResponse.ok) return send(res, currentResponse.status, { error: 'Could not find public/projects.json on GitHub.' });
    const currentFile = await currentResponse.json();

    const encoded = Buffer.from(`${JSON.stringify(req.body, null, 2)}\n`, 'utf8').toString('base64');
    const updateResponse = await github(fileUrl, config, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Update portfolio projects from admin panel',
        content: encoded,
        sha: currentFile.sha,
        branch: config.branch,
      }),
    });

    if (!updateResponse.ok) return send(res, updateResponse.status, { error: 'GitHub rejected the project update.' });
    return send(res, 200, { ok: true, projects: req.body });
  }

  res.setHeader('Allow', 'GET, POST, PUT, OPTIONS');
  return send(res, 405, { error: 'Method not allowed.' });
}
