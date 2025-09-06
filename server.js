const WebSocket = require("ws");

const net = require("net");

const wss = new WebSocket.Server({ port: 3001 });
console.log("Server started on port 3001");

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Connect to PyLSP TCP server
  const client = net.createConnection({ port: 2087, host: "127.0.0.1" }, () => {
    console.log("Connected to PyLSP server");
  });

  let buffer = "";

  client.on("data", (data) => {
    buffer += data.toString();

    while (true) {
      // Check for complete message
      const headerEnd = buffer.indexOf("\r\n\r\n");
      if (headerEnd === -1) break;

      // Parse Content-Length
      const header = buffer.substring(0, headerEnd);
      const contentLengthMatch = header.match(/Content-Length: (\d+)/);
      if (!contentLengthMatch) {
        buffer = buffer.substring(headerEnd + 4);
        continue;
      }

      const contentLength = parseInt(contentLengthMatch[1]);
      const messageStart = headerEnd + 4;

      // Check if we have the full message
      if (buffer.length < messageStart + contentLength) break;

      // Extract and send message
      const message = buffer.substring(
        messageStart,
        messageStart + contentLength
      );
      ws.send(message);

      // Remove processed message from buffer
      buffer = buffer.substring(messageStart + contentLength);
    }
  });

  ws.on("message", (message) => {
    const msg = message.toString();
    const content = `Content-Length: ${Buffer.byteLength(msg)}\r\n\r\n${msg}`;
    client.write(content);
  });

  ws.on("close", () => {
    client.end();
  });

  client.on("end", () => {
    ws.close();
  });
});
