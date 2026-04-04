import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const VerifyEmailSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center justify-center space-y-4">
          {/* Icon Skeleton */}
          <Skeleton className="h-16 w-16 rounded-full" />
          
          {/* Title Skeleton */}
          <Skeleton className="h-8 w-50" />
        </CardHeader>
        
        <CardContent className="space-y-4 flex flex-col items-center">
          {/* Message Lines */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </CardContent>

        <CardFooter className="flex justify-center pt-4">
          {/* Button Skeleton */}
          <Skeleton className="h-10 w-35 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmailSkeleton;