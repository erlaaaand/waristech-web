/**
 * Backend API base types — mirroring NestJS DTOs and enums exactly.
 * wt-backend source of truth.
 */

// ── User Domain ──────────────────────────────────────────────────────────────

export enum UserRole {
  ADMIN = "ADMIN",
  PEWARIS = "PEWARIS",
  AHLI_WARIS = "AHLI_WARIS",
  NOTARIS = "NOTARIS",
  GUEST = "GUEST",
}

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  nik: string | null;
  avatarUrl: string | null;
  phoneNumber: string;
  isActive: boolean;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUsersResponseDto {
  data: UserDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminCreateUserDto {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: UserRole;
  nik?: string;
}

// ── Auth Domain ───────────────────────────────────────────────────────────────

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  message: string;
  user: UserDto;
}

export interface AuthenticatedUser {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// ── Audit Log Domain ──────────────────────────────────────────────────────────

export enum AuditCategory {
  AUTH = "AUTH",
  EMPLOYEE = "EMPLOYEE",
  ASSET = "ASSET",
  SYSTEM = "SYSTEM",
}

export enum AuditSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  ERROR = "ERROR",
}

export enum AuditStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  PENDING = "PENDING",
}

export interface AuditLogDto {
  _id: string;
  action: string;
  category: AuditCategory;
  severity: AuditSeverity;
  status: AuditStatus;
  resource: string;
  resourceId?: string;
  userId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface PaginatedAuditLogsDto {
  data: AuditLogDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ── Asset Domain ──────────────────────────────────────────────────────────────

export enum AssetType {
  CRYPTO = "CRYPTO",
  SAHAM = "SAHAM",
  REKSA_DANA = "REKSA_DANA",
  OBLIGASI = "OBLIGASI",
  E_WALLET = "E_WALLET",
  REKENING_BANK = "REKENING_BANK",
  ASURANSI_JIWA = "ASURANSI_JIWA",
  P2P_LENDING = "P2P_LENDING",
  EMAS_DIGITAL = "EMAS_DIGITAL",
  NFT = "NFT",
  DOMAIN_WEBSITE = "DOMAIN_WEBSITE",
  LAINNYA = "LAINNYA",
}

export enum AssetStatus {
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  ALLOCATED = "ALLOCATED",
  DISBURSED = "DISBURSED",
  CLOSED = "CLOSED",
  DISPUTED = "DISPUTED",
  LIQUIDATING = "LIQUIDATING",
  PENDING_ACKNOWLEDGMENT = "PENDING_ACKNOWLEDGMENT",
}
