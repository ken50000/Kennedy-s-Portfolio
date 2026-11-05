File the images Kennedy dropped into `inbox/` into the right image slots.

1. List the files in `inbox/` (ignore README.md). Look at each image.
2. Run `npm run status` to see which image slots are still empty, with their hints.
3. Match each image to a slot by what it shows. If a match is unclear, show Kennedy the slot options and ask.
4. Before filing a Walmart (ReimburseMe) image, check that it's blurred or abstracted, with no internal data or
   names. If it isn't, tell her and don't file it.
5. If an image looks like it comes from someone else's deck or case study, ask her about it before filing it.
6. Move each file to `src/images/<folder>/<name>.<ext>`, keeping its extension, and remove it from `inbox/`.
7. Make sure each slot's `alt` text describes the actual image, and update it if needed.
8. Run `npm run build` to confirm, then report which slots got filled and which are still empty.
