import {
  AttestationRequestData,
  EAS,
  SchemaEncoder,
  SchemaRegistry,
} from '@ethereum-attestation-service/eas-sdk'
import { CollectionRanking, ProjectRanking } from '../edit-logic/edit'
import { EASNetworks, SCHEMA_UID, useSigner } from './eas'
import {
  convertRankingToAttestationFormat,
  getPrevAttestationIds,
} from './attest-utils'
import { finishCollections, getRankings } from '../../../../utils/poll'
import { useAccount, useChainId, useConnect } from 'wagmi'
import { useEffect, useState } from 'react'

import { CircularProgress } from '@chakra-ui/progress'
import { Close } from '@/components/Icon/Close'
import Link from 'next/link'
import { LinkSharp } from '@/components/Icon/LinkSharp'
import Modal from '@/components/Modal/Modal'
import { Warning } from '@/components/Icon/Warning'
import { axiosInstance } from '@/utils/axiosInstance'
import cn from 'classnames'
import { useConnectModal } from '@rainbow-me/rainbowkit'

interface Props {
  isOpen: boolean
  onClose: () => void
  collectionName: string
  colletionDescription: string
  collectionId: number
}

type AttestItem = Pick<ProjectRanking, 'name' | 'share'>

export const AttestationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  collectionName,
  colletionDescription,
  collectionId,
}) => {
  const [step, setSteps] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [agoraUrl, setAgoraUrl] = useState('')
  const [westUrl, setWestUrl] = useState('')
  const [ranking, setRanking] = useState<CollectionRanking>()

  const chainId = useChainId()
  const { isConnected, address } = useAccount()
  const { connectAsync } = useConnect()
  const { openConnectModal } = useConnectModal()

  const signer = useSigner()

  useEffect(() => {
    ;(async () => {
      setRanking(await getRankings(collectionId.toString()))
    })()
  }, [collectionId])

  const handleCreate = async () => {
    setLoading(true)
    try {
      await attest()
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const attest = async () => {
    if (!ranking) return

    const item = await convertRankingToAttestationFormat(
      ranking,
      collectionName,
      colletionDescription
    )

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
    const encodedData = schemaEncoder.encodeData([
      { name: 'listName', type: 'string', value: item.listName },
      {
        name: 'listMetadataPtrType',
        type: 'uint256',
        value: item.listMetadataPtrType,
      },
      { name: 'listMetadataPtr', type: 'string', value: item.listMetadataPtr },
    ])

    const prevAttestations = await getPrevAttestationIds(
      address,
      SCHEMA_UID,
      easConfig.gqlUrl,
      collectionName
    )

    try {
      for (const attestation of prevAttestations) {
        await eas.revoke({ schema: SCHEMA_UID, data: { uid: attestation } })
      }

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
      await finishCollections(collectionId)
      await axiosInstance.post('/flow/reportAttest', {
        cid: collectionId,
      })
      setAgoraUrl(
        `https://vote.optimism.io/retropgf/3/list/${newAttestationUID}`
      )
      setWestUrl(`https://round3.optimism.io/lists/${newAttestationUID}`)
      setSteps(1)
    } catch (e) {
      console.error('error on sending tx:', e)
      // setUrl(
      //   `https://optimism-goerli-bedrock.easscan.org/address/0xF23eA0b5F14afcbe532A1df273F7B233EBe41C78`
      // )
    }
  }
  const isLessThanLastStep = step < 4
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
                className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8 "
                onClick={onClose}>
                Not yet
              </button>
              <button
                className={
                  'flex h-12 w-fit items-center self-center rounded-full bg-black px-8 py-2  text-white'
                }
                onClick={handleCreate}>
                {loading ? 'Loading...' : 'Create list'}
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <header className="mb-2 flex justify-end">
              <Close className="cursor-pointer" onClick={onClose} />
            </header>
            <p className="text-center text-2xl font-bold">
              Your list has been created!
            </p>
            <p className="mb-5 text-center text-xl">
              Great work, you can access the list shortly on Agora or West.
            </p>
            <div className="mb-5 flex flex-col items-center justify-center gap-5">
              <a href={agoraUrl} rel="noreferrer" target="_blank">
                <button
                  className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8 "
                  onClick={() => {}}>
                  View list on Agora
                  <LinkSharp className="ml-4" />
                </button>
              </a>
              <a href={westUrl} rel="noreferrer" target="_blank">
                <button
                  className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8"
                  onClick={() => {}}>
                  View list on West
                  <LinkSharp className="ml-4" />
                </button>
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
