import { Heart } from "lucide-react";


export default function ThankYouSection() {
  return (
    <div className="w-full pb-10 sm:pb-16 px-4 mt-8">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <div className="text-red-500 mb-2">
          <Heart size={28} className="fill-current" />
        </div>

        <div className="text-sm sm:text-base text-(--text-muted) italic max-w-xl mx-auto mb-2">
          Thank you for visiting! We hope you enjoy exploring LookSphere.
        </div>

        <div className="text-sm sm:text-base text-(--text-muted) italic max-w-xl mx-auto">
          Built with passion for seamless and secure experiences.
        </div>

        <div className="text-xs sm:text-sm text-(--text-secondary) mt-4">
          {`© ${new Date().getFullYear()} LookSphere. All rights reserved.`}
        </div>
      </div>
    </div>
  );
}
