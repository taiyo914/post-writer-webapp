import useTabStore from "../store/curretTabStore";


const Tabs = () => {
  const { currentTab, setTab } = useTabStore();

  return (
    <div className="flex">
      <div
        onClick={() => setTab('cards')}
        className={`
          cursor-pointer 
          py-1 px-5
          border-t border-l 
          rounded-tl-md rounded-tr-md 
          ${currentTab === 'cards' 
            ? 'bg-gray-200 font-semibold' 
            : 'hover:bg-gray-100 transition-all'}`}
      >
        カード
      </div>
      <div
        onClick={() => setTab('table')}
        className={`
          cursor-pointer 
          py-1 px-3 
          border-t border-r 
          rounded-tl-md rounded-tr-md 
          ${currentTab === 'table' 
            ? 'bg-gray-200 font-semibold' 
            : 'hover:bg-gray-100  transition-all'}`}
      >
        テーブル
      </div>
    </div>
  );
};

export default Tabs;
