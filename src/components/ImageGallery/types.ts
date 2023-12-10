export interface ImageData {
    src: string;
    metadata?: {
        latitude?: number;
        longitude?: number;
        azimuth?: number;
    } | null
}
