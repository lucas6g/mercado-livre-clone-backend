import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableCarts1633547952835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'carts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'total',
            type: 'decimal',
            default: 0.0,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'userCart', // apilido para o relacionamento
            columnNames: ['user_id'], // coluna que recebe vai receber a chave estrangeira
            referencedTableName: 'users', // nome da tabela que é referenciada
            referencedColumnNames: ['id'], // coluna da outra tabela que é chave primaria
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('carts');
  }
}
