-- AlterTable
ALTER TABLE `user` MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT (now());
