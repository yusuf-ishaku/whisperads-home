import Image from "next/image"

interface UserGreetingProps {
  name: string
}

export default function UserGreeting({ name }: UserGreetingProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center overflow-hidden">
        <Image
          src="/profile-img.png"
          alt="User avatar"
          width={50}
          height={50}
        />
      </div>
      <div>
        <h1 className="font-medium text-base ">Hi {name},</h1>
        <p className="text-xs font-normal text-black">Track Your Campaigns and their Performance.</p>
      </div>
    </div>
  )
}
