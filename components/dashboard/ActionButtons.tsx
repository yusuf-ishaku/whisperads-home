import Link from "next/link";

export default function ActionButtons() {
  return (
    <div className="space-y-3">
      <button className="w-full py-3 border border-primary text-primary rounded-[0.5rem] font-medium">
        <Link href={"/dashboard/advertiser/campaigns"}>View All Campaigns</Link>
      </button>

      <button className="w-full py-3 bg-primary text-white rounded-[0.5rem] font-medium">
        <Link href={"/dashboard/advertiser/ad-creation"}>
          Create New Campaign
        </Link>
      </button>
    </div>
  );
}
