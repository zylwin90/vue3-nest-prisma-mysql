-- CreateTable
CREATE TABLE `Todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `category` INTEGER NOT NULL DEFAULT 1,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `createTime` DATETIME(3) NOT NULL DEFAULT (now()),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
