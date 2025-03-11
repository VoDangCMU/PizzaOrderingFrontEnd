import Link from "next/link"
import { WudangLogo } from "@/components/custom/layouts/wudang-logo"

export default function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <WudangLogo className="h-8 w-8" />
                            <span className="text-lg font-bold">Võ Đang Pizza</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Mastering the ancient art of pizza crafting since 2024.</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-4">Navigation</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/menu" className="text-muted-foreground hover:text-primary">
                                    Menu
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-muted-foreground">Vo Dang, 554 Dien Bien Phu</li>
                            <li className="text-muted-foreground">contact@vodangpizza.com</li>
                            <li className="text-muted-foreground">+86 XXX XXX XXXX</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Võ Đang Pizza. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

