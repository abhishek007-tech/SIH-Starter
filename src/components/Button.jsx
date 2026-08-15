import "./Button.css";

/**
 * Reusable button.
 * variant: "primary" | "secondary" | "ghost" | "danger"
 * Renders a <button> by default, or an <a>-like element if `as="link"` and `href` is given.
 */
export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${fullWidth ? "btn--full" : ""}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
