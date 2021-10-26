import {MigrationInterface, QueryRunner} from "typeorm";

export class tests1635261367716 implements MigrationInterface {
    name = 'tests1635261367716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tokents\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`accessToken\` varchar(255) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e5f78ba8483ede0cb8ef22c5f6\` (\`accessToken\`), UNIQUE INDEX \`IDX_13150ac31d5769f3e7d5f572f3\` (\`refreshToken\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`email\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`telephone\` text NOT NULL, \`name\` text NOT NULL, \`type\` enum ('admin', 'user') NOT NULL, \`tokenId\` char(36) NULL, UNIQUE INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` (\`email\`), UNIQUE INDEX \`REL_42a35c76d3ac9eb9cb1cb10681\` (\`tokenId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`price\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`freeDeilivery\` tinyint NOT NULL, \`discount\` int NOT NULL, \`image\` varchar(255) NOT NULL, \`grade\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_42a35c76d3ac9eb9cb1cb106814\` FOREIGN KEY (\`tokenId\`) REFERENCES \`tokents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_42a35c76d3ac9eb9cb1cb106814\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`REL_42a35c76d3ac9eb9cb1cb10681\` ON \`accounts\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
        await queryRunner.query(`DROP INDEX \`IDX_13150ac31d5769f3e7d5f572f3\` ON \`tokents\``);
        await queryRunner.query(`DROP INDEX \`IDX_e5f78ba8483ede0cb8ef22c5f6\` ON \`tokents\``);
        await queryRunner.query(`DROP TABLE \`tokents\``);
    }

}
