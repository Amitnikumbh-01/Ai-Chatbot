const Input = ({ label, ...props }) => {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          className="input"
          {...props}
        />
      </div>
    );
  };
  
  export default Input;