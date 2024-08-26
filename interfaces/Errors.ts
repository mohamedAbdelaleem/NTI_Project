export interface APIError extends Error{
    statusCode?: number;
    status?: string
}
