import TransactionHistory from "@/app/components/sims-app/transaction-history";
import BalanceView from "../../components/sims-app/balance-view";

export default function Home() {
  return (
    <div className="flex flex-col px-60 py-10">
        <BalanceView/>
        <p className="font-normal mt-8 text-xl font-semibold">
            Semua Transaksi
        </p>
        <TransactionHistory/>
    </div>
  );
}
