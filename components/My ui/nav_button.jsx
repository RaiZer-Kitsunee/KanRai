import { Button } from "../ui/button";

export default function NavButton({ title, onClick }) {
  return (
    <Button onClick={onClick} className={"bg-[#645fc6]"} variant="default">
      {title}
    </Button>
  );
}
