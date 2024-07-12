const inputs = ['abcabcd', 'ababaa', 'aa'];

(() => {
  const result = inputs.map((value) =>
    value.split('').reduce((sum, _, i, array) => {
      if (!i) {
        return value.length;
      }

      // I would make it more efficient
      // e.g. omit introducing new variable to save memory, but I need more time than 40min
      let j = 0;
      while (array[j] === array[j + i]) {
        j++;
      }
      return sum + j;
    }, 0),
  );

  console.log(result);
})();
