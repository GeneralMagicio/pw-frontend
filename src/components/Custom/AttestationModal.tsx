import {
  EAS,
  SchemaEncoder,
  SchemaRegistry,
} from '@ethereum-attestation-service/eas-sdk'
import { useAccount, useChainId, useConnect } from 'wagmi'
import { useEffect, useState } from 'react'
import { Close } from '@/components/Icon/Close'
import { LinkSharp } from '@/components/Icon/LinkSharp'
import Modal from '@/components/Modal/Modal'
import cn from 'classnames'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Button from '@/components/Button'
import { convertCustomRankingToAttestationFormat, getPrevAttestationIds } from '@/components/Poll/Rankings/OverallRankingRow/attest-utils'
import { useSigner, EASNetworks, SCHEMA_UID } from '@/components/Poll/Rankings/OverallRankingRow/eas'
import { Ranking, getRankings } from './RankingConfirmationModal'
import { useRouter } from 'next/router'

interface Props {
  isOpen: boolean
  onClose: () => void
  collectionName: string
  colletionDescription: string
  collectionId: number
}

enum ProgressState {
  'Initial',
  'Wallet_Prep',
  'Creating',
  'Revoking',
  'Attesting',
  'Finished',
  'Error',
}

const createButtonText = (state: ProgressState) => {
  switch (state) {
    case ProgressState.Initial:
      return 'Create list'
    case ProgressState.Wallet_Prep:
      return 'Preparing Wallet...'
    case ProgressState.Creating:
      return 'Preparing List...'
    case ProgressState.Revoking:
      return 'Revoking Previous Lists...'
    case ProgressState.Attesting:
      return 'Attesting...'
    case ProgressState.Error:
      return 'Error! Try again later.'
    case ProgressState.Finished:
      return 'Create list'
  }
}

export const AttestationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  collectionName,
  colletionDescription,
  collectionId,
}) => {
  const [step, setSteps] = useState<number>(0)
  // const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<ProgressState>(ProgressState.Initial)
  const [agoraUrl, setAgoraUrl] = useState('')
  const [westUrl, setWestUrl] = useState('')
  const [ranking, setRanking] = useState<Ranking>()

  const router = useRouter()

  const listId = router.query.listId as string 

  const chainId = useChainId()
  const { isConnected, address } = useAccount()
  const { connectAsync } = useConnect()
  const { openConnectModal } = useConnectModal()

  const signer = useSigner()

  useEffect(() => {
    ;(async () => {
      if (!address) return
      const res = await getRankings(listId, address)
      setRanking(res)
    })()
  }, [listId, address])

  const handleCreate = async () => {
    try {
      await attest()
    } catch (e) {
      console.error(e)
    }
  }

  const attest = async () => {
    if (!ranking) return

    setProgress(ProgressState.Wallet_Prep)

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
    if (!address) {
      console.log('no address')
      return
    }

    const eas = new EAS(easConfig.EASDeployment)
    const schemaRegistry = new SchemaRegistry(easConfig.SchemaRegistry)
    eas.connect(signer as any)
    schemaRegistry.connect(signer as any)
    const schema = await schemaRegistry.getSchema({ uid: SCHEMA_UID })
    const schemaEncoder = new SchemaEncoder(schema.schema)
    setProgress(ProgressState.Creating)
    try {
      const item = await convertCustomRankingToAttestationFormat(
        ranking,
        collectionName,
        colletionDescription
      )

      const encodedData = schemaEncoder.encodeData([
        { name: 'listName', type: 'string', value: item.listName },
        {
          name: 'listMetadataPtrType',
          type: 'uint256',
          value: item.listMetadataPtrType,
        },
        {
          name: 'listMetadataPtr',
          type: 'string',
          value: item.listMetadataPtr,
        },
      ])

      // const prevAttestations = await getPrevAttestationIds(
      //   address,
      //   SCHEMA_UID,
      //   easConfig.gqlUrl,
      //   collectionName
      // )

      // if (prevAttestations.length > 0) {
      //   setProgress(ProgressState.Revoking)
      //   for (const attestation of prevAttestations) {
      //     await eas.revoke({ schema: SCHEMA_UID, data: { uid: attestation } })
      //   }
      // }

      setProgress(ProgressState.Attesting)
      const tx = await eas.attest({
        schema: SCHEMA_UID,
        data: {
          data: encodedData,
          recipient: address,
          revocable: true,
        },
      })

      // const newAttestationUID = ""
      const newAttestationUID = await tx.wait()
      // await finishCollections(collectionId)
      // await axiosInstance.post('/flow/reportAttest', {
      //   cid: collectionId,
      // })
      setProgress(ProgressState.Finished)
      setAgoraUrl(
        `https://vote.optimism.io/retropgf/3/list/${newAttestationUID}`
      )
      setWestUrl(`https://round3.optimism.io/lists/${newAttestationUID}`)
      setSteps(1)
    } catch (e) {
      console.error('error on sending tx:', e)
      setProgress(ProgressState.Error)
      // setUrl(
      //   `https://optimism-goerli-bedrock.easscan.org/address/0xF23eA0b5F14afcbe532A1df273F7B233EBe41C78`
      // )
    }
  }
  const notYetDisabled =
    progress !== ProgressState.Initial &&
    progress !== ProgressState.Finished &&
    progress !== ProgressState.Error
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          'relative flex min-h-[250px] w-[600px] flex-col gap-10 font-IBM'
        )}>
        {step === 0 && (
          <div className="flex flex-col gap-6">
            <p className="text-2xl font-bold">Create list</p>
            <p className="text-xl">
              Lists that you create here can be used for the RetroPGF voting
              both in Agora and West.
            </p>
            <p className="text-xl">
              Lists are created using the Ethereum Attestation Service. You need
              to make a transaction on Optimism to create the list.
            </p>
            <div className="rounded-2xl bg-[#1C64F21A] py-3 px-4 text-sm text-[#1C64F2]">
              After creating this list, you can no longer do any more pairwise
              rankings in <b>{collectionName}</b>
            </div>
            <div className="rounded-2xl bg-[#1C64F21A] py-3 px-4 text-sm text-[#1C64F2]">
              Only lists created by RetroPGF 3 badge holders will be accessible
              in the respective voting interfaces.
            </div>
            <div className="flex justify-between rounded-2xl bg-[#F366001A] py-3 px-4 text-sm text-[#F36600]">
              <p>Create list using EAS on Optimism.</p>
              <p>{`Estimated cost < $0.05`}</p>
            </div>
            <div className="flex justify-between ">
              <button
                className={cn(
                  'flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8',
                  {
                    'opacity-50': notYetDisabled,
                  }
                )}
                disabled={notYetDisabled}
                onClick={onClose}>
                Not yet
              </button>
              <button
                className={
                  'flex h-12 w-fit items-center self-center rounded-full bg-black px-8 py-2  text-white'
                }
                disabled={progress !== ProgressState.Initial}
                onClick={handleCreate}>
                {createButtonText(progress)}
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <header className="flex justify-end mb-2">
              <Close className="cursor-pointer" onClick={onClose} />
            </header>
            <p className="text-2xl font-bold text-center">
              Your list has been created!
            </p>
            <p className="mb-5 text-xl text-center">
              Great work, you can access the list shortly on Agora or West.
            </p>
            <div className="flex flex-col items-center justify-center gap-5 mb-5">
              <a href={agoraUrl} rel="noreferrer" target="_blank">
                <Button varient="secondary">
                  View list on Agora
                  <LinkSharp />
                </Button>
              </a>
              <a href={westUrl} rel="noreferrer" target="_blank">
                <Button varient="secondary">
                  View list on West
                  <LinkSharp />
                </Button>
              </a>
            </div>
          </div>
        )}
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
