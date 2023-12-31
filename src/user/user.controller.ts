import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { User } from './decorators/user.decorator';
import { UserDto, UserEmailDto, UserFriendIdDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getAll();
  }

  @Get('profile')
  @Auth()
  async getProfile(@User('id') id: number) {
    return this.userService.byId(id);
  }

  @Put('profile')
  @Auth()
  async updateProfile(@User('id') id: number, @Body() dto: UserEmailDto) {
    return this.userService.updateProfile(id, dto);
  }

  @Get()
  @Auth()
  @UsePipes(new ValidationPipe())
  async getOne(@Body() dto: UserDto) {
    return this.userService.getOne(dto);
  }

  @Get('friend')
  @Auth()
  @UsePipes(new ValidationPipe())
  async getFriends(@User('id') id: number) {
    return this.userService.getFriends(id);
  }

  @Post('friend')
  @Auth()
  @UsePipes(new ValidationPipe())
  async addFriend(@User('id') id: number, @Body() dto: UserFriendIdDto) {
    return this.userService.addFriend(id, dto);
  }

  @Put()
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(@Body() dto: UserDto) {
    return this.userService.update(dto);
  }

  @Delete()
  @Auth()
  async delete(@Body() dto: UserDto) {
    return this.userService.delete(dto);
  }

  @Delete('friend')
  @Auth()
  async deleteFriend(@User('id') id: number, @Body() dto: UserFriendIdDto) {
    return this.userService.deleteFriend(id, dto);
  }

  @Get('friends/quiz')
  @Auth()
  async getFriendQuiz(@User('id') id: number) {
    return this.userService.getFriendQuiz(id);
  }
}
