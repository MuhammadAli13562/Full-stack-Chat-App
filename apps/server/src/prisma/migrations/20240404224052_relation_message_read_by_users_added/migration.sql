-- CreateTable
CREATE TABLE "_MessageReadByUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MessageReadByUsers_AB_unique" ON "_MessageReadByUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_MessageReadByUsers_B_index" ON "_MessageReadByUsers"("B");

-- AddForeignKey
ALTER TABLE "_MessageReadByUsers" ADD CONSTRAINT "_MessageReadByUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessageReadByUsers" ADD CONSTRAINT "_MessageReadByUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
