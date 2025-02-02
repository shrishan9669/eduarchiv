

const Loader = () => {
  return (
    <div className="flex justify-center items-center p-1 h-[100%]">
      <div className="flex space-x-2 p-1">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping "></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-500"></div>
      </div>
    </div>
  );
};

export default Loader;
