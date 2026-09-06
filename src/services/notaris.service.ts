import { apiClient } from "@/lib/api-client";

export interface DeathVerificationDto {
  id: string;
  pewarisId: string;
  documentUrl: string;
  submittedByUserId: string;
  verifiedByNotarisId: string | null;
  verifiedAt: string | null;
  createdAt: string;
}

export class NotarisService {
  static async getPendingDeathCertificates(): Promise<DeathVerificationDto[]> {
    const { data } = await apiClient.get<DeathVerificationDto[]>('/inheritance/death-certificate/notaris/pending');
    return data;
  }

  static async verifyDeathCertificate(id: string): Promise<void> {
    await apiClient.patch(`/inheritance/death-certificate/${id}/verify`);
  }
}
