import { Head } from '@/components/layout/Head'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
} from 'wagmi'

export default function ContractWrite() {
  const { chain } = useNetwork()
  const prepareContractWrite = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  })

  const contractWrite = useContractWrite(prepareContractWrite.config)

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  })

  const handleClick = () => {
    contractWrite.write?.()
  }

  return (
    <>
      <Head
        description="Example on how to write a contract with WAGMI by minting an NFT."
        title="Contract Write"
      />
      <main className="mx-auto max-w-xl overflow-hidden px-1 text-lg">
        <h1 className="mt-10 text-4xl font-bold">Contract Write</h1>
        <h2 className="mt-2">
          This example shows how to create a simple NFT minting component.
        </h2>
        <h3>More info:</h3>
        <ul className="mt-2 list-inside list-disc text-xl">
          <li>
            <a
              className="transition duration-200 hover:opacity-60"
              href="https://wagmi.sh/examples/contract-write"
              rel="noreferrer"
              target="_blank">
              Wagmi docs
            </a>
          </li>
          <li>
            <a
              className="transition duration-200 hover:opacity-60"
              href="https://docs.openzeppelin.com/contracts/3.x/erc721"
              rel="noreferrer"
              target="_blank">
              ERC721
            </a>
          </li>
        </ul>
        <button
          className="mt-10 w-full rounded-xl bg-indigo-200 p-3 text-lg font-semibold text-indigo-700 transition  duration-300 focus:ring-2 focus:ring-indigo-500 enabled:hover:bg-indigo-300 disabled:opacity-70"
          disabled={
            contractWrite.isLoading ||
            waitForTransaction.isLoading ||
            !contractWrite.write
          }
          onClick={handleClick}>
          {contractWrite.isLoading
            ? 'Check wallet...'
            : waitForTransaction.isLoading
            ? 'Minting...'
            : 'Mint NFT'}
        </button>
        {waitForTransaction.isSuccess ? (
          <div className="mt-4">
            <p>Successfully minted an NFT!</p>
            {chain && contractWrite.data && (
              <p className="mt-2">
                Check the{' '}
                <a
                  className="font-medium text-indigo-500 underline"
                  href={`${chain.blockExplorers?.default.url}/tx/${contractWrite.data.hash}`}
                  rel="noreferrer"
                  target="_blank">
                  Transaction Hash in the block explorer
                </a>
              </p>
            )}
          </div>
        ) : (
          prepareContractWrite.isError && (
            <p className="mt-3 text-red-500">
              {prepareContractWrite.error?.message}
            </p>
          )
        )}
      </main>
    </>
  )
}
