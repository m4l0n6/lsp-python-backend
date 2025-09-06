## Environment Prepare

Install `node_modules`:

```bash
npm install
```

## Run pyls

Instal pylsp:

```sh
pip install "python-lsp-server[all]"
```
or
```sh
python -m pip install "python-lsp-server[all]"
```

Open terminal run:

```sh
python -m pylsp --tcp --host 127.0.0.1 --port 2087
```

Run server Node:
```sh
node server.js
```