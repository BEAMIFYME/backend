import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { Claims } from './entities/claims.entity';
import { GamifyService } from '@gamification/gamify';
import { BeamifyService } from '@mediaengine/beamify';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Claims) public claimsRepository: Repository<Claims>,
    private gamifyService: GamifyService,
    private beamifyService: BeamifyService,
  ) {}

  async create(user: {
    password: string;
    email: string;
    username: string;
  }): Promise<User> {
    // Create user
    const newUser = await this.userRepository.save(user);

    // Create profile
    const profile = new Profile();
    profile.user = newUser;
    await this.profileRepository.save(profile);

    // Create claims
    const claims = new Claims();
    claims.user = newUser;
    await this.claimsRepository.save(claims);

    // Create stream
    const stream = await this.beamifyService.create(newUser);
    stream.user = newUser;
    await this.beamifyService.streamRepository.save(stream);

    // Create Gamify
    const gamify = await this.gamifyService.create(newUser);
    gamify.user = newUser;
    await this.gamifyService.gamifyRepository.save(gamify);

    return newUser;
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.claims', 'claims')
      .leftJoinAndSelect('user.blog', 'blog')
      .leftJoinAndSelect('blog.articles', 'articles')
      .select([
        'user.username',
        'user.email',
        'user.id',
        'profile.bio',
        'profile.avatar',
        'profile.cover',
        'claims.isVerified',
        'claims.isFeatured',
        'claims.isStaff',
        'blog.id',
        'blog.blogName',
        'blog.blogDescription',
        'articles.id',
        'articles.title',
        'articles.content',
      ])
      .getMany();
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: ['username', 'email', 'id'], // Add other fields as needed
    });
  }

  async findByEmail(
    email: string,
    relations?: string[],
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email }, relations });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'claims'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.profileRepository.delete(user.profile.id);
    await this.claimsRepository.delete(user.claims.id);

    return this.userRepository.delete(id);
  }

  async getProfile(req) {
    return await this.userRepository.findOne({
      where: { email: req.user.email },
      relations: ['profile', 'claims', 'blog', 'blog.articles'],
    });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByVerificationToken(token: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { verifyToken: token },
      relations: ['claims'],
    });
  }

  async update(req, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: req.user.email }, // Use email instead of id
      relations: ['profile', 'claims'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Update the user's profile and claims if they are provided in updateUserDto
    if (updateUserDto.profile) {
      Object.assign(user.profile, updateUserDto.profile);
      await this.profileRepository.save(user.profile); // Save the Profile entity
    }
    if (updateUserDto.claims) {
      Object.assign(user.claims, updateUserDto.claims);
      await this.claimsRepository.save(user.claims); // Save the Claims entity
    }

    // Update the rest of the user fields
    const updatedUser = { ...user, ...updateUserDto };
    return this.userRepository.save(updatedUser);
  }

  async findOneUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
