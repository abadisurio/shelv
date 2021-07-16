const books = require('./books');

const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;

  const cart = [];

  // console.log('request.params ', request.query.name);
  // console.log('name, reading, finished ', name, reading, finished);

  if (name!==undefined) {
    const filteredName = books.filter((item)=>
      item.name.toLowerCase().includes(name.toLowerCase()));
    // console.log('filteredName ', filteredName);
    cart.push(...filteredName);
  }
  if (reading!==undefined) {
    const filteredReading = reading == 1
      ? books.filter((item)=>item.reading)
      : reading == 0
        ? books.filter((item)=>!item.reading)
        : books;
    cart.push(...filteredReading);
  }
  if (finished!==undefined) {
    console.log('finished', finished);
    const filteredFinished = finished == 1
    ? books.filter((item)=> item.pageCount === item.readPage)
    : finished == 0
      ? books.filter((item)=> item.pageCount > item.readPage)
      : books;
    console.log('filteredFinished', filteredFinished);
    cart.push(...filteredFinished);
  }

  if (books.length>0) {
    const data = [];
    if (name === undefined && reading == undefined && finished === undefined) {
      data.push(...books.map((item) => {
        return ({
          id: item.bookId,
          name: item.name,
          publisher: item.publisher,
        });
      }));
    } else {
      data.push(...cart.map((item) => {
        return ({
          id: item.bookId,
          name: item.name,
          publisher: item.publisher,
        });
      }));
    }
    // console.log(data);
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
