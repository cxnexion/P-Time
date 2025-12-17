function Button({ content = <></>, onClick = () => {}, overrides = "" }) {
  return (
    <button
      className={`size-8 rounded-sm bg-white/20 p-2 transition duration-[50ms] hover:bg-white/40 active:translate-y-1 ${overrides}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
