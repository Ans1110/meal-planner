import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getErrorMsg } from "./getErrorMsg";

type Options<T> = {
  actionFn: () => Promise<T>;
};

const executeAction = async <T>({ actionFn }: Options<T>) => {
  try {
    await actionFn();
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error(getErrorMsg(error));
  }
};

export { executeAction };
