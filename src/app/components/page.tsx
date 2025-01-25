import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Headers from "@/components/ui/headers";

export default function Page() {
  return (
    <div className="py-10 mx-auto w-[880px] 2xl:w-[1500px]">
      <div className="space-y-4">
        <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9F2">
          Dashboard
        </Headers.GradiantHeaderOne>
        <Headers.InfoHeaderTwo>Info Header</Headers.InfoHeaderTwo>
        <div className="flex flex-col gap-y-4">
          <div>
            <Button variant={"outline"} size="md">
              Button
            </Button>
          </div>
          <div>
            <Button variant={"outline"} size={"sm"}>
              Button
            </Button>
          </div>

          <div>
            <Button variant={"filled"} size={"sm"}>
              Button
            </Button>
          </div>
          <div>
            <Button variant={"outline"} size="xs">
              Button
            </Button>
          </div>

          <div>
            <Button variant={"primary"} size="md">
              Button
            </Button>
          </div>

          <div>
            <Button disabled={true} variant={"primary"} size="md">
              Button
            </Button>
          </div>
          <div>
            <Button variant={"primary"} size={"sm"}>
              Button
            </Button>
          </div>
          <div>
            <Button variant={"primary"} size="xs">
              Button
            </Button>
          </div>
        </div>
        <div className="flex gap-x-4">
          <Badge colors="success" border="one">
            Badge
          </Badge>

          <Badge colors="error" border="one">
            Badge
          </Badge>

          <Badge colors="yellow" border="one">
            Badge
          </Badge>
          <Badge colors="primary" border="one">
            Badge
          </Badge>
        </div>
        <div>
          <Badge size={"md"} border={"none"} colors="yellow">
            Volatile
          </Badge>
          <div className="py-2">
            <Badge size={"full"} border={"none"} colors="yellow">
              Full
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
