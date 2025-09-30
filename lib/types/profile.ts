


export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}


export interface UserAccountInfo {
    email: string;
    passwordHash: string;
    createdAt: string;
    memberSince: string;
}


export interface UserStats {
    jobCount: number;
    draftCount: number;
    profileCompleteness: number;
}


export interface ProfileData {
  id?: string;
  experience?: string;
  education?: string;
  skills?: string;
  strengths?: string;
  updatedAt?: string;
}


export interface ProfileResponse {
  success: boolean;
  data: {
    user: UserAccountInfo;
    stats: UserStats;
    profile: ProfileData | null;
  };
}


export interface ProfileUpdateRequest {
  experience?: string;
  education?: string;
  skills?: string;
  strengths?: string;
}


export interface UserInfoCardProps {
    user: UserAccountInfo | undefined;
}

export interface UserStatsCardProps {
    stats: UserStats | undefined;
}


export interface ProfileEditCardProps {
  profile: ProfileData | null;
  onSave: (data: ProfileUpdateRequest) => Promise<void>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}



