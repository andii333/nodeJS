import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.entity';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            getAllBooks: jest.fn(),
            getBookById: jest.fn(),
            createBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
          },
        },
      ],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should return an array of books', async () => {
    const books: Book[] = [
      {
        id: 1,
        title: 'Book Title 1',
        yearPublished: 2021,
        author: 'Author 1',
        genre: 'Fiction',
      },
      {
        id: 2,
        title: 'Book Title 2',
        yearPublished: 2020,
        author: 'Author 2',
        genre: 'Non-fiction',
      },
    ];

    jest.spyOn(bookService, 'getAllBooks').mockResolvedValue(books);

    const result = await bookController.getAllBooks();
    expect(result).toEqual(books);
  });

  it('should return a single book by id', async () => {
    const book: Book = {
      id: 1,
      title: 'Book Title 1',
      yearPublished: 2021,
      author: 'Author 1',
      genre: 'Fiction',
    };

    jest.spyOn(bookService, 'getBookById').mockResolvedValue(book);

    const result = await bookController.getBookById(1);
    expect(result).toEqual(book);
  });

  it('should create a new book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'New Book',
      yearPublished: 2023,
      author: 'New Author',
      genre: 'Fiction',
    };

    const createdBook: Book = {
      id: 3,
      title: 'New Book',
      yearPublished: 2023,
      author: 'New Author',
      genre: 'Fiction',
    };

    jest.spyOn(bookService, 'createBook').mockResolvedValue(createdBook);

    const result = await bookController.createBook(createBookDto);
    expect(result).toEqual(createdBook);
  });

  it('should update an existing book', async () => {
    const updateBookDto: UpdateBookDto = {
      title: 'Updated Book Title',
      yearPublished: 2022,
      author: 'Updated Author',
      genre: 'Non-fiction',
    };

    const updatedBook: Book = {
      id: 1,
      title: 'Updated Book Title',
      yearPublished: 2022,
      author: 'Updated Author',
      genre: 'Non-fiction',
    };

    jest.spyOn(bookService, 'updateBook').mockResolvedValue(updatedBook);

    const result = await bookController.updateBook(1, updateBookDto);
    expect(result).toEqual(updatedBook);
  });

  it('should delete a book', async () => {
    const bookId = 1;
    jest.spyOn(bookService, 'deleteBook').mockResolvedValue(undefined);

    await expect(bookController.deleteBook(bookId)).resolves.toBeUndefined();
  });
});
