import { cookies } from 'next/headers';

// 서버 전용 (절대 클라이언트에서 사용 X)
export const getServerCookie = (
  name: string,
  parseAsNumber?: boolean,
): string | number | undefined => {
  try {
    const cookieStore = cookies();
    const value = cookieStore.get(name)?.value;

    if (!value) {
      console.warn(`[SERVER] Cookie not found: ${name}`);
      return undefined;
    }

    if (parseAsNumber) {
      const parsed = Number(value);
      if (isNaN(parsed)) {
        console.error(
          `[SERVER] Cookie "${name}" is not a valid number:`,
          value,
        );
        return undefined;
      }
      return parsed;
    }

    return value;
  } catch (error) {
    console.error(`[SERVER] Cookie Error (${name}):`, error);
    return undefined;
  }
};
