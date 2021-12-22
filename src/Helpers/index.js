const sortArray = (array, key) => {
  return array.sort((a, b) => {
    const textA = a[key].toUpperCase();
    const textB = b[key].toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })
};

module.exports = {
  sortArray
};