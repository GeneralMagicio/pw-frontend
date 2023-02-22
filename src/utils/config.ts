import { mainnet, goerli } from '@wagmi/chains'

export const SITE_NAME = 'Next.js Web3 Starter'
export const SITE_DESCRIPTION = 'Next.js + Web3 powered by General Magic.'
export const SITE_URL = 'https://starter.generalmagic.io/'

export const SOCIAL_TWITTER = 'generalmagicio'
export const SOCIAL_GITHUB = 'GeneralMagicio/next-web3-starter'

export const WEB3_CHAINS = [mainnet, goerli]

export const IRON_SESSION_CONFIG = {
  cookieName: `siwe ${SITE_NAME}`,
  password:
    process.env.IRON_SESSION_PASSWORD ??
    // UPDATE fallback password
    'complex_password_at_least_32_characters_long',
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === 'production',
  },
}
