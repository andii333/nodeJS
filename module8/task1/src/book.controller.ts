import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(createBookDto);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: number,
    @Body() bookData: Partial<Book>,
  ): Promise<Book> {
    return this.bookService.updateBook(id, bookData);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number): Promise<void> {
    return this.bookService.deleteBook(id);
  }
}
