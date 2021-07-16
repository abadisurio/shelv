const books = require('./books');

const getAllBooksHandler = () => {
  if (books.length>0) {
    const data = books.map((item) => {
      return ({
        id: item.bookId,
        name: item.name,
        publisher: item.publisher,
      });
    });
    console.log(data);
    return {
      status: 'success',
      data: {
        books: data,
      },
    };
  }

  return {
    status: 'success',
    data: {
      books: [],
    },
  };
};

module.exports = getAllBooksHandler;
