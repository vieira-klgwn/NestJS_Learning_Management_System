import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from 'src/generated/prisma/client';


@Controller('book')
export class BookController {

    constructor(private readonly bookService: BookService) {}

    @Get(':id')
    async getBookById(id: string) {
        return this.bookService.book({ id: Number(id) });
    }

    @Get()
    async getBooks() {
        return this.bookService.books({});
    }

    @Post()
    async createBook(@Body() bookData: { title: string; authorEmail: string; publishedDate: Date }): Promise<Book> {
        const { title, authorEmail, publishedDate } = bookData;
        return this.bookService.createBook({
            title,
            author:{
                connect: { username: authorEmail }
            
            },
            publishedDate
        });
    }

    @Put(':id')
    async updateBook(id: string, @Body() bookData: { title: string; authorId:number; publishedDate: Date }) {
        return this.bookService.updateBook({
            where: { id: Number(id) },
            data: bookData,
        });
    }

    @Delete(':id')
    async deleteBook(id: string) {
        return this.bookService.deleteBook({ id: Number(id) });
    }
}
