import { cn } from "../../utils/cn";

const sizes = { sm: "h-6 w-6 text-xs", md: "h-8 w-8 text-sm", lg: "h-10 w-10 text-base" };

export default function Avatar({ name = "", src, size = "md", className }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return src ? (
    <img src={src} alt={name} className={cn("rounded-full object-cover", sizes[size], className)} />
  ) : (
    <div className={cn("rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium", sizes[size], className)}>
      {initials}
    </div>
  );
}