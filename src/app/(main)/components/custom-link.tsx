import Link from "next/link";

interface CustomLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const CustomLink = ({
  href = "#",
  className = "",
  children,
}: CustomLinkProps) => {
  return (
    <Link
      href={href}
      className={`hover:underline hover:text-blue-700 ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
