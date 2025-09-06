# lsp-python-backend

A Node.js WebSocket proxy for PyLSP (Python Language Server Protocol).

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/m4l0n6/lsp-python-backend.git
   cd lsp-python-backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start PyLSP server:**
   - Install PyLSP if not already:
     ```sh
     pip install 'python-lsp-server[all]'
     ```
   - Run PyLSP on TCP port 2087:
     ```sh
     pylsp --tcp --host 127.0.0.1 --port 2087
     ```

4. **Start Node.js WebSocket server:**
   ```sh
   node server.js
   ```
