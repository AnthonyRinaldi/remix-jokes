type ButtonType = { children: JSX.Element | string; [x: string]: any };

export const Button = ({ children, ...rest }: ButtonType) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
    {...rest}
  >
    {children}
  </button>
);

export default Button;
