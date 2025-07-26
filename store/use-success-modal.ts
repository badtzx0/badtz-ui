import { create } from "zustand"

interface SuccessModalStore {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const useSuccessModal = create<SuccessModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}))
