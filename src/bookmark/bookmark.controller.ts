import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/dacorator/get-user.dacorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get('/:id')
  getBookmarksById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) backmarkId: number,
  ) {
    return this.bookmarkService.getBookmarksById(userId, backmarkId);
  }

  @Post()
  CreateBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch('/:id')
  editBookmarkById(
    @Param('id', ParseIntPipe) backmarkId: number,
    @GetUser('id') userId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(userId, backmarkId, dto);
  }

  @Delete('/:id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) backmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, backmarkId);
  }
}
