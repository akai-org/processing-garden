-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "taskNumber" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sandbox" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Sandbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandboxUser" (
    "sandboxId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SandboxUser_pkey" PRIMARY KEY ("userId","sandboxId")
);

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxUser" ADD CONSTRAINT "SandboxUser_sandboxId_fkey" FOREIGN KEY ("sandboxId") REFERENCES "Sandbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxUser" ADD CONSTRAINT "SandboxUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
