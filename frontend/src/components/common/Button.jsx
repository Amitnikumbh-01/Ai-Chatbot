const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
  }) => {
    return (
      <button
        type={type}
        className={`btn btn-${variant} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;