import { Injectable } from '@nestjs/common';
import { UsersService } from '../../api/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../../providers/email/email.service';
import { Stream } from '../../database/entities/stream.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email, ['claims']);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(login: LoginDto) {
    const user = await this.validateUser(login.email, login.password);
    if (!user) {
      return { message: 'Invalid email or password' };
    }

    if (!user.claims.isVerified) {
      return { message: 'Please verify your email before logging in' };
    }

    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
    });

    await this.emailService.sendVerificationEmail(user); // Send the verification email

    const { password, ...result } = user;
    return result;
  }

  async verifyEmail(token: string) {
    // Find the user associated with the verification token
    const user = await this.usersService.findByVerificationToken(token);

    if (!user || user.verifyToken !== token) {
      throw new Error('Invalid verification token');
    }

    // Set the user's isVerified property to true, remove the verification token and save the user
    user.claims.isVerified = true;
    user.verifyToken = null;
    await this.usersService.claimsRepository.save(user.claims); // Save the Claims entity
    await this.usersService.save(user);

    return user;
  }

  async resendEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { message: 'User not found' };
    }
    if (!user.verifyToken) {
      return { message: 'User is already verified' };
    }
    await this.emailService.sendVerificationEmail(user);
    return { message: 'Verification email sent successfully' };
  }
}
