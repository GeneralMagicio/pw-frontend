import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'
import { IRON_SESSION_CONFIG } from '@/utils/config'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    req.session.nonce = generateNonce()
    await req.session.save()
    res.setHeader('Content-Type', 'text/plain')
    return res.send(req.session.nonce)
  }
  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}

export default withIronSessionApiRoute(handler, IRON_SESSION_CONFIG)
