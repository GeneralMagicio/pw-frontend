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
import cn from 'classnames'
import { Close } from '@/components/Icon/Close'
import { CollectionRanking, ProjectRanking } from '../edit-logic/edit'
import Link from 'next/link'
import { convertRankingToAttestationFormat } from './attest-utils'
import { axiosInstance } from '@/utils/axiosInstance'
import { LinkSharp } from '@/components/Icon/LinkSharp'

interface Props {
  isOpen: boolean
  onClose: () => void
  ranking: CollectionRanking
  collectionName: string
  colletionDescription: string
  collectionId: number
}

type AttestItem = Pick<ProjectRanking, 'name' | 'share'>

export const AttestationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  ranking,
  collectionName,
  colletionDescription,
  collectionId,
}) => {
  const [step, setSteps] = useState<number>(0)
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
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const attest = async () => {
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

    try {
      const tx = await eas.attest({
        schema: SCHEMA_UID,
        data: {
          data: encodedData,
          recipient: address,
          revocable: false,
        },
      })

      const newAttestationUID = await tx.wait()
      await axiosInstance.post('/flow/reportAttest', {
        cid: collectionId,
      })
      setUrl(`${easConfig.explorer}/attestation/view/${newAttestationUID}`)
      setSteps(3)
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
          'relative flex min-h-[400px] w-[600px] flex-col gap-10 py-8 px-2 font-IBM',
          { 'min-h-[280px]': step === 4 }
        )}>
        <header className="absolute top-0 mb-2 flex w-full justify-between">
          {step === 0 || step === 4 ? (
            <h2 className="text-3xl font-bold">Create list</h2>
          ) : (
            <div />
          )}
          <Close className="cursor-pointer" onClick={onClose} />
        </header>
        {step > 0 && isLessThanLastStep && (
          <div className="mt-4">
            <LinearProgress progress={progress} />
          </div>
        )}
        {step === 0 && (
          <div className="flex flex-col gap-10 mt-10">
            <p className="text-xl">
              Lists that you create here can be used for the RetroPGF voting
              both in Agora and Supermodular.
            </p>
            <p className="text-xl font-medium">
              Only lists created by RetroPGF 3 badge holders will be accessible
              in the respective voting interfaces. Lists are created using the
              Ethereum Attestation Service. You need to make a transaction on
              Optimism to create the list.
            </p>
            <div className="flex text-sm justify-between py-3 px-4 rounded-2xl text-[#F36600] bg-[#F366001A]">
              <p>Create list using EAS on Optimism.</p>
              <p>{`Estimated cost < 0.000x$`}</p>
            </div>
            <div className="flex justify-between text-sm">
              <button
                className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8 "
                onClick={onClose}>
                Not yet
              </button>
              <button
                className={
                  'flex h-12 w-fit items-center self-center rounded-full bg-black px-8 py-2  text-white'
                }
                onClick={() => setSteps(1)}>
                Create list
              </button>
            </div>
          </div>
        )}
        {step > 0 && isLessThanLastStep && (
          <div className="flex w-[80%] items-center">
            <p className="w-16"> 1- </p>
            <p className="w-[75%]">
              Are you sure you want to attest to the ranking result available in
              this page?
            </p>
            <button
              className="ml-8 h-12 w-32 rounded-lg bg-gray-600 text-white"
              onClick={() => setSteps(2)}>
              {step > 1 ? 'Confirmed' : 'Confirm'}
            </button>
          </div>
        )}
        {step > 1 && isLessThanLastStep && (
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
        {step > 2 && isLessThanLastStep && (
          <div className="flex w-[80%] items-center">
            <p className="w-16"> 3- </p>
            <p className="w-[75%]"> Check out your attestations:</p>
            <a
              className="ml-8 flex w-32 justify-center rounded-lg bg-gray-600 py-3 text-white"
              href={url}
              onClick={() => setSteps(4)}
              rel="noreferrer"
              target="_blank">
              <button>View</button>
            </a>
          </div>
        )}
        {step > 3 && isLessThanLastStep && (
          <Link
            className="ml-8 flex w-32 justify-center self-center rounded-lg bg-gray-600 py-3 text-white"
            href="/galaxy">
            <button>Done</button>
          </Link>
        )}
        {step === 4 && (
          <div className="flex flex-col gap-10 mt-10">
            <p className="text-xl">
              The list has been created, you can access it now on Agora or
              Supermodular.
            </p>
            <div className="flex flex-col gap-4 justify-center items-center">
              <button
                className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8 text-sm"
                onClick={() => {}}>
                View list on Agora
                <LinkSharp className="ml-4" />
              </button>
              <button
                className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8 text-sm"
                onClick={() => {}}>
                View list on Supermodular
                <LinkSharp className="ml-4" />
              </button>
            </div>
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {step > 0 && isLessThanLastStep && (
          <img
            alt="diploma"
            className="absolute right-[0px] top-[35%] opacity-[15%]"
            src="/images/diploma.png"
            width={100}
          />
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
