function getVisibleItems(items, type, sortField) {
  let result = [...items];

  result.sort((a,b) => {
    switch(sortField.name) {
      case 'name':
        return sortField.value === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      case 'size':
        if (a.size && b.size) {
          return sortField.value === 'asc'
            ? a.size - b.size
            : b.size - a.size;
        } else if (a.size) {
          return -1;
        } else if (b.size) {
          return 1;
        } else {
          return 0;
        }
      case 'type':
        if (a['.tag'] === 'folder' && b['.tag'] === 'file') {
          return sortField.value === 'foldersFirst' ? -1 : 1;
        } else if (a['.tag'] === 'file' && b['.tag'] === 'folder') {
          return sortField.value === 'foldersFirst' ? 1 : -1;
        } else {
          return 0;
        }
      default:
        return 0;
    }
  });

  if(type === 'folder' || type === 'file') {
    result = result.filter(item => item['.tag'] === type);
  }

  return result;
}

export default getVisibleItems;