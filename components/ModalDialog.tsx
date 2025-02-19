import React, { ReactNode } from 'react'
import { Copy } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'

interface ModalDialogProps { 
    trigerText: string
    dialogTitle: string
    dialogDescription: string
    children: ReactNode
    trigerVariant?: "outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined
    footer?: ReactNode
}

const ModalDialog: React.FC<ModalDialogProps> = ({
    trigerText,
    trigerVariant="outline",
    dialogTitle,
    dialogDescription,
    children,
    footer,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={trigerVariant}>{trigerText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                {children}
                {footer && 
                    <DialogFooter className="sm:justify-start">
                        {footer}
                        {/* <DialogClose asChild>
                            <Button type="button" variant="secondary">
                            Close
                            </Button>
                        </DialogClose> */}
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>
    )
}

export default ModalDialog
