import { Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCopyToClipboard } from "@/features/tenants/hooks";

interface TenantSuccessAlertProps {
  tenantName: string;
  tenantId: string;
  invitationLink: string;
  onCopyLink?: (link: string) => void;
}

export function TenantSuccessAlert({
  tenantName,
  tenantId,
  invitationLink,
  onCopyLink,
}: TenantSuccessAlertProps) {
  const { copy, isCopied } = useCopyToClipboard({ onCopy: onCopyLink });

  return (
    <div className="space-y-6">
      {/* <!-- Tenant ID Display --> */}
      <div>
        <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">
          Tenant ID
        </p>
        <div className="flex items-center justify-between p-3 h-12 bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-sm text-[#4c669a] dark:text-gray-400 font-mono tracking-wider">
            {tenantId}
          </p>
          <button
            className="text-[#4c669a] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            title="Copy Tenant ID"
            onClick={() => copy(tenantId, "id")}
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* <!-- Success Alert with Invitation Link --> */}
      <Alert
        variant="default"
        className="border-l-4 border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
      >
        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <AlertTitle className="text-emerald-900 dark:text-emerald-100">
          Tenant "{tenantName}" created successfully!
        </AlertTitle>
        <AlertDescription className="text-emerald-800 dark:text-emerald-200 mt-2">
          <p className="mb-3">
            An invitation has been sent to the primary contact. You can also
            share this unique setup link:
          </p>
          <div className="mt-3 flex items-center justify-between p-2 pl-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-md">
            <p className="text-xs text-emerald-700 dark:text-emerald-300 font-mono truncate">
              {invitationLink}
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="ml-2 h-auto py-1 px-2 text-xs text-emerald-800 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-500/30"
              onClick={() => copy(invitationLink, "link")}
            >
              <Copy className="h-3 w-3 mr-1" />
              {isCopied("link") ? "Copied!" : "Copy"}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
