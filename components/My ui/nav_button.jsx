import { Button } from "../ui/button";

export default function NavButton({ title }) {
  return (
    <Button className={"bg-[#645fc6]"} variant="default">
      {title}
    </Button>
  );
}
