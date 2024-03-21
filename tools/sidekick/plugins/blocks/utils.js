export function addUrlToData(context, data) {
  context.baseLibraryOrigin = window.location.origin;

  // Add url property
  if (data) {
    data.forEach((block) => {
      if (block.path) {
        if (block.path.includes('://')) {
          block.path = new URL(block.path).pathname;
        }
        block.url = `${context.baseLibraryOrigin}${block.path}`;
        block.path = `${block.path}`;
      }
    });
  }
}

export default {
  addUrlToData,
};
