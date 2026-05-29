-- Insert default role if not exists
INSERT INTO `Role` (`id`, `name`, `authList`, `createTime`, `updateTime`, `status`, `remark`)
SELECT 1, '默认角色', '[]', NOW(3), NOW(3), 1, NULL
WHERE NOT EXISTS (SELECT 1 FROM `Role` WHERE `id` = 1);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
