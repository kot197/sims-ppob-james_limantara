import InputField from "@/app/components/input-field";
import BalanceView from "../../components/sims-app/balance-view";
import { BanknotesIcon } from '@heroicons/react/24/outline'
import Button from "@/app/components/button";
import TopUpBalanceButton from "@/app/components/sims-app/top-up-balance-button";

export default function Home() {
  return (
    <div className="flex flex-col px-60 py-10">
        <BalanceView/>
        <p className="font-normal leading-7 mt-8 text-xl">
            Silahkan masukan
            <br/>
            <span className="font-bold text-3xl">Nominal Top Up</span>
        </p>
        <div className="flex mt-14">
            <div className="flex flex-col w-3/5 pr-6">
                <InputField
                    icon={<BanknotesIcon className="size-5"/>}
                    placeholder="masukan nominal Top Up"
                    name="topUp"
                    id="topUp"
                    type="number"
                    />
                <Button text="TopUp" optionalClass="mt-8"/>
            </div>
            <div className="grid grid-cols-3 gap-y-6 gap-x-2 flex-1">
                <TopUpBalanceButton amount="10.000"/>
                <TopUpBalanceButton amount="20.000"/>
                <TopUpBalanceButton amount="50.000"/>
                <TopUpBalanceButton amount="100.000"/>
                <TopUpBalanceButton amount="250.000"/>
                <TopUpBalanceButton amount="500.000"/>
            </div>
        </div>
    </div>
  );
}
