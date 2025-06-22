[日本語版readme](./README.ja.md)

`giget` does not support selecting a local directory as a template. To work
around this, I created a server that compresses a template directory into a
tarball and returns it.

# Usage

1. Start the server: `node server.js {template-directory}`
2. Run `giget`:
   `npx giget@latest http://localhost:3000/template.tar.gz my-vite-app --install`

There are two types of tarballs:

- `http://localhost:3000/template.tar.gz`: a tarball generated dynamically at
  the time of request
- `http://localhost:3000/cached.tar.gz`: a tarball generated when the server
  starts

The `cached.tar.gz` version responds faster, but it does not reflect any changes
made to the template directory after the server was started.
