import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type BackButtonProps = {
    link: string
}

export function CreateInvoice({ link }: BackButtonProps) {
    return (
        <Button>
            <Link
                href={link}
                className="flex items-center gap-2"
            >
                <ChevronLeft className="h-6 w-6" /> CreateInvoice
            </Link>
        </Button>
    )
}

