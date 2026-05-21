import { createAuthClient } from "better-auth/react";

let authClient;

if (typeof window !== "undefined") {
  authClient = createAuthClient({
    baseURL: `${window.location.origin}/api/auth`,
  });
} else {
  authClient = {
    useSession: () => ({ data: null, isPending: true }),
    signOut: async () => {},
    signIn: {
      email: async () => {},
      social: async () => {},
    },
    signUp: {
      email: async () => {},
    },
  };
}

export { authClient };
