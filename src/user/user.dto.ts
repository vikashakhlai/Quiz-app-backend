import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class UserWithPasswordDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class UserIdDto {
  id: number;
}

export class UserFriendIdDto {
  friendId: string;
}

export class UserDto extends OmitType(UserWithPasswordDto, ['password']) {}

export class UserEmailDto extends PickType(UserDto, ['email']) {}

export class UserWithIdDto extends UserDto {
  id: number;
}

export class UserWithFriendIdDto extends UserDto {
  @IsString()
  friendId: string;
}
