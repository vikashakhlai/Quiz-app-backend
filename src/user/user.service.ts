import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto, UserEmailDto, UserFriendIdDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({
      include: { quizzes: true },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async getOne(dto: UserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getFriends(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    const listFriends = user.friends;

    const result = await Promise.all(
      listFriends.map(async (id) => {
        return await this.prisma.user.findMany({
          where: {
            friendId: id,
          },
        });
      }),
    );
    return result[0];
  }

  async addFriend(userId: number, dto: UserFriendIdDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const listFriends = user.friends;
    const newList = [...listFriends, dto.friendId];

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: newList,
      },
    });
  }

  async deleteFriend(userId: number, friendId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const friend = await this.prisma.user.findFirst({
      where: {
        id: friendId,
      },
    });
    // async deleteFriend(userId: number, dto: UserFriendIdDto) {
    //   const user = await this.prisma.user.findFirst({
    //     where: {
    //       id: userId,
    //     },
    //   });

    const newList = user.friends.filter((id) => id !== friend.friendId);

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: newList,
      },
    });
  }

  async update(dto: UserDto) {
    const user = await this.getOne(dto);
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        email: dto.email,
      },
    });
  }

  async updateProfile(id: number, dto: UserEmailDto) {
    const user = await this.byId(id);
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        email: dto.email,
      },
    });
  }

  async delete(dto: UserDto) {
    const user = await this.getOne(dto);
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.delete({
      where: {
        email: user.email,
      },
    });
  }

  async getFriendQuiz(userId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: +userId } });
    const listFriends = user.friends;
    const friends = await Promise.all(
      listFriends.map(async (id) => {
        return await this.prisma.user.findMany({
          where: {
            friendId: id,
          },
        });
      }),
    );

    return await Promise.all(
      friends[0].map(async (friend) => {
        return await this.prisma.quiz.findMany({
          where: {
            userId: friend.id,
          },
          include: { quiz_questions: true },
        });
      }),
    );
  }

  async byId(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    return { ...user, password: undefined };
  }

  async byEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    return { ...user, password: undefined };
  }
}
