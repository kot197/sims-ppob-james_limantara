import BalanceView from "../components/sims-app/balance-view";
import BannerView from "../components/sims-app/banner-view";
import ServiceList from "../components/sims-app/service-list";

export default function Home() {
  return (
    <div className="flex flex-col px-60 py-10">
      <BalanceView/>
      {/* PILIHAN PEMBAYARAN */}
      <ServiceList/>
      {/* PROMOS */}
      <BannerView/>
    </div>
  );
}
