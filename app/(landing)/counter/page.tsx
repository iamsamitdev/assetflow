"use client"
import useCounterStore from "@/stores/useCounterStore"

export default function CounterPage() {

    const { count, increment, decrement } = useCounterStore()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button onClick={increment} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Increment</button>
            <h1 className="text-xl my-4">Counter: {count}</h1>
            <button onClick={decrement} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">Decrement</button>
        </div>
    )
}