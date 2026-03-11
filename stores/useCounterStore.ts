import { create } from "zustand"
import { persist, createJSONStorage, devtools } from "zustand/middleware"

type Store = {
    count: number
    increment: () => void
    decrement: () => void
    reset: () => void
}

const useCounterStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                count: 0,
                increment: () => set((state) => ({ count: state.count + 1 })),
                decrement: () => set((state) => ({ count: state.count - 1 })),
                reset: () => set({ count: 0 }),
            }),
            {
                name: "counter-storage",
                storage: createJSONStorage(() => localStorage), // default is localStorage
            }
        ),
        { name: "CounterStore", enabled: process.env.NODE_ENV === "development" } // devtools name
    )
)

export default useCounterStore