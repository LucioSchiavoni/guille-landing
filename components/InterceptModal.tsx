"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ReactNode } from "react"

export default function InterceptModal({ children, title }: { children: ReactNode; title?: string }) {
    const router = useRouter()

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            router.back()
        }
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-4xl w-[95vw] sm:w-full p-0 overflow-hidden bg-background border-none rounded-xl sm:rounded-xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto my-2 sm:my-4">
                <DialogTitle className="sr-only">{title || "Detalle del producto"}</DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    )
}
