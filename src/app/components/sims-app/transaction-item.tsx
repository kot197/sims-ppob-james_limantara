
export default function TransactionItem({ amount, date, transactionMenu }: { amount:number, date: Date, transactionMenu: string }) {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZoneName: 'short'
    })

    return (
        <div className="flex border border-gray-300 rounded-lg py-2 px-8">
            <div className="flex flex-col grow gap-y-1">
                <p className="text-2xl">{amount >= 0 ? '+' : '-'} Rp.{amount}</p>
                <p className="text-sm text-gray-400">{dateFormatter.format(date)} {timeFormatter.format(date)}</p>
            </div>
            <p className="text-sm mt-2">{transactionMenu}</p>
        </div>
    );
}