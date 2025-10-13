import Link from "next/link";
import { Button } from "./ui/button";
import { CopyIcon, EyeIcon } from "lucide-react";

export default function UrlList() {
  return (
    <div>
      <h2 className=" text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 justify-between p-4 border rounded">
          <Link className="text-blue-500"
           target="_blank"
            href={"https://chatgpt.com/c/68ed2f16-3948-8322-a75d-8c69b6e2b59e"}
          >
            https://chatgpt.com/c/68ed2f16-3948-8322-a75d-8c69b6e2b59e
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted"
            >
              <CopyIcon className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <span className="flex items-center">
                <EyeIcon className="h-4 w-4" />
                100 views
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
