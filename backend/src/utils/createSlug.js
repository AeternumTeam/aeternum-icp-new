const createSlug = (title) => {
    return title
      .toLowerCase()                 // Convert to lowercase
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')       // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')         // Replace multiple hyphens with a single one
      .replace(/^-+/, '')             // Remove leading hyphens
      .replace(/-+$/, '');            // Remove trailing hyphens
}

export default createSlug;
  