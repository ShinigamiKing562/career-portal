export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const base =
    "rounded-2xl px-6 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary: "border border-slate-300 bg-white hover:bg-slate-100",

    ghost: "hover:bg-slate-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
