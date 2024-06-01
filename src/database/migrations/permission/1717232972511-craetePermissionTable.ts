import { MigrationInterface, QueryRunner, Table } from 'typeorm';
const tableName = 'permissions';

export class CraetePermissionTable1717232972511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
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
            length: '20',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
