
export default function TopUpBalanceButton({ amount }: { amount:string }) {
    return (
        <button className="rounded-lg border-gray-500 border py-3 w-full">
            Rp{amount}
        </button>
    );
}