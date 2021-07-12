import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { Req, Res, UseGuards } from '@nestjs/common';
import { GqlAuthGuardUser } from '../auth-strategy/guards/auth-gql.guard';
import { UserRepository } from '../repository/user.repository';
import { User } from 'src/entities/user/user.entity';
import { CreateUserResponse } from '../dtos/responses/user-creation.response';
import { CreateUserDTO } from '../dtos/inputs/create-user.dto';
import { LoginResponseUser } from '../dtos/login-user/loginResponse.output';
import { UserCredentialsDto } from '../dtos/login-user/user-credentials.dto';
import { MyContext } from '../interfaces-user/MyContext';
import { UpdateUserResponse } from '../dtos/responses/user-update.response';
import { UpdateUserDTO } from '../dtos/inputs/update-user.dto';
import { CurrentUser } from './../auth-strategy/auth-decorators/current.user.decorator';

@Resolver()
// @UseGuards(new GqlAuthGuard(), new RolesGuard(new Reflector()))
export class UserResolver {
  constructor(
    private userService: UserService,
    private userRepository: UserRepository,
  ) {}

  /* Get user Infos Query ==> Profile*/
  // @Roles(UserRole.USER)
  @UseGuards(new GqlAuthGuardUser())
  @Query(() => User)
  async UserProfile(
    @CurrentUser()
    user: User,
  ) {
    return user;
  }

  /* Get all User Query*/
  // @Roles(UserRole.USER)
  @UseGuards(new GqlAuthGuardUser())
  @Query(() => [User])
  async UsersList(): Promise<User[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }

  /* User Register */
  @Mutation(() => CreateUserResponse)
  async UserRegister(
    @Args('data') createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponse> {
    return await this.userService.createUser(createUserDTO);
  }

  /* Login User Mutation */
  @Mutation(() => LoginResponseUser)
  async UserLogin(
    @Args('data') userCredentialDto: UserCredentialsDto,
    @Context() { res }: MyContext,
  ): Promise<{ accessToken: string }> {
    return await this.userService.logInUser(userCredentialDto, res);
  }

  /* Update user Mutation */
  @UseGuards(new GqlAuthGuardUser())
  @Mutation(() => UpdateUserResponse)
  async UserUpdateInfo(
    @CurrentUser() user: User,
    @Args('data') updateUserDTO: UpdateUserDTO,
  ): Promise<UpdateUserResponse> {
    const id = user.id;

    await this.userService.updateUserInfo(id, updateUserDTO);
    return {
      user: user,
      message: `User Information up-to-date.`,
      type: 'success',
    };
  }
}
