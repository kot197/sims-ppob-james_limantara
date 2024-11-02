'use client';
import Image from 'next/image'

export default function NavBar() {
    return (
        <nav className="flex justify-around items-center border-b-2">
            <div className="p-7 flex gap-2">
                <Image src='/logo.png' width={32} height={32} alt="Logo"/>
                <span className="text-xl font-semibold">SIMS PPOB</span>
            </div>
            <ul className="nav-links font-medium">
                <li className="inline p-5 transition-all"><a href="#">Top Up</a></li>
                <li className="inline p-5 transition-all"><a href="#">Transaction</a></li>
                <li className="inline p-5 transition-all"><a href="#">Akun</a></li>
            </ul>
        </nav>
    );
}
