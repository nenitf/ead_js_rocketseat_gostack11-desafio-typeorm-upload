import {
  TableForeignKey,
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export default class CreateTransactionsAndCategories1587313769800
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionando a query para evitar o erro
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
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
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'uuid',
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
      }),
    );

    // define a provider_id como FK
    await queryRunner.createForeignKey(
      'transactions', // tabela que terá fk
      new TableForeignKey({
        name: 'TransactionCategory', // nome da fk
        columnNames: ['category_id'], // nome da coluna que será fk
        referencedColumnNames: ['id'], // pk da fk
        referencedTableName: 'categories', // origem da pk da fk
        onUpdate: 'CASCADE', // caso o id mude será, todos registros mudam
        // onDelete: 'RESTRICTED' // não permide que o id
        // onDelete: 'CASCADE' // deleta todos os registros do id
        onDelete: 'SET NULL', // deixa como null nos campos do id deletado
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // remove fk
    await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

    await queryRunner.dropTable('transactions');

    await queryRunner.dropTable('categories');
  }
}
