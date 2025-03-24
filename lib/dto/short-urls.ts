import { auth } from "@/auth";
import { UrlMeta, UserRole } from "@prisma/client";

import { prisma } from "@/lib/db";

export interface ShortUrlFormData {
  id?: string;
  userId: string;
  userName: string;
  target: string;
  url: string;
  visible: number;
  active: number;
  expiration: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserShortUrlInfo extends ShortUrlFormData {
  // meta: Omit<UrlMeta, "id">;
  meta?: UrlMeta;
}

export async function getUserShortUrls(
  userId: string,
  active: number = 1,
  page: number,
  size: number,
  role: UserRole = "USER",
  userName: string = "",
  url: string = "",
  target: string = "",
) {
  let option: any =
    role === "USER"
      ? {
          userId,
          // active,
        }
      : {};

  // 这三个参数都是模糊查询
  if (userName) {
    option.userName = {
      contains: userName,
    };
  }
  if (url) {
    option.url = {
      contains: url,
    };
  }
  if (target) {
    option.target = {
      contains: target,
    };
  }

  const [total, list] = await prisma.$transaction([
    prisma.userUrl.count({
      where: option,
    }),
    prisma.userUrl.findMany({
      where: option,
      skip: (page - 1) * size,
      take: size,
      orderBy: {
        updatedAt: "desc",
      },
    }),
  ]);
  return {
    total,
    list,
  };
}

export async function getUserShortUrlCount(
  userId: string,
  active: number = 1,
  role: UserRole = "USER",
) {
  try {
    return await prisma.userUrl.count({
      where:
        role === "USER"
          ? {
              userId,
              // active,
            }
          : {},
    });
  } catch (error) {
    return -1;
  }
}

export async function createUserShortUrl(data: ShortUrlFormData) {
  try {
    const res = await prisma.userUrl.create({
      data: {
        userId: data.userId,
        userName: data.userName || "Anonymous",
        target: data.target,
        url: data.url,
        visible: data.visible,
        active: data.active,
        expiration: data.expiration,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
    return { status: "success", data: res };
  } catch (error) {
    return { status: error };
  }
}

export async function updateUserShortUrl(data: ShortUrlFormData) {
  try {
    const res = await prisma.userUrl.update({
      where: {
        id: data.id,
        userId: data.userId,
      },
      data: {
        target: data.target,
        url: data.url,
        visible: data.visible,
        // active: data.active,
        expiration: data.expiration,
        updatedAt: new Date().toISOString(),
      },
    });
    return { status: "success", data: res };
  } catch (error) {
    return { status: error };
  }
}

export async function updateUserShortUrlActive(
  userId: string,
  id: string,
  active: number = 1,
  role: UserRole = "USER",
) {
  try {
    const option = role === "USER" ? { userId, id } : { id };
    const res = await prisma.userUrl.update({
      where: option,
      data: {
        active,
        updatedAt: new Date().toISOString(),
      },
    });
    return { status: "success", data: res };
  } catch (error) {
    return { status: error };
  }
}

export async function updateUserShortUrlVisibility(
  id: string,
  visible: number,
) {
  try {
    const res = await prisma.userUrl.update({
      where: {
        id,
      },
      data: {
        visible,
        updatedAt: new Date().toISOString(),
      },
    });
    return { status: "success", data: res };
  } catch (error) {
    return { status: error };
  }
}

export async function deleteUserShortUrl(userId: string, urlId: string) {
  return await prisma.userUrl.delete({
    where: {
      id: urlId,
      userId,
    },
  });
}

export async function getUserUrlMetaInfo(urlId: string) {
  return await prisma.urlMeta.findMany({
    where: {
      urlId,
    },
    orderBy: { updatedAt: "asc" },
  });
}

export async function getUrlBySuffix(suffix: string) {
  return await prisma.userUrl.findFirst({
    where: {
      url: suffix,
    },
    select: {
      id: true,
      target: true,
      active: true,
      expiration: true,
      updatedAt: true,
    },
  });
}

// meta
export async function createUserShortUrlMeta(
  data: Omit<UrlMeta, "id" | "createdAt" | "updatedAt">,
) {
  try {
    const meta = await findOrCreateUrlMeta(data);
    return { status: "success", data: meta };
  } catch (error) {
    console.error("create meta error", error);
    return { status: "error", message: error.message };
  }
}

async function findOrCreateUrlMeta(data) {
  const meta = await prisma.urlMeta.findFirst({
    where: {
      ip: data.ip,
      urlId: data.urlId,
    },
  });

  if (meta) {
    return await incrementClick(meta.id);
  } else {
    return await prisma.urlMeta.create({ data });
  }
}

async function incrementClick(id) {
  return await prisma.urlMeta.update({
    where: { id },
    data: {
      click: { increment: 1 },
      updatedAt: new Date(), // Prisma will handle the ISO string conversion
    },
  });
}

export async function getUrlMetaLiveLog(userId?: string) {
  const whereClause = userId ? { userUrl: { userId } } : {};

  const logs = await prisma.urlMeta.findMany({
    take: 10,
    where: whereClause,
    orderBy: { updatedAt: "desc" },
    select: {
      ip: true,
      click: true,
      updatedAt: true,
      createdAt: true,
      city: true,
      country: true,
      userUrl: {
        select: {
          url: true,
          target: true,
        },
      },
    },
  });

  const formattedLogs = logs.map((log) => ({
    ...log,
    slug: log.userUrl.url,
    target: log.userUrl.target,
  }));

  return formattedLogs;
}
