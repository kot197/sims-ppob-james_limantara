"use client"
import TransactionItem from "./transaction-item";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import toast from "react-hot-toast";
import { addTransactions, clearTransactions } from "@/app/state/transactions/transactionHistorySlice";
import { useAppDispatch } from "@/app/state/hooks";

export default function TransactionHistory() {
    const [offset, setOffSet] = useState(0);
    const [showMore, setShowMore] = useState(true);
    const limit = 5;
    const transactions = useSelector((state: RootState) => state.reducer.transactionHistory.transactions);
    const token = useSelector((state: RootState) => state.reducer.auth.token);
    const dispatch = useAppDispatch();

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Use the auth token if needed
                },
            });

            const responseBody = await response.json();

            if (!response.ok) {
                toast.error(responseBody.message);
            } else {
                dispatch(addTransactions(responseBody.data.records));

                toast.success(responseBody.message);
                console.log(responseBody.data.records); // Handle balance data here

                if(responseBody.data.records.length < 5) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, [offset]);

    useEffect(() => {
        dispatch(clearTransactions());
    }, []);

    return (
        <div className="flex flex-col mt-2 gap-6">
            {transactions.map((transaction) => (
                <TransactionItem
                    key={transaction.invoice_number}
                    amount={transaction.total_amount} 
                    date={transaction.created_on}
                    transactionMenu={transaction.description}
                    transactionType={transaction.transaction_type}/>
            ))}
            {showMore && (
                <p className="mt-6 w-full text-center font-semibold text-red-600">
                    <button onClick={() => setOffSet(offset + limit)}>
                        Show more
                    </button>
                </p>
            )}
        </div>
    );
}