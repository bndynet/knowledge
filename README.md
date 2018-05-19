# Knowledge

Records knowledge and sync it and Gists to Wiki and Blog.

## CI

1. Set up a CI project about Git.
1. Run `npm run build` to generate files for Wiki and Blog.
1. Copy **./_wiki/** to Wiki website and **./_posts/** to **_posts** folder in Jekyll (Blog website)

**Build Script Example**

```bash
npm run build
\cp -R ./_wiki/* <wiki.bndy.net_path>
\cp -R ./_posts/* <bndy.net_path>/_posts/
```