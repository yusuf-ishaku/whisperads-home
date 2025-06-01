import { Battery, Signal, Wifi } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotificationItem from "./NotificationItem"

export default function NotificationPage() {
  return (

    <>
    
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <h1 className="text-lg font-medium">Notification</h1>
      </div>
     <div className="max-w-md mx-auto bg-white min-h-screen">


      {/* Content */}
      <div className="px-4 py-2 h-screen">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-0 h-10">
            <TabsTrigger
              value="general"
              className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none flex items-center justify-center gap-2"
            >
              Unread
              <span className="bg-red-500 text-white text-xs rounded px-1">5</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-2 p-0">
            <Card className="shadow-sm p-2 mt-10">
              <div className=" h-full flex flex-col gap-4">
                <NotificationItem
                  title="Your Ad is Live"
                  message="Congratulations! Your new ad is now live and ready to reach your target audience."
                  time="Just now"
                />
                <NotificationItem
                  title="Link Clicked"
                  message="Someone clicked on your ad link. Keep an eye on your campaign performance for more insights."
                  time="2h ago"
                />
                <NotificationItem
                  title="Campaign Budget Exceeded"
                  message="Your campaign budget has been exceeded. You can add more funds to continue running your campaign."
                  time="3h ago"
                />
                <NotificationItem
                  title="Campaign Budget Exceeded"
                  message="Your campaign budget has been exceeded. You can add more funds to continue running your campaign."
                  time="4h ago"
                />
                <NotificationItem
                  title="Campaign Budget Exceeded"
                  message="Your campaign budget has been exceeded. You can add more funds to continue running your campaign."
                  time="5h ago"
                />
                <NotificationItem
                  title="Campaign Budget Exceeded"
                  message="Your campaign budget has been exceeded. You can add more funds to continue running your campaign."
                  time="6h ago"
                />
                <NotificationItem
                  title="Campaign Budget Exceeded"
                  message="Your campaign budget has been exceeded. You can add more funds to continue running your campaign."
                  time="Yesterday"
                />
                <NotificationItem
                  title="Campaign Budget Exceeded"
                  message="Your campaign budget has been exceeded. You can add more funds to continue running your campaign."
                  time="Yesterday"
                />
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="unread" className="mt-2 p-0">
            <Card className="shadow-sm p-4">
              <p className="text-sm text-gray-500">You have 5 unread notifications.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
   
  )
}
