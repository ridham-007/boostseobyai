export type ActionResponse<T> = {
    success: boolean;
    errors?: Record<string, string[]>;
    data?: T;
} | null;

export const AVAILABLE_LANGUAGE = ['da', 'de', 'en', 'es', 'fr', 'id', 'it', 'ja', 'pt', 'ru', 'tr']