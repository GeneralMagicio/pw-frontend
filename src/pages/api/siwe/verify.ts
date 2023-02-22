import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
import { IRON_SESSION_CONFIG } from '@/utils/config'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { message, signature } = req.body
      const siweMessage = new SiweMessage(message)
      const fields = await siweMessage.validate(signature)

      if (fields.nonce !== req.session.nonce)
        return res.status(422).json({ message: 'Invalid nonce.' })

      req.session.siwe = fields
      await req.session.save()
      return res.json({ ok: true })
    } catch (_error) {
      return res.json({ ok: false })
    }
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}

export default withIronSessionApiRoute(handler, IRON_SESSION_CONFIG)
