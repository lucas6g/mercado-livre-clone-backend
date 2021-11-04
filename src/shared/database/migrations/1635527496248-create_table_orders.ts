import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { OrderStatus } from '../../../modules/orders/entities/enum/OrderStatus';

export class createTableOrders1635527496248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
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
            name: 'status',
            type: 'enum',
            enum: [OrderStatus.ORDER_RECEIVED, OrderStatus.ORDER_DELIVERED],
            enumName: 'OrderStatus',
            default: `'${OrderStatus.ORDER_RECEIVED}'`,
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
            name: 'userOrders', // apilido para o relacionamento
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
    await queryRunner.dropTable('orders');
  }
}
