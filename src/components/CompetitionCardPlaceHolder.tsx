import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// Other imports...

export default function CardPlaceholder() {
    return (
        <Card className="m-4 animate-pulse rounded-lg bg-gray-800 p-6 shadow-lg">
            <CardHeader className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <div className="shimmer h-full w-full rounded-full bg-gray-700"></div>
                    </Avatar>
                    <div className="shimmer h-4 w-3/4 rounded bg-gray-700"></div>
                </div>
            </CardHeader>
            <CardContent className="mt-4 grid gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="shimmer h-5 w-5 bg-gray-700"></div>
                    <div className="shimmer h-4 w-3/4 rounded bg-gray-700"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="shimmer h-5 w-5 bg-gray-700"></div>
                    <div className="shimmer h-4 w-3/4 rounded bg-gray-700"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="shimmer h-5 w-5 bg-gray-700"></div>
                    <div className="shimmer h-4 w-1/2 rounded bg-gray-700"></div>
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex justify-center gap-2">
                <div className="shimmer h-10 w-24 rounded bg-red-600"></div>
                <div className="shimmer h-10 w-24 rounded bg-gray-700"></div>
            </CardFooter>
        </Card>
    )
}
