import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface AgentCampaignDetailsProps {
  params: {
    id: string
  }
}

const mockCampaigns = [
  {
    id: 1,
    name: "Summer Beach Wears",
    description: "Don't slack this summer, up your beach look with our...",
    price: "₦25000",
    days: 7,
    isActive: true,
    image: "/campaign-details.png",
    benefits: [
      "Hydrates and nourishes",
      "Reduces dark spots and hyperpigmentation",
      "Reveals brighter, smoother skin.",
    ],
    offer: "Limited Time Offer: Buy One, Get One 50% Off!",
    amount: "₦25000",
    duration: "7 days",
    gender: "All gender",
    views: 8765,
    clicks: 8765,
  },
  {
    id: 2,
    name: "Face Vitamins Serum",
    description: "Boost your immunity with our first hand immunity booster...",
    price: "₦50000",
    days: 7,
    isActive: true,
    image: "/campaign-details.png",
    benefits: [
      "Hydrates and nourishes",
      "Reduces dark spots and hyperpigmentation",
      "Reveals brighter, smoother skin.",
    ],
    offer: "Limited Time Offer: Buy One, Get One 50% Off!",
    amount: "₦50000",
    duration: "7 days",
    gender: "All gender",
    views: 8765,
    clicks: 8765,
  },
];

export default function AgentCampaignDetails({ params }: AgentCampaignDetailsProps) {
  const campaign = mockCampaigns.find(c => c.id.toString() === params.id) || {
    id: params.id,
    name: "Campaign Not Found",
    description: "This campaign could not be found.",
    image: "/campaign-details.png",
    benefits: [],
    offer: "",
    amount: "₦0",
    duration: "N/A",
    gender: "N/A",
    views: 0,
    clicks: 0,
  };

  return (
    <div className="max-w-md mx-auto bg-white h-screen">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-3 py-2">
          <Link href="/agent/agent-dashboard" className="mr-2">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold">Campaign Details</h1>
        </div>

        {/* Campaign Name */}
        <h2 className="text-md font-medium py-3">{campaign.name}</h2>

        {/* Campaign Image */}
        <div className="mb-4">
          <Image
            src="/campaign-details.png"
            alt={campaign.name}
            width={316}
            height={210}
            className="w-full h-auto rounded-[0.5rem]"
            priority
          />
        </div>

        {/* Ad Description */}
        <div className="mb-4 py-2">
          <h3 className="font-medium mb-1">Ad Description:</h3>
          <p className="text-gray-700">{campaign.description}</p>
        </div>

        {/* Benefits */}
        {campaign.benefits.length > 0 && (
          <div className="mb-4 py-2">
            <p className="font-medium mb-1">Our {campaign.name}:</p>
            <ul className="list-none pl-2">
              {campaign.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start mb-1">
                  <span className="mr-2">•</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Offer */}
        {campaign.offer && <p className="text-gray-700 mb-6">{campaign.offer}</p>}

        {/* Amount */}
        <div className="text-center mb-6">
          <p className="text-gray-400 ">Amount</p>
          <p className="text-xl font-medium">{campaign.amount}</p>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-700">Duration: {campaign.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700">Gender: {campaign.gender}</p>
          </div>
          <div>
            <p className="text-gray-700">Views: {campaign.views.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700">Clicks: {campaign.clicks.toLocaleString()}</p>
          </div>
        </div>

        <div className="py-5">
            <button className="bg-primary text-white p-3 w-full rounded-[0.5rem] ">Participate</button>
        </div>
      </div>
    </div>
  )
}