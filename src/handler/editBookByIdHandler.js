const books = require('./books');

const editBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const updatedAt = new Date().toISOString();

  console.log('bookId: ', bookId);
  const index = books.findIndex((book) => book.bookId === bookId);

  console.log('index: ', index);
  const checkError = [
    {
      condition: name === undefined,
      code: 400,
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    },
    {
      condition: readPage > pageCount,
      code: 400,
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    },
    {
      condition: index < 0,
      code: 404,
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    },
  ];

  const errors = checkError.filter((item) => item.condition);
  if (errors.length > 0) {
    error = errors[0];
    // console.log('condition: ', error.condition);
    const response = h.response({
      status: error.status,
      message: error.message,
    });
    response.code(error.code);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      updatedAt,
      summary, publisher, pageCount, readPage, reading,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Mohon isi nama buku',
  });
  response.code(404);
  return response;
};

module.exports = editBookByIdHandler;
