import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'apps/api/src/api/users/entities/user.entity';
import { UpdateGamifyDto } from 'apps/api/src/database/dto/createGamify.dto';
import { Gamify } from 'apps/api/src/database/entities/gamify.entity';
import { Repository } from 'typeorm';


@Injectable()
export class GamifyService {
  constructor(
    @InjectRepository(Gamify)
    public gamifyRepository: Repository<Gamify>,
  ) {}

  findAll() {
    return this.gamifyRepository.find();
  }

  findOne(id: string) {
    return this.gamifyRepository.findOne({
      where: { id },
    });
  }

  async create(user: User): Promise<Gamify> {
    const gamify = new Gamify();
    gamify.user = user;
    gamify.loyaltyPoints = 0;
    gamify.totalSpent = 0;
    gamify.totalEarned = 0;

    return await this.gamifyRepository.save(gamify);
  }

  update(id: string, updateGamifyDto: UpdateGamifyDto) {
    return this.gamifyRepository.update(id, updateGamifyDto);
  }

  remove(id: string) {
    return this.gamifyRepository.delete(id);
  }
}
