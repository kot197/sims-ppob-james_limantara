'use client';
import Image from 'next/image'
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="flex justify-around items-center border-b-2">
            <div className="p-7 flex gap-2">
                <Image src='/logo.png' width={32} height={32} alt="Logo"/>
                <span className="text-xl font-semibold">SIMS PPOB</span>
            </div>
            <ul className="nav-links font-medium">
                <li className="inline p-5 transition-all hover:text-red-600"><Link href="/top-up">Top Up</Link></li>
                <li className="inline p-5 transition-all hover:text-red-600"><Link href="/transaction">Transaction</Link></li>
                <li className="inline p-5 transition-all hover:text-red-600"><Link href="/account">Akun</Link></li>
            </ul>
        </nav>
    );
}
