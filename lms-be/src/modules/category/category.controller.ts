import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { Roles } from '@/common/decorators/role.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { AuthorGuard } from '@/common/guards/author.guard';
import { User, UserInfo } from '@/common/decorators/user.decorator';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
    /**Empty */
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Post()
  async create(@Body() body: CreateCategoryDto, @User() user: UserInfo) {
    return await this.categoryService.create(body, user);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.findOne(+id);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: UserInfo,
  ) {
    return await this.categoryService.update(id, updateCategoryDto, user);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.remove(+id);
  }
}
