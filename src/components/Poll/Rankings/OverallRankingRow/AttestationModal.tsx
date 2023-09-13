import Modal from '@/components/Modal/Modal'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { useChainId, useAccount, useConnect } from 'wagmi'
import { EASNetworks, SCHEMA_UID, useSigner } from './eas'
import { CircularProgress } from '@chakra-ui/progress'
import {
  EAS,
  SchemaRegistry,
  SchemaEncoder,
  AttestationRequestData,
} from '@ethereum-attestation-service/eas-sdk'
import { Ranking } from '@/types/Ranking'
import { Close } from '@/components/Icon/Close'

interface Props {
  isOpen: boolean
  onClose: () => void
  ranking: Ranking[]
}

type AttestItem = Pick<Ranking, 'name' | 'share'>

export const AttestationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  ranking,
}) => {
  const [step, setSteps] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState<string>()

  const progress = Math.ceil(((step - 1) / 3) * 100)

  const chainId = useChainId()
  const { isConnected, address } = useAccount()
  const { connectAsync } = useConnect()
  const { openConnectModal } = useConnectModal()

  const signer = useSigner()

  const handleSignClick = async () => {
    setLoading(true)
    try {
      await attest()
    } catch(e) {
      console.error(e)
    }
    setLoading(false)
  }

  const attest = async () => {
    const items: AttestItem[] = ranking.map(({ name, share }) => ({
      name,
      share: Math.floor(share * 10000),
    }))

    if (!isConnected) {
      try {
        await connectAsync?.()
      } catch (e) {
        if (openConnectModal) openConnectModal()
        return
      }
    }

    const easConfig = EASNetworks[chainId]
    if (!easConfig) {
      console.log('no eas config')
      return
    }
    if (!signer) {
      console.log('no signer')
      return
    }

    const eas = new EAS(easConfig.EASDeployment)
    const schemaRegistry = new SchemaRegistry(easConfig.SchemaRegistry)
    eas.connect(signer as any)
    schemaRegistry.connect(signer as any)

    const schema = await schemaRegistry.getSchema({ uid: SCHEMA_UID })
    const schemaEncoder = new SchemaEncoder(schema.schema)

    try {
      const tx = await eas.multiAttest([
        {
          schema: SCHEMA_UID,
          data: items.map((item): AttestationRequestData => {
            const encodedData = schemaEncoder.encodeData([
              { name: 'name', type: 'string', value: item.name },
              { name: 'percent', type: 'uint16', value: item.share },
            ])
            return {
              recipient: '0x0000000000000000000000000000000000000000',
              revocable: false, // Be aware that if your schema is not revocable, this MUST be false
              data: encodedData,
            }
          }),
        },
      ])

      const newAttestationUID = await tx.wait()
      setUrl(`${easConfig.explorer}/address/${address}`)
      setSteps(3)
    } catch (e) {
      console.error('error on sending tx:', e)
      // setUrl(
      //   `https://optimism-goerli-bedrock.easscan.org/address/0xF23eA0b5F14afcbe532A1df273F7B233EBe41C78`
      // )
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative flex min-h-[400px] w-[600px] flex-col gap-10 py-8 px-2 font-IBM">
        <header className="absolute top-0 mb-2 flex w-full justify-end">
          <Close className="cursor-pointer" onClick={onClose} />
        </header>
        <div className='mt-4'>
          <LinearProgress progress={progress} />
        </div>
        {step > 0 && (
          <div className="flex w-[80%] items-center">
            <p className="w-16"> 1- </p>
            <p className="w-[75%]">
              Are you sure you want to attest to the voting result available in
              this page?
            </p>
            <button
              className="ml-8 h-12 w-32 rounded-lg bg-gray-600 text-white"
              onClick={() => setSteps(2)}>
              {step > 1 ? 'Confirmed' : 'Confirm'}
            </button>
          </div>
        )}
        {step > 1 && (
          <div className="flex w-[80%] items-center">
            <p className="w-16"> 2- </p>
            <p className="w-[75%]"> Please sign the transaction.</p>
            <button
              className="ml-8 h-12 w-32 rounded-lg bg-gray-600 text-white"
              onClick={handleSignClick}>
              {loading ? (
                <CircularProgress color="#4b5563" isIndeterminate size={28} />
              ) : step > 2 ? (
                'Signed'
              ) : (
                'Sign'
              )}
            </button>
          </div>
        )}
        {step > 2 && (
          <div className="flex w-[80%] items-center">
            <p className="w-16"> 3- </p>
            <p className="w-[75%]"> Check out your attestations:</p>
            <a
              className="ml-8 flex w-32 justify-center rounded-lg bg-gray-600 py-3 text-white"
              href={url}
              onClick={() => setSteps(4)}
              rel="noreferrer"
              target="_blank">
              <button>
                View
              </button>
            </a>
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="diploma"
          className="absolute right-[0px] top-[35%] opacity-[15%]"
          src="/images/diploma.png"
          width={100}
        />
      </div>
    </Modal>
  )
}

interface LinearProgressProps {
  progress: number // a number out of 100
}

const LinearProgress: React.FC<LinearProgressProps> = ({ progress }) => {
  return (
    <div className="relative w-full">
      <div className="h-[10px] w-full rounded-xl bg-gray-200"></div>
      <div
        className="absolute top-[0px] h-[10px] rounded-xl bg-gray-600"
        style={{ width: `${progress}%` }}></div>
    </div>
  )
}
