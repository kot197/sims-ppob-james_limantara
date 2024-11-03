import BalanceView from "../../components/sims-app/balance-view";
import TransactionItem from "@/app/components/sims-app/transaction-item";

export default function Home() {
  return (
    <div className="flex flex-col px-60 py-10">
        <BalanceView/>
        <p className="font-normal mt-8 text-xl font-semibold">
            Semua Transaksi
        </p>
        <div className="flex flex-col mt-2 gap-6">
            <TransactionItem amount={10000} date={new Date()} transactionMenu="Top Up Saldo"/>
            <TransactionItem amount={10000} date={new Date()} transactionMenu="Top Up Saldo"/>
            <TransactionItem amount={10000} date={new Date()} transactionMenu="Top Up Saldo"/>
            <TransactionItem amount={10000} date={new Date()} transactionMenu="Top Up Saldo"/>
            <TransactionItem amount={10000} date={new Date()} transactionMenu="Top Up Saldo"/>
        </div>
        <div className="flex mt-6">
            <p className="w-full text-center font-semibold text-red-600">Show more</p>
        </div>
    </div>
  );
}
