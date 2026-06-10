const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// In-memory data storage
let users = [];

// Parse JSON from request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Serve static files
function serveStatic(pathname, res) {
  const filePath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname);
  
  // Prevent directory traversal
  const realPath = path.resolve(filePath);
  const publicDir = path.resolve(path.join(__dirname, 'public'));
  if (!realPath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Forbidden' }));
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
      return;
    }

    let contentType = 'text/html';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.js')) contentType = 'application/javascript';
    if (filePath.endsWith('.json')) contentType = 'application/json';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// Create server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Routes - Process all /api/* routes first
  if (pathname.startsWith('/api/')) {
    // GET /api/users/:id
    if (pathname.match(/^\/api\/users\/\d+$/) && req.method === 'GET') {
      const id = parseInt(pathname.split('/')[3]);
      const user = users.find(u => u.id === id);
      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User not found' }));
      }
      return;
    }

    // PUT /api/users/:id
    if (pathname.match(/^\/api\/users\/\d+$/) && req.method === 'PUT') {
      try {
        const id = parseInt(pathname.split('/')[3]);
        const body = await parseBody(req);
        const { name, email, phone } = body;

        if (!name || !email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name and email are required' }));
          return;
        }

        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'User not found' }));
          return;
        }

        users[userIndex] = {
          ...users[userIndex],
          name,
          email,
          phone
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'User updated successfully', 
          user: users[userIndex]
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
      return;
    }

    // DELETE /api/users/:id
    if (pathname.match(/^\/api\/users\/\d+$/) && req.method === 'DELETE') {
      const id = parseInt(pathname.split('/')[3]);
      const userIndex = users.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User not found' }));
        return;
      }

      const deletedUser = users.splice(userIndex, 1)[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: true, 
        message: 'User deleted successfully', 
        user: deletedUser
      }));
      return;
    }

    // POST /api/register
    if (pathname === '/api/register' && req.method === 'POST') {
      try {
        const body = await parseBody(req);
        const { name, email, phone } = body;

        if (!name || !email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name and email are required' }));
          return;
        }

        const user = {
          id: Date.now(),
          name,
          email,
          phone,
          registeredAt: new Date().toLocaleString()
        };

        users.push(user);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'User registered successfully', 
          user 
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
      return;
    }

    // GET /api/users
    if (pathname === '/api/users' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
      return;
    }

    // Not found API endpoint
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
    return;
  }

  // Static file routes
  if (pathname === '/' || pathname === '/users' || pathname.startsWith('/public/')) {
    const staticPath = pathname === '/users' ? '/users.html' : pathname;
    serveStatic(staticPath, res);
    return;
  }

  // Default to serving static files
  serveStatic(pathname, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
