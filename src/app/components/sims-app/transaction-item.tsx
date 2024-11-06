
export default function TransactionItem({ amount, date, transactionMenu, transactionType }: { amount:number, date: string, transactionMenu: string, transactionType: string }) {
    function formatDate(dateString: string) {
        // Parse the date string
        const date = new Date(dateString);

        // Create a formatter for the desired locale and options
        const options = {
            year: 'numeric' as const,   // TypeScript expects specific string literals
            month: 'long' as const,
            day: '2-digit' as const,
            hour: '2-digit' as const,
            minute: '2-digit' as const,
            timeZone: 'Asia/Jakarta', // Set the desired timezone
            hour12: false, // 24-hour format
        };

        // Format the date
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const [datePart, timePart] = formatter.formatToParts(date).reduce((acc, part) => {
            if (part.type === 'day' || part.type === 'month' || part.type === 'year') {
                acc[0] += part.value + ' '; // Build date part
            } else if (part.type === 'hour' || part.type === 'minute') {
                acc[1] += part.value + ':'; // Build time part
            }
            return acc;
        }, ["", ""]);

        // Remove the trailing colon from time part
        const formattedTime = timePart.slice(0, -1);
        
        // Return the final formatted date string
        return `${datePart.trim()} ${formattedTime} WIB`;
    }

    const formattedCurrency = new Intl.NumberFormat('id-ID').format(amount);

    return (
        <div className="flex border border-gray-300 rounded-lg py-2 px-8">
            <div className="flex flex-col grow gap-y-1">
                <p className={`text-2xl
                    ${
                        transactionType === "TOPUP" ? "text-emerald-400" : "text-red-500"
                    }`}>
                    {transactionType === "TOPUP" ? '+' : '-'} Rp.{formattedCurrency}
                </p>
                <p className="text-sm text-gray-400">{formatDate(date)}</p>
            </div>
            <p className="text-sm mt-2">{transactionMenu}</p>
        </div>
    );
}