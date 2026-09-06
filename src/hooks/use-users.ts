import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService, type FindUsersParams } from "@/services/user.service";
import type { AdminCreateUserDto } from "@/types/backend.types";

export const USER_KEYS = {
  all: ["users"] as const,
  lists: () => [...USER_KEYS.all, "list"] as const,
  list: (params: FindUsersParams) => [...USER_KEYS.lists(), params] as const,
  details: () => [...USER_KEYS.all, "detail"] as const,
  detail: (id: string) => [...USER_KEYS.details(), id] as const,
};

export function useUsers(params: FindUsersParams = {}) {
  return useQuery({
    queryKey: USER_KEYS.list(params),
    queryFn: () => UserService.findPaginated(params),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => UserService.findById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AdminCreateUserDto) => UserService.adminCreate(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
    },
  });
}
