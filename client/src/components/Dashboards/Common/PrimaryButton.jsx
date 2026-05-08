import PropTypes from "prop-types";
Button.propTypes = { children: PropTypes.node };

function Button({ children }) {
  return (
    <button type="submit" className="w-full text-white font-semibold rounded-xl text-sm px-5 py-2.5 text-center bg-green-500 hover:bg-green-600 transition-all shadow-md shadow-green-200 focus:ring-4 focus:ring-green-100 focus:outline-none">
      {children}
    </button>
  );
}
export { Button };
