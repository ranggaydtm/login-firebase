function Card({ children }) {
  return (
    // <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-indigo-100">
    <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl w-[500px] max-w-full min-h-[480px] p-6">{children}</div>
    // </div>
  );
}

export default Card;
