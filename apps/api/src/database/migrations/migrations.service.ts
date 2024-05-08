import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, QueryRunner } from 'typeorm';
import { AddGamifyEntitiesToUsers } from './AddGamifyEntitiesToUsers';
import { AddStreamEntitiesToUsers } from './AddStreamEntitiesToUsers';

@Injectable()
export class MigrationsService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit(): Promise<void> {
    await this.runMigrations();
  }

  async runMigrations(): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    const gamifyMigration = new AddGamifyEntitiesToUsers();
    await gamifyMigration.up(queryRunner);

    const streamMigration = new AddStreamEntitiesToUsers();
    await streamMigration.up(queryRunner);
  }

  async undoLastMigration(): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    const streamMigration = new AddStreamEntitiesToUsers();
    await streamMigration.down(queryRunner);

    const gamifyMigration = new AddGamifyEntitiesToUsers();
    await gamifyMigration.down(queryRunner);
  }
}
