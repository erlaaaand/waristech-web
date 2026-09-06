/**
 * UserService — wraps all /users/* endpoints.
 */
import { apiClient } from "@/lib/api-client";
import type {
  AdminCreateUserDto,
  PaginatedUsersResponseDto,
  UserDto,
} from "@/types/backend.types";

export interface FindUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}

export class UserService {
  /**
   * GET /users — paginated list of all users.
   * Requires: UserRole.ADMIN
   */
  static async findPaginated(
    params: FindUsersParams = {}
  ): Promise<PaginatedUsersResponseDto> {
    const { data } = await apiClient.get<{ data: PaginatedUsersResponseDto }>(
      "/users",
      { params }
    );
    return data.data;
  }

  /**
   * GET /users/:id — get a specific user by UUID.
   * Requires: UserRole.ADMIN
   */
  static async findById(id: string): Promise<UserDto> {
    const { data } = await apiClient.get<{ data: UserDto }>(`/users/${id}`);
    return data.data;
  }

  /**
   * POST /users/admin/create — create a user that is immediately verified.
   * Requires: UserRole.ADMIN
   */
  static async adminCreate(
    dto: AdminCreateUserDto
  ): Promise<{ message: string; userId: string }> {
    const { data } = await apiClient.post<{
      data: { message: string; userId: string };
    }>("/users/admin/create", dto);
    return data.data;
  }
}
