import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { user } from "@/types/data";

type CustomerInfoProps = {
    customer: user
}

export default function CustomerInfo({ customer }: CustomerInfoProps) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Buyer Information</DialogTitle>
            </DialogHeader>
            <div>
                <div>
                  <h1 className="font-semibold text-sm text-neutral-800">
                    Name
                  </h1>
                  <p className="font-medium text-sm text-neutral-700">
                    {customer.name}
                  </p>
                </div>
                <div>
                  <h1 className="font-semibold text-sm text-neutral-800">
                    Email
                  </h1>
                  <p className="font-medium text-sm text-neutral-700">
                    {customer.email}
                  </p>
                </div>
                <div>
                  <h1 className="font-semibold text-sm text-neutral-800">
                    Phone Number
                  </h1>
                  <p className="font-medium text-sm text-neutral-700">
                    {customer.phoneNumber}
                  </p>
                </div>
            </div>
        </DialogContent>
    )
}