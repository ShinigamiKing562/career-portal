export default function Button({ children, variant = "primary", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition duration-300";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
