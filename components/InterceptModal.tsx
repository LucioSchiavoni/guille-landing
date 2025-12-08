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
            <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-background border-none sm:rounded-xl max-h-[90vh] overflow-y-auto">
                <DialogTitle className="sr-only">{title || "Detalle del producto"}</DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    )
}
