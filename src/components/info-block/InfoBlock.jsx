const InfoBlock = ({ title, content }) => {
  return (
    <div className="mt-6 rounded-lg bg-yellow-200/70 p-4 shadow">
      <h3 className="text-orange-800 font-semibold text-md">{title}</h3>
      <p className="text-orange-900 text-sm mt-1">{content}</p>
    </div>
  );
};

export default InfoBlock;
