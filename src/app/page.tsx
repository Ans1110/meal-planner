import db from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await db.user.findFirst();
  return (
    <div>
      <div>{JSON.stringify(user)}</div>
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
