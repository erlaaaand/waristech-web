import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";

export const AUTH_KEYS = {
  all: ["auth"] as const,
  me: () => [...AUTH_KEYS.all, "me"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_KEYS.me(),
    queryFn: () => AuthService.me(),
    retry: false,
  });
}
