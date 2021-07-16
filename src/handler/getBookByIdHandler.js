const books = require('./books');

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const book = books.filter((n) => n.bookId === bookId)[0];
  // console.log('book: ', bookId);
  // console.log('book: ', book);
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book: {
          id: book.bookId,
          ...book,
        },
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = getBookByIdHandler;
