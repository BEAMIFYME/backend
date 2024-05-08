import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStreamEntitiesToUsers implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Get all users
    const users = await queryRunner.query(`SELECT id FROM "user"`);

    // For each user, insert a new Stream entity if one doesn't already exist
    for (const user of users) {
      const existingStream = await queryRunner.query(
        `SELECT * FROM "stream" WHERE "userId" = $1`,
        [user.id],
      );

      if (!existingStream.length) {
        await queryRunner.query(
          `INSERT INTO "stream" ("userId", "streamTitle", "streamDescription", "streamUrl", "streamThumbnail", "streamLanguage", "streamKey", "isLive") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            user.id,
            'This is a dummy title',
            'This is a dummy description',
            null,
            'https://i.postimg.cc/D08fC2VJ/av-logo.png',
            'en',
            'stream-key',
            false,
          ],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove all Stream entities
    await queryRunner.query(`DELETE FROM "stream"`);
  }
}
