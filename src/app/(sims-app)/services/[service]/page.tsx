import ServiceForm from "@/app/components/sims-app/service-form";
import BalanceView from "../../../components/sims-app/balance-view";

export default function Services() {
  return (
    <div className="flex flex-col px-60 py-10">
        <BalanceView/>
        <ServiceForm/>
    </div>
  );
}
