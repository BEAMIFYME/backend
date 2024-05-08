import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGamifyEntitiesToUsers implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Get all users
    const users = await queryRunner.query(`SELECT id FROM "user"`);

    // For each user, insert a new Gamify entity if one doesn't already exist
    for (const user of users) {
      const existingGamify = await queryRunner.query(
        `SELECT * FROM "gamify" WHERE "userId" = $1`,
        [user.id],
      );

      if (!existingGamify.length) {
        await queryRunner.query(`INSERT INTO "gamify" ("userId") VALUES ($1)`, [
          user.id,
        ]);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove all Gamify entities
    await queryRunner.query(`DELETE FROM "gamify"`);
  }
}
