"use client";
import Image from 'next/image'
import { checkout } from '@/components/checkout';

export default function Home() {
  return (
    <main>
      <div>
        <Image alt='img' src="/vercel.svg" width={100} height={50} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            checkout({
              lineItems: [{ price: "price_1NqTfISJIPA1yfysaA99IdxF", quantity: 1 }]
            });
          }}
        >
          Buy This image
        </button>
      </div>
    </main>
  )
}
