import { useState, type FormEvent } from 'react'
import { useDebounce } from 'use-debounce'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useNetwork,
} from 'wagmi'
import { parseEther } from 'viem'
import { Head } from '@/components/layout/Head'

export default function SendTransaction() {
  const [to, setTo] = useState<string>('')
  const [debouncedTo] = useDebounce(to, 500)
  const [amount, setAmount] = useState<`${number}`>('0')
  const [debouncedAmount] = useDebounce(amount, 500)

  const { chain } = useNetwork()

  const prepareSendTransaction = usePrepareSendTransaction({
    to: debouncedTo,
    value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
  })

  const sendTransaction = useSendTransaction(prepareSendTransaction.config)

  const waitForTransaction = useWaitForTransaction({
    hash: sendTransaction.data?.hash,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendTransaction.sendTransaction?.()
  }

  return (
    <>
      <Head
        description="Example on how to send a simple transaction with WAGMI."
        title="Send Transaction"
      />
      <main className="mx-auto max-w-xl overflow-hidden px-1 text-lg">
        <h1 className="mt-10 text-4xl font-bold">Send Transaction</h1>
        <form className="mt-8 flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <label htmlFor="recipient">Recipient</label>
          <input
            aria-label="Recipient"
            className="rounded-xl p-3 font-medium text-gray-700"
            id="recipient"
            onChange={(e) => setTo(e.target.value)}
            placeholder="0xA0Cf…251e"
            type="text"
            value={to}
          />
          <label htmlFor="amount">Amount (ether)</label>
          <input
            aria-label="Amount (ether)"
            className="rounded-xl p-3 font-medium text-gray-700"
            id="amount"
            onChange={(e) => setAmount(e.target.value as `${number}`)}
            placeholder="0.05"
            type="number"
            value={amount}
          />
          <button
            className="mt-3 rounded-xl bg-indigo-200 p-3 text-lg font-semibold text-indigo-700 transition  duration-300 focus:ring-2 focus:ring-indigo-500 enabled:hover:bg-indigo-300 disabled:opacity-70"
            disabled={
              sendTransaction.isLoading ||
              waitForTransaction.isLoading ||
              !sendTransaction.sendTransaction ||
              !to ||
              !amount
            }>
            {sendTransaction.isLoading
              ? 'Check wallet...'
              : waitForTransaction.isLoading
              ? 'Sending...'
              : 'Send'}
          </button>
          {waitForTransaction.isSuccess ? (
            <div className="mt-4">
              <p>
                Successfully sent {amount} ether to {to}
              </p>
              {chain && sendTransaction.data && (
                <p className="mt-2">
                  Check the{' '}
                  <a
                    className="font-medium text-indigo-500 underline"
                    href={`${chain.blockExplorers?.default.url}/tx/${sendTransaction.data.hash}`}
                    rel="noreferrer"
                    target="_blank">
                    Transaction Hash in the block explorer
                  </a>
                </p>
              )}
            </div>
          ) : (
            prepareSendTransaction.isError && (
              <p className="mt-3 text-red-500">
                {prepareSendTransaction.error?.message}
              </p>
            )
          )}
        </form>
      </main>
    </>
  )
}
