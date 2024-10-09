import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const mockBookRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('BookService', () => {
  let bookService: BookService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getRepositoryToken(Book), useValue: mockBookRepository },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const result: Book[] = [
        {
          id: 1,
          title: 'Test Book',
          author: 'Author',
          genre: 'Genre',
          yearPublished: 2023,
        },
      ];
      (bookRepository.find as jest.Mock).mockResolvedValue(result);

      expect(await bookService.getAllBooks()).toBe(result);
      expect(bookRepository.find).toHaveBeenCalled();
    });
  });

  describe('getBookById', () => {
    it('should return a book if found', async () => {
      const result: Book = {
        id: 1,
        title: 'Test Book',
        author: 'Author',
        genre: 'Genre',
        yearPublished: 2023,
      };
      (bookRepository.findOne as jest.Mock).mockResolvedValue(result);

      expect(await bookService.getBookById(1)).toBe(result);
      expect(bookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if not found', async () => {
      (bookRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(bookService.getBookById(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createBook', () => {
    it('should create and return a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Author',
        genre: 'Genre',
        yearPublished: 2023,
      };
      const result: Book = { id: 1, ...createBookDto };
      (bookRepository.create as jest.Mock).mockReturnValue(result);
      (bookRepository.save as jest.Mock).mockResolvedValue(result);

      expect(await bookService.createBook(createBookDto)).toBe(result);
      expect(bookRepository.create).toHaveBeenCalledWith(createBookDto);
      expect(bookRepository.save).toHaveBeenCalledWith(result);
    });
  });

  describe('updateBook', () => {
    it('should update and return a book', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
      const existingBook: Book = {
        id: 1,
        title: 'Test Book',
        author: 'Author',
        genre: 'Genre',
        yearPublished: 2023,
      };
      const updatedBook: Book = { ...existingBook, ...updateBookDto };

      (bookRepository.findOne as jest.Mock).mockResolvedValue(existingBook);
      (bookRepository.save as jest.Mock).mockResolvedValue(updatedBook);

      expect(await bookService.updateBook(1, updateBookDto)).toBe(updatedBook);
      expect(bookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(bookRepository.save).toHaveBeenCalledWith(updatedBook);
    });

    it('should throw NotFoundException if book not found', async () => {
      (bookRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        bookService.updateBook(999, { title: 'Updated Title' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const existingBook: Book = {
        id: 1,
        title: 'Test Book',
        author: 'Author',
        genre: 'Genre',
        yearPublished: 2023,
      };
      (bookRepository.findOne as jest.Mock).mockResolvedValue(existingBook);
      (bookRepository.remove as jest.Mock).mockResolvedValue(undefined);

      await bookService.deleteBook(1);
      expect(bookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(bookRepository.remove).toHaveBeenCalledWith(existingBook);
    });

    it('should throw NotFoundException if book not found', async () => {
      (bookRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(bookService.deleteBook(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
