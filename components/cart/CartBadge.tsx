import Link from "next/link";
import Image from "next/image";

type CartBadgeProps = {
  itemCount: number;
};

export default function CartBadge({
  itemCount,
}: CartBadgeProps) {
  return (
    <Link
      href="/cart"
      aria-label="Shopping Cart"
      className="
        group
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        transition-all
        duration-200
        hover:bg-[#E8E1D6]
      "
    >
      <Image
        src="/cart-icon.png"
        alt="Shopping Cart"
        width={34}
        height={34}
        priority
        className="
          transition-transform
          duration-200
          group-hover:scale-110
        "
      />

      {itemCount > 0 && (
        <span
          className="
            absolute
            top-0
            right-0
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-[#2F2F2F]
            text-[10px]
            font-bold
            text-white
            shadow-lg
            ring-2
            ring-[#F5F1EB]
          "
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
}