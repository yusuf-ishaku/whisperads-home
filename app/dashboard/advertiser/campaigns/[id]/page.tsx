import CampaignDetails from '@/components/dashboard/CampaignDetails';

export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  return <CampaignDetails params={params} />;
}