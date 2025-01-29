export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''
export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

export const remoteApiUrl = process.env.NEXT_PUBLIC_REMOTE_API_URL ?? ''
export const lmsLoginUrl = process.env.NEXT_PUBLIC_LMS_LOGIN_URL ?? ''

export const accessTokenSecret = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET ?? ''
export const refreshTokenSecret = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET ?? ''

export const sessionSecret = process.env.NEXT_PUBLIC_SESSION_SECRET ?? ''
export const sessionPassword = process.env.NEXT_PUBLIC_SESSION_PASSWORD ?? ''

export const clientId = process.env.NEXT_PUBLIC_CLIENT_ID ?? ''
export const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET ?? ''

const secretKey = process.env.NEXT_PUBLIC_SESSION_SECRET
export const encodedKey = new TextEncoder().encode(secretKey)

