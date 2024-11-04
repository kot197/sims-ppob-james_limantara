import BalanceView from "../../components/sims-app/balance-view";
import TopUpForm from "@/app/components/sims-app/top-up-form";

export default function Home() {
  return (
    <div className="flex flex-col px-60 py-10">
        <BalanceView/>
        <p className="font-normal leading-7 mt-8 text-xl">
            Silahkan masukan
            <br/>
            <span className="font-bold text-3xl">Nominal Top Up</span>
        </p>
        <TopUpForm/>
    </div>
  );
}
