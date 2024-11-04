
export default function TopUpBalanceButton({ amount, onClick }: { amount:string, onClick: () => void }) {
    return (
        <button type="button" onClick={onClick} className="rounded-lg border-gray-500 border py-3 w-full">
            Rp{amount}
        </button>
    );
}