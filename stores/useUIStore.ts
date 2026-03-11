import { create } from "zustand"
import { persist, createJSONStorage, devtools } from "zustand/middleware"

type UIState = {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebarCollapsed: () => void
}

export const useUIStore = create<UIState>()(
    devtools(
        persist(
            (set) => ({
            sidebarOpen: false,
            sidebarCollapsed: false,
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            setSidebarOpen: (open) => set({ sidebarOpen: open }),
            toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
            }),
            {
            name: "ui-storage",
            storage: createJSONStorage(() => localStorage),
            }
        )
    )
)
