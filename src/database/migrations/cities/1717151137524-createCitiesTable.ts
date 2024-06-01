import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tablename = 'cities';

export class CreateCitiesTable1717151137524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tablename,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isNullable: false,
            isGenerated: true,
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'is_default',
            type: 'boolean',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tablename);
  }
}
