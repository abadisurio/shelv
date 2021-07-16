const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const {name, year, author, summary, publisher, pageCount,
    readPage, reading} = request.payload;
  const bookId = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const newNote = {
    name, year, author, summary, publisher, pageCount,
    readPage, finished, reading, bookId, insertedAt, updatedAt,
  };

  const checkError = [
    {
      condition: name === undefined,
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    },
    {
      condition: readPage > pageCount,
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    },
  ];

  const errors = checkError.filter((item) => item.condition);
  if (errors.length > 0) {
    error = errors[0];
    console.log('condition: ', error.condition);
    const response = h.response({
      status: error.status,
      message: error.message,
    });
    response.code(error.code);
    return response;
  }

  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.bookId === bookId).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        ...newNote,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = addNoteHandler;
